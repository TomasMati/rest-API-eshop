import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import UserOrders from './pages/UserOrders';
import UserSettings from './pages/UserSettings';
import CheckoutInfo from './pages/CheckoutInfo';
import CheckoutShipping from './pages/CheckoutShipping';
import CheckoutSummary from './pages/CheckoutSummary';
import CheckoutSuccess from './pages/CheckoutSuccess';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import ProductManager from './pages/admin/ProductManager';
import UserManager from './pages/admin/UserManager';
import OrderManager from './pages/admin/OrderManager';
import OrderDetail from './pages/admin/OrderDetail';
import ProductForm from './pages/admin/forms/ProductForm';
import UserDetail from './pages/admin/UserDetail';
import CategoryManager from './pages/admin/CategoryManager';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './App.css';

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="register" element={<Register />} />
                <Route path="profile/orders" element={<UserOrders />} />
                <Route path="profile/settings" element={<UserSettings />} />
                <Route path="checkout/info" element={<CheckoutInfo />} />
                <Route path="checkout/shipping" element={<CheckoutShipping />} />
                <Route path="checkout/summary" element={<CheckoutSummary />} />
                <Route path="checkout/success" element={<CheckoutSuccess />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<AdminHome />} />
                <Route path="products" element={<ProductManager />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
                <Route path="categories" element={<CategoryManager />} />
                <Route path="users" element={<UserManager />} />
                <Route path="users/:id" element={<UserDetail />} />
                <Route path="orders" element={<OrderManager />} />
                <Route path="orders/:id" element={<OrderDetail />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
