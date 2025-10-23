import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { getAuthHeaders } from "../utils/authHeaders";
import { RootState } from "../redux/store";

const PlaceOrderPage: React.FC = () => {

    const { cartItems } = useSelector((state: RootState) => state.cart);

    const shippingAddress = useSelector((state: RootState) => state.order.shippingAddress);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const orderItems = cartItems.map(item => ({
        product: item._id,
        qty: item.qty,
        price: item.price,
    }));

    const url = process.env.REACT_APP_API_URL;


    const placeOrderHandler = async () => {
        try {
            const { data } = await axios.post(
                `${url}/payments/create-checkout-session`,
                {
                    orderItems,
                    shippingAddress,
                    totalPrice,
                },
                getAuthHeaders()
            );
            window.location.href = data.url;
        } catch (error) {
            alert('Stripe Checkout failed!');
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-6">
                Review Your Order
            </h2>
            <h3 className="text-lg font-bold mt-6 mb-2">Cart Items:</h3>
            <ul className="mb-4">
                {cartItems.map((item) => (
                    <li key={item.title}>
                        {item.title} x {item.qty} = ₹{item.price * item.qty}
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-bold">Total: ₹{totalPrice}</h3>

            <button
                onClick={placeOrderHandler}
                className="bg-green-600 text-white px-4 py-2 mt-6 rounded"
            >
                Place Order
            </button>
        </div>
    );
};

export default PlaceOrderPage;
