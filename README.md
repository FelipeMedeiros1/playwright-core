# playwright-core
📄 README - Configuração e Execução do Projeto Playwright + TypeScript
📋 Pré-requisitos
Antes de começar, certifique-se de ter instalado:

Node.js LTS (>= 18.x)

npm ou yarn

(Opcional) Git

📥 1. Clonar o repositório
bash
Copy
Edit
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
📦 2. Instalar as dependências do projeto
bash
Copy
Edit
# Com npm
npm install

# ou com yarn
yarn install
🛠 3. Instalar Playwright e browsers suportados
bash
Copy
Edit
# Instala Playwright + utilitários
npm install -D @playwright/test

# Baixa navegadores (Chromium, Firefox, WebKit)
npx playwright install
🧩 4. Instalar tipagens e utilitários para TypeScript
bash
Copy
Edit
npm install -D typescript ts-node @types/node
📂 5. Estrutura de pastas recomendada
lua
Copy
Edit
.
├── e2e/                     # Testes E2E
│   ├── exemplo.spec.ts
│   └── ...
├── playwright.config.ts     # Configurações do Playwright
├── tsconfig.json            # Configurações do TypeScript
├── package.json
└── README.md
⚙ 6. Exemplo de tsconfig.json
json
Copy
Edit
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "types": ["node", "playwright"]
  },
  "include": [
    "playwright.config.ts",
    "e2e/**/*.ts",
    "src/**/*.ts",
    "types/**/*.d.ts"
  ]
}
🧪 7. Rodando os testes
bash
Copy
Edit
# Rodar todos os testes
npx playwright test

# Rodar testes com UI (modo interativo)
npx playwright test --ui

# Rodar um teste específico
npx playwright test e2e/exemplo.spec.ts

# Rodar com browser visível
npx playwright test --headed
📊 8. Gerar relatório HTML
bash
Copy
Edit
# Após rodar os testes
npx playwright show-report
🛠 9. Comandos úteis
bash
Copy
Edit
# Atualizar navegadores
npx playwright install --with-deps

# Executar apenas testes marcados com @tag
npx playwright test --grep @tag


Dependências necessárias
bash
Copy
Edit
# Core
npm i -D @playwright/test

# Baixar navegadores
npx playwright install

# Allure adapter + CLI
npm i -D allure-playwright allure-commandline


Como usar o Allure
bash
Copy
Edit
# 1) Rodar os testes
npx playwright test

# 2) Gerar relatório Allure (estático em ./allure-report)
npm run report:allure

# 3) Servir o Allure (servidor local temporário)
npm run report:allure:open