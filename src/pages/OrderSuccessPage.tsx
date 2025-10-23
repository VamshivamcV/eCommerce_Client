import React from "react";
import { useParams, Link } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const OrderSuccessPage: React.FC = () => {
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();

    
    return (
        <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-4"> Order Placed!</h2>
            <p className="text-lg mb-6">Your order ID is <strong>{id}</strong></p>
            <Link to="/" className="text-blue-600 underline" onClick={()=> dispatch(clearCart())}>
                Back to Home
            </Link>
        </div>
    );
};

export default OrderSuccessPage;