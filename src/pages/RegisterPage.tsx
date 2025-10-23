import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { clearShippingAddress } from "../redux/slices/orderSlice";

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const url = process.env.REACT_APP_API_URL;


    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${url}/users/register`, {
                name,
                email,
                password,
                // shippingAddress
            });
            dispatch(clearShippingAddress());
            dispatch(loginSuccess(data));
            navigate('/');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Register failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar/>
            <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={submitHandler}>
                <input
                    className="w-full mb-3 border p-2"
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
                    Register
                </button>
            </form>
        </div>
        </div>
    );
};

export default RegisterPage;