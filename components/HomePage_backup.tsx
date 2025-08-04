import React, { useState } from 'react';
import { 
  Star,
  MapPin,
  Heart,
  Share,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { UnifiedSearchBar } from './UnifiedSearchBar';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  difficulty: string;
  type: string;
}

interface HomePageProps {
  popularSectionRef: React.RefObject<HTMLDivElement>;
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isVisible: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ 
  popularSectionRef, 
  onSearch, 
  searchQuery, 
  setSearchQuery,
  isVisible
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  console.log('HomePage rendering, isVisible:', isVisible);

  return (
    <div className="min-h-screen">
      {/* Test content */}
      <div className="bg-red-500 text-white p-4">
        <h1>HomePage is rendering! isVisible: {isVisible ? 'true' : 'false'}</h1>
        <p>If you see this, the HomePage component is working.</p>
      </div>
      
      {/* Original content will be added back */}
    </div>
  );

  const categories = ['All', 'Trekking', 'Culture', 'Adventure', 'Pilgrimage', 'Nature'];

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Everest Base Camp Trek",
      location: "Khumbu, Nepal",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 2847,
      price: "$2,999",
      duration: "14 days",
      difficulty: "Challenging",
      type: "Trekking",
    },
    {
      id: 2,
      name: "Annapurna Circuit Trek",
      location: "Annapurna, Nepal",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 1923,
      price: "$1,899",
      duration: "18 days",
      difficulty: "Moderate",
      type: "Trekking",
    },
    {
      id: 3,
      name: "Kathmandu Cultural Tour",
      location: "Kathmandu Valley, Nepal",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 1456,
      price: "$599",
      duration: "3 days",
      difficulty: "Easy",
      type: "Culture",
    },
    {
      id: 4,
      name: "Pokhara Lakeside Retreat",
      location: "Pokhara, Nepal",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 987,
      price: "$299",
      duration: "2 days",
      difficulty: "Easy",
      type: "Nature",
    },
    {
      id: 5,
      name: "Chitwan Safari Adventure",
      location: "Chitwan, Nepal",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 654,
      price: "$899",
      duration: "4 days",
      difficulty: "Easy",
      type: "Adventure",
    },
    {
      id: 6,
      name: "Lumbini Pilgrimage",
      location: "Lumbini, Nepal",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 432,
      price: "$399",
      duration: "2 days",
      difficulty: "Easy",
      type: "Pilgrimage",
    }
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFavoriteToggle = (destinationId: number) => {
    setFavorites(prev => 
      prev.includes(destinationId)
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const filteredDestinations = destinations.filter(destination =>
    selectedCategory === 'All' || destination.type === selectedCategory
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-white">
              Discover
              <span className="block text-gray-100">Incredible Nepal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              From the peaks of the Himalayas to ancient temples, experience the magic of Nepal with our expert guides.
            </p>

            {/* Enhanced Search Form with Pre-expanded Filters */}
            {isVisible && (
              <div className="max-w-4xl mx-auto mb-8">
                <UnifiedSearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSubmit={onSearch}
                  activeTab="home"
                  variant="hero"
                />
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-300">Destinations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-300">Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div ref={popularSectionRef} id="popular-destinations-section" className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after destinations in Nepal, from mountain peaks to cultural treasures.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => handleCategoryClick(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-gray-800 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(destination => (
              <Card key={destination.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 backdrop-blur-sm"
                      onClick={() => handleFavoriteToggle(destination.id)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(destination.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 backdrop-blur-sm"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800 font-medium">
                      {destination.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {destination.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{destination.rating}</span>
                      <span className="ml-1">({destination.reviews})</span>
                    </div>
                    <span>•</span>
                    <span>{destination.duration}</span>
                    <span>•</span>
                    <span className={`font-medium ${
                      destination.difficulty === 'Easy' ? 'text-green-600' :
                      destination.difficulty === 'Moderate' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {destination.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{destination.price}</span>
                      <span className="text-gray-600 text-sm ml-1">per person</span>
                    </div>
                    <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-xl px-6 transition-all duration-300 group-hover:shadow-lg">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-4 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose Wanderly?</h2>
          <p className="text-xl text-gray-300 mb-12">Experience Nepal like never before with our expert guidance and local insights.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Local Expertise</h3>
              <p className="text-gray-300">Native guides with deep knowledge of Nepal's hidden gems.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Guaranteed Quality</h3>
              <p className="text-gray-300">Premium experiences with 98% customer satisfaction rate.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-300">Round-the-clock assistance for peace of mind during your journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
