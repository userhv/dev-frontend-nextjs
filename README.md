# 🛍️ Dev Frontend Next.js - Sistema de Gerenciamento de Produtos

Um sistema moderno de gerenciamento de produtos desenvolvido com Next.js 15, TypeScript, Tailwind CSS e shadcn/ui. O projeto inclui funcionalidades completas de CRUD, autenticação simulada, testes automatizados e pipeline CI/CD com deploy automático no Vercel.

## 🚀 Funcionalidades

- ✅ **CRUD Completo de Produtos** - Criar, visualizar, editar e excluir produtos
- 🔐 **Sistema de Autenticação** - Login simulado com guard de rotas
- 📱 **Design Responsivo** - Interface adaptável para mobile e desktop
- 🎨 **UI Moderna** - Componentes estilizados com Tailwind CSS e shadcn/ui
- 🧪 **Testes Automatizados** - Cobertura de testes com Jest e Testing Library
- 🚀 **CI/CD Pipeline** - Deploy automático no Vercel via GitHub Actions
- 📊 **Relatórios de Coverage** - Análise de cobertura de testes

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Sistema de componentes baseado em Radix UI
- **Lucide React** - Ícones modernos

### Testes
- **Jest** - Framework de testes
- **Testing Library** - Testes de componentes React
- **@babel/preset-react** - Transpilação para testes

### DevOps
- **GitHub Actions** - CI/CD Pipeline
- **Vercel** - Hospedagem e deploy
- **ESLint** - Linting de código

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/userhv/dev-frontend-nextjs.git
cd dev-frontend-nextjs
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente (opcional)
```bash
cp .env.example .env.local
# Edite o arquivo .env.local conforme necessário
```

### 4. Configuração do shadcn/ui
O projeto já vem configurado com shadcn/ui. Os componentes estão em `src/components/ui/` e podem ser customizados conforme necessário.

### 5. Execute o projeto em desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 🧪 Comandos Disponíveis

### Desenvolvimento
```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint automaticamente
```

### Testes
```bash
npm run test         # Executa testes em modo watch
npm run test:ci      # Executa testes para CI (sem watch)
npm run test:coverage # Executa testes com relatório de cobertura
npm run type-check   # Verifica tipos TypeScript
```

### Utilitários
```bash
npm run clean        # Limpa arquivos de build e cache
npm run analyze      # Analisa o bundle de produção
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── components/         # Componentes globais
│   ├── login/              # Página de login
│   ├── products/           # Páginas de produtos
│   │   ├── [id]/          # Página de detalhes do produto
│   │   │   └── edit/      # Página de edição
│   │   └── new/           # Página de criação
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes reutilizáveis
│   ├── ui/                # Componentes UI base
│   ├── AuthGuard.tsx      # Guard de autenticação
│   └── LayoutWithSidebar.tsx # Layout com sidebar
├── features/               # Features organizadas por domínio
│   └── products/          # Feature de produtos
│       ├── __tests__/     # Testes da feature
│       ├── ProductCard.tsx
│       ├── ProductForm.tsx
│       ├── ProductsList.tsx
│       └── ...
├── hooks/                  # Custom hooks
│   ├── __tests__/         # Testes dos hooks
│   ├── useAuth.ts
│   ├── useProducts.ts
│   └── useProductForm.ts
├── lib/                    # Utilitários e configurações
│   └── utils.ts
└── services/               # Serviços e APIs
    ├── products.ts
    ├── categories.ts
    └── types.ts
```

## 🔐 Autenticação

O sistema possui autenticação simulada para demonstração:

- **Usuário:** `admin`
- **Senha:** `password`

O sistema utiliza localStorage para simular sessões e inclui guards de rota para proteger páginas que requerem autenticação.

## 🧪 Testes

O projeto possui cobertura abrangente de testes:

### Executar todos os testes
```bash
npm run test:ci
```

### Executar com cobertura
```bash
npm run test:coverage
```

### Estrutura de Testes
- **Testes unitários** - Hooks e utilitários
- **Testes de componentes** - Componentes React isolados
- **Testes de integração** - Fluxos completos de usuário

## 🚀 Deploy e CI/CD

### Deploy Automático
O projeto está configurado com pipeline CI/CD que executa automaticamente:

1. **Testes** - Executa todos os testes e linting
2. **Build** - Gera build de produção
3. **Deploy** - Deploy automático no Vercel (branch main)

### URL de Produção
🌐 **[https://dev-frontend-nextjs-helio.vercel.app](https://dev-frontend-nextjs-helio.vercel.app)**

### Configuração Manual do Deploy

Se precisar configurar o deploy manualmente:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login no Vercel
vercel login

# Deploy
vercel --prod
```

## 📊 Cobertura de Testes

O projeto mantém alta cobertura de testes:
- **Statements:** ~57%
- **Branches:** ~46%
- **Functions:** ~50%
- **Lines:** ~58%

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Commit
O projeto segue o padrão de Conventional Commits:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas de build/config

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel](https://vercel.com)

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**
