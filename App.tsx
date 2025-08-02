import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Separator } from './components/ui/separator';
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
  TrendingUp,
  Globe,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { DarkModeToggle } from './components/DarkModeToggle';

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(true);

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
      location: 'Bhaktapur',
      price: 25,
      rating: 4.9,
      reviews: 127,
      duration: '3 hours',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&h=300&fit=crop',
      description: 'Learn authentic Newari dishes with a local family.',
      host: 'Rajesh S.'
    },
    {
      id: 2,
      title: 'Sunrise Trek to Nagarkot',
      location: 'Nagarkot',
      price: 35,
      rating: 4.7,
      reviews: 89,
      duration: '6 hours',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      description: 'Breathtaking Himalayan sunrise views.',
      host: 'Maya T.'
    },
    {
      id: 3,
      title: 'Pottery Workshop',
      location: 'Bhaktapur',
      price: 20,
      rating: 4.8,
      reviews: 64,
      duration: '2 hours',
      isVerified: true,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
      description: 'Create ceramic art with traditional techniques.',
      host: 'Binod P.'
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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <Compass className="h-6 w-6 animate-spin text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Wanderly</h2>
            <p className="text-sm text-muted-foreground">Loading...</p>
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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Compass className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">Wanderly</span>
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
          
          <Button size="sm">
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
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200",
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
    <div className="container mx-auto px-4 py-8 pb-24 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Discover Authentic Experiences</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with local experts and discover hidden gems around the world
        </p>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search destinations, experiences..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Experiences', value: '1,200+', icon: MapPin },
          { label: 'Hosts', value: '450+', icon: Users },
          { label: 'Countries', value: '25+', icon: Globe },
          { label: 'Reviews', value: '10k+', icon: Star }
        ].map((stat, index) => (
          <Card key={index} className="p-4 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <Card className="h-64">
        <CardContent className="flex h-full items-center justify-center p-6">
          <div className="space-y-2 text-center">
            <MapPin className="mx-auto h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">Interactive Map</h3>
            <p className="text-sm text-muted-foreground">Explore experiences by location</p>
            <Button>Launch Map</Button>
          </div>
        </CardContent>
      </Card>

      {/* Experiences */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Experiences</h2>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <Card key={exp.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={exp.image}
                  alt={exp.title}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {exp.isVerified && (
                    <Badge className="bg-primary text-primary-foreground">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="absolute right-3 top-3 flex gap-1">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="space-y-3 p-4">
                <div>
                  <h3 className="font-semibold">{exp.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{exp.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{exp.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({exp.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {exp.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">${exp.price}</span>
                    <span className="text-sm text-muted-foreground">/person</span>
                  </div>
                  <Button size="sm">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>{renderContent()}</main>
      <FloatingBottomNav />
    </div>
  );
}