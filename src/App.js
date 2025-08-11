// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer'; 
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ShopAll from './Pages/ShopAll';
import Cart from './Pages/Cart';
import CartProvider from './context/CartContext'; 
import Decor from './Pages/Decor';
import Checkout from './Pages/Checkout';
import ProductDetail from './Pages/ProductDetail';
import Bedroom from './Pages/Bedroom';
import LivingRoom from './Pages/LivingRoom';
import Office from './Pages/Office';
import SearchPage from './Pages/SearchPage';
import Story from './Pages/Story'
import Contact from './Pages/Contact';
import { LoginProvider } from './context/LoginContext';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop-all" element={<ShopAll />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/decor" element={<Decor />} />
        <Route path="/bedroom" element={<Bedroom />} />
        <Route path="/living-room" element={<LivingRoom />} />
        <Route path="/office" element={<Office />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>

      <Footer />
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <LoginProvider>
        <Router>
          <AppContent />
        </Router>
      </LoginProvider>
    </CartProvider>
  );
}

export default App;