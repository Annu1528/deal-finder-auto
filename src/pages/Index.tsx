
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { FilterPanel } from '@/components/FilterPanel';
import { DealGrid } from '@/components/DealGrid';
import { WishlistModal } from '@/components/WishlistModal';
import { AuthModal } from '@/components/AuthModal';
import { mockDeals } from '@/data/mockDeals';

export interface Deal {
  id: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  category: string;
  platform: string;
  buyUrl: string;
  rating: number;
  reviews: number;
}

export interface Filters {
  category: string;
  minDiscount: number;
  search: string;
  sortBy: string;
}

const Index = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(mockDeals);
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    minDiscount: 0,
    search: '',
    sortBy: 'discount'
  });
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('Index component mounted');
    console.log('Mock deals loaded:', mockDeals.length);
    console.log('First deal:', mockDeals[0]);
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('dealWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('dealWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Filter and sort deals
  useEffect(() => {
    console.log('Filtering deals with filters:', filters);
    
    let filtered = deals.filter(deal => {
      const matchesCategory = filters.category === 'all' || deal.category === filters.category;
      const matchesDiscount = deal.discountPercentage >= filters.minDiscount;
      const matchesSearch = deal.title.toLowerCase().includes(filters.search.toLowerCase());
      return matchesCategory && matchesDiscount && matchesSearch;
    });

    console.log('Filtered deals count:', filtered.length);

    // Sort deals
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredDeals(filtered);
  }, [deals, filters]);

  const toggleWishlist = (dealId: string) => {
    console.log('Toggling wishlist for deal:', dealId);
    setWishlist(prev => 
      prev.includes(dealId) 
        ? prev.filter(id => id !== dealId)
        : [...prev, dealId]
    );
  };

  const getWishlistDeals = () => {
    return deals.filter(deal => wishlist.includes(deal.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header 
        onWishlistClick={() => setIsWishlistOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        wishlistCount={wishlist.length}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🔥 Hot Deals Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing discounts from top e-commerce platforms. Save big on your favorite products!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </aside>
          
          <div className="flex-1">
            <div className="mb-6 text-center lg:text-left">
              <p className="text-gray-600">
                Showing {filteredDeals.length} deals with {filters.minDiscount}%+ discount
              </p>
            </div>
            <DealGrid 
              deals={filteredDeals}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        </div>
      </main>

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        deals={getWishlistDeals()}
        onToggleWishlist={toggleWishlist}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    </div>
  );
};

export default Index;
