/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#12100E',        // Espresso Black / Deep Velvet
          darker: '#0A0908',      // Pitch Charcoal
          surface: '#1A1715',     // Charred Hearth Wood
          surfaceElevated: '#24201D', // Elevated Dark Tile
          border: 'rgba(214, 206, 190, 0.12)',
          borderStrong: 'rgba(214, 206, 190, 0.25)',
          
          cream: '#FBF8F3',       // Silk Cream (Primary Light)
          creamMuted: '#F4EFEA',  // Warm Stone Light
          creamDark: '#E8DFD3',   // Oatmeal Sand
          
          terracotta: '#C85A32',  // Ember Terracotta Accent
          terracottaHover: '#D46238',
          terracottaDark: '#9F401E',
          
          gold: '#C5A059',        // Burnished Brass / Trophies
          goldMuted: '#9B7B3B',
          
          olive: '#53624D',       // Basil / Botanical Sage
          oliveLight: '#7A8C74',
          
          muted: '#8C827A',
          subtle: '#B5ABA2',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.25em',
        widest: '0.15em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'luxury-gold': '0 10px 30px -10px rgba(197, 160, 89, 0.25)',
        'luxury-ember': '0 10px 30px -10px rgba(200, 90, 50, 0.35)',
        'glow-subtle': '0 0 25px rgba(200, 90, 50, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise-pattern': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.03\"/%3E%3C/svg%3E')",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
