import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  MapPin, 
  BookOpen, 
  ShoppingBag, 
  Download, 
  MessageCircle, 
  Bell,
  Wifi,
  WifiOff,
  Shield,
  User,
  Settings
} from 'lucide-react';

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

interface MainNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: User;
  profile: UserProfile;
  hasNewAlerts: boolean;
  isOnline: boolean;
}

export function MainNavigation({ 
  activeTab, 
  onTabChange, 
  user, 
  profile, 
  hasNewAlerts, 
  isOnline 
}: MainNavigationProps) {
  const tabs = [
    { id: 'discover', label: 'Discover', icon: MapPin },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'offline', label: 'Offline Guide', icon: Download },
    { id: 'help', label: 'Help', icon: MessageCircle },
    { id: 'alerts', label: 'Alerts', icon: Bell }
  ];

  // Determine safety zone based on user location and profile
  const getSafetyStatus = () => {
    if (profile.safety_rating >= 4.5) {
      return { status: 'Safe Zone', color: 'text-nepal-prayer-flag-green' };
    } else if (profile.safety_rating >= 3.5) {
      return { status: 'Caution', color: 'text-nepal-saffron' };
    } else {
      return { status: 'Check Updates', color: 'text-red-500' };
    }
  };

  const safetyStatus = getSafetyStatus();

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-nepal-crimson rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-nepal-crimson">Saathi</h1>
              <p className="text-xs text-muted-foreground">Travel Nepal Authentically</p>
            </div>
          </div>

          {/* User Profile and Status */}
          <div className="flex items-center space-x-4">
            {/* Safety Status - Hidden on small screens */}
            <div className="hidden lg:flex items-center space-x-1">
              <Shield className={`w-4 h-4 ${safetyStatus.color}`} />
              <span className={`text-sm ${safetyStatus.color}`}>{safetyStatus.status}</span>
            </div>

            {/* Online/Offline Status */}
            <div className="flex items-center space-x-1">
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-nepal-prayer-flag-green" />
                  <span className="text-sm text-nepal-prayer-flag-green hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-nepal-saffron" />
                  <span className="text-sm text-nepal-saffron hidden sm:inline">Offline</span>
                </>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{profile.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      profile.user_type === 'local_guide' 
                        ? 'text-nepal-saffron border-nepal-saffron' 
                        : 'text-nepal-royal-blue border-nepal-royal-blue'
                    }`}
                  >
                    {profile.user_type === 'local_guide' ? 'Local Guide' : 'Traveler'}
                  </Badge>
                  {profile.verified && (
                    <Shield className="w-3 h-3 text-nepal-prayer-flag-green" />
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTabChange('profile')}
                className="p-1"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-nepal-mountain-blue text-white">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-auto p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center space-y-1 py-2 data-[state=active]:bg-nepal-crimson data-[state=active]:text-white relative"
                >
                  <div className="relative">
                    <Icon className="w-4 h-4" />
                    {tab.id === 'alerts' && hasNewAlerts && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-nepal-gold rounded-full" />
                    )}
                    {tab.id === 'help' && !isOnline && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-nepal-saffron rounded-full" />
                    )}
                  </div>
                  <span className="text-xs hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Quick Status Bar - Mobile Only */}
        <div className="flex sm:hidden items-center justify-between py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{profile.name}</span>
            {profile.verified && <Shield className="w-3 h-3 text-nepal-prayer-flag-green" />}
          </div>
          <div className="flex items-center gap-2">
            <span className={safetyStatus.color}>{safetyStatus.status}</span>
            <span>•</span>
            <span className={isOnline ? 'text-nepal-prayer-flag-green' : 'text-nepal-saffron'}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}