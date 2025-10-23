import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthHeaders } from "../utils/authHeaders";
import { clearShippingAddress } from "../redux/slices/orderSlice";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: RootState) => state.cart);

  const url = process.env.REACT_APP_API_URL;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }
  
  const cartUpdate = async (e: React.FormEvent) =>{
    e.preventDefault();
    try{
      const { data } = await axios.put(
        `${url}/users/cart`,
        { 
          cartItems
        },
         getAuthHeaders()
        );
      dispatch(clearCart());

      dispatch(clearShippingAddress());

      dispatch(logout());
    }catch(err: any){
      alert(err.response?.data?.message || 'Updating cart to DB failed');
    }
  }

  return (
    <nav className="p-4 bg-white shadow mb-6 rounded-xl relative">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        ShopToday
      </Link>

      <button className="md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6"/>}
      </button>

      <div className="hidden md:flex gap-4 items-center">
        <Link to="/cart"
                className="group transition duration-300 rounded"
            >Cart
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
        </Link>

        {userInfo ? (
          <>
            <Link to="/my-orders" 
                className="group transition duration-300 rounded active:bg-gray-100"
                >
              My Orders

              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
            <Link to="/profile"
                    className="group transition duration-300 rounded"
                >
              <span>Hello, {userInfo.name}</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
            <button onClick={ cartUpdate } className="hover:text-red-500">
              Logout
            </button>
          </>
        ) : (
            <>
            <Link to="/login"
            className="group transition duration-300 rounded"
            >
                    Login
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
            <Link to="/register" 
                className="group transition duration-300 rounded"
                >
                    Register
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
          </>
        )}
      </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 w-full bg-gray-100 shadow-lg z-10 flex flex-col items-center py-4 space-y-4 rounded-xl` }>
        <Link to="/cart" onClick={closeMenu} className="group transition duration-300 rounded-xl shadow px-20 bg-white">
          Cart
          <span className="block max-w-0 group-hover:max-w-full trasnsition-all duration-500 h-0.5 bg-sky-600"></span>
        </Link>

        {userInfo ? (
          <>
            <Link to="/my-orders" 
                className="group transition duration-300 rounded active:bg-gray-100 rounded-xl shadow px-14 bg-white"
                >
              My Orders

              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
            <Link to="/profile"
                    className="group transition duration-300 rounded rounded-xl shadow px-14 bg-white"
                >
              <span>Hello, {userInfo.name}</span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
            <button onClick={ cartUpdate } className="hover:text-red-500 rounded-xl shadow px-20 bg-white">
              Logout
            </button>
          </>
        ) : (
            <>
            <Link to="/login"
            className="group transition duration-300 rounded rounded-xl shadow px-16 bg-white"
            >
                    Login
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
            <Link to="/register" 
                className="group transition duration-300 rounded rounded-xl shadow px-16 bg-white"
                >
                    Register
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
