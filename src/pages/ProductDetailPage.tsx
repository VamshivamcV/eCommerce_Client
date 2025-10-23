import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types/Product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { AppDispatch } from '../redux/store';
import Navbar from '../components/NavBar';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch =  useDispatch<AppDispatch>();

    const url = process.env.REACT_APP_API_URL;

     const [isClicked, setIsClicked] = useState(false);
    
      const handleClick = (item: Product) => {
        setIsClicked(!isClicked);
        dispatch(addToCart(item))
      };
    
      const buttonClasses = isClicked 
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-blue-600 hover:bg-blue-700';
    
      const buttonText = isClicked
        ? 'Added to Cart' 
        :  'Add to Cart';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get<Product>(`${url}/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Failed to fetch product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className='text-center mt-10 text-lg'>Loading product...</div>
    }

    if (!product) {
        return <div className='text-center mt-10 text-red-500'>Product not found</div>
    }

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <Navbar/>
            <div className='flex flex-col md:flex-row gap-6 shadow-xl my-10 py-10 rounded md:pl-10 h-140'>
                <img src={product.image} alt={product.title} className='w-full md:w-1/2 bg-white rounded-xl' />
                <div className='md:mx-auto md:w-1/2 p-6'>
                    <h1 className='text-xl lg:text-3xl font-bold'>{product.title}</h1>
                    <p className='text-sm text-gray-500'>{product.brand}</p>
                    <p className='mt-4 text-gray-700'>{product.description}</p>
                    <div className='mt-4 text-xl font-bold text-blue-600'>${product.price}</div>
                    <div className="mt-2 text-sm">Rating: {product.rating} ⭐</div>
                    <div className='mt-2 text-sm'>
                        {product.countInStock > 0 ? (
                            <span className='text-green-600'>In Stock</span>
                        ) : (
                            <span className='text-red-600'>Out of Stock</span>
                        )}
                    </div>
                    <button 
                        className= {`${buttonClasses} mt-6 text-white py-2 px-4 rounded-lg hover:rounded-2xl disabled:opacity-50`} 
                        disabled={product.countInStock === 0}
                        onClick={() => handleClick(product)}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;