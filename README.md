# Shadcn Starter Pack

A minimal starter template for building modern React applications with [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), and [shadcn/ui](https://ui.shadcn.com/) components.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast frontend tooling
- ⚛️ [React 19](https://react.dev/) - JavaScript library for building user interfaces
- 🔤 [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 📦 [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- 🧩 [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icon set
- 📏 [ESLint](https://eslint.org/) - Pluggable JavaScript linter

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/shadcn-starter.git
cd shadcn-starter
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

4. Open your browser and visit http://localhost:5173

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview the production build locally

## Project Structure

```
shadcn-starter/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # React components
│   │   └── ui/          # shadcn/ui components
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── components.json      # shadcn/ui configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Adding shadcn/ui Components

This starter template comes with the following shadcn/ui components pre-installed:

- Button
- Card

To add more components, use the shadcn/ui CLI:

```bash
npx shadcn-ui@latest add [component-name]
```

For example, to add the Dialog component:

```bash
npx shadcn-ui@latest add dialog
```

## Customization

### Theming

The project uses the "New York" style with the "zinc" base color. You can customize the theme by modifying the `components.json` file and the CSS variables in `src/index.css`.

### Tailwind Configuration

Tailwind CSS is pre-configured with the shadcn/ui recommended settings. You can extend the configuration as needed.

## Deployment

Build your application for production:

```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory, ready to be deployed to your preferred hosting platform.

## Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License.
