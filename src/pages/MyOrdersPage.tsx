import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../redux/slices/orderHistorySlice";
import { RootState } from "../redux/store";
import Navbar from "../components/NavBar";
import { Product } from "../types/Product";

interface OrderItem {
    _id: string;
    qty: number;
    price: number;
    product: Product;
}

interface Order {
    _id: string;
    createdAt: string;
    totalPrice: number;
    isPaid: boolean;
    orderItems: OrderItem[];
}



const MyOrdersPage: React.FC = () => {
    const dispatch = useDispatch();
    const { orders, loading, error} = useSelector((state: RootState) => state.orderHistory) as {
        orders: Order[];
        loading: boolean;
        error: string | null;
    };
    const [openOrderId, setOpenOrderId] = useState<string | null>(null) 

    useEffect(() => {
        dispatch(fetchMyOrders() as any);
    }, [dispatch]);

    const toggleorder = (id: string) => {
        setOpenOrderId(openOrderId === id ? null : id);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar/>
            <h2 className="text-2xl font-bold mb-4"> My Orders</h2>

            {loading ? (
                <p>Loading Orders...</p>
            ): error ? (
                <p className="text-red-500">{error}</p>
            ) : orders.length === 0 ? (
                <p> No Orders yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order: any) => (
                        <div key={order._id} className="border rounded-xl p-4 shadow bg-white">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className={`flex flex-col ${openOrderId === order._id ? "gap-0": "gap-2"}`}>
                                    <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</p>
                                    <p><strong>Address:</strong> {order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                                    <p><strong>Total price:</strong> {order.totalPrice}</p>
                                    <p><strong>Paid:</strong> {order.isPaid ? 'Yes': 'No'}</p>
                                </div>
                                <button
                                    onClick={() => toggleorder(order._id)}
                                    className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:rounded-2xl m-6"
                                    >
                                    {openOrderId === order._id ? "Hide Items": "View Items"}
                                </button>
                            </div>

                            {openOrderId === order._id && (
                                <div className="mt-4 border-t pt-4 space-y-3">
                                    <p><strong>Order Id:</strong> {order._id}</p>
                                    {order.orderItems.map((item: any) => (
                                        <div key={item._id} className="flex items-center space-x-4">
                                            <img
                                                src={item.product?.image || "/placeholder.png"}
                                                alt={item.product?.title}
                                                className="w-16 h-16 object-cover rounded"></img>
                                            <div className="flex-1">
                                                <p className="font-semibold">{item.product?.title}</p>
                                                <p>Qty: {item.qty} x ₹{item.product?.price}</p>
                                            </div>
                                                <p className="font-medium text-gray-700">₹{ (item.qty * item.product?.price).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;