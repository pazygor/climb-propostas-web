import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest
} from '../types/auth.types'
import environment from '@/config/environment'
import api from '@/services/httpClient'

// Mock de usuário válido
const MOCK_USER = {
  email: 'admin@saasbase.com',
  password: 'Admin@123',
  user: {
    id: '1',
    name: 'Administrador',
    email: 'admin@saasbase.com',
    role: 'admin'
  }
}

// Simula delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Flag para controlar se deve usar API real ou mock
const USE_MOCK = false
const API_URL = environment.api.baseURL

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    if (USE_MOCK) {
      await delay(800)

      if (data.email === MOCK_USER.email && data.password === MOCK_USER.password) {
        return {
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: MOCK_USER.user
        }
      } else {
        throw new Error('Email ou senha incorretos')
      }
    } else {
      return api.post<LoginResponse>('/auth/login', {
        email: data.email,
        senha: data.password
      })
    }
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    if (USE_MOCK) {
      await delay(1000)

      if (data.email === MOCK_USER.email) {
        throw new Error('Este email já está cadastrado')
      }

      return {
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: Math.random().toString(36).substr(2, 9),
          name: data.name,
          email: data.email,
          role: 'user'
        }
      }
    } else {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao criar conta')
      }

      return response.json()
    }
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    if (USE_MOCK) {
      await delay(800)
      return
    } else {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao enviar email')
      }
    }
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    if (USE_MOCK) {
      await delay(800)
      return
    } else {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erro ao redefinir senha')
      }
    }
  },

  validateResetToken: async (token: string): Promise<{ valid: boolean }> => {
    if (USE_MOCK) {
      await delay(500)
      return { valid: true }
    } else {
      const response = await fetch(`${API_URL}/auth/validate-reset-token/${token}`)

      if (!response.ok) {
        return { valid: false }
      }

      return response.json()
    }
  },

  logout: async (): Promise<void> => {
    if (USE_MOCK) {
      await delay(300)
      return
    } else {
      const token = localStorage.getItem('token')
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    }
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    if (USE_MOCK) {
      await delay(500)
      return { token: 'mock-jwt-token-refreshed-' + Date.now() }
    } else {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      })

      if (!response.ok) {
        throw new Error('Token expirado')
      }

      return response.json()
    }
  }
}
