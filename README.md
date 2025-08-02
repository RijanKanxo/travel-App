# 🇳🇵 Wanderly - Nepal Travel Platform

A modern, responsive travel platform built with React and TypeScript, designed to connect travelers with authentic local experiences in Nepal.

![Wanderly Preview](https://via.placeholder.com/800x400/A7C957/ffffff?text=Wanderly+Nepal+Travel+Platform)

## ✨ Features

- 🗺️ **Discovery Platform** - Find authentic local experiences and verified hosts
- 📖 **Travel Journal** - Community-driven travel stories and safety guides
- 🛒 **Local Marketplace** - Connect with verified local service providers
- 📱 **Offline Capabilities** - Download guides for offline access
- 🆘 **Safety Features** - Real-time alerts and Q&A with locals
- 🌙 **Dark Mode** - Full dark/light theme support
- 📱 **Mobile-First Design** - Responsive across all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Backend**: Supabase (Database, Auth, Serverless Functions)
- **Icons**: Lucide React
- **State Management**: React Hooks

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

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
