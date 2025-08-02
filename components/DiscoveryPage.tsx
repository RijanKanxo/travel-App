import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  MapPin, 
  Star, 
  Filter,
  Heart,
  Share,
  Users,
  Camera,
  Mountain,
  Compass,
  Clock,
  DollarSign,
  Bookmark,
  ChevronRight
} from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  category: string;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Annapurna Base Camp Trek',
    location: 'Annapurna Region',
    description: 'Experience the majestic Annapurna massif up close with this iconic trek through diverse landscapes.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 247,
    price: '$899',
    duration: '12 days',
    difficulty: 'Moderate',
    category: 'Trekking',
    tags: ['Mountain', 'Adventure', 'Nature'],
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '2',
    name: 'Kathmandu Heritage Walk',
    location: 'Kathmandu Valley',
    description: 'Discover the rich cultural heritage of Nepal\'s capital through ancient temples and bustling markets.',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 189,
    price: '$45',
    duration: '6 hours',
    difficulty: 'Easy',
    category: 'Cultural',
    tags: ['Heritage', 'Culture', 'History'],
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '3',
    name: 'Everest Base Camp Helicopter Tour',
    location: 'Everest Region',
    description: 'Get aerial views of the world\'s highest peak without the grueling trek.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 156,
    price: '$1,299',
    duration: '4 hours',
    difficulty: 'Easy',
    category: 'Adventure',
    tags: ['Helicopter', 'Everest', 'Aerial'],
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '4',
    name: 'Chitwan Wildlife Safari',
    location: 'Chitwan National Park',
    description: 'Spot rhinos, tigers, and elephants in Nepal\'s premier wildlife reserve.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 203,
    price: '$129',
    duration: '3 days',
    difficulty: 'Easy',
    category: 'Wildlife',
    tags: ['Safari', 'Wildlife', 'National Park'],
    isLiked: true,
    isBookmarked: true
  },
  {
    id: '5',
    name: 'Pokhara Paragliding',
    location: 'Pokhara',
    description: 'Soar above the beautiful Phewa Lake with stunning mountain views.',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 178,
    price: '$89',
    duration: '2 hours',
    difficulty: 'Moderate',
    category: 'Adventure',
    tags: ['Paragliding', 'Aerial', 'Adventure'],
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '6',
    name: 'Bhaktapur Pottery Experience',
    location: 'Bhaktapur',
    description: 'Learn traditional pottery making from master craftsmen in the ancient city.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 89,
    price: '$35',
    duration: '3 hours',
    difficulty: 'Easy',
    category: 'Cultural',
    tags: ['Pottery', 'Craft', 'Traditional'],
    isLiked: false,
    isBookmarked: false
  }
];

const categories = ['All', 'Trekking', 'Cultural', 'Adventure', 'Wildlife', 'Food', 'Spiritual'];
const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];

export function DiscoveryPage() {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [activeView, setActiveView] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter destinations based on search and filters
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || dest.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const toggleLike = (id: string) => {
    setDestinations(destinations.map(dest => 
      dest.id === id ? { ...dest, isLiked: !dest.isLiked } : dest
    ));
  };

  const toggleBookmark = (id: string) => {
    setDestinations(destinations.map(dest => 
      dest.id === id ? { ...dest, isBookmarked: !dest.isBookmarked } : dest
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-gray-100 text-gray-700';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Challenging': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-nepal-crimson mb-4">
          Discover Nepal
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From towering peaks to ancient temples, find your perfect Nepal adventure with local insights and authentic experiences.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search destinations, activities, or locations..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-3">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className="transition-all"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeView} className="mt-8">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button variant="ghost" size="sm" className="text-nepal-crimson">
                Relevance <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <Card 
                key={destination.id} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white transition-all ${
                        destination.isLiked ? 'text-red-500' : 'text-gray-500'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(destination.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${destination.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white transition-all ${
                        destination.isBookmarked ? 'text-nepal-crimson' : 'text-gray-500'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(destination.id);
                      }}
                    >
                      <Bookmark className={`w-4 h-4 ${destination.isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className={getDifficultyColor(destination.difficulty)}>
                      {destination.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-nepal-crimson transition-colors">
                      {destination.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                      <span className="text-xs text-muted-foreground">({destination.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {destination.location}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {destination.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {destination.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold text-nepal-crimson">{destination.price}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-nepal-crimson hover:bg-nepal-crimson/10">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button className="w-full mt-4 bg-nepal-crimson hover:bg-nepal-crimson/90 transition-all">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <Compass className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or explore different categories.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto mt-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-nepal-crimson/5 transition-all"
          >
            <Mountain className="w-6 h-6" />
            <span>Plan Trek</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-nepal-crimson/5 transition-all"
          >
            <Camera className="w-6 h-6" />
            <span>Photo Tours</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-nepal-crimson/5 transition-all"
          >
            <Users className="w-6 h-6" />
            <span>Group Tours</span>
          </Button>
        </div>
      </div>
      
      {/* Bottom spacing to prevent navbar overlap */}
      <div className="h-32"></div>
    </div>
  );
}
