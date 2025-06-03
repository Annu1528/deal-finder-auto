
import { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Deal } from '@/pages/Index';
import { cn } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export const DealCard = ({ deal, isWishlisted, onToggleWishlist }: DealCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log('DealCard rendering:', deal.title);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'amazon':
        return 'bg-orange-500';
      case 'flipkart':
        return 'bg-blue-500';
      case 'myntra':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleBuyNow = () => {
    console.log('Buy Now clicked for:', deal.title, 'URL:', deal.buyUrl);
    if (deal.buyUrl) {
      window.open(deal.buyUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.error('No buy URL provided for deal:', deal.title);
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm bg-white/90 border-0 overflow-hidden">
      <div className="relative">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={deal.image}
            alt={deal.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-300 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => {
              console.log('Image loaded for:', deal.title);
              setImageLoaded(true);
            }}
            onError={() => {
              console.error('Image failed to load for:', deal.title, deal.image);
              setImageLoaded(true); // Still show the card even if image fails
            }}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          )}
        </div>

        {/* Discount Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 text-lg">
            {deal.discountPercentage}% OFF
          </Badge>
        </div>

        {/* Platform Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={cn("text-white font-medium", getPlatformColor(deal.platform))}>
            {deal.platform}
          </Badge>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleWishlist}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-all duration-200"
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight">
            {deal.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(deal.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {deal.rating} ({deal.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(deal.discountedPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(deal.originalPrice)}
                </span>
              </div>
            </div>
            <div className="text-sm text-green-600 font-medium">
              You save {formatPrice(deal.originalPrice - deal.discountedPrice)}
            </div>
          </div>

          {/* Buy Button */}
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 transition-all duration-200 group"
            onClick={handleBuyNow}
          >
            <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
