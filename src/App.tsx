import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { PrivateRoute } from '@/components/PrivateRoute'

// Auth Pages
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { RegisterPage } from '@/modules/auth/pages/RegisterPage'
import { ForgotPasswordPage } from '@/modules/auth/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/modules/auth/pages/ResetPasswordPage'

// Choose System
import { ChooseSystemPage } from '@/modules/choose-system/pages/ChooseSystemPage'

// Dashboard
import { DashboardPage } from '@/pages/DashboardPage'

// Layout
import { AppLayout } from '@/components/layout/AppLayout'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="datahub-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            {/* Choose System */}
            <Route element={<PrivateRoute />}>
              <Route path="/choose-system" element={<ChooseSystemPage />} />
            </Route>

            {/* App Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/app" element={<AppLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
              </Route>
            </Route>

            {/* Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))'
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--success))',
                  secondary: 'white'
                }
              },
              error: {
                iconTheme: {
                  primary: 'hsl(var(--destructive))',
                  secondary: 'white'
                }
              }
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
