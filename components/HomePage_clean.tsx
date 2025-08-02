import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  Search, 
  Filter, 
  MapPin, 
  Hotel, 
  Mountain, 
  Camera, 
  Utensils, 
  Car, 
  Plane, 
  Star,
  Heart,
  ChevronDown
} from 'lucide-react';

interface HomePageProps {
  onSearch: (query: string, filters: any) => void;
  isScrolled: boolean;
}

export function HomePage({ onSearch, isScrolled }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'places', label: 'Places', icon: Mountain },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'activities', label: 'Activities', icon: Camera },
    { id: 'transport', label: 'Transport', icon: Car },
  ];

  const popularDestinations = [
    {
      id: 1,
      name: 'Everest Base Camp',
      location: 'Solukhumbu, Nepal',
      rating: 4.9,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
      price: 'From $1,200',
      duration: '14 days',
      difficulty: 'Challenging'
    },
    {
      id: 2,
      name: 'Annapurna Circuit',
      location: 'Annapurna, Nepal',
      rating: 4.8,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      price: 'From $800',
      duration: '12 days',
      difficulty: 'Moderate'
    },
    {
      id: 3,
      name: 'Kathmandu Valley',
      location: 'Kathmandu, Nepal',
      rating: 4.7,
      reviews: 2156,
      image: 'https://images.unsplash.com/photo-1565189471141-2404776dc5d6?w=400',
      price: 'From $50',
      duration: '2-3 days',
      difficulty: 'Easy'
    },
    {
      id: 4,
      name: 'Pokhara Adventure',
      location: 'Pokhara, Nepal',
      rating: 4.8,
      reviews: 1567,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
      price: 'From $200',
      duration: '5 days',
      difficulty: 'Easy'
    }
  ];

  const handleSearch = () => {
    onSearch(searchQuery, { category: activeCategory });
  };

  const scrollToDiscover = () => {
    const discoverSection = document.getElementById('discover-section');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Challenging': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Full Viewport Coverage */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
            alt="Nepal Mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 flex flex-col justify-center items-center h-full px-4 text-center transition-all duration-700 ease-out ${
          isScrolled ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
        }`}>
          {/* Main heading */}
          <div className={`mb-8 transition-all duration-700 ease-out ${
            isScrolled ? 'opacity-0 -translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Welcome to Nepal
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Experience the magic of the Himalayas, rich culture, and breathtaking landscapes. 
              Your adventure begins here.
            </p>
          </div>

          {/* Search Bar */}
          <div className={`w-full max-w-4xl mx-auto mb-8 transition-all duration-700 ease-out ${
            isScrolled ? 'opacity-0 -translate-y-12 scale-90 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'
          }`}>
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Where do you want to go? (e.g., Everest Base Camp, Kathmandu...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:ring-2 focus:ring-green-500 rounded-xl"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="px-6 py-4 rounded-xl hover:bg-gray-50 border-gray-200"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    onClick={scrollToDiscover}
                    className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium"
                  >
                    Discover
                  </Button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                      className={`rounded-full px-4 py-2 text-sm ${
                        activeCategory === category.id 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>

              {/* Trending searches */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Trending searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Everest Base Camp', 'Annapurna Circuit', 'Kathmandu Heritage', 'Pokhara Lakes', 'Chitwan Safari', 'Mustang Valley'].map((search) => (
                    <button key={search} className="text-sm text-green-600 hover:text-green-700 hover:underline">
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll prompt */}
          <div className={`transition-all duration-700 ease-out ${
            isScrolled ? 'opacity-0' : 'opacity-100'
          }`}>
            <Button
              variant="ghost"
              onClick={scrollToDiscover}
              className="text-white hover:text-green-400 flex flex-col items-center gap-2 p-4"
            >
              <span className="text-sm">Discover More</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after experiences in Nepal, handpicked by travelers like you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Card key={destination.id} className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white overflow-hidden hover:-translate-y-3 hover:scale-[1.03]">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                    >
                      <Heart className="w-4 h-4 hover:text-red-500 transition-colors duration-300" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className={`${getDifficultyColor(destination.difficulty)} shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors duration-300`}>
                      {destination.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 group-hover:bg-gray-50/50 transition-colors duration-300">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 flex items-center">
                    <MapPin className="w-3 h-3 mr-1 group-hover:text-green-500 transition-colors duration-300" />
                    {destination.location}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium text-sm">{destination.rating}</span>
                      <span className="text-gray-500 text-xs">({destination.reviews})</span>
                    </div>
                    <span className="text-sm text-gray-600">{destination.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600 group-hover:text-green-700 transition-colors duration-300">{destination.price}</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white transform group-hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Discover Section */}
      <div id="discover-section" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Nepal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore breathtaking destinations, from towering peaks to ancient temples, 
              rich culture to pristine nature reserves.
            </p>
          </div>
          
          {/* Discover content would go here */}
          <div className="text-center py-16">
            <p className="text-gray-500">Discover section content coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
