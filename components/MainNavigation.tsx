import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { 
  MapPin, 
  BookOpen, 
  ShoppingBag, 
  Download, 
  Search,
  LogOut,
  ArrowUp,
  Mountain,
  Hotel,
  Camera,
  Utensils,
  Car,
  X,
  Clock
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    user_type: string;
    location: string;
    verified: boolean;
  };
}

interface UserProfile {
  user_id: string;
  name: string;
  email: string;
  user_type: string;
  location: string;
  verified: boolean;
  bio: string;
  languages: string[];
  experience_years: number;
  specialties: string[];
  safety_rating: number;
  rating: number;
  review_count: number;
}

interface MainNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user?: User;
  profile?: UserProfile;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isScrolled: boolean;
  onSearchExpandedChange?: (expanded: boolean) => void;
}

export function MainNavigation({ 
  activeTab, 
  onTabChange, 
  profile, 
  isAuthenticated,
  onLogin,
  onLogout,
  searchQuery,
  onSearchChange,
  isScrolled,
  onSearchExpandedChange
}: MainNavigationProps) {
  
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const tabs = [
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'offline', label: 'Offline', icon: Download },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'places', label: 'Places', icon: Mountain },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'activities', label: 'Activities', icon: Camera },
    { id: 'transport', label: 'Transport', icon: Car },
  ];

  const recentSearches = [
    'Everest Base Camp',
    'Pokhara Hotels',
    'Kathmandu Restaurants',
    'Annapurna Trek'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDiscover = () => {
    // If not on home page, navigate to home first
    if (activeTab !== 'home') {
      onTabChange('home');
      // Use setTimeout to wait for the home page to render, then scroll
      setTimeout(() => {
        const discoverSection = document.getElementById('popular-destinations-section');
        if (discoverSection) {
          discoverSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const discoverSection = document.getElementById('popular-destinations-section');
      if (discoverSection) {
        discoverSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
    onSearchExpandedChange?.(true);
  };

  const handleSearchCollapse = () => {
    setIsSearchExpanded(false);
    onSearchExpandedChange?.(false);
  };

  return (
    <>
      <style>{`
        .filter-green {
          filter: brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(1583%) hue-rotate(95deg) brightness(96%) contrast(106%);
        }
        .filter-green-hover:hover {
          filter: brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(1583%) hue-rotate(95deg) brightness(96%) contrast(106%);
        }
        .rotate-mountain {
          transform: rotate(-45deg);
        }
        .liquid-glass {
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(20px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
        .liquid-glass > * {
          position: relative;
          z-index: 2;
        }
      `}</style>
      {/* Unified Navigation Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out transform ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 translate-y-0' 
          : 'bg-transparent translate-y-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => onTabChange('home')}
              className="cursor-pointer p-2 transition-all duration-500 ease-out hover:scale-110"
            >
              <img 
                src="/compass.svg" 
                alt="Wanderly" 
                className={`w-8 h-8 transition-all duration-500 ease-out rotate-mountain ${
                  activeTab === 'home' ? 'filter-green scale-110' : 'filter-green-hover'
                }`}
              />
            </div>

            {/* Center Search Bar - Flows up from hero when scrolled */}
            <div className={`flex-1 max-w-2xl mx-8 relative transition-all duration-1000 ease-out ${
              isScrolled 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-12 scale-90 pointer-events-none'
            }`}>
              <div className={`transition-all duration-500 ease-out ${
                isSearchExpanded ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg hover:shadow-xl'
              }`}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 transition-colors duration-300" />
                  <Input
                    placeholder="Search destinations, places, activities..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={handleSearchExpand}
                    className="pl-12 pr-4 py-3 transition-all duration-500 ease-out rounded-full text-lg border border-gray-200 bg-white focus:ring-4 focus:ring-green-500/30 focus:border-green-400 hover:border-gray-300"
                  />
                  {isSearchExpanded && (
                    <Button
                      onClick={handleSearchCollapse}
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Expanded Search Panel */}
                <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-500 ease-out transform origin-top ${
                  isSearchExpanded ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-0 opacity-0 -translate-y-4 pointer-events-none'
                }`}>
                  <div className="p-6">
                    {/* Category Filters */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => {
                          const IconComponent = category.icon;
                          return (
                            <Button
                              key={category.id}
                              variant="outline"
                              size="sm"
                              className="rounded-full px-4 py-2 text-sm border-gray-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800"
                            >
                              <IconComponent className="w-4 h-4 mr-2" />
                              {category.label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recent Searches */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h4>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-start px-3 py-2 text-left hover:bg-gray-50 rounded-lg"
                            onClick={() => onSearchChange(search)}
                          >
                            <Clock className="w-4 h-4 mr-3 text-gray-400" />
                            <span className="text-gray-700">{search}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    className={`transition-all duration-500 ease-out px-4 py-2 rounded-xl hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-lg' 
                        : 'text-white hover:text-gray-200 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    Contact
                  </Button>
                  <Button
                    onClick={onLogin}
                    variant="ghost"
                    className={`transition-all duration-500 ease-out px-4 py-2 rounded-xl hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-lg' 
                        : 'text-white hover:text-gray-200 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    className={`px-4 py-2 rounded-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl ${
                      isScrolled 
                        ? 'bg-gray-800 border-gray-800 text-white hover:bg-gray-900 hover:border-gray-900' 
                        : 'bg-white/10 border-white/30 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm hover:border-white'
                    }`}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    className={`transition-all duration-500 ease-out px-4 py-2 rounded-xl hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-lg' 
                        : 'text-white hover:text-gray-200 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    Contact
                  </Button>
                  <Avatar className="w-10 h-10 ring-2 ring-white/30 transition-all duration-500 ease-out hover:scale-110 hover:ring-4 hover:ring-white/50">
                    <AvatarFallback className="bg-gray-800 text-white text-sm font-medium">
                      {profile?.name.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    className={`transition-all duration-500 ease-out px-4 py-2 rounded-xl hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:shadow-lg' 
                        : 'text-white hover:text-red-400 hover:bg-red-500/20 backdrop-blur-sm'
                    }`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out">
        <div className="liquid-glass rounded-3xl shadow-2xl p-1.5 hover:shadow-3xl transition-all duration-500 ease-out">
          <div className="flex items-center gap-0.5">
            {/* Discover Button */}
            <button
              onClick={scrollToDiscover}
              className="flex flex-col items-center gap-0 px-2.5 py-1 rounded-2xl transition-all duration-500 ease-out text-white min-w-[2.5rem] outline-none hover:scale-110 hover:bg-white/10"
            >
              <MapPin className="w-4 h-4 transition-all duration-500 ease-out filter-green-hover" />
              <span className="text-[10px] font-medium text-gray-300 transition-all duration-300">Discover</span>
            </button>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center gap-0 px-2.5 py-1 rounded-2xl transition-all duration-500 ease-out min-w-[2.5rem] text-white outline-none hover:scale-110 ${
                    isActive ? 'bg-white/20 scale-105' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`transition-all duration-500 ease-out ${
                      isActive ? 'w-5 h-5 filter-green scale-110' : 'w-4 h-4 filter-green-hover'
                    }`} />
                  </div>
                  <span className={`text-[10px] font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-700 ease-out ${
        isScrolled ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
      }`}>
        <Button
          onClick={scrollToTop}
          className="w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out hover:scale-110"
        >
          <ArrowUp className="w-5 h-5 transition-all duration-300" />
        </Button>
      </div>

      {/* Overlay for expanded search */}
      {isSearchExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={handleSearchCollapse}
        />
      )}
    </>
  );
}
