# GRIDWATCH - Project Specification

## Your Task
Create a complete React application called GRIDWATCH - a home energy monitoring dashboard that visualizes electricity consumption patterns. This is a Highcharts React v4 showcase project demonstrating advanced chart types and interactivity.

**Design Reference:** Use TailAdmin-style dark dashboard aesthetics with Tailwind CSS.

---

## Tech Stack (Required)

- **Frontend:** React 19 + Vite 7
- **Styling:** Tailwind CSS v4
- **Charts:** Highcharts 12 + @highcharts/react v4
- **Routing:** React Router v7
- **Storage:** localStorage (no backend)
- **Icons:** Heroicons or Lucide React

**NO MUI** - Use Tailwind utility classes for all styling.

---

## Design System: "Industrial Grid"

### Tailwind Config (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Backgrounds
        dark: {
          DEFAULT: '#0a0a0f',
          secondary: '#12121a',
          tertiary: '#1a1a24',
          border: '#2d2d3a',
        },
        // Accent colors
        electric: {
          DEFAULT: '#00D4FF',
          50: '#E6FAFF',
          100: '#B3F0FF',
          200: '#80E6FF',
          300: '#4DDBFF',
          400: '#1AD1FF',
          500: '#00D4FF',
          600: '#00A8CC',
          700: '#007D99',
          800: '#005266',
          900: '#002633',
        },
        success: '#00FF88',
        warning: '#FF8C00',
        danger: '#FF3366',
        purple: '#9D4EDD',
        gold: '#FFD700',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.4)',
        'glow-success': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-warning': '0 0 20px rgba(255, 140, 0, 0.3)',
        'glow-danger': '0 0 20px rgba(255, 51, 102, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
```

### CSS Variables (globals.css)
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply dark;
  }
  
  body {
    @apply bg-dark text-white font-body antialiased;
  }
}

@layer components {
  /* Card component */
  .card {
    @apply bg-dark-secondary border border-dark-border rounded-sm p-6;
  }
  
  .card-hover {
    @apply card transition-all duration-200 hover:border-electric hover:shadow-glow;
  }
  
  /* Stat card */
  .stat-card {
    @apply card flex flex-col gap-2;
  }
  
  .stat-value {
    @apply font-mono text-3xl font-semibold text-white;
  }
  
  .stat-label {
    @apply text-sm text-gray-400 uppercase tracking-wider;
  }
  
  /* Buttons */
  .btn {
    @apply px-4 py-2 font-medium text-sm transition-all duration-200 rounded-sm;
  }
  
  .btn-primary {
    @apply btn bg-electric text-dark hover:bg-electric-400 hover:shadow-glow;
  }
  
  .btn-secondary {
    @apply btn bg-dark-tertiary border border-dark-border text-white hover:border-electric;
  }
  
  .btn-ghost {
    @apply btn bg-transparent text-gray-400 hover:text-electric hover:bg-dark-tertiary;
  }
  
  /* Glow text */
  .text-glow {
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }
  
  /* Section header */
  .section-header {
    @apply text-xl font-heading font-semibold text-white mb-4;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-dark;
}

::-webkit-scrollbar-thumb {
  @apply bg-dark-border rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-electric;
}
```

### Design Patterns
- Sharp corners (`rounded-sm` max, mostly `rounded-none`)
- 1px borders with `border-dark-border`
- Subtle glow effects on accent elements
- Cards with `bg-dark-secondary` 
- Hover states: border shifts to `electric`
- Monospace font for all numbers/data
- Grid/circuit-board subtle background pattern (optional)

---

## Application Structure

### Pages (Routes)

```
/                 → DashboardPage (main overview)
/devices          → DevicesPage (manage/view devices)
/history          → HistoryPage (detailed historical analysis)
/compare          → ComparePage (period comparisons)
/settings         → SettingsPage (preferences, goals, tariffs)
```

### Component Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── ChartTheme.js           # Global Highcharts dark theme
│   │   ├── CurrentUsageGauge.jsx   # Solid gauge - real-time kW
│   │   ├── DailyStreamGraph.jsx    # Stream graph - 24h by device
│   │   ├── ConsumptionHeatmap.jsx  # Heatmap - hour × day matrix
│   │   ├── DeviceBreakdownWheel.jsx # Dependency wheel - device flow
│   │   ├── PeriodCompareChart.jsx  # Grouped columns - compare periods
│   │   ├── UsageBoxplot.jsx        # Boxplot - variance by weekday
│   │   └── CostAreaChart.jsx       # Area spline - cumulative cost
│   ├── ui/
│   │   ├── StatCard.jsx            # Metric display with icon
│   │   ├── Button.jsx              # Reusable button variants
│   │   ├── Card.jsx                # Card wrapper component
│   │   ├── Badge.jsx               # Status badges
│   │   ├── Toggle.jsx              # Toggle switch
│   │   ├── Select.jsx              # Dropdown select
│   │   ├── DateRangePicker.jsx     # Date range selector
│   │   └── Alert.jsx               # Alert/notification banners
│   ├── icons/
│   │   └── DeviceIcons.jsx         # SVG icons for device types
│   ├── devices/
│   │   ├── DeviceCard.jsx          # Single device with mini chart
│   │   ├── DeviceList.jsx          # Filterable device grid
│   │   └── AddDeviceModal.jsx      # Manual device entry
│   ├── layout/
│   │   ├── Header.jsx              # Top bar with nav
│   │   ├── Sidebar.jsx             # Collapsible sidebar nav
│   │   └── Layout.jsx              # Main wrapper
│   └── dashboard/
│       ├── LiveTicker.jsx          # Animated current usage
│       ├── QuickStats.jsx          # Today's summary row
│       └── UsageAlerts.jsx         # Threshold warnings
├── hooks/
│   ├── useEnergyData.js            # Central data/filter state
│   ├── useDevices.js               # Device management
│   └── useSettings.js              # User preferences
├── services/
│   ├── mockData.js                 # Generated consumption data
│   ├── storage.js                  # localStorage helpers
│   └── calculations.js             # Cost/CO2 calculations
├── pages/
│   ├── DashboardPage.jsx
│   ├── DevicesPage.jsx
│   ├── HistoryPage.jsx
│   ├── ComparePage.jsx
│   └── SettingsPage.jsx
├── utils/
│   ├── formatters.js               # Number, date, energy formatters
│   └── constants.js                # Device types, tariffs, thresholds
└── styles/
    └── globals.css                 # Global styles, Tailwind layers
```

---

## UI Component Examples

### Card Component
```jsx
// src/components/ui/Card.jsx
export default function Card({ children, className = '', hover = false }) {
  return (
    <div className={`
      bg-dark-secondary border border-dark-border rounded-sm p-6
      ${hover ? 'transition-all duration-200 hover:border-electric hover:shadow-glow cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
```

### StatCard Component
```jsx
// src/components/ui/StatCard.jsx
export default function StatCard({ label, value, unit, icon: Icon, trend, variant = 'default' }) {
  const variants = {
    default: 'text-white',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  };

  return (
    <div className="bg-dark-secondary border border-dark-border rounded-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400 uppercase tracking-wider">{label}</span>
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`font-mono text-3xl font-semibold ${variants[variant]}`}>
          {value}
        </span>
        {unit && <span className="text-gray-400 text-sm">{unit}</span>}
      </div>
      {trend && (
        <div className={`mt-2 text-sm ${trend > 0 ? 'text-danger' : 'text-success'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last week
        </div>
      )}
    </div>
  );
}
```

### Button Component
```jsx
// src/components/ui/Button.jsx
const variants = {
  primary: 'bg-electric text-dark hover:bg-electric-400 hover:shadow-glow',
  secondary: 'bg-dark-tertiary border border-dark-border text-white hover:border-electric',
  ghost: 'bg-transparent text-gray-400 hover:text-electric hover:bg-dark-tertiary',
  danger: 'bg-danger/10 text-danger border border-danger/30 hover:bg-danger hover:text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) {
  return (
    <button
      className={`
        font-medium transition-all duration-200 rounded-sm
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Sidebar Navigation
```jsx
// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CpuChipIcon, 
  ChartBarIcon, 
  ArrowsRightLeftIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const navItems = [
  { to: '/', icon: HomeIcon, label: 'Dashboard' },
  { to: '/devices', icon: CpuChipIcon, label: 'Devices' },
  { to: '/history', icon: ChartBarIcon, label: 'History' },
  { to: '/compare', icon: ArrowsRightLeftIcon, label: 'Compare' },
  { to: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-dark-secondary border-r border-dark-border min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 mb-6">
        <div className="w-10 h-10 bg-electric rounded-sm flex items-center justify-center">
          <span className="text-dark font-heading font-bold text-lg">⚡</span>
        </div>
        <span className="font-heading font-bold text-xl tracking-wider">
          GRID<span className="text-electric">WATCH</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200
              ${isActive 
                ? 'bg-electric/10 text-electric border-l-2 border-electric' 
                : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'}
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
```

---

## Chart Specifications

### Highcharts Dark Theme
```javascript
// src/components/charts/ChartTheme.js
import Highcharts from 'highcharts';

Highcharts.setOptions({
  colors: ['#00D4FF', '#00FF88', '#FF8C00', '#FF3366', '#9D4EDD', '#FFD700'],
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: '"Inter", sans-serif',
    },
  },
  title: {
    style: {
      color: '#ffffff',
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '600',
    },
  },
  subtitle: {
    style: {
      color: '#8892a0',
    },
  },
  xAxis: {
    lineColor: '#2d2d3a',
    tickColor: '#2d2d3a',
    labels: {
      style: { color: '#8892a0' },
    },
    title: {
      style: { color: '#8892a0' },
    },
    gridLineColor: '#1a1a24',
  },
  yAxis: {
    lineColor: '#2d2d3a',
    tickColor: '#2d2d3a',
    labels: {
      style: { color: '#8892a0' },
    },
    title: {
      style: { color: '#8892a0' },
    },
    gridLineColor: '#1a1a24',
  },
  legend: {
    itemStyle: {
      color: '#8892a0',
      fontWeight: '400',
    },
    itemHoverStyle: {
      color: '#00D4FF',
    },
    itemHiddenStyle: {
      color: '#4a5568',
    },
  },
  tooltip: {
    backgroundColor: '#12121a',
    borderColor: '#2d2d3a',
    borderRadius: 4,
    style: {
      color: '#ffffff',
    },
    shadow: {
      color: 'rgba(0, 212, 255, 0.1)',
      offsetX: 0,
      offsetY: 4,
      width: 16,
    },
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        color: '#ffffff',
        style: {
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
          textOutline: 'none',
        },
      },
    },
    column: {
      borderRadius: 2,
    },
    pie: {
      borderWidth: 0,
    },
  },
  credits: {
    enabled: false,
  },
});

export { Highcharts };
```

### 1. CurrentUsageGauge (Solid Gauge)
```jsx
// src/components/charts/CurrentUsageGauge.jsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import './ChartTheme';

highchartsMore(Highcharts);
solidGauge(Highcharts);

export default function CurrentUsageGauge({ value = 0, max = 15 }) {
  const options = {
    chart: {
      type: 'solidgauge',
      height: 280,
      backgroundColor: 'transparent',
    },
    title: null,
    pane: {
      center: ['50%', '70%'],
      size: '120%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#1a1a24',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
        borderWidth: 0,
      },
    },
    yAxis: {
      min: 0,
      max,
      stops: [
        [0.2, '#00FF88'],   // Green
        [0.5, '#00D4FF'],   // Blue
        [0.8, '#FF8C00'],   // Orange
        [1, '#FF3366'],     // Red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 0,
      labels: { enabled: false },
    },
    series: [{
      name: 'Power',
      data: [value],
      dataLabels: {
        format: '<span style="font-size:32px;font-family:JetBrains Mono;color:#fff">{y:.1f}</span><br/>' +
                '<span style="font-size:14px;color:#8892a0">kW</span>',
        borderWidth: 0,
        y: -20,
      },
      tooltip: {
        valueSuffix: ' kW',
      },
    }],
    plotOptions: {
      solidgauge: {
        innerRadius: '60%',
        dataLabels: {
          y: -30,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
  };

  return (
    <div className="bg-dark-secondary border border-dark-border rounded-sm p-4">
      <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Current Usage</h3>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
```

### 2. DailyStreamGraph
**Type:** `streamgraph`
- Smooth organic stacked areas showing 24-hour consumption by device
- X-axis: 00:00 - 23:00
- Each stream = device category

### 3. ConsumptionHeatmap
**Type:** `heatmap`
- X-axis: Hours (0-23)
- Y-axis: Days (Mon-Sun)
- Color scale: dark → electric blue → orange → red

### 4. DeviceBreakdownWheel
**Type:** `dependencywheel`
- Center: Total grid consumption
- Outer arcs: Device categories
- Click to isolate device in other charts

### 5. PeriodCompareChart
**Type:** `column` (grouped)
- Side-by-side comparison of two periods
- Difference labels on top

### 6. UsageBoxplot
**Type:** `boxplot`
- One box per weekday
- Shows variance in daily consumption

### 7. CostAreaChart
**Type:** `areaspline`
- Cumulative cost over billing period
- Budget line overlay
- Projected end-of-month

---

## Data Structures

### Device Types
```javascript
// src/utils/constants.js
export const DEVICE_TYPES = {
  heating: { 
    label: 'Oppvarming', 
    color: '#FF8C00',
    icon: 'Flame',
    avgKw: 2.5,
    peakHours: [6, 7, 8, 17, 18, 19, 20, 21],
  },
  waterHeater: { 
    label: 'Varmtvann', 
    color: '#00D4FF',
    icon: 'Droplets',
    avgKw: 2.0,
    peakHours: [6, 7, 8, 18, 19, 20],
  },
  evCharging: { 
    label: 'Elbil-lading', 
    color: '#00FF88',
    icon: 'Car',
    avgKw: 7.0,
    peakHours: [22, 23, 0, 1, 2, 3, 4, 5],
  },
  appliances: { 
    label: 'Hvitevarer', 
    color: '#9D4EDD',
    icon: 'Refrigerator',
    avgKw: 1.0,
    peakHours: [7, 8, 12, 18, 19, 20],
  },
  lighting: { 
    label: 'Belysning', 
    color: '#FFD700',
    icon: 'Lightbulb',
    avgKw: 0.3,
    peakHours: [6, 7, 17, 18, 19, 20, 21, 22],
  },
  electronics: { 
    label: 'Elektronikk', 
    color: '#FF3366',
    icon: 'Monitor',
    avgKw: 0.5,
    peakHours: [17, 18, 19, 20, 21, 22, 23],
  },
  other: { 
    label: 'Annet', 
    color: '#8892a0',
    icon: 'Plug',
    avgKw: 0.3,
  },
};

export const TARIFFS = {
  fixedGrid: 49,           // NOK/month
  variableGrid: 0.05,      // NOK/kWh
  energyDay: 0.80,         // NOK/kWh 06:00-22:00
  energyNight: 0.50,       // NOK/kWh 22:00-06:00
  energyWeekend: 0.55,     // NOK/kWh
};
```

### Mock Data Generator
```javascript
// src/services/mockData.js
// Generate 30 days of hourly data
// Each record: { timestamp, hour, dayOfWeek, devices: {...}, total, spotPrice, cost, temperature }
```

---

## Page Layouts (Tailwind)

### DashboardPage
```jsx
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current" value="3.2" unit="kW" variant="default" />
        <StatCard label="Today" value="28" unit="kWh" />
        <StatCard label="Cost" value="42" unit="NOK" />
        <StatCard label="vs Last Week" value="-8" unit="%" variant="success" trend={-8} />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CurrentUsageGauge value={3.2} />
        </div>
        <div className="lg:col-span-2">
          <DailyStreamGraph data={hourlyData} />
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeviceBreakdownWheel data={deviceData} />
        <CostAreaChart data={costData} />
      </div>
    </div>
  );
}
```

---

## Implementation Order

### Phase 1: Foundation
1. Vite + React project with Tailwind CSS v4
2. Configure tailwind.config.js with custom colors/fonts
3. globals.css with Tailwind layers and components
4. Layout with Sidebar navigation
5. Router setup with placeholder pages
6. Mock data generator (30 days hourly)
7. Basic formatters

### Phase 2: UI Components
1. Card, Button, StatCard, Badge
2. Header with breadcrumbs
3. Toggle, Select components
4. Alert component

### Phase 3: Core Charts
1. ChartTheme.js (dark Highcharts theme)
2. CurrentUsageGauge (solid gauge)
3. DailyStreamGraph (stream graph)
4. CostAreaChart (area spline)
5. DeviceBreakdownWheel (dependency wheel)

### Phase 4: Dashboard Assembly
1. DashboardPage layout
2. QuickStats row
3. Wire up charts with mock data
4. Basic interactivity

### Phase 5: Advanced Charts
1. ConsumptionHeatmap
2. PeriodCompareChart
3. UsageBoxplot
4. HistoryPage and ComparePage

### Phase 6: Interactivity & Polish
1. Cross-chart filtering
2. Device selection/isolation
3. Period selector
4. Unit toggle (kWh/NOK/CO₂)
5. localStorage persistence
6. Settings page
7. Animations

---

## Files to Generate Initially

1. `package.json` - dependencies (no MUI!)
2. `vite.config.js`
3. `tailwind.config.js` - full config with custom theme
4. `postcss.config.js`
5. `src/main.jsx`
6. `src/App.jsx` - Router setup
7. `src/styles/globals.css` - Tailwind + custom layers
8. `src/components/charts/ChartTheme.js`
9. `src/components/layout/Layout.jsx`
10. `src/components/layout/Sidebar.jsx`
11. `src/components/layout/Header.jsx`
12. `src/components/ui/Card.jsx`
13. `src/components/ui/Button.jsx`
14. `src/components/ui/StatCard.jsx`
15. `src/components/charts/CurrentUsageGauge.jsx`
16. `src/pages/DashboardPage.jsx`
17. `src/services/mockData.js`
18. `src/utils/constants.js`
19. `src/utils/formatters.js`
20. `CLAUDE.md` - project documentation

---

## Dependencies (package.json)

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "highcharts": "^12.0.0",
    "highcharts-react-official": "^3.2.0",
    "@heroicons/react": "^2.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^4.0.0",
    "vite": "^6.0.0"
  }
}
```

---

## Important Notes

### Highcharts Modules Required
```javascript
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import streamgraph from 'highcharts/modules/streamgraph';
import heatmap from 'highcharts/modules/heatmap';
import dependencyWheel from 'highcharts/modules/dependency-wheel';
import sankey from 'highcharts/modules/sankey';

// Initialize
highchartsMore(Highcharts);
solidGauge(Highcharts);
// etc.
```

### Tailwind Tips
- Use `@apply` in globals.css for reusable component classes
- Leverage `group` and `group-hover:` for complex hover states
- Use CSS Grid (`grid grid-cols-*`) for layouts
- Dark mode is always on (`darkMode: 'class'`, html has `dark` class)

### No MUI!
- All styling via Tailwind utility classes
- Create small, reusable components for common patterns
- Use Heroicons for iconography

---

## Start Now

Begin with Phase 1 (foundation), create the Tailwind setup and sidebar navigation, then build the first chart. Create CLAUDE.md as you go.

Let's build GRIDWATCH! ⚡
