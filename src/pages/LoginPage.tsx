import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { loadCartFromDB } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { getAuthHeaders } from "../utils/authHeaders";
import { saveShippingAddress } from "../redux/slices/orderSlice";
import { RootState } from "../redux/store";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] =  useState('');
    const [password, setPassword] = useState('');

    const url = process.env.REACT_APP_API_URL;

    const URL = process.env.REACT_APP_API_URL;

    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  
    useEffect(() => {
    
    }, [userInfo]);


    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${url}/users/login`, {
                email,
                password,
            });
            dispatch(loginSuccess(data));

            const fetchProfile = async () => {
                const { data } = await axios.get(`${URL}/users/profile`, getAuthHeaders());
                if(data.shippingAddress){dispatch(saveShippingAddress(data.shippingAddress));}
            };
            if (userInfo) fetchProfile();

            const { data: savedCart } = await axios.get(`${url}/users/cart`, getAuthHeaders());
            dispatch(loadCartFromDB(savedCart));
            
            navigate('/');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar/>
            <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={submitHandler}>
                <input
                    className="w-full mb-3 border p-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                <input
                    className="w-full mb-3 border p-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                    Login
                </button>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;