import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/NavBar';
import { getProducts } from '../api/products';
import ProductsSkeleton from '../components/ProductsSkeleton';


const HomePage: React.FC = () => {

  const {data, isLoading, error} = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime:1000 * 60, // cache for 1 min
  });

  // Handle loading and error states separately, allowing them 
  // to take up the full page width outside of the main products grid container.
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Navbar/>
        <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
        {/* ProductsSkeleton renders its own full-width grid here */}
        <ProductsSkeleton/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Navbar/>
        <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
        <div className="text-red-500 text-center mt-10">Failed to load products</div>;
      </div>
    );
  }

  // Once data is successfully loaded, render the final product grid
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar/>
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
      
      {/* The main product grid when data is present */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* data is guaranteed to exist here due to the checks above */}
        {data!.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
