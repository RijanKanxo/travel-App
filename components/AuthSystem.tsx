import React, { useState } from 'react';
import { Heart, User, MapPin } from 'lucide-react';

interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: 'Traveler' | 'Local Guide' | 'Business Owner';
  location?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  verified: boolean;
  created_at: string;
}

interface AuthSystemProps {
  onAuthStateChange: (isLoggedIn: boolean, user?: User) => void;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  userType: 'traveler' | 'local' | '';
}

export default function AuthSystem({ onAuthStateChange }: AuthSystemProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    userType: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    {
      id: 'traveler',
      title: 'Explorer',
      description: 'Discover Nepal\'s hidden gems',
      icon: MapPin
    },
    {
      id: 'local',
      title: 'Local Guide',
      description: 'Share your local knowledge',
      icon: User
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleUserTypeSelect = (type: 'traveler' | 'local') => {
    setFormData(prev => ({ ...prev, userType: type }));
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('Please enter a valid email');
    }

    if (!formData.password) {
      newErrors.push('Password is required');
    } else if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters');
    }

    if (mode === 'signup') {
      if (!formData.fullName) {
        newErrors.push('Full name is required');
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.push('Passwords do not match');
      }
      if (!formData.userType) {
        newErrors.push('Please select your user type');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Create a mock user for demo purposes
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email: formData.email,
        full_name: 'Demo User',
        user_type: 'Traveler',
        verified: true,
        created_at: new Date().toISOString()
      };
      onAuthStateChange(true, mockUser);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Create a mock user for demo purposes
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email: formData.email,
        full_name: formData.fullName,
        user_type: formData.userType === 'local' ? 'Local Guide' : 'Traveler',
        verified: true,
        created_at: new Date().toISOString()
      };
      onAuthStateChange(true, mockUser);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'login' ? 'Welcome Back' : 'Join Our Community'}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-6 text-center">
          {mode === 'login' 
            ? 'Continue your Nepal adventure' 
            : 'Start your Nepal adventure today'
          }
        </p>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            {errors.map((error, index) => (
              <p key={index} className="text-red-600 text-sm">{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
          {/* Full Name (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {/* User Type Selection (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-1 gap-3">
                {userTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleUserTypeSelect(type.id as 'traveler' | 'local')}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        formData.userType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-5 w-5 ${
                          formData.userType === type.id ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <div>
                          <div className={`font-medium ${
                            formData.userType === type.id ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {type.title}
                          </div>
                          <div className={`text-sm ${
                            formData.userType === type.id ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Mode Toggle */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setErrors([]);
                setFormData({
                  email: '',
                  password: '',
                  confirmPassword: '',
                  fullName: '',
                  userType: ''
                });
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
