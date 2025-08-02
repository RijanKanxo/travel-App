# �️ Wanderly - Nepal Travel Platform UI

A culturally authentic, accessible, and beautifully designed travel platform showcasing the beauty and heritage of Nepal. Built with modern web technologies and following WCAG accessibility guidelines.

## ✨ Features

### 🎨 **Cultural Design**
- **Nepal-inspired color palette**: Crimson (#DC143C), Blue (#003893), and Temple Gold (#C59F00)
- **Postcard-style cards**: Museum exhibition-inspired design for travel experiences
- **Cultural authenticity**: Himalayan gradients, prayer flag colors, and traditional elements

### ♿ **Accessibility First**
- **WCAG AA/AAA compliant**: High contrast ratios and accessible color combinations
- **Keyboard navigation**: Full support for keyboard-only users
- **Screen reader friendly**: Proper ARIA labels and semantic markup
- **Focus management**: Clear focus indicators and logical tab order
- **Responsive typography**: Fluid font sizes using clamp() functions

### 🌄 **Travel Experiences**
- **Everest Base Camp Trek**: 14-day adventure to the world's highest peak
- **Kathmandu Cultural Tour**: 3-day heritage exploration of ancient temples
- **Annapurna Circuit**: 21-day trek through diverse landscapes
- **Chitwan Safari**: 2-day wildlife experience in the jungle
- **Pokhara Lakes**: 4-day peaceful retreat by pristine waters
- **Lumbini Pilgrimage**: 2-day spiritual journey to Buddha's birthplace

## � Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Accessibility**: WCAG 2.1 AA/AAA compliant
- **Typography**: Inter + Noto Sans Devanagari fonts
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nepal-travel-platform-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Design System

### Color Palette

#### Primary Colors
- **Nepal Crimson**: `#DC143C` - Primary actions, highlights
- **Nepal Blue**: `#003893` - Secondary actions, trust elements
- **Temple Gold**: `#C59F00` - Accent color, success states

#### Cultural Colors
- **Himalayan Snow**: `#F8F9FA` - Clean backgrounds
- **Mountain Mist**: `#E8F4FD` - Subtle backgrounds
- **Alpine Blue**: `#4A90E2` - Information elements
- **Prayer Flag Colors**: Red, Yellow, Green, Blue variants

### Typography
- **Primary Font**: Inter (Modern, readable)
- **Nepal Font**: Noto Sans Devanagari (Cultural authenticity)
- **Responsive Scaling**: clamp() functions for optimal readability

### Accessibility Features

#### Color Contrast
- **Text on backgrounds**: Minimum 4.5:1 ratio (WCAG AA)
- **Large text**: Minimum 3:1 ratio (WCAG AA)
- **Interactive elements**: Enhanced contrast for better usability

#### Keyboard Navigation
- **Tab order**: Logical flow through interactive elements
- **Focus indicators**: Clear visual feedback with golden outline
- **Skip links**: Quick navigation for screen readers

#### Screen Readers
- **ARIA labels**: Descriptive labels for all interactive elements
- **Semantic markup**: Proper HTML structure (main, section, article)
- **Image alt text**: Descriptive alternative text for all images

## 🌍 Cultural Elements

### Authentic Imagery
- **Himalayan landscapes**: Everest, Annapurna, sacred peaks
- **Cultural heritage**: Temples, stupas, traditional architecture
- **Local life**: Markets, festivals, traditional practices

### Educational Content
- **Cultural insights**: History, traditions, and local customs
- **Practical information**: Best times to visit, cultural etiquette
- **Sustainable travel**: Responsible tourism practices

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large screens**: 1400px+

### Mobile-First Approach
- Progressive enhancement from mobile to desktop
- Touch-friendly interactions (minimum 44px touch targets)
- Optimized images and loading for mobile networks

## 🧪 Testing

### Accessibility Testing
- **Automated**: axe-core integration
- **Manual**: Keyboard navigation testing
- **Screen readers**: NVDA, JAWS, VoiceOver compatibility

### Browser Support
- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+

## 🎨 Customization

### Tailwind Configuration
The `tailwind.config.js` includes:
- Nepal-inspired color palette
- Custom utilities for accessibility
- Responsive typography scales
- Cultural design tokens

### Theme Customization
- CSS custom properties for color system
- Dark/light mode support
- Cultural color variants

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow accessibility guidelines
4. Test with screen readers
5. Submit a pull request

## 🙏 Acknowledgments

- **Nepal Tourism Board** - Cultural guidance and inspiration
- **shadcn/ui** - Beautiful and accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library
- **WCAG Guidelines** - Web accessibility standards

---

**Made with ❤️ for Nepal** 🇳🇵

*Celebrating the beauty, culture, and accessibility of Nepal's travel experiences*
   
   Update `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build & Deploy

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Production Deployment

#### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main

#### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

## 🎨 Design System

The project uses a custom green color palette optimized for Nepal's natural beauty:

- **Primary Green**: `#A7C957` (Gentle Fern)
- **Secondary**: `#BCE29E` (Soft Sage)
- **Accent**: `#BFD8AF` (Light Moss)
- **Dark Theme**: Deep forest greens with high contrast

## 📁 Project Structure

```
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── figma/           # Figma-specific components
│   ├── AuthModal.tsx    # Authentication modal
│   ├── DarkModeToggle.tsx
│   └── ...
├── styles/              # Global styles
├── utils/               # Utility functions
│   └── supabase/        # Supabase configuration
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

## 🌍 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design components from [shadcn/ui](https://ui.shadcn.com/)
- Photos from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)

## 📞 Support

- 📧 Email: support@wanderly.np
- 🐛 Issues: [GitHub Issues](https://github.com/RijanKanxo/travel-App/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/RijanKanxo/travel-App/discussions)

---

**Built with ❤️ for Nepal's travel community**
