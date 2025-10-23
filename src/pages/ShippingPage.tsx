import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { saveShippingAddress } from "../redux/slices/orderSlice";
import axios from "axios";
import { getAuthHeaders } from "../utils/authHeaders";
import Button from "../components/Button";

interface ChildProps {
    name1: string;
    setName1: (val: string) => void;
    address1: string;
    setAddress1: (val: string) => void;
    city1: string;
    setCity1: (val: string) => void;
    postalCode1: string;
    setPostalCode1: (val: string) => void;
    country1: string;
    setCountry1: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const ShippingPage: React.FC<ChildProps> = ({
    name1,
    setName1,
    address1,
    setAddress1,
    city1,
    setCity1,
    postalCode1,
    setPostalCode1,
    country1,
    setCountry1,
    onSubmit
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const trailingPath = location.pathname;
    const isProfilePage = trailingPath === "/profile";


    const shippingAddress = useSelector((state: RootState) => state.order.shippingAddress);


    const [localName, setLocalName] = useState(shippingAddress.name || '');
    const [localAddress, setLocalAddress] = useState(shippingAddress.address || '');
    const [localCity, setLocalCity] = useState(shippingAddress.city || '');
    const [localPostalCode, setLocalPostalCode] = useState(shippingAddress.postalCode || '');
    const [localCountry, setLocalCountry] = useState(shippingAddress.country || '');
    
    useEffect(()=> {
       if (shippingAddress) {
        setLocalName(shippingAddress.name || "");
        setLocalAddress(shippingAddress.address || "");
        setLocalCity(shippingAddress.city || "");
        setLocalPostalCode(shippingAddress.postalCode || "");
        setLocalCountry(shippingAddress.country || "");
    }},[shippingAddress]);

    const name = isProfilePage ? name1 : localName;
    const address = isProfilePage ? address1 : localAddress;
    const city = isProfilePage ? city1 : localCity;
    const postalCode = isProfilePage ? postalCode1 : localPostalCode;
    const country = isProfilePage ? country1 : localCountry;

    const handleNameChange = (val: string) => {
        isProfilePage ? setName1(val) : setLocalName(val);
    }
    const handleAddressChange = (val: string) => {
        isProfilePage ? setAddress1(val) : setLocalAddress(val);
    }
    const handleCityChange = (val: string) => {
        isProfilePage ? setCity1(val) : setLocalCity(val);
    }
    const handlePostalCodeChange = (val: string) => {
        isProfilePage ? setPostalCode1(val) : setLocalPostalCode(val);
    }
    const handleCountryChange = (val: string) => {
        isProfilePage ? setCountry1(val) : setLocalCountry(val);
    }

    const url = process.env.REACT_APP_API_URL;

    const submitHandler = async(e: React.FormEvent) => {
        e.preventDefault();

        const newAddress = {name, address, city, postalCode, country};


        try{
            const { data } = await axios.put(
                `${url}/users/profile`, {
                    shippingAddress: newAddress
                },
                getAuthHeaders()
            );
            dispatch(saveShippingAddress(newAddress));
            alert('profile updated!');

            if (!isProfilePage) navigate("/place-order");
        }catch(err){
            alert('Update failed!')
        }

    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-semibold mb-6">
                📦 Shipping Address
            </h2>
            <form onSubmit={submitHandler }>
                <input 
                    type="text"
                    placeholder="name"
                    className="w-full border rounded p-2 mb-4"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Address"
                    className="w-full border rounded p-2 mb-4"
                    value={address}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="City"
                    className="w-full border rounded p-2 mb-4"
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Postal Code"
                    className="w-full border rounded p-2 mb-4"
                    value={postalCode}
                    onChange={(e) => handlePostalCodeChange(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Country"
                    className="w-full border rounded p-2 mb-4"
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    required
                />

                {!isProfilePage ? 
                    <button type="submit"  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:rounded-2xl">
                      Update and Continue
                    </button> : <Button onClick={()=> onSubmit} label="Update Profile"/>
                }
            </form>
        </div>
    );
};

export default ShippingPage;