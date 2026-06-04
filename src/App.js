import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CookRegister from './pages/CookRegister';
import CustomerPage from './pages/CustomerPage';
import CartPage from './pages/CartPage';
import CookDashboard from './pages/CookDashboard';
import DonateMeal from './pages/DonateMeal';
import MembershipPage from './pages/MembershipPage';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cook-register" element={<CookRegister />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cook-dashboard" element={<CookDashboard />} />
        <Route path="/donate" element={<DonateMeal />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;