import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
          }/>
        <Route path="/shipping" element={
          <ProtectedRoute>
            <ShippingPage address1={''} setAddress1={function (val: string): void {
              throw new Error('Function not implemented.');
            } } city1={''} setCity1={function (val: string): void {
              throw new Error('Function not implemented.');
            } } postalCode1={''} setPostalCode1={function (val: string): void {
              throw new Error('Function not implemented.');
            } } country1={''} setCountry1={function (val: string): void {
              throw new Error('Function not implemented.');
            } } name1={''} setName1={function (val: string): void {
              throw new Error('Function not implemented.');
            } } onSubmit={function (e: React.FormEvent): void {
              throw new Error('Function not implemented.');
            } } />
          </ProtectedRoute>
          }/>
        <Route path="/place-order" element={
          <ProtectedRoute>
            <PlaceOrderPage />
          </ProtectedRoute>
          }/>
        <Route path='/order-success/:id' element={
          <ProtectedRoute>
              <OrderSuccessPage/>
          </ProtectedRoute>
        }/>
        <Route path='/order-success/paid' element={
          <ProtectedRoute>
              <OrderSuccessPage/>
          </ProtectedRoute>
        }/>
        <Route path='/my-orders' element={
          <ProtectedRoute>
              <MyOrdersPage/>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
