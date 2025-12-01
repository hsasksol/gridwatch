# GRIDWATCH - AI Development Guide

## Project Overview

GRIDWATCH is a home energy monitoring dashboard built with React 19, showcasing Highcharts 12 advanced visualizations in a dark "Industrial Grid" design aesthetic.

**Critical Stack Requirements:**
- React 19 + Vite 7
- Tailwind CSS v4 (NO Material-UI)
- Highcharts 12 + @highcharts/react v4
- React Router v7
- localStorage for persistence

## Architecture Patterns

### Component Organization
```
src/
├── components/
│   ├── charts/          # Highcharts components + ChartTheme.js
│   ├── ui/              # Reusable Tailwind components (Card, Button, StatCard)
│   ├── layout/          # Layout, Sidebar, Header
│   ├── devices/         # Device-specific components
│   └── dashboard/       # Dashboard-specific widgets
├── hooks/               # Custom hooks for state management
├── services/            # Data generation and calculations
├── pages/               # Route-level page components
└── utils/               # Constants and formatters
```

### Chart Module Pattern
All Highcharts components must import and use the centralized dark theme:
```javascript
import './ChartTheme';  // Always import first in chart components
```

Each chart type requires specific Highcharts modules:
- Solid Gauge: `highcharts-more` + `solid-gauge`
- Stream Graph: `streamgraph`
- Heatmap: `heatmap`
- Dependency Wheel: `sankey` + `dependency-wheel`

### Data Flow
- Mock data generated in `services/mockData.js` (30 days hourly consumption)
- Central state management via `useEnergyData` hook
- Device configuration in `utils/constants.js` with Norwegian labels
- All data persisted to localStorage

## Styling Conventions

### Design System: "Industrial Grid"
- **Always use Tailwind utilities** - no inline styles, no MUI components
- Sharp corners: `rounded-sm` or `rounded-none` only
- Dark theme colors from tailwind.config.js:
  - Background: `bg-dark` (#0a0a0f), `bg-dark-secondary` (#12121a)
  - Accent: `bg-electric` (#00D4FF), `text-electric`
  - Border: `border-dark-border` (#2d2d3a)
- Monospace font (`font-mono`) for all numeric values
- Glow effects on hover: `hover:shadow-glow`, `hover:border-electric`

### Reusable Component Classes
Defined in `globals.css` via `@layer components`:
```css
.card            /* Standard card container */
.card-hover      /* Interactive card with hover glow */
.stat-card       /* Metric display card */
.btn-primary     /* Electric blue CTA button */
.btn-secondary   /* Ghost border button */
.text-glow       /* Text with electric glow shadow */
```

### Typography Hierarchy
- Headings: `font-heading` (Orbitron)
- Body: `font-body` (Inter)
- Data/metrics: `font-mono` (JetBrains Mono)

## Development Workflows

### Adding New Charts
1. Install required Highcharts module if needed
2. Create component in `components/charts/`
3. Import `./ChartTheme` at the top
4. Initialize modules: `highchartsMore(Highcharts)`
5. Use transparent backgrounds: `backgroundColor: 'transparent'`
6. Return chart wrapped in dark card container

### Creating UI Components
1. Use functional components with destructured props
2. Define Tailwind variant objects for different states
3. Combine variants using template literals with `${}`
4. Export default, no named exports for components

Example pattern:
```jsx
const variants = {
  primary: 'bg-electric text-dark hover:shadow-glow',
  secondary: 'bg-dark-tertiary border border-dark-border',
};

export default function MyComponent({ variant = 'primary', ...props }) {
  return <div className={variants[variant]}>...</div>;
}
```

### Mock Data Generation
- Each data point: `{ timestamp, hour, dayOfWeek, devices: {...}, total, spotPrice, cost }`
- Device peak hours defined in `DEVICE_TYPES` constants
- Realistic patterns: EV charging at night, heating morning/evening peaks
- Generate using Norwegian datetime formats and NOK currency

## Critical Implementation Details

### Highcharts Configuration
Global theme in `ChartTheme.js` sets:
- Dark colors array: `['#00D4FF', '#00FF88', '#FF8C00', '#FF3366', '#9D4EDD', '#FFD700']`
- Transparent chart backgrounds
- Dark grid lines and borders
- Custom tooltip styling with electric glow shadow

### Device Types System
Located in `utils/constants.js`:
```javascript
DEVICE_TYPES = {
  heating: { label: 'Oppvarming', color: '#FF8C00', avgKw: 2.5, peakHours: [...] },
  evCharging: { label: 'Elbil-lading', color: '#00FF88', avgKw: 7.0, ... },
  // ... Norwegian labels for all device types
}
```

### Tariff Calculations
Norwegian electricity pricing model in `constants.js`:
- Fixed grid: 49 NOK/month
- Day rate: 0.80 NOK/kWh (06:00-22:00)
- Night rate: 0.50 NOK/kWh (22:00-06:00)
- Weekend rate: 0.55 NOK/kWh

## Page Structure

### Dashboard Layout Pattern
```jsx
<div className="space-y-6">
  {/* Stats row: 4 StatCard components */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    
  {/* Main charts: 1/3 gauge + 2/3 stream graph */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
  {/* Secondary charts: 50/50 split */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
</div>
```

### Sidebar Navigation
- 5 routes: Dashboard, Devices, History, Compare, Settings
- NavLink with active state: `border-l-2 border-electric bg-electric/10`
- Heroicons for nav icons (outline variants)
- Logo: Electric bolt emoji (⚡) in electric blue square

## Common Pitfalls

1. **Never use Material-UI** - project explicitly uses Tailwind only
2. **Import ChartTheme first** in all chart components
3. **Initialize Highcharts modules** before use (e.g., `solidGauge(Highcharts)`)
4. **Use Norwegian labels** for device types and UI text where specified
5. **Monospace for numbers** - wrap all metrics in `font-mono` class
6. **Dark backgrounds everywhere** - avoid white/light backgrounds

## Key Files Reference

- `tailwind.config.js` - Full theme configuration with custom colors
- `src/styles/globals.css` - Tailwind layers and component classes
- `src/components/charts/ChartTheme.js` - Global Highcharts dark theme
- `src/utils/constants.js` - Device types, tariffs, Norwegian text
- `src/services/mockData.js` - Data generation logic

## Build & Run

```bash
npm install
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
```

## Implementation Phase Order

1. **Foundation:** Vite + Tailwind setup, router, layout structure
2. **UI Components:** Card, Button, StatCard with Tailwind variants
3. **Charts:** ChartTheme first, then CurrentUsageGauge, DailyStreamGraph
4. **Dashboard:** Assemble page with mock data and basic interactivity
5. **Advanced Charts:** Heatmap, Dependency Wheel, Boxplot for other pages
6. **Polish:** Cross-chart filtering, localStorage persistence, animations
