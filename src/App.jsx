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
        </Routes>
      </LicenseProvider>
    </HeaderProvider>
  );
}

export default App;
