import { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { cn } from './components/ui/utils';
import { 
  MapPin, 
  BookOpen, 
  ShoppingBag, 
  Download, 
  MessageCircle, 
  Bell,
  Wifi,
  WifiOff,
  Shield,
  User,
  Star,
  Heart,
  Share2,
  Plus,
  Search,
  Filter,
  Compass,
  Clock,
  Users,
  CheckCircle,
  Globe
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { DarkModeToggle } from './components/DarkModeToggle';

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    setTimeout(() => setLoading(false), 800);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Add Nepal-specific content
  const nepalCulturalTips = [
    "Remove shoes before entering homes and temples",
    "Use both hands when giving/receiving items",
    "Avoid pointing with your finger, use open palm",
    "Dress modestly when visiting religious sites"
  ];

  const navigationItems = [
    { id: 'discover', label: 'Discover', icon: MapPin },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'offline', label: 'Offline', icon: Download },
    { id: 'help', label: 'Help', icon: MessageCircle },
    { id: 'alerts', label: 'Alerts', icon: Bell }
  ];

  const experiences = [
    {
      id: 1,
      title: 'Traditional Newari Cooking Class',
      location: 'Bhaktapur Durbar Square',
      price: 25,
      rating: 4.9,
      reviews: 127,
      duration: '3 hours',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&h=300&fit=crop',
      description: 'Learn authentic Newari dishes like momo, dal bhat, and sel roti with a local family.',
      host: 'Rajesh Shrestha',
      culturalNote: 'Experience 800+ year old Newari culinary traditions',
      stampColor: 'nepal-crimson'
    },
    {
      id: 2,
      title: 'Everest Base Camp Helicopter Tour',
      location: 'Sagarmatha National Park',
      price: 1200,
      rating: 4.8,
      reviews: 89,
      duration: '4 hours',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      description: 'Witness the world\'s highest peak and Sherpa culture from above.',
      host: 'Pemba Sherpa',
      culturalNote: 'Sacred mountain revered by Sherpa people',
      stampColor: 'alpine-blue'
    },
    {
      id: 3,
      title: 'Thangka Painting Workshop',
      location: 'Boudhanath Stupa',
      price: 45,
      rating: 4.7,
      reviews: 64,
      duration: '5 hours',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
      description: 'Create sacred Buddhist art with traditional mineral pigments.',
      host: 'Lama Tenzin',
      culturalNote: 'Ancient Tibetan Buddhist art form',
      stampColor: 'temple-gold'
    },
    {
      id: 4,
      title: 'Gurung Village Homestay',
      location: 'Ghandruk Village',
      price: 30,
      rating: 4.9,
      reviews: 156,
      duration: '2 days',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop',
      description: 'Live with Gurung families, learn traditional weaving and taste authentic dal bhat.',
      host: 'Maya Gurung',
      culturalNote: 'Experience famous Gurkha warrior culture',
      stampColor: 'terrace-green'
    },
    {
      id: 5,
      title: 'Pokhara Paragliding Adventure',
      location: 'Sarangkot Hill',
      price: 85,
      rating: 4.6,
      reviews: 203,
      duration: '3 hours',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=500&h=300&fit=crop',
      description: 'Soar above Phewa Lake with panoramic Annapurna mountain views.',
      host: 'Bikash Tamang',
      culturalNote: 'Sacred lake reflecting Machapuchare peak',
      stampColor: 'prayer-flag-blue'
    },
    {
      id: 6,
      title: 'Chitwan Jungle Safari',
      location: 'Chitwan National Park',
      price: 120,
      rating: 4.5,
      reviews: 98,
      duration: '2 days',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040a87?w=500&h=300&fit=crop',
      description: 'Spot one-horned rhinos, tigers, and learn about Tharu culture.',
      host: 'Surya Tharu',
      culturalNote: 'Indigenous Tharu people\'s ancestral homeland',
      stampColor: 'valley-green'
    }
  ];

  const journalPosts = [
    {
      id: 1,
      author: 'Sarah Chen',
      title: 'Solo Female Travel Guide to Bhaktapur',
      location: 'Bhaktapur, Nepal',
      excerpt: 'Walking through ancient streets felt like stepping back in time...',
      likes: 247,
      comments: 32,
      posted: '2d ago',
      readTime: '5 min',
      safetyRating: 5
    },
    {
      id: 2,
      author: 'Marco Rodriguez',
      title: 'Budget Backpacking: Annapurna Circuit',
      location: 'Annapurna Region',
      excerpt: 'Completed the circuit on $15/day. Here\'s how...',
      likes: 189,
      comments: 28,
      posted: '1w ago',
      readTime: '8 min',
      safetyRating: 4
    }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-everest-peak via-mountain-mist to-glacier-blue">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-nepal-crimson to-nepal-blue shadow-lg">
            <Compass className="h-6 w-6 animate-spin text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-nepal-blue">Namaste Nepal</h2>
            <p className="text-sm text-nepal-blue/70">Loading your adventure...</p>
            <p className="text-xs text-nepal-blue/50 mt-1">🏔️ Welcome to the Himalayas 🏔️</p>
          </div>
        </div>
      </div>
    );
  }

  const Header = () => (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-nepal-crimson to-nepal-blue">
            <Compass className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-nepal-crimson to-nepal-blue bg-clip-text text-transparent">
            Namaste Nepal
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Status Indicators */}
          <div className="hidden items-center space-x-2 sm:flex">
            <div className="flex items-center space-x-1 rounded-full bg-muted/50 px-2 py-1">
              <Shield className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground">Safe</span>
            </div>
            <div className="flex items-center space-x-1 rounded-full bg-muted/50 px-2 py-1">
              {isOnline ? (
                <>
                  <Wifi className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-muted-foreground">Offline</span>
                </>
              )}
            </div>
          </div>

          <DarkModeToggle />
          
          <Button size="sm" className="focus-ring">
            <User className="w-4 h-4 mr-1" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );

  const FloatingBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30">
          <div className="flex items-center justify-around px-2 py-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-label={`Navigate to ${item.label}`}
                aria-current={activeTab === item.id ? 'page' : undefined}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200 focus-ring",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden text-xs font-medium leading-none sm:block">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );

  const DiscoverPage = () => (
    <div className="container-breathing py-8 pb-32 space-y-12">
      {/* Hero with Prayer Flag Design */}
      <div className="relative text-center space-y-6 p-8 rounded-2xl bg-gradient-to-r from-everest-peak via-mountain-mist to-glacier-blue overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 prayer-flag-gradient"></div>
        <h1 className="text-3xl md:text-4xl font-bold text-nepal-blue dark:text-blue-300">
          Discover the Heart of Nepal
        </h1>
        <div className="khukuri-divider mx-auto w-24 my-6"></div>
        <p className="text-lg text-nepal-blue/80 dark:text-blue-200/90 max-w-2xl mx-auto leading-relaxed">
          From the peaks of the Himalayas to the culture of ancient kingdoms - 
          experience authentic Nepal through local eyes
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-nepal-blue/70 dark:text-blue-200/80 flex-wrap gap-y-2">
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-nepal-crimson mr-2"></span>
            नमस्ते (Namaste)
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-temple-gold mr-2"></span>
            8 UNESCO Sites
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-terrace-green mr-2"></span>
            125+ Ethnic Groups
          </span>
        </div>
      </div>

      {/* Search */}
      <Card className="card-breathing bg-gradient-to-r from-himalayan-snow to-mountain-mist dark:from-slate-800 dark:to-slate-700 border-nepal-crimson/10 dark:border-nepal-crimson/30">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-nepal-blue/70 dark:text-blue-300/70" />
            <Input 
              placeholder="Search Kathmandu, Pokhara, Everest Base Camp..." 
              className="pl-10 border-nepal-blue/20 focus:border-nepal-crimson/50 dark:bg-slate-700 dark:border-slate-600 dark:text-white" 
            />
          </div>
          <Button variant="outline" className="border-nepal-blue/20 text-nepal-blue hover:bg-nepal-blue/5 dark:border-slate-600 dark:text-blue-300 dark:hover:bg-slate-600 focus-ring">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {[
          { label: 'Experiences', value: '800+', icon: MapPin, color: 'nepal-crimson' },
          { label: 'Local Guides', value: '250+', icon: Users, color: 'nepal-blue' },
          { label: 'Districts', value: '77', icon: Globe, color: 'temple-gold' },
          { label: 'Happy Travelers', value: '15k+', icon: Star, color: 'terrace-green' }
        ].map((stat, index) => (
          <Card key={index} className="card-breathing text-center border-2 border-transparent hover:border-nepal-crimson/20 dark:hover:border-nepal-crimson/40 transition-all duration-300 dark:bg-slate-800">
            <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-${stat.color}/10 dark:bg-${stat.color}/20`}>
              <stat.icon className={`h-6 w-6 text-${stat.color} dark:text-${stat.color === 'nepal-blue' ? 'blue-400' : stat.color}`} />
            </div>
            <div className="text-xl font-bold text-nepal-blue dark:text-blue-300 mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground dark:text-slate-300">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Nepal Map Placeholder */}
      <Card className="h-64 bg-gradient-to-br from-everest-peak via-mountain-mist to-glacier-blue dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 border-nepal-crimson/20 dark:border-nepal-crimson/40">
        <CardContent className="flex h-full items-center justify-center card-breathing">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-nepal-crimson to-nepal-blue flex items-center justify-center shadow-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-nepal-blue dark:text-blue-300">Explore Nepal Interactive Map</h3>
            <p className="text-sm text-nepal-blue/70 dark:text-blue-200/80 max-w-sm mx-auto leading-relaxed">
              From Terai plains to Himalayan peaks - discover all 7 provinces
            </p>
            <Button className="btn-primary focus-ring shadow-lg">
              Launch Nepal Map 🗺️
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Experiences */}
      <div className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-nepal-blue dark:text-blue-300 mb-2">Featured Experiences</h2>
            <p className="text-sm text-muted-foreground dark:text-slate-300">Handpicked authentic Nepal adventures</p>
          </div>
          <Button variant="outline" className="border-nepal-crimson/20 text-nepal-crimson hover:bg-nepal-crimson/5 dark:border-nepal-crimson/40 dark:text-red-400 dark:hover:bg-red-400/10 focus-ring">
            View All 800+ Experiences
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="postcard-border postcard-shadow bg-white dark:bg-slate-800 interactive-card focus-ring relative overflow-hidden cursor-pointer group"
              tabIndex={0}
              role="button"
              aria-label={`View details for ${exp.title}`}
              onClick={() => {
                setSelectedExperience(exp);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedExperience(exp);
                }
              }}
            >
              {/* Postcard Stamp */}
              <div className={`postcard-stamp bg-${exp.stampColor} opacity-90 group-hover:opacity-100 transition-opacity`}>
                <div className="w-full h-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
              
              {/* Prayer Flag Border */}
              <div className="absolute top-0 left-0 right-0 h-1 prayer-flag-gradient opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Main Image */}
              <div className="relative">
                <ImageWithFallback
                  src={exp.image}
                  alt={exp.title}
                  className="h-56 w-full object-cover"
                />
                
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Verification Badge */}
                {exp.isVerified && (
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-nepal-crimson/90 text-white shadow-lg backdrop-blur-sm">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                )}
                
                {/* Price Tag - Prominent Display */}
                <div className="absolute right-4 top-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-nepal-blue dark:text-blue-300">${exp.price}</div>
                    <div className="text-xs text-muted-foreground dark:text-slate-400">per person</div>
                  </div>
                </div>
                
                {/* Location at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 text-white/95">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{exp.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Card Content - Simplified */}
              <CardContent className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <h3 className="font-semibold text-lg text-nepal-blue dark:text-blue-300 group-hover:text-nepal-crimson dark:group-hover:text-red-400 transition-colors leading-tight">
                    {exp.title}
                  </h3>
                </div>

                {/* Rating & Reviews - Simplified */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-temple-gold text-temple-gold" />
                      <span className="font-medium dark:text-white">{exp.rating}</span>
                      <span className="text-sm text-muted-foreground dark:text-slate-400">({exp.reviews})</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {exp.duration}
                  </div>
                </div>

                {/* Call to Action */}
                <Button 
                  className="w-full btn-primary focus-ring"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Direct booking action
                    alert(`Booking ${exp.title} for $${exp.price}`);
                  }}
                >
                  Book Experience
                </Button>
                
                {/* Postcard Address - Simplified */}
                <div className="text-xs text-center text-muted-foreground dark:text-slate-400 pt-2 border-t border-dashed border-nepal-crimson/20 dark:border-nepal-crimson/30">
                  📮 {exp.location}, Nepal 🏔️
                  <div className="mt-1 text-nepal-blue dark:text-blue-400 font-medium">
                    Click to learn more →
                  </div>
                </div>
              </CardContent>
              
              {/* Hover indicator */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-nepal-crimson to-nepal-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Experience Detail Modal */}
        {selectedExperience && (
          <div 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedExperience(null)}
          >
            <div 
              className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <ImageWithFallback
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  className="h-64 w-full object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Close Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white focus-ring"
                  onClick={() => setSelectedExperience(null)}
                  aria-label="Close experience details"
                >
                  ✕
                </Button>
                
                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedExperience.title}</h2>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedExperience.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Cultural Note */}
                <div className="bg-gradient-to-r from-everest-peak to-mountain-mist dark:from-slate-700 dark:to-slate-600 p-4 rounded-lg">
                  <h3 className="font-semibold text-nepal-blue dark:text-blue-300 mb-2">🏛️ Cultural Heritage</h3>
                  <p className="text-sm text-nepal-blue/80 dark:text-blue-200/80">{selectedExperience.culturalNote}</p>
                </div>
                
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-nepal-blue dark:text-blue-300 mb-2">About This Experience</h3>
                  <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">{selectedExperience.description}</p>
                </div>
                
                {/* Host Information */}
                <div className="flex items-start gap-4 p-4 bg-himalayan-snow dark:bg-slate-700 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-temple-gold to-nepal-crimson flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-nepal-blue dark:text-blue-300">Your Host: {selectedExperience.host}</h4>
                    <p className="text-sm text-muted-foreground dark:text-slate-300 mt-1">
                      Local expert with years of experience sharing Nepal's culture and traditions
                    </p>
                  </div>
                </div>
                
                {/* Experience Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-prayer-flag-blue/10 to-prayer-flag-blue/5 dark:bg-slate-700 rounded-lg">
                    <Clock className="h-6 w-6 text-prayer-flag-blue mx-auto mb-2" />
                    <div className="font-semibold">{selectedExperience.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-temple-gold/10 to-temple-gold/5 dark:bg-slate-700 rounded-lg">
                    <Star className="h-6 w-6 text-temple-gold mx-auto mb-2" />
                    <div className="font-semibold">{selectedExperience.rating}/5</div>
                    <div className="text-sm text-muted-foreground">{selectedExperience.reviews} Reviews</div>
                  </div>
                </div>
                
                {/* Cultural Tips */}
                <div>
                  <h3 className="font-semibold text-nepal-blue dark:text-blue-300 mb-3">🙏 Cultural Etiquette</h3>
                  <ul className="space-y-2">
                    {nepalCulturalTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-nepal-crimson mt-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Booking Section */}
                <div className="border-t border-dashed border-nepal-crimson/20 dark:border-nepal-crimson/30 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-nepal-blue dark:text-blue-300">${selectedExperience.price}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-temple-gold text-temple-gold" />
                        <span className="font-medium">{selectedExperience.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{selectedExperience.reviews} reviews</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full btn-primary focus-ring"
                    size="lg"
                    aria-label={`Book ${selectedExperience.title} for $${selectedExperience.price}`}
                  >
                    Book This Experience - ${selectedExperience.price}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Cultural Insights Section */}
        <div className="mt-16 space-y-8">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold text-nepal-blue dark:text-blue-300">🕉️ Cultural Insights 🕉️</h3>
            <p className="text-sm text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
              Learn about Nepal's rich heritage and traditions that make each experience meaningful
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Prayer Flags",
                description: "Colorful flags carrying mantras on mountain winds, spreading peace and compassion",
                icon: "🏳️",
                color: "prayer-flag-blue"
              },
              {
                title: "Namaste Greeting",
                description: "Sacred gesture meaning 'I bow to the divine in you' - the essence of Nepal",
                icon: "🙏",
                color: "temple-gold"
              },
              {
                title: "Gorkha Heritage",
                description: "Legendary warriors from the mountains, known for their courage and honor",
                icon: "⚔️",
                color: "nepal-crimson"
              }
            ].map((insight, index) => (
              <Card key={index} className={`card-breathing text-center bg-gradient-to-br from-${insight.color}/5 to-${insight.color}/10 dark:from-slate-800 dark:to-slate-700 border-${insight.color}/20 dark:border-${insight.color}/40 hover:border-${insight.color}/40 dark:hover:border-${insight.color}/60 transition-all duration-300`}>
                <div className="text-3xl mb-3">{insight.icon}</div>
                <h4 className={`font-semibold text-${insight.color} dark:text-${insight.color === 'nepal-crimson' ? 'red-400' : insight.color === 'nepal-blue' ? 'blue-400' : 'yellow-400'} mb-2 text-lg`}>{insight.title}</h4>
                <p className="text-sm text-muted-foreground dark:text-slate-300 leading-relaxed">{insight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const JournalPage = () => (
    <div className="container mx-auto px-4 py-8 pb-24 max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Travel Journal</h1>
          <p className="text-muted-foreground">Share your adventures with fellow travelers</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="space-y-6">
        {journalPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>by {post.author}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </div>
                    <span>{post.posted}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < post.safetyRating ? 'bg-gentle-fern' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">Safety</span>
                </div>
              </div>

              <p className="text-muted-foreground">{post.excerpt}</p>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">Read More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const SimplePage = ({ title, description, icon: Icon }: { title: string; description: string; icon: any }) => (
    <div className="container mx-auto px-4 py-8 pb-24 max-w-2xl">
      <div className="text-center space-y-6 py-12">
        <div className="w-16 h-16 mx-auto bg-gentle-fern/10 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-gentle-fern" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button>Coming Soon</Button>
          <Button variant="outline">Get Notified</Button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverPage />;
      case 'journal':
        return <JournalPage />;
      case 'marketplace':
        return <SimplePage 
          title="Local Marketplace" 
          description="Connect with verified local service providers for authentic experiences" 
          icon={ShoppingBag}
        />;
      case 'offline':
        return <SimplePage 
          title="Offline Guide Builder" 
          description="Download essential guides and content for offline access" 
          icon={Download}
        />;
      case 'help':
        return <SimplePage 
          title="Help & Q&A" 
          description="Get real-time help from locals and experienced travelers" 
          icon={MessageCircle}
        />;
      case 'alerts':
        return <SimplePage 
          title="Real-time Alerts" 
          description="Stay updated with weather, safety, and travel information" 
          icon={Bell}
        />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background nepal-pattern nepali-font">
      <Header />
      <main className="pt-4">{renderContent()}</main>
      <FloatingBottomNav />
    </div>
  );
}