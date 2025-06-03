
import { X, ShoppingCart, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Deal } from '@/pages/Index';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  deals: Deal[];
  onToggleWishlist: (dealId: string) => void;
}

export const WishlistModal = ({ isOpen, onClose, deals, onToggleWishlist }: WishlistModalProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl">
            <Heart className="w-6 h-6 text-red-500" />
            <span>Your Wishlist ({deals.length})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] pr-2">
          {deals.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500">Start adding deals to your wishlist to keep track of your favorites!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deals.map((deal) => (
                <div key={deal.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex space-x-4">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-sm line-clamp-2">{deal.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-red-500 text-white text-xs">
                          {deal.discountPercentage}% OFF
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {deal.platform}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-green-600">
                              {formatPrice(deal.discountedPrice)}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(deal.originalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          onClick={() => window.open(deal.buyUrl, '_blank')}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Buy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onToggleWishlist(deal.id)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
