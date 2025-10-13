
# Angular Cripto Tracker

Aplicação Angular para simular e acompanhar investimentos em criptomoedas, exibindo gráficos históricos com intervalos inteligentes e dados atualizados.

🔗 **Acesse online:**  
[https://angular-cripto-tracker.vercel.app/](https://angular-cripto-tracker.vercel.app/)

## Tecnologias Utilizadas

- Angular
- TypeScript
- Chart.js + ng2-charts
- CoinGecko API
- SCSS
- Vercel (deploy)

## Funcionalidades

- Simulação de compra de criptomoeda com data e valor
- Consulta automática do preço histórico
- Gráfico dinâmico com intervalos adaptados (horas, dias, meses ou anos)
- Layout responsivo
- Deploy contínuo na Vercel

## Desenvolvimento Local

### Pré-requisitos

- Node.js
- Angular CLI

### Rodando o projeto localmente

Clone o repositório:

```bash
git clone https://github.com/kkhalyl/angular_cripto_tracker.git
cd angular_cripto_tracker
```

Instale as dependências:

```bash
npm install
```

Rode o projeto:

```bash
ng serve --open
```

O app abrirá em: `http://localhost:4200/`

## Scripts Disponíveis

- **Iniciar o projeto:**  
```bash
ng serve
```

- **Build de produção:**  
```bash
ng build
```

> ⚠️ Não há testes unitários

## Deploy na Vercel

Deploy ativo conectado à branch `main`.  
Cada push atualiza automaticamente o deploy.

🔗 **Produção:**  
[https://angular-cripto-tracker.vercel.app/](https://angular-cripto-tracker.vercel.app/)

## Estrutura do Projeto

```
src/
 ┣ app/
 ┃ ┣ components/
 ┃ ┃ ┗ stepper/
 ┃ ┣ models/
 ┃ ┣ pages/
 ┃ ┃ ┣ investment-list/
 ┃ ┃ ┣ purchase-date/
 ┃ ┃ ┣ purchase-value/
 ┃ ┃ ┗ results/
 ┃ ┣ services/
 ┃ ┣ app.config.ts
 ┃ ┣ app.html
 ┃ ┣ app.routes.ts
 ┃ ┣ app.scss
 ┃ ┗ app.ts
 ┣ assets/
 ┣ _theme-colors.scss
 ┣ index.html
 ┗ main.ts
```

## Code scaffolding

Angular CLI inclui ferramentas poderosas para scaffolding de código. Para gerar um novo componente:

```bash
ng generate component nome-do-componente
```

Para uma lista completa de schematics disponíveis (componentes, diretivas ou pipes):

```bash
ng generate --help
```

## Building

Para construir o projeto para produção:

```bash
ng build
```

Isso compilará o projeto e armazenará os artefatos de build em `dist/`. Por padrão, o build de produção otimiza a aplicação para desempenho e velocidade.

## Running unit tests

Não há testes unitários configurados neste projeto.

## Running end-to-end tests

Para testes end-to-end (e2e):

```bash
ng e2e
```

Angular CLI não vem com um framework e2e por padrão. Escolha um que se adeque às suas necessidades, se necessário.

## Autor

**Khalyl Rocha**  
🔗 GitHub: [https://github.com/kkhalyl](https://github.com/kkhalyl)
