# TSmart Modern Dashboard UI Standards - Claude Developer Prompt

## Overview
Create a clean, modern, fresh dashboard interface following TSmart Quality standards with a professional sidebar navigation, application shell, and consistent design system.

## Design Philosophy
- **Minimalist & Clean**: Embrace white space, reduce visual clutter
- **Modern & Fresh**: Contemporary design patterns with subtle animations
- **Professional Quality**: Enterprise-grade aesthetics suitable for business applications
- **User-Centric**: Intuitive navigation and clear information hierarchy
- **Responsive First**: Mobile-first approach with desktop enhancement

## Color Palette - TSmart Modern

### Primary Colors
```css
--primary-50: #f0f9ff;     /* Light blue tint */
--primary-100: #e0f2fe;    /* Lighter blue */
--primary-200: #bae6fd;    /* Light blue */
--primary-300: #7dd3fc;    /* Medium light blue */
--primary-400: #38bdf8;    /* Medium blue */
--primary-500: #0ea5e9;    /* Primary blue */
--primary-600: #0284c7;    /* Dark blue */
--primary-700: #0369a1;    /* Darker blue */
--primary-800: #075985;    /* Very dark blue */
--primary-900: #0c4a6e;    /* Deepest blue */
```

### Neutral Colors (Base)
```css
--neutral-0: #ffffff;      /* Pure white */
--neutral-50: #fafafa;     /* Off white */
--neutral-100: #f5f5f5;    /* Light gray */
--neutral-200: #e5e5e5;    /* Lighter gray */
--neutral-300: #d4d4d4;    /* Light medium gray */
--neutral-400: #a3a3a3;    /* Medium gray */
--neutral-500: #737373;    /* Dark gray */
--neutral-600: #525252;    /* Darker gray */
--neutral-700: #404040;    /* Very dark gray */
--neutral-800: #262626;    /* Almost black */
--neutral-900: #171717;    /* Near black */
```

### Semantic Colors
```css
--success-50: #f0fdf4;     /* Light green tint */
--success-500: #22c55e;    /* Success green */
--success-600: #16a34a;    /* Dark success */

--warning-50: #fffbeb;     /* Light amber tint */
--warning-500: #f59e0b;    /* Warning amber */
--warning-600: #d97706;    /* Dark warning */

--error-50: #fef2f2;       /* Light red tint */
--error-500: #ef4444;      /* Error red */
--error-600: #dc2626;      /* Dark error */

--info-50: #f0f9ff;        /* Light blue tint */
--info-500: #3b82f6;       /* Info blue */
--info-600: #2563eb;       /* Dark info */
```

## Typography System

### Font Stack
```css
/* Primary Font - Interface */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Secondary Font - Display */  
--font-display: 'Clash Display', 'Inter', system-ui, sans-serif;

/* Monospace Font - Code */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

### Type Scale
```css
--text-xs: 0.75rem;        /* 12px - Small labels, captions */
--text-sm: 0.875rem;       /* 14px - Body small, secondary text */
--text-base: 1rem;         /* 16px - Body text, default */
--text-lg: 1.125rem;       /* 18px - Body large, emphasis */
--text-xl: 1.25rem;        /* 20px - Small headings */
--text-2xl: 1.5rem;        /* 24px - Medium headings */
--text-3xl: 1.875rem;      /* 30px - Large headings */
--text-4xl: 2.25rem;       /* 36px - Extra large headings */
--text-5xl: 3rem;          /* 48px - Display headings */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;     /* For headings */
--leading-normal: 1.5;     /* For body text */
--leading-relaxed: 1.625;  /* For reading text */
```

## Spacing System - 8px Base Grid

### Core Spacing Values
```css
--space-0: 0;              /* 0px */
--space-1: 0.25rem;        /* 4px */
--space-2: 0.5rem;         /* 8px */
--space-3: 0.75rem;        /* 12px */
--space-4: 1rem;           /* 16px */
--space-5: 1.25rem;        /* 20px */
--space-6: 1.5rem;         /* 24px */
--space-8: 2rem;           /* 32px */
--space-10: 2.5rem;        /* 40px */
--space-12: 3rem;          /* 48px */
--space-16: 4rem;          /* 64px */
--space-20: 5rem;          /* 80px */
--space-24: 6rem;          /* 96px */
```

### Component Spacing
```css
--space-component-xs: var(--space-2);  /* 8px - Tight spacing */
--space-component-sm: var(--space-4);  /* 16px - Small spacing */
--space-component-md: var(--space-6);  /* 24px - Medium spacing */
--space-component-lg: var(--space-8);  /* 32px - Large spacing */
--space-component-xl: var(--space-12); /* 48px - Extra large spacing */
```

## Border Radius System

### Radius Values
```css
--radius-none: 0;
--radius-sm: 0.25rem;      /* 4px - Small elements */
--radius-md: 0.375rem;     /* 6px - Default buttons, inputs */
--radius-lg: 0.5rem;       /* 8px - Cards, containers */
--radius-xl: 0.75rem;      /* 12px - Large cards */
--radius-2xl: 1rem;        /* 16px - Modal, overlays */
--radius-3xl: 1.5rem;      /* 24px - Large containers */
--radius-full: 9999px;     /* Full rounded - Pills, avatars */
```

## Shadow System

### Elevation Shadows
```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Inner shadows */
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

## Sidebar Navigation Specifications

### Sidebar Dimensions
```css
--sidebar-width-collapsed: 64px;    /* 4rem - Icon only */
--sidebar-width-expanded: 256px;    /* 16rem - Full width */
--sidebar-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Sidebar Structure
```html
<aside class="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-logo">
      <!-- Logo/Brand -->
    </div>
    <button class="sidebar-toggle">
      <!-- Toggle button -->
    </button>
  </div>
  
  <nav class="sidebar-nav">
    <div class="nav-section">
      <h3 class="nav-section-title">Main</h3>
      <ul class="nav-list">
        <li class="nav-item">
          <a class="nav-link active">
            <span class="nav-icon">🏠</span>
            <span class="nav-label">Dashboard</span>
          </a>
        </li>
        <!-- More nav items -->
      </ul>
    </div>
  </nav>
  
  <div class="sidebar-footer">
    <!-- User menu, settings, etc. -->
  </div>
</aside>
```

### Sidebar Styling
```css
.sidebar {
  @apply fixed left-0 top-0 h-full z-40;
  @apply bg-white border-r border-neutral-200;
  @apply flex flex-col;
  @apply transition-all duration-300 ease-in-out;
  width: var(--sidebar-width-expanded);
  box-shadow: var(--shadow-lg);
}

.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}

.sidebar-header {
  @apply flex items-center justify-between;
  @apply px-6 py-4 border-b border-neutral-200;
  min-height: 72px;
}

.sidebar-logo {
  @apply flex items-center space-x-3;
  @apply font-display font-bold text-xl text-neutral-900;
}

.nav-section {
  @apply mb-8;
}

.nav-section-title {
  @apply px-6 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide;
}

.nav-item {
  @apply mb-1;
}

.nav-link {
  @apply flex items-center px-6 py-3;
  @apply text-neutral-700 hover:bg-neutral-50 hover:text-primary-600;
  @apply transition-colors duration-200;
  @apply relative;
}

.nav-link.active {
  @apply bg-primary-50 text-primary-600 border-r-2 border-primary-600;
}

.nav-icon {
  @apply w-5 h-5 mr-3 flex-shrink-0;
}

.nav-label {
  @apply font-medium;
  @apply transition-opacity duration-300;
}

.sidebar.collapsed .nav-label,
.sidebar.collapsed .nav-section-title {
  @apply opacity-0;
}
```

## Application Shell Layout

### Shell Structure
```html
<div class="app-shell">
  <!-- Sidebar -->
  <aside class="sidebar">...</aside>
  
  <!-- Main Content Area -->
  <div class="main-content">
    <!-- Top Navigation Bar -->
    <header class="top-nav">
      <div class="nav-left">
        <button class="sidebar-toggle">☰</button>
        <h1 class="page-title">Dashboard</h1>
      </div>
      <div class="nav-right">
        <div class="nav-actions">
          <!-- Search, notifications, user menu -->
        </div>
      </div>
    </header>
    
    <!-- Page Content -->
    <main class="page-content">
      <div class="content-container">
        <!-- Your page content -->
      </div>
    </main>
  </div>
</div>
```

### Shell Styling
```css
.app-shell {
  @apply min-h-screen bg-neutral-50;
  @apply flex;
}

.main-content {
  @apply flex-1 flex flex-col;
  @apply transition-all duration-300;
  margin-left: var(--sidebar-width-expanded);
}

.main-content.sidebar-collapsed {
  margin-left: var(--sidebar-width-collapsed);
}

.top-nav {
  @apply sticky top-0 z-30;
  @apply bg-white border-b border-neutral-200;
  @apply flex items-center justify-between;
  @apply px-6 py-4;
  height: 72px;
  backdrop-filter: blur(8px);
}

.page-title {
  @apply text-2xl font-semibold text-neutral-900;
}

.page-content {
  @apply flex-1 overflow-auto;
  @apply p-6;
}

.content-container {
  @apply max-w-7xl mx-auto;
  @apply space-y-6;
}
```

## Component Standards

### Cards
```css
.card {
  @apply bg-white rounded-lg border border-neutral-200;
  @apply shadow-sm hover:shadow-md;
  @apply transition-shadow duration-200;
}

.card-header {
  @apply px-6 py-4 border-b border-neutral-200;
}

.card-title {
  @apply text-lg font-semibold text-neutral-900;
}

.card-content {
  @apply p-6;
}
```

### Buttons
```css
.btn {
  @apply inline-flex items-center justify-center;
  @apply px-4 py-2 text-sm font-medium;
  @apply rounded-md transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-primary-600 text-white;
  @apply hover:bg-primary-700;
  @apply focus:ring-primary-500;
}

.btn-secondary {
  @apply bg-neutral-100 text-neutral-900;
  @apply hover:bg-neutral-200;
  @apply focus:ring-neutral-500;
}
```

### Form Elements
```css
.form-input {
  @apply w-full px-3 py-2;
  @apply text-neutral-900 bg-white;
  @apply border border-neutral-300 rounded-md;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
  @apply transition-colors duration-200;
}

.form-label {
  @apply block text-sm font-medium text-neutral-700 mb-2;
}
```

## Animation & Transitions

### Standard Transitions
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Easing functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Micro-interactions
```css
/* Hover states */
.interactive:hover {
  transform: translateY(-1px);
  transition: transform var(--transition-fast);
}

/* Focus states */
.focusable:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Loading states */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## Responsive Breakpoints

```css
/* Mobile first approach */
--screen-sm: 640px;   /* Small tablets */
--screen-md: 768px;   /* Large tablets */
--screen-lg: 1024px;  /* Laptops */
--screen-xl: 1280px;  /* Desktops */
--screen-2xl: 1536px; /* Large desktops */
```

### Responsive Sidebar Behavior
```css
/* Mobile: Overlay sidebar */
@media (max-width: 768px) {
  .sidebar {
    @apply transform -translate-x-full;
    @apply lg:translate-x-0;
  }
  
  .sidebar.open {
    @apply translate-x-0;
  }
  
  .main-content {
    @apply ml-0;
  }
}

/* Tablet and up: Fixed sidebar */
@media (min-width: 769px) {
  .sidebar {
    @apply translate-x-0;
  }
}
```

## Implementation Guidelines

### 1. Start with the Shell
Begin by implementing the basic application shell with sidebar and main content area.

### 2. Implement Responsive Behavior
Ensure the sidebar works properly on mobile (overlay) and desktop (fixed).

### 3. Add Semantic Navigation
Structure navigation with clear sections and proper accessibility.

### 4. Apply Consistent Spacing
Use the 8px grid system consistently throughout the interface.

### 5. Implement Dark Mode Support
Prepare CSS custom properties for dark mode variants.

### 6. Add Subtle Animations
Include micro-interactions for better user experience.

### Code Generation Instructions

When generating code for TSmart dashboard components:

1. **Always use Tailwind CSS** with the custom properties defined above
2. **Include proper TypeScript types** for all components
3. **Implement accessibility features** (ARIA labels, keyboard navigation)
4. **Add responsive breakpoints** for mobile/tablet/desktop
5. **Include hover/focus states** for interactive elements
6. **Use semantic HTML** structure
7. **Add loading states** for data-driven components
8. **Include error boundaries** for React components
9. **Implement proper state management** for sidebar toggle
10. **Add smooth transitions** between states

This design system creates a professional, modern dashboard interface that feels fresh and clean while maintaining excellent usability and accessibility standards.