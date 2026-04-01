import { useAuth } from '@/modules/auth/hooks/useAuth'

export const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bem-vindo de volta, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Aqui está um resumo do seu sistema.
        </p>
      </div>

      {/* Quick Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seu Perfil</h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-gray-500">Nome</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{user?.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Permissao</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1 capitalize">{user?.role}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status do Sistema</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Autenticacao</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-gray-900">Ativo</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-gray-900">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
