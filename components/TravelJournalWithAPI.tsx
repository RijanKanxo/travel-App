import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MapPin, 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus,
  Camera,
  Calendar,
  Verified,
  Flag,
  BookOpen,
  Filter,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { journal } from '../utils/supabase/client';

interface TravelJournalWithAPIProps {
  currentUser: any;
  onAuthRequired: () => void;
}

export function TravelJournalWithAPI({ currentUser, onAuthRequired }: TravelJournalWithAPIProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [journalPosts, setJournalPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  
  const [newPost, setNewPost] = useState({
    title: '',
    location: '',
    content: '',
    tags: '',
    safety_rating: 5
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const { posts } = await journal.getPosts();
      setJournalPosts(posts || []);
    } catch (error: any) {
      setError('Failed to load journal posts');
      console.error('Fetch posts error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    if (!newPost.title || !newPost.content) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const { post } = await journal.createPost({
        title: newPost.title,
        location: newPost.location,
        content: newPost.content,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        safety_rating: newPost.safety_rating
      });

      setJournalPosts(prev => [post, ...prev]);
      setNewPost({ title: '', location: '', content: '', tags: '', safety_rating: 5 });
      setIsCreating(false);
    } catch (error: any) {
      setError(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    try {
      const { liked, likes } = await journal.likePost(postId);
      
      // Update local state
      setJournalPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, likes }
            : post
        )
      );

      // Update liked posts set
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (liked) {
          newSet.add(postId);
        } else {
          newSet.delete(postId);
        }
        return newSet;
      });
    } catch (error: any) {
      console.error('Like post error:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading && journalPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-nepal-crimson" />
            <span>Loading travel stories...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-nepal-crimson">Travel Journal</h1>
            <p className="text-muted-foreground">Share your Nepal adventures with fellow travelers</p>
          </div>
          <Button 
            onClick={() => currentUser ? setIsCreating(!isCreating) : onAuthRequired()}
            className="bg-nepal-crimson hover:bg-nepal-temple-red"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setError('')}
              className="ml-auto"
            >
              <Plus className="w-3 h-3 rotate-45" />
            </Button>
          </div>
        )}

        {/* Create Post Form */}
        {isCreating && currentUser && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Share Your Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Give your story a title..."
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Location (e.g., Kathmandu, Nepal)"
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                />
                <Input
                  placeholder="Tags (comma separated)"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                />
              </div>
              
              <Textarea
                placeholder="Tell your story... Share your experiences, tips, and insights to help fellow travelers!"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={6}
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Safety Rating: {newPost.safety_rating}/5</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newPost.safety_rating}
                  onChange={(e) => setNewPost({ ...newPost, safety_rating: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Unsafe</span>
                  <span>Very Safe</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Tag Location
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleCreatePost} 
                  className="bg-nepal-crimson hover:bg-nepal-temple-red"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    'Publish Story'
                  )}
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Stories</TabsTrigger>
            <TabsTrigger value="local">Local Insights</TabsTrigger>
            <TabsTrigger value="safety">Safety Tips</TabsTrigger>
            <TabsTrigger value="budget">Budget Travel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6 mt-6">
            {/* Journal Posts */}
            {journalPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No stories yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to share your Nepal adventure!
                </p>
                <Button 
                  onClick={() => currentUser ? setIsCreating(true) : onAuthRequired()}
                  className="bg-nepal-crimson hover:bg-nepal-temple-red"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Share Your Story
                </Button>
              </div>
            ) : (
              journalPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    {/* Author Info */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.author?.profile_image || `https://images.unsplash.com/photo-1494790108755-2616b612b993?w=100&h=100&fit=crop&crop=face`} />
                          <AvatarFallback>{post.author?.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{post.author?.name || 'Anonymous'}</span>
                            {post.author?.verified && (
                              <Verified className="w-4 h-4 text-nepal-prayer-flag-green" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {post.author?.nationality || 'Unknown'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {post.location || 'Nepal'}
                            <span>•</span>
                            <Calendar className="w-3 h-3" />
                            {formatTimeAgo(post.created_at)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Safety Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (post.safety_rating || 5)
                                ? 'bg-nepal-prayer-flag-green' 
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">Safety</span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="pl-12">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{post.content}</p>
                      
                      {/* Post Images */}
                      {post.images && post.images.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg overflow-hidden mt-4">
                          {post.images.map((image, index) => (
                            <ImageWithFallback
                              key={index}
                              src={image}
                              alt={`${post.title} - Image ${index + 1}`}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag.toLowerCase().replace(' ', '')}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`flex items-center gap-1 ${likedPosts.has(post.id) ? 'text-nepal-crimson' : ''}`}
                          onClick={() => handleLikePost(post.id)}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          {post.likes || 0}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments?.length || 0}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
