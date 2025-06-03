
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filters } from '@/pages/Index';

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'beauty', label: 'Beauty & Health' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports & Fitness' },
  { value: 'books', label: 'Books' },
];

const platforms = ['Amazon', 'Flipkart', 'Myntra', 'Snapdeal'];

export const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-white/70 border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-800">🔍 Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 border-purple-200 focus:border-purple-400"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Discount Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Minimum Discount: {filters.minDiscount}%
            </label>
            <Slider
              value={[filters.minDiscount]}
              onValueChange={(value) => updateFilter('minDiscount', value[0])}
              max={90}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>90%</span>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Highest Discount</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Popular Platforms */}
      <Card className="backdrop-blur-sm bg-white/70 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-800">🛒 Popular Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Badge key={platform} variant="secondary" className="hover:bg-blue-100 cursor-pointer transition-colors">
                {platform}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
