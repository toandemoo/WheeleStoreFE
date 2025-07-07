import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useHeader } from '../../Context/HeaderContext';
import { useEffect } from 'react';
import { ValidateToken } from '../../Routes/PublicRoutes/LoginRoute';
import { getWishlist } from '../../Routes/PublicRoutes/WishlistRoute';
import { getOrders } from '../../Routes/PublicRoutes/OrdersRoute';

function Header() {
  const navigate = useNavigate();
  const { header, setHeader } = useHeader();

  const logout = () => {
    setHeader({ ...header, isLoggin: false });
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const valid = async () => {
      var token = localStorage.getItem("accesstoken");
      if (token != null && !header.isLoggin) {
        var res = await ValidateToken(token);        
        var mywishlist = await getWishlist();
        var myorder = await getOrders();
        if (res.result.role === 'Admin') {
          setHeader({ ...header, isLoggin: true, email: res.result.email, wishlist: mywishlist.data.length, order: myorder.data.length, role: 0 });
        } else if (res.result.role === 'User') {
          setHeader({ ...header, isLoggin: true, email: res.result.email, wishlist: mywishlist.data.length, order: myorder.data.length, role: 1 });
        }
      }
    }
    valid();
  },[])

  return (
    <header className={styles.header}>
      <div>
        {header.isLoggin && <h3 className={styles.name}>Hello, {header.email}</h3>}
      </div>

      <div className={styles.brand}>
        <img src="/assets/images/logo.png" alt="Logo" />
        <h1>Wheelie</h1>
      </div>
      

      {!header.isLoggin ? (
        <div className={styles.login}>
          <Link className={styles.link} to="/signup">
            Sign up
          </Link>
          <Link className={styles.link} to="/login">
            Login
          </Link>
        </div>
      ) : (
        <div className={styles.login}>
          {header.role !== 0 && (
            <>
              <div id="quantity" className={styles.count}>
                {header.wishlist || 0}
              </div>
              <div className={styles.iconItem} onClick={() => navigate('/checkout')}>
                <img src="/assets/images/shopping-cart.png" alt="Cart" style={{ cursor: 'pointer' }} />
              </div>
              <div id="order" className={styles.order}>
                {header.order || 0}
              </div>
              <div className={styles.iconItem} onClick={() => navigate('/order')}>
                <img src="/assets/images/orderbag.png" alt="Order Bag" style={{ cursor: 'pointer' }} />
              </div>
            </>
          )}

          <div className={styles.iconItem} onClick={() => navigate('/profile')}>
            <img src="/assets/images/user.png" alt="User Profile" style={{ cursor: 'pointer' }} />
          </div>
          <div className={styles.iconItem} onClick={logout}>
            <img src="/assets/images/logout.png" alt="Logout" style={{ cursor: 'pointer' }} />
          </div>
        </div>
      )}

    </header>
  );
}

export default Header;
