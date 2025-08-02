import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Download, 
  MapPin, 
  Wifi,
  WifiOff,
  FileText,
  Image,
  Map,
  Star,
  Clock,
  HardDrive,
  Check,
  X,
  Search,
  Filter,
  Play,
  Pause,
  Trash2,
  FolderOpen,
  Globe,
  Navigation,
  Camera,
  Book,
  Phone
} from 'lucide-react';

interface OfflineGuide {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  rating: number;
  reviews: number;
  estimatedSize: string;
  downloadTime: string;
  includes: string[];
  thumbnail: string;
  isDownloaded: boolean;
  downloadProgress?: number;
  lastUpdated: string;
}

interface DownloadTask {
  id: string;
  guideId: string;
  title: string;
  progress: number;
  status: 'downloading' | 'paused' | 'completed' | 'failed';
  speed: string;
  remainingTime: string;
}

const mockGuides: OfflineGuide[] = [
  {
    id: '1',
    title: 'Annapurna Circuit Complete Guide',
    description: 'Comprehensive offline guide including maps, accommodations, emergency contacts, and cultural insights.',
    location: 'Annapurna Region',
    category: 'Trekking',
    rating: 4.9,
    reviews: 234,
    estimatedSize: '45 MB',
    downloadTime: '~2 min',
    includes: ['Detailed Maps', 'Tea House Info', 'Emergency Contacts', 'Weather Data', 'Cultural Guide'],
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=200&fit=crop',
    isDownloaded: true,
    lastUpdated: '2025-01-15'
  },
  {
    id: '2',
    title: 'Kathmandu Valley Cultural Heritage',
    description: 'Explore UNESCO World Heritage sites with detailed offline information and audio guides.',
    location: 'Kathmandu Valley',
    category: 'Cultural',
    rating: 4.8,
    reviews: 189,
    estimatedSize: '67 MB',
    downloadTime: '~3 min',
    includes: ['Audio Guides', 'Historical Photos', 'Museum Info', 'Temple Guides', 'Food Recommendations'],
    thumbnail: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300&h=200&fit=crop',
    isDownloaded: false,
    lastUpdated: '2025-01-20'
  },
  {
    id: '3',
    title: 'Everest Base Camp Trek Guide',
    description: 'Essential guide for EBC trek with altitude information, acclimatization tips, and route maps.',
    location: 'Everest Region',
    category: 'Trekking',
    rating: 4.9,
    reviews: 445,
    estimatedSize: '78 MB',
    downloadTime: '~4 min',
    includes: ['Altitude Charts', 'Acclimatization Guide', 'Medical Info', 'Route Maps', 'Lodge Details'],
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    isDownloaded: false,
    downloadProgress: 65,
    lastUpdated: '2025-01-18'
  },
  {
    id: '4',
    title: 'Chitwan Wildlife Safari Guide',
    description: 'Complete guide to Chitwan National Park with wildlife spotting tips and jungle activities.',
    location: 'Chitwan National Park',
    category: 'Wildlife',
    rating: 4.7,
    reviews: 156,
    estimatedSize: '34 MB',
    downloadTime: '~1.5 min',
    includes: ['Wildlife Database', 'Safari Tips', 'Bird Guide', 'Lodge Info', 'Activity Schedule'],
    thumbnail: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300&h=200&fit=crop',
    isDownloaded: false,
    lastUpdated: '2025-01-12'
  },
  {
    id: '5',
    title: 'Pokhara Adventure Hub',
    description: 'Your complete guide to adventure activities around Pokhara including paragliding and boating.',
    location: 'Pokhara',
    category: 'Adventure',
    rating: 4.6,
    reviews: 203,
    estimatedSize: '29 MB',
    downloadTime: '~1 min',
    includes: ['Activity Guide', 'Weather Info', 'Equipment Rental', 'Safety Tips', 'Photo Spots'],
    thumbnail: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop',
    isDownloaded: true,
    lastUpdated: '2025-01-22'
  }
];

const categories = ['All', 'Trekking', 'Cultural', 'Wildlife', 'Adventure', 'Food', 'Transportation'];

export function OfflineGuideBuilder() {
  const [guides, setGuides] = useState<OfflineGuide[]>(mockGuides);
  const [downloadTasks, setDownloadTasks] = useState<DownloadTask[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('available');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [storageUsed, setStorageUsed] = useState(234); // MB
  const [storageTotal] = useState(1024); // MB

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Simulate download progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadTasks(prevTasks => 
        prevTasks.map(task => {
          if (task.status === 'downloading' && task.progress < 100) {
            const newProgress = Math.min(task.progress + Math.random() * 5, 100);
            const isCompleted = newProgress >= 100;
            
            if (isCompleted) {
              // Mark guide as downloaded
              setGuides(prevGuides => 
                prevGuides.map(guide => 
                  guide.id === task.guideId 
                    ? { ...guide, isDownloaded: true, downloadProgress: undefined }
                    : guide
                )
              );
            }
            
            return {
              ...task,
              progress: newProgress,
              status: isCompleted ? 'completed' : 'downloading',
              remainingTime: isCompleted ? '0s' : `${Math.floor((100 - newProgress) / 5)}s`
            };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter guides
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    
    if (activeTab === 'downloaded') {
      return matchesSearch && matchesCategory && guide.isDownloaded;
    }
    
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (guide: OfflineGuide) => {
    if (!isOnline) {
      alert('You need to be online to download guides');
      return;
    }

    const newTask: DownloadTask = {
      id: Date.now().toString(),
      guideId: guide.id,
      title: guide.title,
      progress: 0,
      status: 'downloading',
      speed: '2.1 MB/s',
      remainingTime: guide.downloadTime
    };

    setDownloadTasks(prev => [...prev, newTask]);
    setGuides(guides.map(g => 
      g.id === guide.id ? { ...g, downloadProgress: 0 } : g
    ));
  };

  const handlePauseResume = (taskId: string) => {
    setDownloadTasks(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'downloading' ? 'paused' : 'downloading' }
          : task
      )
    );
  };

  const handleCancelDownload = (taskId: string) => {
    const task = downloadTasks.find(t => t.id === taskId);
    if (task) {
      setGuides(guides.map(g => 
        g.id === task.guideId ? { ...g, downloadProgress: undefined } : g
      ));
      setDownloadTasks(tasks => tasks.filter(t => t.id !== taskId));
    }
  };

  const handleDelete = (guideId: string) => {
    setGuides(guides.map(guide => 
      guide.id === guideId ? { ...guide, isDownloaded: false } : guide
    ));
    
    const guide = guides.find(g => g.id === guideId);
    if (guide) {
      setStorageUsed(prev => Math.max(0, prev - parseInt(guide.estimatedSize)));
    }
  };

  const downloadedGuides = guides.filter(g => g.isDownloaded);
  const storagePercent = (storageUsed / storageTotal) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-nepal-crimson mb-4">
          Offline Guide Builder
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Download comprehensive guides to explore Nepal even without internet connection. Perfect for remote areas and mountain treks.
        </p>
      </div>

      {/* Connection Status */}
      <div className="mb-6">
        <Card className={`border-2 ${isOnline ? 'border-gray-200 bg-gray-50' : 'border-yellow-200 bg-yellow-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isOnline ? (
                  <>
                    <Wifi className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-800">Online - Downloads Available</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Offline - Using Downloaded Guides</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  <span>{downloadedGuides.length} guides downloaded</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Storage: {storageUsed}MB / {storageTotal}MB</span>
                  <Progress value={storagePercent} className="w-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search guides by location or activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Category:
          </span>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        {/* Available Guides */}
        <TabsContent value="available" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="relative">
                  <img
                    src={guide.thumbnail}
                    alt={guide.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={guide.isDownloaded ? "bg-gray-500" : "bg-gray-400"}>
                      {guide.isDownloaded ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Downloaded
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3 mr-1" />
                          Available
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary">
                      {guide.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{guide.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {guide.location}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{guide.rating}</span>
                      <span className="text-muted-foreground">({guide.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <HardDrive className="w-4 h-4" />
                      {guide.estimatedSize}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {guide.description}
                  </p>

                  {/* Includes */}
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Includes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {guide.includes.slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {guide.includes.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{guide.includes.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Download Progress */}
                  {guide.downloadProgress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Downloading...</span>
                        <span>{guide.downloadProgress}%</span>
                      </div>
                      <Progress value={guide.downloadProgress} />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2">
                    {guide.isDownloaded ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <FolderOpen className="w-4 h-4 mr-2" />
                          Open Guide
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(guide.id)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : guide.downloadProgress !== undefined ? (
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Download className="w-4 h-4 mr-2 animate-spin" />
                        Downloading...
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="w-full bg-nepal-crimson hover:bg-nepal-crimson/90"
                        onClick={() => handleDownload(guide)}
                        disabled={!isOnline}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download ({guide.estimatedSize})
                      </Button>
                    )}
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Est. {guide.downloadTime}</span>
                      <span>Updated {new Date(guide.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Downloaded Guides */}
        <TabsContent value="downloaded" className="mt-8">
          {downloadedGuides.length === 0 ? (
            <div className="text-center py-12">
              <Download className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Downloaded Guides</h3>
              <p className="text-muted-foreground mb-4">
                Download some guides to access them offline during your travels.
              </p>
              <Button onClick={() => setActiveTab('available')} className="bg-nepal-crimson hover:bg-nepal-crimson/90">
                Browse Available Guides
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadedGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative">
                    <img
                      src={guide.thumbnail}
                      alt={guide.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gray-500">
                        <Check className="w-3 h-3 mr-1" />
                        Downloaded
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{guide.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {guide.location}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <span className="text-sm text-muted-foreground">{guide.estimatedSize}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-nepal-crimson hover:bg-nepal-crimson/90">
                        <Book className="w-4 h-4 mr-2" />
                        Open Guide
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(guide.id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Active Downloads */}
        <TabsContent value="downloads" className="mt-8">
          {downloadTasks.length === 0 ? (
            <div className="text-center py-12">
              <Download className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Active Downloads</h3>
              <p className="text-muted-foreground">
                Start downloading guides to see progress here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {downloadTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{task.title}</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePauseResume(task.id)}
                          disabled={task.status === 'completed'}
                        >
                          {task.status === 'downloading' ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancelDownload(task.id)}
                          disabled={task.status === 'completed'}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{task.status}</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{task.speed}</span>
                        <span>{task.remainingTime} remaining</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Bottom spacing to prevent navbar overlap */}
      <div className="h-32"></div>
    </div>
  );
}
