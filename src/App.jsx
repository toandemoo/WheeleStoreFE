import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Page/HomePage/HomePage';
import SearchPage from './Page/SearchPage/Searchage';
import LoginPage from './Page/LoginPage/LoginPage';
import SignUpPage from './Page/SignUpPage/SignUpPage';
import ProfilePage from './Page/ProfilePage/ProfilePage';
import CheckoutPage from './Page/CheckoutPage/CheckoutPage';
import { HeaderProvider } from './Context/HeaderContext';
import { LicenseProvider } from './Context/LicenseContext';
import OrderPage from './Page/Order/OrderPage';
import Dashboard from './Page/Admin/Dashboard';
import Manager from './Page/Admin/Manager/manager';
import Product from './Page/Admin/Product/Product';
import Order from './Page/Admin/Order/Order';
import DetailProduct from './Page/Admin/Product/DetailProduct';
import ProfileManager from './Page/Admin/Manager/ProfileManager';
import DetailOrder from './Page/Admin/Order/DetailOrder';

function App() {
  return (
    <HeaderProvider>
      <LicenseProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/payment' element={<CheckoutPage currentStep={2} />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/admin/index' element={<Dashboard />} />
          <Route path='/admin/manager' element={<Manager />} />
          <Route path='/admin/manager/profile/:id' element={<ProfileManager />} />
          <Route path='/admin/product' element={<Product />} />
          <Route path='/admin/product/:id' element={<DetailProduct/>} />
          <Route path='/admin/order' element={<Order />} />
          <Route path='/admin/order/detail/:id' element={<DetailOrder />} />
        </Routes>
      </LicenseProvider>
    </HeaderProvider>
  );
}

export default App;
