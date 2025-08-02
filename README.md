# 🏔️ Wanderly Nepal - Travel Platform

A modern, comprehensive travel platform connecting travelers with authentic local experiences in Nepal. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### 🏠 **Home Page**
- **Destination Discovery**: Browse popular destinations in Nepal with stunning visuals
- **Smart Search**: Advanced search functionality for places, hotels, restaurants, and activities  
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Professional UI**: Clean, neutral color scheme for optimal readability

### 📖 **Travel Journal**
- **Digital Diary**: Create and manage travel entries with photos and memories
- **Mood Tracking**: Track your travel experiences with customizable mood indicators
- **Memory Organization**: Tag and categorize your travel moments
- **Social Sharing**: Share experiences with the travel community

### 🛍️ **Local Marketplace**
- **Local Services**: Connect with verified local guides and service providers
- **Authentic Experiences**: Book unique, culturally immersive activities
- **Secure Transactions**: Safe and reliable booking system
- **Community Reviews**: Read and write reviews from fellow travelers

### 📱 **Offline Guide Builder**
- **Download for Offline**: Prepare travel guides for areas with limited connectivity
- **Smart Caching**: Intelligent content caching for optimal storage usage
- **Custom Itineraries**: Build personalized offline travel guides
- **Emergency Information**: Access critical information without internet

### 🔐 **Authentication System**
- **Secure Login/Registration**: Multi-role authentication (Traveler, Local Guide, Business Owner)
- **Profile Management**: Comprehensive user profiles with preferences
- **Role-Based Access**: Different features based on user type
- **Social Integration**: Connect with other travelers and locals

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RijanKanxo/travel-App.git
   cd travel-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables in `.env.local`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_APP_NAME=Wanderly Nepal
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build locally

# Code Quality
npm run type-check      # Run TypeScript type checking
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues automatically

# Utilities
npm run clean          # Clean build directory
```

### Project Structure

```
├── 📁 components/          # React components
│   ├── 🏠 HomePage.tsx           # Main landing page
│   ├── 🧭 MainNavigation.tsx     # Navigation header
│   ├── 📖 TravelJournal.tsx      # Journal functionality
│   ├── 🛍️ LocalMarketplace.tsx   # Marketplace features
│   ├── 📱 OfflineGuideBuilder.tsx # Offline guide tools
│   ├── 🔐 AuthModal.tsx          # Authentication modal
│   ├── 🔧 AuthSystem.tsx         # Auth logic
│   ├── 🌙 DarkModeToggle.tsx     # Theme switching
│   ├── 🔍 DiscoveryPage.tsx      # Discovery features
│   ├── ❓ HelpSystem.tsx         # Help & support
│   └── 📁 ui/                    # Reusable UI components
├── 📁 styles/             # CSS and styling
│   └── globals.css            # Global styles & CSS variables
├── 📁 utils/              # Utility functions
│   └── 📁 supabase/           # Database utilities
├── 📁 public/             # Static assets
├── 📄 package.json        # Dependencies and scripts
├── 📄 tailwind.config.js  # Tailwind CSS configuration
├── 📄 tsconfig.json       # TypeScript configuration
└── 📄 vite.config.ts      # Vite build configuration
```

### Key Technologies

- **⚛️ React 18** - Modern React with hooks and concurrent features
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🏗️ Vite** - Fast build tool and development server
- **🎯 Radix UI** - Accessible component primitives
- **🎭 Lucide React** - Beautiful icon library
- **🗄️ Supabase** - Backend-as-a-Service (database, auth, storage)

## 🎨 Design System

### Color Palette
Our application uses a professional neutral color scheme for optimal accessibility:

```css
/* Primary Grays */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-800: #374151
--gray-900: #111827

/* Accent Colors */
--blue-600: #2563eb
--emerald-600: #059669
```

### Component Guidelines
- **Consistent Spacing**: Use Tailwind's spacing scale (4, 6, 8, 12, 16, 24px)
- **Typography**: Clear hierarchy with appropriate font weights
- **Interactive Elements**: Hover states and focus indicators for accessibility
- **Responsive Design**: Mobile-first with breakpoint considerations

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Deployment Platforms
- **Vercel** (Recommended): Zero-config deployment
- **Netlify**: Easy static site hosting
- **Railway**: Full-stack hosting with database

### Environment Setup
Ensure all environment variables are configured in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_NAME`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run type-check && npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write self-documenting code with comments where needed
- Ensure responsive design for all new features
- Test on multiple devices and browsers

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Run type checking
npm run type-check
```

**Styling Issues**
```bash
# Rebuild Tailwind CSS
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rijan Kanxo**
- GitHub: [@RijanKanxo](https://github.com/RijanKanxo)
- Project: [Wanderly Nepal](https://github.com/RijanKanxo/travel-App)

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons
- **Supabase** for backend infrastructure
- **Vercel** for deployment platform

---

**🏔️ Experience Nepal like never before with Wanderly Nepal!** 🇳🇵
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
