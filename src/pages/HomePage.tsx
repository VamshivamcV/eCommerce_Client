import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/NavBar';


const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(`${URL}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Loading products...</p>
      </div>
    );
  }
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar/>
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
