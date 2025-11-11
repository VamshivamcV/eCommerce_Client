import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { AppDispatch } from '../redux/store';
import { addToCart, } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {

  const dispatch = useDispatch<AppDispatch>();

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    dispatch(addToCart(product))
  };

  const buttonClasses = isClicked 
    ? 'bg-green-600 hover:bg-green-700'
    : 'bg-blue-600 hover:bg-blue-700';

  const buttonText = isClicked
    ? 'Added to Cart' 
    :  'Add to Cart';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <Link to={`/product/${product._id}`}>
        <LazyLoadImage
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <p className="text-xl font-bold text-green-600 mb-1">₹{product.price}</p>
        <p className="text-yellow-500 text-sm mb-2">⭐ {product.rating}/5</p>
        </Link>
        <button
          onClick={handleClick} 
          className={` ${buttonClasses} w-full text-white py-2 rounded-lg hover:rounded-2xl`}>
            {buttonText}
        </button>
      </div>
  );
};

export default ProductCard;
React.memo(ProductCard);
