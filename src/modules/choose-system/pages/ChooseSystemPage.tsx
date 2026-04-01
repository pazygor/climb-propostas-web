import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { LayoutDashboard } from 'lucide-react'

interface SystemCard {
  id: string
  name: string
  description: string
  icon: typeof LayoutDashboard
  color: string
  path: string
}

const SYSTEMS: SystemCard[] = [
  {
    id: 'app',
    name: 'Aplicação Principal',
    description: 'Acesse o painel principal do sistema',
    icon: LayoutDashboard,
    color: 'from-blue-500 to-blue-600',
    path: '/app/dashboard'
  }
]

export const ChooseSystemPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSystemSelect = (path: string) => {
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#9B0310] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Escolha o sistema que deseja acessar
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-2xl mx-auto">
          {SYSTEMS.map((system) => {
            const Icon = system.icon
            return (
              <button
                key={system.id}
                onClick={() => handleSystemSelect(system.path)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
              >
                <div className={`bg-gradient-to-r ${system.color} p-8 text-white`}>
                  <Icon className="w-16 h-16 mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="text-2xl font-bold text-center">
                    {system.name}
                  </h2>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 text-center leading-relaxed">
                    {system.description}
                  </p>

                  <div className="mt-6">
                    <span className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-100 group-hover:bg-[#9B0310] text-gray-900 group-hover:text-white font-medium rounded-lg transition-colors duration-300">
                      Acessar Sistema
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Logout */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              localStorage.clear()
              navigate('/login')
            }}
            className="text-gray-600 hover:text-[#9B0310] transition-colors font-medium cursor-pointer"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  )
}
