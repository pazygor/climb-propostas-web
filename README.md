# Climb Propostas Web

> Frontend do Climb Propostas — Gerador de propostas comerciais com IA. React + Vite + Tailwind.

## Tecnologias

- **React 19** + **TypeScript 5.9** + **Vite 7**
- **Tailwind CSS 4** - Estilizacao
- **React Router 7** - Roteamento
- **React Hook Form + Zod** - Formularios e validacao
- **Lucide React** - Icones
- **React Hot Toast** - Notificacoes

## Como rodar

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar
http://localhost:5173
```

## Estrutura

```
src/
├── components/
│   ├── layout/          # AppLayout, Header, Sidebar
│   ├── ui/              # Button, Input, Alert, Checkbox, Label
│   └── PrivateRoute.tsx # Protecao de rotas
├── modules/
│   ├── auth/            # Login, Register, ForgotPassword, ResetPassword
│   └── choose-system/   # Selecao de sistema
├── contexts/            # AuthContext, ThemeContext
├── pages/               # DashboardPage
├── services/            # httpClient (fetch wrapper com auth)
├── config/              # environment.ts
├── styles/              # globals.css (design tokens)
└── utils/               # cn.ts, colors.ts
```

## Features

- Login, Cadastro, Recuperacao de senha
- Indicador de forca de senha
- Protecao de rotas privadas
- Persistencia de sessao (localStorage)
- Tema light/dark
- Layout responsivo com sidebar
- Componentes UI reutilizaveis

## Scripts

```bash
npm run dev       # Desenvolvimento
npm run build     # Build de producao
npm run preview   # Preview do build
npm run lint      # ESLint
```

## Integrando com API

Por padrao o sistema usa API real. Para usar mock:

1. Edite `src/modules/auth/services/authService.ts`
2. Altere `USE_MOCK = true`
