import Header from '@components/Header/Header';
import styles from './LoginPage.module.css';
import Button from '@components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Popup from '@components/PopUp/PopUp';
import { useHeader } from '../../Context/HeaderContext';
import { LoginApi } from '../../Routes/PublicRoutes/LoginRoute';
import Loading from '@components/Loading/Loading';
import { getWishlist } from '../../Routes/PublicRoutes/WishlistRoute';
import { getOrders } from '../../Routes/PublicRoutes/OrdersRoute';
import { GoogleOauthLogin } from '../../Routes/PublicRoutes/GoogleOauth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const {login, setHeader} = useHeader();
  const [loading, setLoading] = useState(false);

  const HandleLogin = async () => {
    try {
      setLoading(true);
      const res = await LoginApi({ email, password });
      setLoading(false);
      if (res && res.status) {
        if (res.role === 0) {
          setHeader({ ...login, isLoggin: true, email: email, wishlist: 0, order: 0, role: 0 });
          navigate("/admin/index");
        } else { 
          var mywishlist = await getWishlist();
          var myOrders = await getOrders();
          setHeader({...login, isLoggin: true, email: email, wishlist: mywishlist.data.length, order: myOrders.data.length, role: res.role});
          navigate("/home");
        }
      }
      else
      {
        setMessage('Login failed!\nEmail or password incorrect!');
        setShowPopup(true);
      }
  
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error('Error:', error);
        setMessage('Tài khoản không tồn tại!');
        setShowPopup(true);
      } else {
        console.error('Error:', error);
        setMessage('Email chưa xác thực!\nTruy cập email để xác thực tài khoản.');
        setShowPopup(true);
      }
    }
  };

  const GoogleLogin = async () => {
    try {
      await GoogleOauthLogin();
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  return (
    <>
      <Header />
      <div>
        <button className={styles.buttonBack} onClick={() => navigate('/')}>
          <img src='/assets/images/arrowleft.png' style={{ width: '10px', paddingRight: '5px' }} />
          Back
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.input}>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            name='username'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            name='password'
          />
        </div>
        <h6>Forgot password ?</h6>
        <div className={styles.button}>
          <Button text='Login' handler={HandleLogin} />
        </div>
        <h5>
          Have not got an account yet?<Link to='/signup'>Sign up now !</Link>
        </h5>
        <h5>Login with</h5>
        <div className={styles.link}>
          <button>
            <img src='../../../assets/images/facebook.png' alt='facebook' />
            Facebook
          </button>
          <button onClick={() => GoogleLogin()}>
            <img src='../../../assets/images/google.png' alt='google' />
            Google
          </button>                                                                                        
        </div>
      </div>
      {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
      {loading && <Loading />}
    </>
  );
}

export default LoginPage;
