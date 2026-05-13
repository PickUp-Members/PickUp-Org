import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts } from '../../Services/productService';
import ProductCard from '../../Components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); 

  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'All';

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllProducts();

      if (result) {
        let filteredProducts = result;
        
        // Filter by category if specified and not "All Categories"
        if (selectedCategory && selectedCategory !== 'All' && selectedCategory !== 'All Categories') {
          filteredProducts = filteredProducts.filter(
            product => product.category === selectedCategory
          );
        }
        
        // Filter by search query if specified
        if (searchQuery) {
          filteredProducts = filteredProducts.filter(
            product => 
              product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }
        
        setProducts(filteredProducts);
      }
      else {
        console.error("Failed to load products");
      }
    }
    catch (error) {
      console.error("Error loading products:", error);
    }
    finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900">
            {selectedCategory && selectedCategory !== 'All' ? selectedCategory : 'Marketplace'}
          </h1>
          {searchQuery && (
            <p className="mt-2 text-slate-600">Search results for "{searchQuery}"</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-10 font-bold text-slate-400">Loading items...</div>
          ) : products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-slate-400 font-bold">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
