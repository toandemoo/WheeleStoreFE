import BackButton from '@components/BackButton/BackButton';
import { useState, useEffect } from 'react';
import styles from './Payment.module.css';
import Button from '@components/Button/Button';
import Popup from '@components/PopUp/PopUp';
import { useNavigate } from 'react-router-dom';
import { CarCheckout } from '../../Routes/PublicRoutes/PaymentRoute';
import { UserApi } from '../../Routes/PublicRoutes/UserRoute';
import { DetailOrders } from '../../Routes/PublicRoutes/OrdersRoute';

function Payment({ currentStep }) {
  const [showPopup, setShowPopup] = useState(false);
  const [message] = useState('Bạn đã thanh toán thành công.');

  const navigate = useNavigate();

  const handleConfirm = () => {
    const order = parseInt(localStorage.getItem('order') ?? '0', 10);
    localStorage.setItem('order', String(order + 1));
    navigate('/home');
  };

  const [orderstatus] =useState( [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
    "Refunded"
  ]);

  const [bikes, setBikes] = useState([]);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getAllItems = async () => {
      const stored = sessionStorage.getItem("bikeids");
      const ids = stored ? JSON.parse(stored) : [];
  
      if (ids.length === 0) return;
  
      try {
        const res = await CarCheckout(ids); 
        const bikes = res.data; 
        setBikes(bikes); 
        
        var total = 0;
        bikes.forEach(e => {
          total = total + e.quantity * e.car.pricePerDay;
        });
        setTotal(total);

        const user = await UserApi();
        setUser(user);

        const orderid = sessionStorage.getItem("orderid");
        const order = await DetailOrders(orderid);
        setOrder(order.data);
      
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
  
    getAllItems();
  }, []);

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <BackButton handler={() => currentStep(1)} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
        <div>
          {bikes.length === 0 ? (
            <div className={styles.notfound}>
                <h1>Oopsssss! You haven't added any vehicles yet.</h1>
                <img src='../../../assets/images/404.svg' alt='notfound' style={{ width: '200px' }} />
            </div>
          ) : (
              <div> 
                <div className={styles.userInfor}>
                  <div style={{display:'flex'}}>
                    <div className={styles.userInforItem}>
                      <h5>1.User Information</h5>
                      <h5>Full name: {user.fullName}</h5>
                      <h5>Birthday: {new Date(user.birth).toLocaleDateString('vi-VN')}</h5>
                      <h5>Phone: {user.phoneNumber}</h5>
                      <h5>Email: {user.email}</h5>
                      <h5>Address: {user.address}</h5>
                    </div>
                    <div className={styles.userInforItem}>
                      <h5>2.Seller Information</h5>
                      <h5>Full name: NGUYEN VAN A</h5>
                      <h5>Birthday: 10/10/1990</h5>
                      <h5>Phone: 0338446541</h5>
                      <h5>Email: wheelestore@gmail.com</h5>
                      <h5>Address: Số 123, Đường Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</h5>
                    </div>
                  </div>
                  <div className={styles.payment}>
                    <h5>3. Order information</h5>
                    <h5>Total: {total} vnđ</h5>
                    <h5>Status: {orderstatus[order.status]}</h5>
                  </div>
                </div>
                <div className={styles.listBike}>
                  <div className={styles.rowtitle}>
                    <h5>Image</h5>
                    <h5>Title</h5>
                    <h5>Price(vnđ)</h5>
                    <h5>Quantity</h5>
                    <h5>Subtotal(vnđ)</h5>
                  </div>
                    {bikes.map((bike) => (
                      <div key={bike.car.id} className={styles.card}>
                        <div style={{width:"100px"}}>
                          <img src="/assets/images/shmode.png" className={styles.imgBike} alt={bike.car.name} />
                        </div>
                        <div className={styles.subcard}>
                          <p className={styles.title}>{bike.car.name}</p>
                        </div>
                        <div className={styles.subcard}>
                          <p>{bike.car.pricePerDay}</p>
                        </div>
                        <div className={styles.subcard}>
                          <div className={styles.quantity}>
                            <p>{bike.quantity}</p>
                          </div>
                        </div>
                        <div className={styles.subcard}>
                          <p>{bike.car.pricePerDay * bike.quantity}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <Button text="Done" handler={handleConfirm} />
      </div>

      {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default Payment;
