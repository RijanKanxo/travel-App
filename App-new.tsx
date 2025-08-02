import React, { useState } from 'react';
import { Mountain, Calendar, Users, Star, MapPin, Clock, Heart, Moon, Sun, Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Badge } from './components/ui/badge';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Travel experiences with cultural authenticity
  const experiences = [
    {
      id: 1,
      title: "Everest Base Camp Trek",
      location: "Khumbu Region",
      duration: "14 days",
      difficulty: "Challenging", 
      price: "$2,499",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
      description: "Journey to the base of the world's highest peak through stunning Sherpa villages and Buddhist monasteries.",
      highlights: ["Sagarmatha National Park", "Tengboche Monastery", "Sherpa Culture", "Himalayan Views"],
      bestTime: "March-May, September-November",
      groupSize: "8-12 people",
      included: ["Professional Guide", "Permits", "Accommodation", "Meals"],
      culturalInsight: "Walk in the footsteps of legendary mountaineers while experiencing the warm hospitality of Sherpa communities. Visit ancient monasteries where monks offer blessings for safe travels."
    },
    {
      id: 2,
      title: "Kathmandu Cultural Heritage",
      location: "Kathmandu Valley",
      duration: "3 days",
      difficulty: "Easy",
      price: "$299",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop",
      description: "Explore UNESCO World Heritage sites and experience the living culture of Nepal's capital.",
      highlights: ["Durbar Squares", "Swayambhunath Stupa", "Pashupatinath Temple", "Local Markets"],
      bestTime: "Year-round",
      groupSize: "4-8 people", 
      included: ["Cultural Guide", "Entry Fees", "Traditional Lunch", "Transportation"],
      culturalInsight: "Discover the spiritual heart of Nepal where Hindu and Buddhist traditions intertwine. Learn about Newari architecture and participate in evening aarti ceremonies."
    },
    {
      id: 3,
      title: "Annapurna Circuit Adventure",
      location: "Annapurna Region",
      duration: "21 days",
      difficulty: "Moderate",
      price: "$1,899",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop",
      description: "Complete the classic circuit through diverse landscapes from subtropical to alpine desert.",
      highlights: ["Thorong La Pass", "Hot Springs", "Diverse Ecosystems", "Mountain Views"],
      bestTime: "March-May, September-November",
      groupSize: "6-10 people",
      included: ["Trekking Guide", "Porter Service", "Tea House Stays", "All Permits"],
      culturalInsight: "Experience the dramatic landscape changes and meet diverse ethnic communities including Gurung, Manangi, and Thakali people, each with unique traditions."
    },
    {
      id: 4,
      title: "Chitwan Safari Experience",
      location: "Chitwan National Park",
      duration: "2 days",
      difficulty: "Easy",
      price: "$199",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1574869734522-84bb0d5cc5ac?w=400&h=300&fit=crop",
      description: "Wildlife adventure in Nepal's premier national park with jungle safaris and cultural performances.",
      highlights: ["Bengal Tigers", "One-horned Rhinos", "Elephant Safari", "Tharu Culture"],
      bestTime: "October-March",
      groupSize: "4-12 people",
      included: ["Jungle Safari", "Cultural Show", "Meals", "Accommodation"],
      culturalInsight: "Learn about Tharu indigenous culture and conservation efforts. Experience traditional stick dances and hear stories of coexistence with wildlife."
    },
    {
      id: 5,
      title: "Pokhara Lakes & Peaks",
      location: "Pokhara Valley",
      duration: "4 days",
      difficulty: "Easy",
      price: "$399",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?w=400&h=300&fit=crop",
      description: "Peaceful retreat by pristine lakes with stunning Annapurna mountain reflections.",
      highlights: ["Phewa Lake", "Annapurna Views", "Peace Pagoda", "Paragliding"],
      bestTime: "September-May", 
      groupSize: "2-8 people",
      included: ["Boat Rides", "Sunrise Views", "Local Guide", "Mountain Activities"],
      culturalInsight: "Enjoy the laid-back atmosphere of Nepal's adventure capital while learning about the region's role in mountaineering history and Himalayan tourism."
    },
    {
      id: 6,
      title: "Lumbini Pilgrimage Journey",
      location: "Lumbini",
      duration: "2 days", 
      difficulty: "Easy",
      price: "$149",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
      description: "Spiritual journey to the birthplace of Lord Buddha and UNESCO World Heritage site.",
      highlights: ["Maya Devi Temple", "Sacred Garden", "International Monasteries", "Archaeological Sites"],
      bestTime: "October-April",
      groupSize: "2-15 people",
      included: ["Spiritual Guide", "Temple Visits", "Meditation Session", "Cultural Insights"],
      culturalInsight: "Follow the path of enlightenment at Buddhism's most sacred site. Participate in meditation sessions and learn about Buddhist philosophy from local monks."
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'var(--accent)';
      case 'Moderate': return 'var(--secondary)';
      case 'Challenging': return 'var(--primary)';
      default: return 'var(--muted)';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`} style={{ backgroundColor: 'var(--background)', color: 'var(--text)' }}>
      {/* Navigation */}
      <nav className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8" style={{ color: 'var(--primary)' }} />
              <span className="text-xl font-bold font-heading">Wanderly</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#experiences" className="hover:opacity-75 transition-opacity">Experiences</a>
              <a href="#about" className="hover:opacity-75 transition-opacity">About Nepal</a>
              <a href="#contact" className="hover:opacity-75 transition-opacity">Contact</a>
              
              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-opacity-75 transition-colors focus-ring"
                style={{ backgroundColor: 'var(--muted)' }}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <button className="btn btn-primary">
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-opacity-75 transition-colors focus-ring"
                style={{ backgroundColor: 'var(--muted)' }}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-opacity-75 transition-colors focus-ring"
                style={{ backgroundColor: 'var(--muted)' }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fade-in" style={{ borderColor: 'var(--border)' }}>
              <div className="flex flex-col gap-4">
                <a href="#experiences" className="py-2 hover:opacity-75 transition-opacity">Experiences</a>
                <a href="#about" className="py-2 hover:opacity-75 transition-opacity">About Nepal</a>
                <a href="#contact" className="py-2 hover:opacity-75 transition-opacity">Contact</a>
                <button className="btn btn-primary mt-2">
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 himalayan-gradient">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="mb-6 text-white">
            Discover the Magic of Nepal
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Experience authentic adventures in the heart of the Himalayas. From sacred temples to towering peaks, 
            Nepal offers transformative journeys that connect you with nature, culture, and yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary bg-white text-primary hover:bg-gray-100">
              <Calendar className="h-5 w-5" />
              Plan Your Journey
            </button>
            <button className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
              <MapPin className="h-5 w-5" />
              Explore Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              Authentic Nepal Experiences
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Handpicked adventures that showcase Nepal's natural beauty and rich cultural heritage. 
              Each experience is designed to create lasting memories and deep connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <Dialog key={experience.id}>
                <DialogTrigger asChild>
                  <div className="card card-interactive cursor-pointer group">
                    {/* Image */}
                    <div className="relative mb-4 overflow-hidden" style={{ borderRadius: 'var(--radius)' }}>
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge 
                          className="text-xs px-2 py-1 text-white"
                          style={{ backgroundColor: getDifficultyColor(experience.difficulty) }}
                        >
                          {experience.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg leading-tight">{experience.title}</h3>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>

                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {experience.description}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current" style={{ color: 'var(--accent)' }} />
                            <span>{experience.rating}</span>
                          </div>
                        </div>
                        <div className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
                          {experience.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                {/* Detailed Modal */}
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{experience.title}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Hero Image */}
                    <div className="relative h-64 overflow-hidden" style={{ borderRadius: 'var(--radius)' }}>
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3" style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }}>
                        <Clock className="h-5 w-5 mx-auto mb-1" style={{ color: 'var(--primary)' }} />
                        <div className="text-sm font-medium">{experience.duration}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Duration</div>
                      </div>
                      <div className="text-center p-3" style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }}>
                        <Users className="h-5 w-5 mx-auto mb-1" style={{ color: 'var(--primary)' }} />
                        <div className="text-sm font-medium">{experience.groupSize}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Group Size</div>
                      </div>
                      <div className="text-center p-3" style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }}>
                        <Star className="h-5 w-5 mx-auto mb-1 fill-current" style={{ color: 'var(--accent)' }} />
                        <div className="text-sm font-medium">{experience.rating}/5</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Rating</div>
                      </div>
                      <div className="text-center p-3" style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }}>
                        <div className="text-lg font-bold" style={{ color: 'var(--primary)' }}>{experience.price}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Price</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Experience Overview</h3>
                      <p style={{ color: 'var(--text-muted)' }}>{experience.description}</p>
                    </div>

                    {/* Cultural Insight */}
                    <div className="p-4" style={{ backgroundColor: 'var(--mountain-mist)', borderRadius: 'var(--radius)' }}>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <span>🏔️</span>
                        Cultural Insight
                      </h3>
                      <p style={{ color: 'var(--text-muted)' }}>{experience.culturalInsight}</p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Experience Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {experience.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {experience.included.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)' }}>
                              <span className="text-xs text-white">✓</span>
                            </div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Best Time & Practical Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Best Time to Visit</h3>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{experience.bestTime}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Difficulty Level</h3>
                        <Badge 
                          className="text-sm px-3 py-1 text-white"
                          style={{ backgroundColor: getDifficultyColor(experience.difficulty) }}
                        >
                          {experience.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button className="btn btn-primary flex-1">
                        Book This Experience
                      </button>
                      <button className="btn btn-outline">
                        <Heart className="h-4 w-4" />
                        Save for Later
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mountain className="h-8 w-8" style={{ color: 'var(--primary)' }} />
              <span className="text-xl font-bold font-heading">Wanderly</span>
            </div>
            <p style={{ color: 'var(--text-muted)' }} className="mb-6">
              Authentic Nepal experiences that connect you with the heart of the Himalayas
            </p>
            <div className="flex justify-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              <a href="#" className="hover:opacity-75 transition-opacity">About</a>
              <a href="#" className="hover:opacity-75 transition-opacity">Contact</a>
              <a href="#" className="hover:opacity-75 transition-opacity">Terms</a>
              <a href="#" className="hover:opacity-75 transition-opacity">Privacy</a>
            </div>
            <div className="mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>
              Made with ❤️ for Nepal 🇳🇵
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
