import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import ProductCard from '../../Components/ProductCard';
import { mockProducts } from '../../Utils/mockData';
import Button from '../../Components/Button';
import { useAuth } from '../../Hooks/useAuth';
import Footer from '../../Components/Footer';

const ProductList = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ type: 'all', category: 'all', search: '' });
  const [view, setView] = useState('grid'); // grid or list

  useEffect(() => {
    // Filter logic (mock API)
    const filtered = mockProducts.filter(p => {
      if (filters.type !== 'all' && p.type !== filters.type) return false;
      if (filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return p.status === 'ACTIVE';
    });
    setProducts(filtered);
  }, [filters]);

  const categories = [...new Set(mockProducts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      {/* Search & Filters */}
      <div className="sticky top-[70px] bg-white/80 backdrop-blur-md border-b border-slate-200 z-10 py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-20 flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products, brands..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1c74e9]"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
              {view === 'grid' ? <List size={18} /> : <Grid size={18} />}
            </Button>
            <Filter className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-20 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', ...categories].map(cat => (
              <Button
                key={cat}
                variant={filters.category === cat.toLowerCase() ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilters({...filters, category: cat === 'All' ? 'all' : cat.toLowerCase()})}
              >
                {cat}
              </Button>
            ))}
            <Button
              variant={filters.type === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilters({...filters, type: 'all'})}
            >
              All Types
            </Button>
            <Button
              variant={filters.type === 'FIXED' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilters({...filters, type: 'FIXED'})}
            >
              Fixed Price
            </Button>
            <Button
              variant={filters.type === 'AUCTION' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilters({...filters, type: 'AUCTION'})}
            >
              Auctions
            </Button>
          </div>
        </div>

        {/* Products */}
        <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;