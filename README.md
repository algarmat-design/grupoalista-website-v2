# Grupo Alista Website v2

Landing page for **Grupo Alista** — Diversificación Empresarial con Propósito.

## About

Grupo Alista is a diversified business group with five strategic business lines united by a common goal: generating sustainable economic value and contributing to social development.

### Business Lines

- **Alista Consulting** — Business consulting, training, and process mentoring
- **Alista Marketing** — Corporate image and market presence solutions
- **Alista Salud** — Medical supplies distribution for hospitals across Mexico
- **Alista Hotels** — Hotel supplies and hospitality branding
- **Alista Imports** — Import operations and customs services

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES2021)
- No build step required
- Optimized for static hosting

## Getting Started

### Prerequisites

- Node.js >= 18 (for development tools)
- A modern web browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/algarmat-design/grupoalista-website-v2.git
   cd grupoalista-website-v2
   ```

2. Install development dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser.

### Available Scripts

```bash
npm run dev        # Start development server
npm run lint       # Run all linters
npm run format     # Auto-format code with Prettier
npm run test       # Run tests
npm run validate   # Full validation (lint + test)
```

## Project Structure

```
grupoalista-website-v2/
├── index.html                      # Main landing page
├── assets/
│   ├── css/
│   │   ├── tokens.css              # Design tokens (colors, spacing, typography)
│   │   ├── base.css                # Reset and base styles
│   │   ├── layout.css              # Layout utilities
│   │   ├── components.css          # Component styles
│   │   ├── utilities.css           # Utility classes
│   │   └── responsive.css          # Media queries
│   ├── js/
│   │   └── main.js                 # Main JavaScript file
│   ├── fonts/                      # Custom fonts
│   └── images/
│       ├── logos/                  # Brand and division logos
│       ├── hero/                   # Hero section images
│       └── icons/                  # UI icons
├── brand_assets/                   # Source brand files (logos, guidelines)
├── tests/                          # Test files
├── .github/
│   ├── workflows/                  # GitHub Actions CI/CD
│   ├── CODEOWNERS
│   └── PULL_REQUEST_TEMPLATE.md
├── .coderabbit.yaml                # CodeRabbit AI review config
├── .editorconfig                   # Editor configuration
├── .gitignore                      # Git ignore rules
├── .prettierrc                     # Prettier config
├── .eslintrc.json                  # ESLint config
├── .stylelintrc.json               # Stylelint config
├── package.json                    # Project dependencies
├── LICENSE                         # License file
├── README.md                       # This file
└── SECURITY.md                     # Security policy
```

## CSS Architecture

Styles follow a layered architecture with strict load order:

1. **tokens.css** — Design tokens (CSS custom properties)
2. **base.css** — Reset and element defaults
3. **layout.css** — Grid, flexbox, containers
4. **components.css** — BEM-named components
5. **utilities.css** — Single-purpose utility classes
6. **responsive.css** — Breakpoint-specific overrides

### Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small mobile: < 480px

## Deployment

This is a static website optimized for deployment to:

- AWS S3 + CloudFront (primary)
- GitHub Pages
- Netlify
- Vercel

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run validate` to ensure code quality
4. Submit a pull request
5. Wait for CodeRabbit AI review and approval

## License

All rights reserved © 2026 Grupo Alista.

## Contact

- **Email:** ventas@grupoalista.com
- **WhatsApp:** +52 333 128 8999
- **Website:** [www.grupoalista.com](https://www.grupoalista.com)
- **Facebook:** [@grupoalista1](https://www.facebook.com/grupoalista1/)
- **Instagram:** [@grupo.alista](https://www.instagram.com/grupo.alista/)
