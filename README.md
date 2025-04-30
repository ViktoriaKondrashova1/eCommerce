# :beers: eCommerce Graduate Project

Welcome to **BrewPort** eCommerce project.

## :pencil: Describe

This project is a graduation work developed as part of the JavaScript/Front-end course at RSScool. The application was built using CommerceTools, TypeScript, Vite, React, and Ant Design. Its purpose is to consolidate the skills acquired during the course and prepare for the upcoming advanced framework-based courses. This project serves as a practical step towards mastering modern front-end development tools and best practices.

## :dart: Goals

:white_check_mark: Setup project and CommerceTools integration
- setting up the repository
- organizing the task board
- integrating with CommerceTools to establish the API client
- configuring the development environment

:white_check_mark: Login, Registration, and Main Pages Implementation
- implementing the login and registration features
- managing user authentication state
- saving the authentication token
- setting up navigation between pages

:white_check_mark: Catalog Product, Detailed Product, and User Profile Pages Implementation
- implementing the Catalog Product page
- implementing the Detailed Product page
- implementing the User Profile page

:white_check_mark: Detailed Product Page Enhancement, Basket Page, Catalog Page Enhancement, and About Us Page Implementation
- improving the Detailed Product page
- building the Basket page
- improving the Catalog page
- implementing the About Us page

## :hammer_and_wrench: Stack
- **[React](https://react.dev/)** - The JavaScript library that is used to build the user interface
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- **[Vite](https://vitejs.dev/)** - Lightning fast build tool with HMR
- **[Vitest](https://vitest.dev/)** - Blazing fast unit testing
- **[PostCSS](https://postcss.org/)** - Modern CSS processing
- **[Ant Design](https://ant.design/)** - CSS-in-JS technology to provide dynamic & mix theme ability
- **Code Quality**:
  - [ESLint](https://eslint.org/) - Code lintingCSS-in-JS technology to provide dynamic & mix theme ability.
  - [Stylelint](https://stylelint.io/) - Style linting
- **Git Hooks**:
  - [Husky](https://typicode.github.io/husky/) - Git hooks made easy
  - [lint-staged](https://github.com/okonet/lint-staged) - Run linters on git staged files

<div>
    <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="React" **alt="react-icon" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="TypeScript" **alt="ts-icon" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/vitejs/vitejs-original.svg"  title="Vite" alt="vite-icon" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/vitest/vitest-original.svg"  title="Vitest" alt="vitest-icon" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/postcss/postcss-original.svg"  title="PostCSS" alt="postcss-icon" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/antdesign/antdesign-original.svg"  title="AntDesign" alt="antdesign-icon" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/eslint/eslint-original.svg"  title="ESLint" alt="eslint-icon" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/github/github-original.svg" title="GitHub" **alt="github-icon" width="40" height="40"/>
</div>

## :arrow_forward: Scripts

- `npm run start`          - Starts the development server provided by Vite for local development
- `npm run build`          - Compiles TypeScript files and creates an optimized production build with Vite
- `npm run lint`           - Runs ESLint to analyze the code
- `npm run lint:fix`       - Runs ESLint with automatic fixing enabled, correcting fixable issues
- `npm run preview`        - Starts a local server to preview the production build of the project
- `npm run prepare`        - Initializes Husky, enabling Git hooks to run scripts
- `npm run ts-lint`        - Runs the TypeScript compiler in check types and catch errors without emitting files

## :file_folder: Project Structure

```
ecommerce/
├── .github/               # GitHub workflows and configurations
├── .husky/                # Git hooks configurations
├── .vscode/               # VS Code settings and recommendations
└── src/                   # Source code directory
    ├── assets/            # Static assets such as images, fonts, icons used in the application
    └── entities/
      ├── api/             # API service modules for server communication and data fetching
      ├── lib/             # Utility libraries and helper functions related to entities
      └── model/           # Data models and TypeScript interfaces/types representing domain entities
    └── shared/config/     # Shared configuration files and constants used across the application
    └── styles/            # Global styles, CSS/SCSS files, and theming resources
    ├── App.tsx            # Root React component that sets up the application's structure and routing
    ├── main.tsx           # Entry point of the application, rendering App and initializing the app
    └── vite-env.d.ts      # TypeScript declaration file for Vite environment variables
├── .gitignore             # Files and directories ignored by Git version control
├── .swcrc                 # Configuration file for SWC (Speedy WebAssembly Compiler) used for code transpilation
├── commitlint.config.js   # Configuration for commit message linting to enforce consistent commit standards
├── eslint.config.js       # ESLint configuration for code quality and style
├── index.html             # Main HTML file serving as the entry point for the web application
├── lint-staged.config.js  # Configuration for lint-staged to run linters on staged Git files before commits
├── package-lock.json      # Lockfile for dependencies, ensuring consistent installs
├── package.json           # Metadata, scripts, and dependencies for the project
├── postcss.config.js      # Configuration for PostCSS
├── tsconfig.app.json      # TypeScript configuration specific to the application's source code
├── tsconfig.json          # Root TypeScript configuration, including project-wide compiler options
├── tsconfig.node.json     # TypeScript configuration tailored for Node.js environment
└── vitest.config.ts       # Configuration file for Vitest
```

## :rocket: Getting started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ViktoriaKondrashova1/eCommerce.git
cd ecommerce
```
2. Install dependencies:

```bash
npm install
```
3. Start application:

```bash
npm run start
```
