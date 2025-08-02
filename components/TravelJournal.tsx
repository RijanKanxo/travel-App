import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Camera,
  Heart,
  MessageCircle,
  Share,
  Edit,
  Trash2,
  Image as ImageIcon,
  Star,
  Clock,
  Users,
  Mountain,
  Eye,
  BookOpen,
  Filter,
  Search
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  location: string;
  date: string;
  images: string[];
  tags: string[];
  mood: 'amazing' | 'good' | 'okay' | 'challenging';
  isPublic: boolean;
  likes: number;
  comments: number;
  views: number;
  weather?: string;
  companions?: string[];
}

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'Sunrise at Poon Hill',
    content: 'Woke up at 4 AM for the trek to Poon Hill. The sunrise over the Annapurna range was absolutely breathtaking! The golden light hitting the snow-capped peaks created a magical moment I\'ll never forget. Met some amazing fellow trekkers from Germany and Australia.',
    location: 'Poon Hill, Annapurna',
    date: '2025-07-15',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
    ],
    tags: ['Sunrise', 'Trekking', 'Mountains', 'Photography'],
    mood: 'amazing',
    isPublic: true,
    likes: 24,
    comments: 8,
    views: 156,
    weather: 'Clear skies',
    companions: ['Maria (Germany)', 'Jake (Australia)']
  },
  {
    id: '2',
    title: 'Cultural Immersion in Bhaktapur',
    content: 'Spent the entire day exploring Bhaktapur Durbar Square. The intricate wood carvings and traditional architecture are mind-blowing. Had the best juju dhau (king curd) and learned about pottery making from local artisans.',
    location: 'Bhaktapur Durbar Square',
    date: '2025-07-20',
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
    ],
    tags: ['Culture', 'Heritage', 'Art', 'Food'],
    mood: 'good',
    isPublic: true,
    likes: 18,
    comments: 12,
    views: 203,
    weather: 'Partly cloudy'
  },
  {
    id: '3',
    title: 'Challenging Day on EBC Trek',
    content: 'Day 8 of the Everest Base Camp trek. The altitude is really getting to me today. Headache and nausea made it tough, but the determination to reach base camp keeps me going. The landscape is becoming more dramatic with each step.',
    location: 'Dingboche, Everest Region',
    date: '2025-07-25',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
    ],
    tags: ['EBC', 'Altitude', 'Challenge', 'Perseverance'],
    mood: 'challenging',
    isPublic: false,
    likes: 0,
    comments: 0,
    views: 0,
    weather: 'Cold, windy',
    companions: ['Guide Pemba', 'Porter Nima']
  }
];

const moodEmojis = {
  amazing: '🤩',
  good: '😊',
  okay: '😐',
  challenging: '😤'
};

const moodColors = {
  amazing: 'bg-gray-100 text-gray-700',
  good: 'bg-gray-200 text-gray-800',
  okay: 'bg-yellow-100 text-yellow-700',
  challenging: 'bg-red-100 text-red-700'
};

export function TravelJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    location: '',
    tags: '',
    mood: 'good' as const,
    isPublic: true,
    weather: '',
    companions: ''
  });

  // Filter entries
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMood = selectedMood === 'all' || entry.mood === selectedMood;
    
    if (activeTab === 'public') {
      return matchesSearch && matchesMood && entry.isPublic;
    } else if (activeTab === 'private') {
      return matchesSearch && matchesMood && !entry.isPublic;
    }
    
    return matchesSearch && matchesMood;
  });

  const handleCreateEntry = () => {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      location: newEntry.location,
      date: new Date().toISOString().split('T')[0],
      images: [], // Would handle image upload in real app
      tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      mood: newEntry.mood,
      isPublic: newEntry.isPublic,
      likes: 0,
      comments: 0,
      views: 0,
      weather: newEntry.weather,
      companions: newEntry.companions.split(',').map(c => c.trim()).filter(Boolean)
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      title: '',
      content: '',
      location: '',
      tags: '',
      mood: 'good',
      isPublic: true,
      weather: '',
      companions: ''
    });
    setIsCreateDialogOpen(false);
  };

  const handleLike = (id: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, likes: entry.likes + 1 } : entry
    ));
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-nepal-crimson mb-2">Travel Journal</h1>
          <p className="text-muted-foreground">Capture and share your Nepal adventures</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-nepal-crimson hover:bg-nepal-crimson/90">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Journal Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  placeholder="Give your entry a title..."
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="Where were you?"
                  value={newEntry.location}
                  onChange={(e) => setNewEntry({...newEntry, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Story</label>
                <Textarea
                  placeholder="Tell us about your experience..."
                  rows={6}
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <Input
                    placeholder="adventure, culture, food (comma separated)"
                    value={newEntry.tags}
                    onChange={(e) => setNewEntry({...newEntry, tags: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mood</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newEntry.mood}
                    onChange={(e) => setNewEntry({...newEntry, mood: e.target.value as any})}
                  >
                    <option value="amazing">🤩 Amazing</option>
                    <option value="good">😊 Good</option>
                    <option value="okay">😐 Okay</option>
                    <option value="challenging">😤 Challenging</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Weather</label>
                  <Input
                    placeholder="Sunny, cloudy, rainy..."
                    value={newEntry.weather}
                    onChange={(e) => setNewEntry({...newEntry, weather: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Companions</label>
                  <Input
                    placeholder="Who were you with? (comma separated)"
                    value={newEntry.companions}
                    onChange={(e) => setNewEntry({...newEntry, companions: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newEntry.isPublic}
                  onChange={(e) => setNewEntry({...newEntry, isPublic: e.target.checked})}
                />
                <label htmlFor="isPublic" className="text-sm">Make this entry public</label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreateEntry} className="bg-nepal-crimson hover:bg-nepal-crimson/90">
                  Create Entry
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search your entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Mood:
          </span>
          {['all', 'amazing', 'good', 'okay', 'challenging'].map(mood => (
            <Button
              key={mood}
              variant={selectedMood === mood ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMood(mood)}
              className="capitalize"
            >
              {mood === 'all' ? 'All' : `${moodEmojis[mood as keyof typeof moodEmojis]} ${mood}`}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">All Entries</TabsTrigger>
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-nepal-crimson" />
                  <div>
                    <p className="text-2xl font-bold">{entries.length}</p>
                    <p className="text-sm text-muted-foreground">Total Entries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">{entries.reduce((sum, entry) => sum + entry.likes, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-8 h-8 text-gray-600" />
                  <div>
                    <p className="text-2xl font-bold">{entries.reduce((sum, entry) => sum + entry.views, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-gray-600" />
                  <div>
                    <p className="text-2xl font-bold">{entries.reduce((sum, entry) => sum + entry.comments, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Comments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Entries */}
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="overflow-hidden hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{entry.title}</h3>
                        <Badge className={moodColors[entry.mood]}>
                          {moodEmojis[entry.mood]} {entry.mood}
                        </Badge>
                        {!entry.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            Private
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(entry.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {entry.location}
                        </div>
                        {entry.weather && (
                          <div className="flex items-center gap-1">
                            <span>🌤️</span>
                            {entry.weather}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Images */}
                  {entry.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {entry.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`${entry.title} - ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform cursor-pointer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">{entry.content}</p>

                  {/* Companions */}
                  {entry.companions && entry.companions.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Travel Companions:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {entry.companions.map((companion, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {companion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {entry.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(entry.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        {entry.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {entry.comments}
                      </Button>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {entry.views}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No entries found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'all' 
                  ? "Start documenting your Nepal adventure by creating your first journal entry."
                  : `No ${activeTab} entries match your search criteria.`
                }
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-nepal-crimson hover:bg-nepal-crimson/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Entry
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Bottom spacing to prevent navbar overlap */}
      <div className="h-32"></div>
    </div>
  );
}
