import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Settings,
  LogOut,
  X
} from 'lucide-react'
import { useAuth } from '@/modules/auth/hooks/useAuth'

interface MenuItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/app/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    id: 'settings',
    label: 'Configurações',
    path: '/app/settings',
    icon: <Settings className="w-5 h-5" />
  }
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation()
  const { logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <>
      {/* Overlay para mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-64 h-screen bg-[#9B0310] text-white flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header do Sidebar */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SaaS Base</span>
            </div>
            {/* Botão fechar (apenas mobile/tablet) */}
            <button
              onClick={onClose}
              className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>
            <p className="text-sm text-white/80">Sistema de Gestão</p>
          </div>
        </div>

        {/* Linha separadora */}
        <div className="border-t border-white/20 mx-4" />

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={handleLinkClick}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-[#7A0209] text-white font-medium'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Linha separadora */}
        <div className="border-t border-white/20 mx-4" />

        {/* Botão Sair */}
        <div className="p-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          <p className="text-xs text-white/60 text-center">
            SaaS Base Template
          </p>
        </div>
      </aside>
    </>
  )
}
