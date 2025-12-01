# GRIDWATCH ⚡

A modern, accessible energy monitoring dashboard built with React 19, Vite 6, and Tailwind CSS.

## Features

- 📊 Real-time energy consumption visualization
- 🌓 Dark/Light theme with system preference detection
- ♿ WCAG 2.1 AA compliant accessibility
- 📱 Fully responsive design
- ⚡ Code-splitting and lazy loading for optimal performance
- 🎨 Beautiful charts with Highcharts
- 🔐 Secure localStorage handling with fallbacks

## Tech Stack

- **React 19.0** - Latest React with concurrent features
- **Vite 6.0** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Highcharts 12.1** - Interactive data visualization
- **React Router 7.0** - Client-side routing
- **Heroicons 2.2** - Beautiful hand-crafted SVG icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
gridwatch/
├── src/
│   ├── components/
│   │   ├── charts/          # Chart components (Gauge, Stream, Wheel, etc.)
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── layout/          # Layout components (Header, Sidebar, Layout)
│   │   └── ui/              # Reusable UI components
│   ├── context/             # React contexts (Theme)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── services/            # Business logic and mock data
│   ├── styles/              # Global styles
│   └── utils/               # Utility functions and constants
├── index.html
└── package.json
```

## Accessibility Features

This project follows WCAG 2.1 Level AA guidelines:

- ✅ Keyboard navigation for all interactive elements
- ✅ Proper ARIA labels and roles
- ✅ Focus indicators on all focusable elements
- ✅ Semantic HTML landmarks
- ✅ Chart accessibility with Highcharts module
- ✅ Screen reader support
- ✅ Color contrast compliance

## Performance Optimizations

- Code splitting with React lazy loading
- Self-hosted fonts (no external requests)
- Optimized bundle size
- Efficient re-rendering with React memoization
- Production-ready error boundaries

## Development Best Practices

- Error boundaries for graceful error handling
- Try-catch blocks for localStorage operations
- Environment-aware console logging
- Clean code with no unused utilities
- Proper semantic HTML structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

---

**Built with ❤️ using modern web technologies**
