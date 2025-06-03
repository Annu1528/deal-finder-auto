
import { DealCard } from './DealCard';
import { Deal } from '@/pages/Index';

interface DealGridProps {
  deals: Deal[];
  wishlist: string[];
  onToggleWishlist: (dealId: string) => void;
}

export const DealGrid = ({ deals, wishlist, onToggleWishlist }: DealGridProps) => {
  console.log('DealGrid rendering with deals:', deals.length);
  
  if (deals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">😔</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No deals found</h3>
        <p className="text-gray-500">Try adjusting your filters to see more deals</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          isWishlisted={wishlist.includes(deal.id)}
          onToggleWishlist={() => onToggleWishlist(deal.id)}
        />
      ))}
    </div>
  );
};
