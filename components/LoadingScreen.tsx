import React, { useEffect, useState } from 'react';
import { Mountain, Heart } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex items-center justify-center transition-opacity duration-500 ${
      progress >= 100 ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="text-center z-10">
        {/* Namaste Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
            <div className="relative">
              <Mountain className="w-12 h-12 text-white" />
              <Heart className="w-6 h-6 text-white absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>
          
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
            <div className="w-40 h-40 border border-white/20 rounded-full animate-ping absolute" style={{ animationDuration: '2s' }} />
          </div>
        </div>

        {/* Namaste Text */}
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-white animate-fade-in">
            नमस्ते
          </h1>
          <h2 className="text-2xl font-light text-white/90 animate-fade-in-delay">
            Namaste
          </h2>
          <p className="text-lg text-white/80 max-w-md mx-auto animate-fade-in-delay-2">
            Welcome to your Nepal adventure journey
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-white/70 text-sm mt-3">
            {Math.round(progress)}% Loading...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
}
