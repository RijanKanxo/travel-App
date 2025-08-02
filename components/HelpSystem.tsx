import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MessageCircle, 
  Plus,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Verified,
  Send,
  Filter,
  Bell,
  Star
} from 'lucide-react';

export function HelpSystem() {
  const [newQuestion, setNewQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const questions = [
    {
      id: 1,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        nationality: 'UK'
      },
      question: 'Is it safe for a solo female traveler to walk around Thamel at night?',
      location: 'Thamel, Kathmandu',
      category: 'Safety',
      posted: '2 hours ago',
      status: 'answered',
      urgency: 'high',
      responses: [
        {
          id: 1,
          responder: {
            name: 'Sita Rai',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b993?w=100&h=100&fit=crop&crop=face',
            isLocal: true,
            verified: true,
            rating: 4.9
          },
          response: 'Thamel is generally safe at night, especially the main streets which are well-lit and have police presence. I\'d recommend staying on the main roads and avoiding the narrow alleys after 10 PM. The area around Garden of Dreams and Kathmandu Guest House is particularly safe.',
          helpful: 15,
          posted: '1 hour ago'
        },
        {
          id: 2,
          responder: {
            name: 'Sarah Chen',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b993?w=100&h=100&fit=crop&crop=face',
            isLocal: false,
            verified: false,
            rating: 0
          },
          response: 'I walked around Thamel at night many times during my stay. Just use common sense - stick to busy areas, don\'t flash expensive items, and trust your instincts. I never felt unsafe.',
          helpful: 8,
          posted: '30 minutes ago'
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        nationality: 'USA'
      },
      question: 'What\'s the best way to get from Kathmandu to Pokhara? Bus vs flight?',
      location: 'Kathmandu to Pokhara',
      category: 'Transportation',
      posted: '4 hours ago',
      status: 'answered',
      urgency: 'medium',
      responses: [
        {
          id: 1,
          responder: {
            name: 'Raj Thapa',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            isLocal: true,
            verified: true,
            rating: 4.8
          },
          response: 'Flight is 25 minutes vs 6-8 hours by bus. Buddha Air and Yeti Airlines fly this route. If budget allows, definitely fly - the mountain views are incredible! Tourist buses are comfortable but the road can be bumpy. Greenline and Golden Travels are good options.',
          helpful: 22,
          posted: '3 hours ago'
        }
      ]
    },
    {
      id: 3,
      user: {
        name: 'Lisa Parker',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        nationality: 'Australia'
      },
      question: 'Emergency! Lost my passport in Bhaktapur. What should I do?',
      location: 'Bhaktapur',
      category: 'Emergency',
      posted: '20 minutes ago',
      status: 'urgent',
      urgency: 'emergency',
      responses: []
    },
    {
      id: 4,
      user: {
        name: 'Carlos Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        nationality: 'Spain'
      },
      question: 'Best local restaurants in Patan for authentic Newari food?',
      location: 'Patan',
      category: 'Food',
      posted: '6 hours ago',
      status: 'answered',
      urgency: 'low',
      responses: [
        {
          id: 1,
          responder: {
            name: 'Kamala Shrestha',
            avatar: 'https://images.unsplash.com/photo-1559548331-f9cb98fbf5d6?w=100&h=100&fit=crop&crop=face',
            isLocal: true,
            verified: true,
            rating: 4.9
          },
          response: 'Try Dhokaima Cafe near Patan Durbar Square - they serve excellent traditional Newari thali. Also, Swotha Restaurant has amazing yomari and chatamari. For a more local experience, visit any of the small eateries around Mangal Bazaar.',
          helpful: 18,
          posted: '5 hours ago'
        }
      ]
    }
  ];

  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      // In a real app, this would submit to backend
      console.log('Asking question:', newQuestion);
      setNewQuestion('');
      setIsAsking(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered': return <CheckCircle className="w-4 h-4 text-nepal-prayer-flag-green" />;
      case 'urgent': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-nepal-saffron" />;
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-nepal-crimson">Help & Q&A</h1>
          <p className="text-muted-foreground">
            Get real-time help from locals and experienced travelers
          </p>
        </div>
        <Button 
          onClick={() => setIsAsking(true)}
          className="bg-nepal-crimson hover:bg-nepal-temple-red"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-nepal-crimson">98%</div>
            <div className="text-sm text-muted-foreground">Response Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">&lt; 2h</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-nepal-prayer-flag-green">47</div>
            <div className="text-sm text-muted-foreground">Local Helpers Online</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-nepal-saffron">1.2k</div>
            <div className="text-sm text-muted-foreground">Questions Answered</div>
          </CardContent>
        </Card>
      </div>

      {/* Ask Question Form */}
      {isAsking && (
        <Card>
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Location (e.g., Kathmandu, Pokhara)" />
              <select className="px-3 py-2 border rounded-md">
                <option>Select Category</option>
                <option>Safety</option>
                <option>Transportation</option>
                <option>Food & Dining</option>
                <option>Accommodation</option>
                <option>Activities</option>
                <option>Emergency</option>
              </select>
            </div>
            
            <Textarea
              placeholder="Ask your question... Be specific to get better answers!"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              rows={4}
            />
            
            <div className="flex items-center gap-2">
              <input type="checkbox" id="urgent" />
              <label htmlFor="urgent" className="text-sm">
                This is urgent (emergency situations)
              </label>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleAskQuestion} className="bg-nepal-crimson hover:bg-nepal-temple-red">
                <Send className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
              <Button variant="outline" onClick={() => setIsAsking(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search questions, locations, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Questions and Answers */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="my-questions">My Questions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4 mt-6">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="overflow-hidden">
              <CardContent className="p-6 space-y-4">
                {/* Question Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={question.user.avatar} />
                      <AvatarFallback>
                        {question.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{question.user.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {question.user.nationality}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {question.location}
                        <span>•</span>
                        <span>{question.posted}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getUrgencyColor(question.urgency)}`} />
                    {getStatusIcon(question.status)}
                    <Badge variant="secondary" className="text-xs">
                      {question.category}
                    </Badge>
                  </div>
                </div>

                {/* Question */}
                <div className="pl-12">
                  <h3 className="font-medium mb-2">{question.question}</h3>
                  
                  {/* Responses */}
                  {question.responses.length > 0 ? (
                    <div className="space-y-3 mt-4">
                      {question.responses.map((response) => (
                        <div key={response.id} className="border-l-2 border-nepal-mountain-blue pl-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={response.responder.avatar} />
                                <AvatarFallback className="text-xs">
                                  {response.responder.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{response.responder.name}</span>
                              {response.responder.isLocal && (
                                <Badge className="text-xs bg-nepal-saffron">Local</Badge>
                              )}
                              {response.responder.verified && (
                                <Verified className="w-3 h-3 text-nepal-prayer-flag-green" />
                              )}
                              {response.responder.rating > 0 && (
                                <div className="flex items-center gap-1 text-xs">
                                  <Star className="w-3 h-3 fill-nepal-gold text-nepal-gold" />
                                  <span>{response.responder.rating}</span>
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{response.posted}</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">{response.response}</p>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              <span className="text-xs">{response.helpful}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-1">
                              <MessageCircle className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-nepal-saffron/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-nepal-saffron" />
                        <span className="text-sm font-medium">
                          {question.urgency === 'emergency' ? 'Emergency - Needs immediate help!' : 'Waiting for answers...'}
                        </span>
                      </div>
                      <Button size="sm" className="mt-2 bg-nepal-crimson hover:bg-nepal-temple-red">
                        Help Answer
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
