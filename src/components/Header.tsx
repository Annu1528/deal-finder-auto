
import { Heart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onWishlistClick: () => void;
  onAuthClick: () => void;
  isLoggedIn: boolean;
  wishlistCount: number;
}

export const Header = ({ onWishlistClick, onAuthClick, isLoggedIn, wishlistCount }: HeaderProps) => {
  return (
    <header className="backdrop-blur-md bg-white/80 border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                DealsHub
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onWishlistClick}
              className="relative hover:bg-purple-50 transition-colors"
            >
              <Heart className="w-5 h-5 text-purple-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onAuthClick}
              className="hover:bg-blue-50 transition-colors"
            >
              <User className="w-5 h-5 text-blue-600" />
              <span className="ml-2 hidden sm:inline">
                {isLoggedIn ? 'Profile' : 'Login'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
