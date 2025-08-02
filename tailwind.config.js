/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './App.tsx',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // New Design System Colors
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        input: 'var(--input)',
        
        // Nepal cultural colors
        'nepal-crimson': 'var(--nepal-crimson)',
        'nepal-blue': 'var(--nepal-blue)',
        'temple-gold': 'var(--temple-gold)',
        'himalayan-snow': 'var(--himalayan-snow)',
        'mountain-mist': 'var(--mountain-mist)',
        
        // Legacy shadcn colors for compatibility
        foreground: 'var(--text)',
        card: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--text)',
        },
        popover: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--text)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84% 60%)',
          foreground: 'hsl(0 0% 100%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'Noto Sans Devanagari', 'sans-serif'],
        nepal: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Responsive font sizes with clamp
        'responsive-xs': 'clamp(0.75rem, 1.5vw, 0.875rem)',
        'responsive-sm': 'clamp(0.875rem, 2vw, 1rem)',
        'responsive-base': 'clamp(1rem, 2vw, 1.125rem)',
        'responsive-lg': 'clamp(1.125rem, 2.5vw, 1.375rem)',
        'responsive-xl': 'clamp(1.25rem, 3vw, 1.75rem)',
        'responsive-2xl': 'clamp(1.5rem, 4vw, 2.25rem)',
        'responsive-3xl': 'clamp(2rem, 5vw, 3rem)',
        'headline': 'clamp(2.5rem, 6vw, 3.5rem)',
        'subtitle': 'clamp(1.75rem, 4vw, 2.25rem)',
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'card': '0 8px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'focus': '0 0 0 4px var(--accent)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "gentle-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "gentle-bounce": "gentle-bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    // Custom plugin for Nepal travel platform accessibility utilities
    function({ addUtilities, addComponents }) {
      // Utility classes
      addUtilities({
        '.focus-ring': {
          '&:focus-visible': {
            outline: '2px solid var(--accent)',
            'outline-offset': '2px',
          },
        },
        '.interactive-card': {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.02)',
            'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'translateY(-2px) scale(1.01)',
          },
        },
        '.himalayan-gradient': {
          'background': 'linear-gradient(135deg, #E1F5FE 0%, #B8E6FF 50%, #4A90E2 100%)',
        },
        '.prayer-flag-gradient': {
          'background': 'linear-gradient(90deg, #FF6B6B 0%, #FFE66D 25%, #4ECDC4 50%, #45B7D1 75%, #FF6B6B 100%)',
        },
        '.sunset-himalaya': {
          'background': 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)',
        },
      });
      
      // Component classes
      addComponents({
        '.btn': {
          display: 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '0.75rem 1.5rem',
          'border-radius': 'var(--radius)',
          'font-weight': '600',
          'font-size': '1rem',
          'line-height': '1',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: 'none',
          'min-height': '44px',
          gap: '0.5rem',
        },
        '.btn-primary': {
          'background-color': 'var(--primary)',
          color: 'white',
          '&:hover': {
            'background-color': '#b01030',
            transform: 'translateY(-1px)',
          },
          '&:focus-visible': {
            outline: '2px solid var(--accent)',
            'outline-offset': '2px',
          },
        },
        '.btn-secondary': {
          'background-color': 'var(--secondary)',
          color: 'white',
          '&:hover': {
            'background-color': '#003d99',
            transform: 'translateY(-1px)',
          },
        },
        '.btn-outline': {
          'background-color': 'transparent',
          border: '2px solid var(--border)',
          color: 'var(--text)',
          '&:hover': {
            'background-color': 'var(--muted)',
            'border-color': 'var(--primary)',
          },
        },
        '.card': {
          'background-color': 'var(--surface)',
          'border-radius': 'var(--radius-lg)',
          'box-shadow': 'var(--shadow-lg)',
          padding: 'var(--space-lg)',
          border: '1px solid var(--border)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            'box-shadow': 'var(--shadow-xl)',
          },
        },
      });
    },
  ],
}
