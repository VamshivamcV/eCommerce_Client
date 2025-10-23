import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../utils/authHeaders";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import Navbar from "../components/NavBar";
import ShippingPage from "./ShippingPage";
import {
  saveShippingAddress,
} from "../redux/slices/orderSlice";



const ProfilePage: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);


  const dispatch = useDispatch();

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");

  const [shipName, setShipName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get(
        `${url}/users/profile`,
        getAuthHeaders()
      );
      setName(data.name);
      setEmail(data.email);

      if (data.shippingAddress){
        setShipName(data.shippingAddress.name || "");
        setAddress(data.shippingAddress.address || "");
        setCity(data.shippingAddress.city || "");
        setPostalCode(data.shippingAddress.postalCode || "");
        setCountry(data.shippingAddress.country || "");
      } 
    };
    fetchProfile();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const shippingAddress = {
        name: shipName,
        address,
        city,
        postalCode,
        country
    }

    try {
      const { data } = await axios.put(
        `${url}/users/profile`,
        { name, email, password, shippingAddress },
        getAuthHeaders()
      );
      dispatch(loginSuccess(data));
      dispatch(saveShippingAddress(shippingAddress));
      alert("Profile updated!");
    } catch (err) {
      alert("Updated failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="px-6">
        <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
        <form
        // onSubmit={handleSubmit}
        >
          <input
            className="w-full border rounded p-2 mb-4"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full border rounded p-2 mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border rounded p-2 mb-4"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </div>
      <ShippingPage 
       name1={shipName}
       setName1={setShipName} 
       address1={address}
       setAddress1={setAddress}
       city1={city}
       setCity1={setCity}
       postalCode1={postalCode}
       setPostalCode1={setPostalCode}
       country1={country}
       setCountry1={setCountry}
       onSubmit={handleSubmit}
       />
    </div>
  );
};

export default ProfilePage;
