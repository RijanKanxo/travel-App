import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  Star, 
  MapPin, 
  Clock,
  Phone,
  MessageCircle,
  Filter,
  Heart,
  Share,
  ShoppingBag,
  Camera,
  Utensils,
  Car,
  Home,
  Gift,
  ChevronRight,
  DollarSign,
  Users,
  Verified,
  Calendar
} from 'lucide-react';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  vendor: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    verified: boolean;
    location: string;
  };
  images: string[];
  tags: string[];
  availability: string;
  duration?: string;
  groupSize?: string;
  isLiked: boolean;
  discount?: number;
}

const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Traditional Nepali Cooking Class',
    description: 'Learn to cook authentic dal bhat, momos, and traditional Nepali dishes with a local family.',
    price: '$35',
    category: 'Food & Cooking',
    vendor: {
      name: 'Sita Gurung',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b993?w=100&h=100&fit=crop&crop=face',
      rating: 4.9,
      reviews: 156,
      verified: true,
      location: 'Thamel, Kathmandu'
    },
    images: ['https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'],
    tags: ['Traditional', 'Family Experience', 'Vegetarian Options'],
    availability: 'Daily',
    duration: '3 hours',
    groupSize: '1-6 people',
    isLiked: false
  },
  {
    id: '2',
    title: 'Handwoven Pashmina Scarves',
    description: 'Authentic cashmere and yak wool scarves handwoven by local artisans in the Himalayas.',
    price: '$45',
    originalPrice: '$65',
    category: 'Handicrafts',
    vendor: {
      name: 'Karma Sherpa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
      reviews: 203,
      verified: true,
      location: 'Boudhanath, Kathmandu'
    },
    images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop'],
    tags: ['Handmade', 'Fair Trade', 'Premium Quality'],
    availability: 'In Stock',
    isLiked: true,
    discount: 30
  },
  {
    id: '3',
    title: 'Motorcycle Rental - Royal Enfield',
    description: 'Explore Nepal on a classic Royal Enfield. Perfect for mountain roads and city touring.',
    price: '$25/day',
    category: 'Transportation',
    vendor: {
      name: 'Bikash Motor Rental',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 4.6,
      reviews: 89,
      verified: true,
      location: 'Pokhara'
    },
    images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'],
    tags: ['Adventure', 'Self-Drive', 'Helmet Included'],
    availability: 'Available',
    isLiked: false
  },
  {
    id: '4',
    title: 'Photography Tour of Old Kathmandu',
    description: 'Capture the essence of old Kathmandu with a professional photographer guide.',
    price: '$80',
    category: 'Tours & Activities',
    vendor: {
      name: 'Rajesh Photo Tours',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face',
      rating: 4.7,
      reviews: 67,
      verified: true,
      location: 'Durbar Square, Kathmandu'
    },
    images: ['https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop'],
    tags: ['Photography', 'Heritage', 'Small Group'],
    availability: 'Weekends',
    duration: '4 hours',
    groupSize: '1-4 people',
    isLiked: false
  },
  {
    id: '5',
    title: 'Homestay in Ghandruk Village',
    description: 'Experience authentic mountain life with a Gurung family in the Annapurna region.',
    price: '$20/night',
    category: 'Accommodation',
    vendor: {
      name: 'Maya Gurung Homestay',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 4.9,
      reviews: 234,
      verified: true,
      location: 'Ghandruk, Kaski'
    },
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop'],
    tags: ['Authentic', 'Mountain Views', 'Family Run'],
    availability: 'Year Round',
    isLiked: true
  },
  {
    id: '6',
    title: 'Thangka Painting Workshop',
    description: 'Learn the ancient art of Thangka painting from master artists in Bhaktapur.',
    price: '$120',
    category: 'Arts & Crafts',
    vendor: {
      name: 'Lama Art Studio',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
      reviews: 45,
      verified: true,
      location: 'Bhaktapur'
    },
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
    tags: ['Traditional Art', 'Spiritual', 'Certificate'],
    availability: 'By Appointment',
    duration: '6 hours',
    groupSize: '1-8 people',
    isLiked: false
  }
];

const categories = ['All', 'Food & Cooking', 'Handicrafts', 'Transportation', 'Tours & Activities', 'Accommodation', 'Arts & Crafts'];

export function LocalMarketplace() {
  const [items, setItems] = useState<MarketplaceItem[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter items based on search and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    if (activeTab === 'liked') {
      return matchesSearch && matchesCategory && item.isLiked;
    }
    
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isLiked: !item.isLiked } : item
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Cooking': return <Utensils className="w-4 h-4" />;
      case 'Transportation': return <Car className="w-4 h-4" />;
      case 'Accommodation': return <Home className="w-4 h-4" />;
      case 'Tours & Activities': return <Camera className="w-4 h-4" />;
      case 'Arts & Crafts': return <Gift className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-nepal-crimson mb-4">
          Local Marketplace
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with local vendors and artisans. Support authentic Nepal experiences and take home genuine memories.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for products, services, or vendors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 h-14 text-lg rounded-xl border-2 focus:border-nepal-crimson transition-all"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="max-w-4xl mx-auto mb-8 p-6 bg-white rounded-xl border shadow-sm animate-in slide-in-from-top-2">
          <div>
            <label className="block text-sm font-medium mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2 transition-all"
                >
                  {getCategoryIcon(category)}
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="liked">
            <Heart className="w-4 h-4 mr-2" />
            Liked
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button variant="ghost" size="sm" className="text-nepal-crimson">
                Popularity <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col h-full"
              >
                <div className="relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {item.discount && (
                      <Badge className="bg-red-500 text-white">
                        -{item.discount}%
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white transition-all ${
                        item.isLiked ? 'text-red-500' : 'text-gray-500'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-gray-800 transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {item.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                  {/* Vendor Info */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={item.vendor.avatar} alt={item.vendor.name} />
                      <AvatarFallback>{item.vendor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm truncate">{item.vendor.name}</h4>
                        {item.vendor.verified && (
                          <Verified className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.vendor.rating}</span>
                          <span>({item.vendor.reviews})</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{item.vendor.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium">{item.availability}</span>
                    </div>
                    {item.duration && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{item.duration}</span>
                      </div>
                    )}
                    {item.groupSize && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Group Size:</span>
                        <span className="font-medium">{item.groupSize}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Price and Actions - Fixed at bottom */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-800">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="transition-all border-gray-600 text-gray-600 hover:bg-gray-100">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm" className="bg-gray-800 hover:bg-gray-900 text-white transition-all">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'liked' 
                  ? "You haven't liked any items yet. Browse and like items to see them here."
                  : "Try adjusting your search criteria or explore different categories."
                }
              </p>
              {activeTab !== 'liked' && (
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-nepal-crimson/5 to-nepal-saffron/5 rounded-2xl text-center">
        <h3 className="text-2xl font-bold mb-4">Become a Vendor</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join our marketplace and share your unique products and services with travelers from around the world.
        </p>
        <Button size="lg" className="bg-nepal-crimson hover:bg-nepal-crimson/90">
          Start Selling
        </Button>
      </div>
      
      {/* Bottom spacing to prevent navbar overlap */}
      <div className="h-32"></div>
    </div>
  );
}
