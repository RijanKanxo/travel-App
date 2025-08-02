import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  Shield, 
  Star,
  Languages,
  Briefcase,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    user_type: string;
    location: string;
    verified: boolean;
  };
}

interface UserProfile {
  user_id: string;
  name: string;
  email: string;
  user_type: string;
  location: string;
  verified: boolean;
  bio: string;
  languages: string[];
  experience_years: number;
  specialties: string[];
  safety_rating: number;
  rating: number;
  review_count: number;
}

interface AuthSystemProps {
  onAuthChange: (user: User | null, profile: UserProfile | null) => void;
}

export function AuthSystem({ onAuthChange }: AuthSystemProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Signup form
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'traveler',
    location: '',
    agreeToTerms: false
  });

  // Profile form
  const [profileForm, setProfileForm] = useState({
    bio: '',
    languages: ['English'],
    experience_years: 0,
    specialties: []
  });

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user as User);
        setIsLoggedIn(true);
        await fetchUserProfile(session.access_token);
      }
    } catch (error) {
      console.log('Auth check error:', error);
    }
  };

  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-011f0f30/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.profile);
        onAuthChange(currentUser, data.profile);
      }
    } catch (error) {
      console.log('Profile fetch error:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.session?.user) {
        setCurrentUser(data.session.user as User);
        setIsLoggedIn(true);
        await fetchUserProfile(data.session.access_token);
        setLoginForm({ email: '', password: '' });
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.log('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!signupForm.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-011f0f30/auth/signup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signupForm.email,
          password: signupForm.password,
          name: signupForm.name,
          userType: signupForm.userType,
          location: signupForm.location
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      // After successful signup, try to log in
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: signupForm.email,
        password: signupForm.password
      });

      if (loginError) {
        setError('Account created but login failed. Please try logging in.');
        setActiveTab('login');
        return;
      }

      if (loginData.session?.user) {
        setCurrentUser(loginData.session.user as User);
        setIsLoggedIn(true);
        setUserProfile(data.profile);
        onAuthChange(loginData.session.user as User, data.profile);
        setSignupForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          userType: 'traveler',
          location: '',
          agreeToTerms: false
        });
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.log('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      setUserProfile(null);
      setIsLoggedIn(false);
      onAuthChange(null, null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError('Please log in again');
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-011f0f30/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileForm)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Profile update failed');
        return;
      }

      setUserProfile(data.profile);
      onAuthChange(currentUser, data.profile);
    } catch (error) {
      setError('Profile update failed. Please try again.');
      console.log('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn && currentUser && userProfile) {
    return (
      <div className="space-y-6">
        {/* User Profile Display */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-nepal-crimson rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {userProfile.name}
                    {userProfile.verified && (
                      <Shield className="w-4 h-4 text-nepal-prayer-flag-green" />
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-nepal-saffron border-nepal-saffron">
                      {userProfile.user_type === 'traveler' ? 'Traveler' : 'Local Guide'}
                    </Badge>
                    {userProfile.location && (
                      <>
                        <MapPin className="w-3 h-3" />
                        <span>{userProfile.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-nepal-gold" />
                <span className="text-sm">
                  {userProfile.rating > 0 ? `${userProfile.rating} (${userProfile.review_count} reviews)` : 'No reviews yet'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-nepal-prayer-flag-green" />
                <span className="text-sm">Safety Rating: {userProfile.safety_rating}/5</span>
              </div>
              {userProfile.user_type === 'local_guide' && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-nepal-royal-blue" />
                  <span className="text-sm">{userProfile.experience_years} years experience</span>
                </div>
              )}
            </div>
            
            {userProfile.bio && (
              <p className="text-sm text-muted-foreground mt-3">{userProfile.bio}</p>
            )}
            
            {userProfile.languages.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <Languages className="w-4 h-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {userProfile.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <Textarea
                placeholder="Tell others about yourself..."
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                rows={3}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Languages</label>
                  <Input
                    placeholder="e.g., English, Nepali, Hindi"
                    value={profileForm.languages.join(', ')}
                    onChange={(e) => setProfileForm({ 
                      ...profileForm, 
                      languages: e.target.value.split(',').map(l => l.trim()).filter(l => l)
                    })}
                  />
                </div>
                
                {userProfile.user_type === 'local_guide' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Years of Experience</label>
                    <Input
                      type="number"
                      min="0"
                      value={profileForm.experience_years}
                      onChange={(e) => setProfileForm({ 
                        ...profileForm, 
                        experience_years: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className="bg-nepal-crimson hover:bg-nepal-temple-red"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-nepal-crimson rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-nepal-crimson">Welcome to Saathi</CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect with locals and fellow travelers in Nepal
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-nepal-crimson hover:bg-nepal-temple-red"
                  disabled={loading}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Your full name"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">I am a...</label>
                  <Select 
                    value={signupForm.userType} 
                    onValueChange={(value) => setSignupForm({ ...signupForm, userType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traveler">Traveler</SelectItem>
                      <SelectItem value="local_guide">Local Guide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Your city/country"
                      value={signupForm.location}
                      onChange={(e) => setSignupForm({ ...signupForm, location: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={signupForm.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setSignupForm({ ...signupForm, agreeToTerms: checked as boolean })
                    }
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions
                  </label>
                </div>

                {error && (
                  <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-nepal-crimson hover:bg-nepal-temple-red"
                  disabled={loading || !signupForm.agreeToTerms}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
