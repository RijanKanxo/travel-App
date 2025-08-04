import React, { useState } from 'react';
import { 
  Search,
  X,
  Clock,
  Hotel,
  Mountain,
  Utensils,
  Camera,
  Car,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface UnifiedSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmit?: (query: string) => void;
  activeTab: string;
  variant?: 'navbar' | 'hero';
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
}

export function UnifiedSearchBar({
  searchQuery,
  onSearchChange,
  onSubmit,
  activeTab,
  variant = 'navbar',
  isExpanded = false,
  onExpandedChange,
  className = ''
}: UnifiedSearchBarProps) {
  const [internalExpanded, setInternalExpanded] = useState(variant === 'hero' ? true : isExpanded);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Smart section tags - these appear based on context
  const sectionTags = [
    { id: 'journal', label: 'Journal', color: 'bg-blue-500' },
    { id: 'marketplace', label: 'Marketplace', color: 'bg-purple-500' },
    { id: 'offline', label: 'Offline', color: 'bg-orange-500' },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'places', label: 'Places', icon: Mountain },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'activities', label: 'Activities', icon: Camera },
    { id: 'transport', label: 'Transport', icon: Car },
  ];

  // Extended recent searches for hero variant
  const recentSearches = variant === 'hero' 
    ? [
        'Everest Base Camp Trek',
        'Pokhara Hotels', 
        'Kathmandu Restaurants',
        'Annapurna Circuit',
        'Chitwan Safari',
        'Lumbini Temple',
        'Mustang Adventure',
        'Gokyo Lakes Trek',
        'Bandipur Heritage',
        'Rara Lake National Park',
        'Poon Hill Sunrise',
        'Manaslu Circuit',
        'Upper Dolpo Trek',
        'Langtang Valley',
        'Phewa Lake Boating'
      ]
    : [
        'Everest Base Camp',
        'Pokhara Hotels',
        'Kathmandu Restaurants',
        'Annapurna Trek'
      ];

  // Auto-detect current section and add appropriate tag
  React.useEffect(() => {
    if (activeTab !== 'home' && activeTab !== 'discover') {
      // Auto-add section tag when not on home page
      if (!selectedTags.includes(activeTab)) {
        setSelectedTags(prev => {
          // Remove other section tags and add current one
          const filtered = prev.filter(tag => !sectionTags.some(st => st.id === tag));
          return [...filtered, activeTab];
        });
      }
    } else {
      // On home page, remove auto-added section tags but keep manual ones
      setSelectedTags(prev => prev.filter(tag => !sectionTags.some(st => st.id === tag)));
    }
  }, [activeTab]);

  const expanded = variant === 'hero' ? true : internalExpanded;

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tagId));
  };

  const handleSearchExpand = () => {
    if (variant === 'navbar') {
      setInternalExpanded(true);
      onExpandedChange?.(true);
    }
  };

  const handleSearchCollapse = () => {
    if (variant === 'navbar') {
      setInternalExpanded(false);
      onExpandedChange?.(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSubmit?.(searchQuery);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    onSearchChange(search);
    if (variant === 'navbar') {
      handleSearchCollapse();
    }
  };

  const baseInputClassName = variant === 'hero' 
    ? "w-full pl-12 pr-20 py-4 text-lg bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-xl focus:border-gray-400 focus:ring-4 focus:ring-gray-200/50 transition-all duration-500 ease-out h-16 hover:shadow-2xl"
    : `pr-4 py-3 transition-all duration-500 ease-out rounded-full text-lg border border-gray-200 bg-white focus:ring-4 focus:ring-green-500/30 focus:border-green-400 hover:border-gray-300 ${
        selectedTags.length > 0 ? 'pl-32' : 'pl-12'
      }`;

  const panelClassName = variant === 'hero'
    ? "mt-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden max-h-[20vh] flex flex-col"
    : `absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-500 ease-out transform origin-top ${
        expanded ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-0 opacity-0 -translate-y-4 pointer-events-none'
      }`;

  return (
    <div className={`${variant === 'navbar' ? 'relative' : ''} ${className}`}>
      <div className={variant === 'navbar' ? `transition-all duration-500 ease-out ${
        expanded ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg hover:shadow-xl'
      }` : ''}>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 transition-colors duration-300 ${
              variant === 'hero' ? 'w-6 h-6' : 'w-5 h-5'
            }`} />
            
            {/* Selected Tags - only for navbar variant */}
            {variant === 'navbar' && selectedTags.length > 0 && (
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2 flex items-center gap-1 z-10">
                {selectedTags.map(tagId => {
                  const sectionTag = sectionTags.find(st => st.id === tagId);
                  const isAutoTag = activeTab === tagId && activeTab !== 'home';
                  return (
                    <div
                      key={tagId}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white font-medium ${
                        sectionTag ? sectionTag.color : 'bg-gray-500'
                      }`}
                    >
                      <span>{sectionTag?.label || tagId}</span>
                      {!isAutoTag && (
                        <button
                          onClick={() => removeTag(tagId)}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            
            <Input
              placeholder={
                variant === 'hero' 
                  ? "Where do you want to explore in Nepal?"
                  : selectedTags.length > 0 
                    ? "Continue searching..." 
                    : "Search destinations, places, activities..."
              }
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={handleSearchExpand}
              className={baseInputClassName}
            />
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {variant === 'hero' && (
                <Button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 mr-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              )}
              {variant === 'navbar' && expanded && (
                <>
                  <Button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 mr-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSearchCollapse}
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 mr-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              )}
              <Button
                type="submit"
                className={variant === 'hero' 
                  ? "px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  : "px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition-all duration-300"
                }
              >
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Expanded Search Panel */}
        {(expanded || variant === 'hero') && (
          <div className={panelClassName}>
          <div className="p-6 h-full overflow-y-auto">
            {/* Filter Toggle Section for Hero Variant */}
            {variant === 'hero' && (
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Search Options</h3>
                <Button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  <SlidersHorizontal className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}

            {/* Recent Searches - Always visible */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h4>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 text-left hover:bg-gray-50 rounded-lg"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <Clock className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-700">{search}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Section Separator */}
            {(variant === 'navbar' || showFilters) && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Search Filters
                </h4>

            {/* Filters - Conditionally rendered based on showFilters state */}
            {(variant === 'navbar' || showFilters) && (
              <>
                {/* Section Tags - Only show on home page */}
                {(activeTab === 'home' || activeTab === 'discover') && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Search in Section</h4>
                    <div className="flex flex-wrap gap-2">
                      {sectionTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag.id);
                        return (
                          <Button
                            key={tag.id}
                            onClick={() => toggleTag(tag.id)}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                              isSelected 
                                ? `${tag.color} text-white hover:opacity-90` 
                                : 'border-gray-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800'
                            }`}
                          >
                            {tag.label}
                            {isSelected && <X className="w-3 h-3 ml-2" />}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

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

                {/* Additional Filters - Only for hero variant */}
                {variant === 'hero' && (
                  <>
                    {/* Price Range */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range (USD)</h4>
                      <div className="flex items-center space-x-4">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Trip Duration</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['1 Day', '2-3 Days', '4-7 Days', '1-2 Weeks', '2+ Weeks', 'Custom'].map((duration) => (
                          <label key={duration} className="flex items-center space-x-2">
                            <input type="radio" name="duration" className="rounded" />
                            <span className="text-sm text-gray-700">{duration}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Level */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Difficulty Level</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Easy', 'Moderate', 'Challenging', 'Expert'].map((level) => (
                          <Button
                            key={level}
                            variant="outline"
                            size="sm"
                            className="rounded-full px-3 py-1 text-sm border-gray-200 hover:bg-gray-100"
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                </>
              )}
          </div>
        )}
      </div>

      {/* Overlay for expanded search - navbar only */}
      {variant === 'navbar' && expanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={handleSearchCollapse}
        />
      )}
    </div>
  );
}
