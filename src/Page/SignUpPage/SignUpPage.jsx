import Header from '@components/Header/Header';
import styles from './SignUpPage.module.css';
import Button from '@components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Popup from '@components/PopUp/PopUp';
import Loading from '@components/Loading/Loading';
import { RegisterApi } from '@routes/PublicRoutes/SignUpRoute';

function SignUpPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {

    if (!form.email || !form.password || !form.confirmPassword || !form.fullName) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const emailRegex = /[^\s@]+@gmail.com/;
    if (!emailRegex.test(form.email)) {
      setError('Email không hợp lệ!');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    const success = await RegisterApi(form);
    
    if (success) {
      setMessage('Đăng ký thành công!\nKiểm tra email để xác thực.');
      setShowPopup(true);
      setTimeout(() => navigate('/login'), 5000);
    } else {
      setMessage('Đăng ký thất bại!\nEmail đã được sử dụng.');
      setShowPopup(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Header isLoggedIn={false} name='' />

      <div>
        <button className={styles.buttonBack} onClick={() => navigate('/')}>
          <img src='/assets/images/arrowleft.png' style={{ width: '10px', paddingRight: '5px' }} alt='back' />
          Back
        </button>
      </div>

      <div className={styles.container}>

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <div className={styles.input}>
          <input
            type='text'
            placeholder='Full name'
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <input
            type='email'
            placeholder='abc@gmail.com'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type='password'
            placeholder='Confirm password'
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
        </div>

        <div className={styles.button}>
          <Button text='Sign up' handler={handleSignup} />
        </div>

        <h5>
          Have not got an account yet? <Link to='/login'>Login now!</Link>
        </h5>

        <h5>Sign up with</h5>
        <div className={styles.link}>
          <button>
            <img src='/assets/images/facebook.png' alt='facebook' />
            Facebook
          </button>
          <button>
            <img src='/assets/images/google.png' alt='google' />
            Google
          </button>
        </div>
      </div>

      {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
      {loading && <Loading />}
    </>
  );
}

export default SignUpPage;
