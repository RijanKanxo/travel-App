import { useState, useEffect, useRef } from 'react';
import { MainNavigation } from './components/MainNavigation';
import { HomePage } from './components/HomePage';
import { TravelJournal } from './components/TravelJournal';
import { LocalMarketplace } from './components/LocalMarketplace';
import { OfflineGuideBuilder } from './components/OfflineGuideBuilder';

// User interfaces to match AuthSystem
interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: 'Traveler' | 'Local Guide' | 'Business Owner';
  location?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  verified: boolean;
  created_at: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const popularSectionRef = useRef<HTMLDivElement>(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
    
    // Simulate loading time for better UX
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(loadingTimer);
  }, []);

  // Monitor scroll for search bar animation and auto-scroll to popular destinations
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let hasAutoScrolled = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Update navbar background
      setIsScrolled(scrollY > 200);

      // Auto-scroll to popular destinations when user starts scrolling
      // BUT ONLY if search bar is NOT expanded (for better UX)
      if (scrollY > 30 && scrollY < 250 && !hasAutoScrolled && activeTab === 'home' && !isSearchExpanded) {
        hasAutoScrolled = true;
        
        // Clear any existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // Smooth scroll to popular destinations section
        scrollTimeout = setTimeout(() => {
          const popularSection = document.getElementById('popular-destinations-section');
          if (popularSection) {
            popularSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 150); // Slightly longer delay for more natural feel
      }

      // Reset auto-scroll flag when user scrolls back to top
      if (scrollY < 30) {
        hasAutoScrolled = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [activeTab, isSearchExpanded]); // Added isSearchExpanded dependency

  const handleLogin = () => {
    // Temporarily disabled - will add authentication back
    console.log('Login functionality temporarily disabled');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('home'); // Redirect to home after logout
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to discover section instead of changing tabs
    const discoverSection = document.getElementById('discover-section');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
      case 'discover':
        return (
          <HomePage 
            popularSectionRef={popularSectionRef}
            onSearch={handleSearch} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isVisible={!isLoading}
            onSearchExpandedChange={setIsSearchExpanded}
          />
        );
      case 'journal':
        return <TravelJournal />;
      case 'marketplace':
        return <LocalMarketplace />;
      case 'offline':
        return <OfflineGuideBuilder />;
      default:
        return (
          <HomePage 
            popularSectionRef={popularSectionRef}
            onSearch={handleSearch} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isVisible={!isLoading}
            onSearchExpandedChange={setIsSearchExpanded}
          />
        );
    }
  };

  // Convert user to profile format for navigation
  const userProfile = currentUser ? {
    user_id: currentUser.id,
    name: currentUser.full_name,
    email: currentUser.email,
    user_type: currentUser.user_type.toLowerCase().replace(' ', '_'),
    location: currentUser.location || '',
    verified: currentUser.verified,
    bio: currentUser.bio || '',
    languages: ['English'],
    experience_years: 0,
    specialties: [],
    safety_rating: 4.5,
    rating: 4.8,
    review_count: 0
  } : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-orange-50 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🙏</div>
              <div className="animate-pulse text-4xl font-bold text-gray-800 mb-2">नमस्ते</div>
              <div className="text-2xl font-semibold text-gray-700 mb-4">Namaste</div>
            </div>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Wanderly Nepal</h2>
            <p className="text-gray-600">Preparing your journey through the Himalayas...</p>
          </div>
        </div>
      )}

      {/* Main navigation */}
      {!isLoading && (
        <MainNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          profile={userProfile}
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isScrolled={isScrolled}
          onSearchExpandedChange={setIsSearchExpanded}
        />
      )}

      {/* Page content with smooth transitions */}
      {!isLoading && (
        <main className="min-h-screen transition-all duration-300 ease-in-out">
          {renderCurrentPage()}
        </main>
      )}
    </div>
  );
}

export default App;
