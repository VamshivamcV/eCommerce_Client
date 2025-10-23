import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeFromCart, clearCart, decreaseQty, increaseQty } from '../redux/slices/cartSlice';
import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    if (cartItems.length === 0) {
        return (<div className='min-h-screen bg-gray-100 p-6'>
            <Navbar/>
            <div className='p-6 text-center text-xl'>
                🛒 Your cart is empty.
            </div> 
        </div>);
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <Navbar/>
            <h1 className='text-3xl font-bold mb-4'>🛒 Your Cart</h1>

            <ul className='space-y-4'>
                {cartItems.map(item => (
                    <li key={item._id} className='flex flex-col md:flex-row justify-between items-center border p-4 rounded-xl shadow bg-white'>
                        <div className='flex flex-row gap-10 items-center'>
                            <span><img src={item.image} alt={item.title} height={50} width={50}/></span>
                            <span>
                            <p className='font-semibold'>{item.title}</p>
                            <div className='text-sm text-gray-600'>Qty: 
                                <div className='flex items-center justify-evenly border rounded-3xl p-1'>
                                <button 
                                    onClick={() => dispatch(decreaseQty(item._id))}
                                >➖</button>
                                    <span>{item.qty}</span>
                                <button 
                                    onClick={() => dispatch(increaseQty(item._id))}
                                >➕</button>
                                </div>
                            </div>
                            <p className='text-sm text-gray-600'>Price: ${item.price.toFixed(2)}</p>
                            </span>
                        </div>
                        <button
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className='text-red-500 hover:underline ml-6 mt-4'
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <div className='mt-6 flex justify-between items-center'>
                <h2 className='text-2xl font-semibold'>Total: ${total.toFixed(2)}</h2>
                <div className='flex gap-4'>
                    <button
                        onClick={() => dispatch(clearCart())}
                        className='px-4 py-2 bg-gray-200 rounded-lg hover:rounded-2xl hover:bg-gray-300'
                    >
                        Clear Cart
                    </button>
                    <button 
                        onClick={() => navigate('/shipping')}
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:rounded-2xl hover:bg-blue-600'>
                        Proceed to Checkout
                    </button>
                </div>    
            </div>
        </div>
    );
};

export default CartPage;