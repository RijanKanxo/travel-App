import React, { useState } from 'react';
import { 
  Search,
  Star,
  MapPin,
  Hotel,
  Heart,
  Share,
  Plane,
  Camera,
  Clock,
  Users,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

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
  description: string;
  highlights: string[];
  tags: string[];
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
  const [showFilters, setShowFilters] = useState(false);

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
      description: "Experience the world's highest mountain up close on this legendary trek to Everest Base Camp.",
      highlights: ["Stunning mountain views", "Sherpa culture", "Tengboche Monastery"],
      tags: ["High Altitude", "Adventure", "Photography"]
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      location: "Annapurna, Nepal",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 1923,
      price: "$1,899",
      duration: "12 days",
      difficulty: "Moderate",
      type: "Trekking",
      description: "A classic trek through diverse landscapes and traditional mountain villages.",
      highlights: ["Thorong La Pass", "Diverse landscapes", "Traditional villages"],
      tags: ["Classic Trek", "Cultural", "Scenic"]
    },
    {
      id: 3,
      name: "Kathmandu Valley Tour",
      location: "Kathmandu, Nepal",
      image: "https://images.unsplash.com/photo-1544698129-63d8e1b2d83d?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 1456,
      price: "$299",
      duration: "3 days",
      difficulty: "Easy",
      type: "Culture",
      description: "Explore ancient temples, palaces, and vibrant markets in Nepal's cultural heart.",
      highlights: ["UNESCO World Heritage sites", "Ancient architecture", "Local markets"],
      tags: ["Heritage", "Culture", "History"]
    },
    {
      id: 4,
      name: "Chitwan National Park Safari",
      location: "Chitwan, Nepal",
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a77?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 987,
      price: "$599",
      duration: "4 days",
      difficulty: "Easy",
      type: "Nature",
      description: "Spot rhinos, tigers, and elephants in Nepal's premier wildlife sanctuary.",
      highlights: ["Wildlife viewing", "Elephant safari", "Canoe trip"],
      tags: ["Wildlife", "Safari", "Family-friendly"]
    },
    {
      id: 5,
      name: "Pokhara Adventure Hub",
      location: "Pokhara, Nepal",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064bf4?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 2156,
      price: "$899",
      duration: "7 days",
      difficulty: "Moderate",
      type: "Adventure",
      description: "Paragliding, zip-lining, and lake activities in Nepal's adventure capital.",
      highlights: ["Paragliding", "Phewa Lake", "Mountain views"],
      tags: ["Adventure Sports", "Lakes", "Scenic"]
    },
    {
      id: 6,
      name: "Lumbini Pilgrimage",
      location: "Lumbini, Nepal",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 743,
      price: "$399",
      duration: "2 days",
      difficulty: "Easy",
      type: "Pilgrimage",
      description: "Visit the birthplace of Lord Buddha and explore peaceful monasteries.",
      highlights: ["Maya Devi Temple", "Peace Pagoda", "International monasteries"],
      tags: ["Spiritual", "Peace", "History"]
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === 'All' || dest.type === selectedCategory;
    const matchesSearch = !searchQuery || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log('Subscribe clicked');
    // You can add actual subscription functionality here
  };

  return (
    <div className="min-h-screen bg-tonal">
      {/* Hero Section */}
      <div className="relative h-screen bg-tonal-elevated overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
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

            {/* Search Form */}
            {isVisible && (
              <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-gray-500" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Where do you want to explore in Nepal?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-32 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl shadow-lg focus:border-gray-400 focus:ring-0 transition-all duration-300 h-16"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Search
                  </Button>
                </div>
              </form>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-300">Destinations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">5000+</div>
                <div className="text-sm text-gray-300">Happy Travelers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">15</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div
        ref={popularSectionRef}
        id="popular-destinations-section"
        className="py-20 px-4 bg-tonal"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most beloved places in Nepal, from towering peaks to ancient temples
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gray-800 text-white shadow-lg scale-105 border-gray-800'
                    : 'bg-white hover:bg-gray-100 text-gray-700 hover:scale-105 border-gray-300 hover:border-gray-400'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-gray-600">
              Showing {filteredDestinations.length} destinations
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Expanded Filter Panel */}
          {showFilters && (
            <div className="mb-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      Under $500
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      $500 - $1,500
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      $1,500 - $3,000
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      Above $3,000
                    </Button>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Duration</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      1-3 days
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      4-7 days
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      1-2 weeks
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      2+ weeks
                    </Button>
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Difficulty</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      Easy
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      Moderate
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      Challenging
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                      Expert
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Card 
                key={destination.id} 
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white rounded-2xl border-0 shadow-lg"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient fade overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => toggleFavorite(destination.id)}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 p-2 rounded-full"
                    >
                      <Heart 
                        className={`h-4 w-4 transition-colors duration-300 ${
                          favorites.includes(destination.id) 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 p-2 rounded-full"
                    >
                      <Share className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-gray-800 hover:bg-gray-900 text-white">
                      {destination.type}
                    </Badge>
                  </div>
                  {/* Title overlay at bottom */}
                  <div className="absolute bottom-4 right-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      {destination.name}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800">{destination.price}</div>
                      <div className="text-xs text-gray-600">per person</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-sm text-gray-700">{destination.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">{destination.rating}</span>
                      <span className="text-gray-500 text-xs">({destination.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-700 text-xs">{destination.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 text-xs leading-relaxed line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-700">Group tour</span>
                    </div>
                    <Button 
                      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-1 rounded-full transition-all duration-300 hover:shadow-lg group text-xs"
                    >
                      View Details
                      <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 rounded-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              Load More Destinations
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Plan Your Perfect Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plane className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold mb-4">Book Flights</h3>
              <p className="text-gray-600 mb-6">Find the best deals on flights to Nepal from around the world.</p>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-6">
                Search Flights
              </Button>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Hotel className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold mb-4">Find Hotels</h3>
              <p className="text-gray-600 mb-6">Discover comfortable accommodations from luxury to budget options.</p>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-6">
                Browse Hotels
              </Button>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold mb-4">Photo Tours</h3>
              <p className="text-gray-600 mb-6">Capture Nepal's beauty with professional photography guides.</p>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-full px-6">
                Book Tour
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-4 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8 text-lg">Get the latest travel tips, destination guides, and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white border-0 rounded-full px-6 py-3"
            />
            <Button 
              type="submit"
              className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export { HomePage };
export default HomePage;
