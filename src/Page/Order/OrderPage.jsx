import styles from './OrderPage.module.css';
import Header from '@components/Header/Header';
import BackButton from '@components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../../Context/HeaderContext';
import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import { DetailOrders, getOrders } from '../../Routes/PublicRoutes/OrdersRoute';
import { UserApi } from '../../Routes/PublicRoutes/UserRoute';

export default function OrderPage() {
  const navigate = useNavigate();
  const { header, setHeader } = useHeader();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getMyOrders = async () => {
      const res = await getOrders();
      if (!res) {
        console.error('Dữ liệu orders không hợp lệ:', res);
        return;
      }
      setOrders(res.data);
      setHeader({...header, order: res.data.length})
    };
    getMyOrders();
  }, []);
  
  const [detailOrder, setDetailOrder] = useState({
    createAt: '',
    id: null,
    orders: [],
    status: 0,
    userId: null,
  });
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [status, setStatus] = useState('Cancel');
  const detailBike = async (id) => {
    setClickedIndex(id);
    const res = await DetailOrders(id);
    const user = await UserApi();
    setUser(user);
    if (!res) {
      console.error('Dữ liệu detail orders không hợp lệ:');
      return;
    }
    const orders = res.data;
    setDetailOrder(orders);

    switch (orders.status) {
      case 0:
        setStatus('Payment');
        break;
      case 1:
        setStatus('Cancel');
        break;
      default:
        setStatus('Cancel');
        break;
    }

    var total = 0;
    orders.orders.forEach(e => {
      total = total + e.quantity * e.car.pricePerDay;
    });
    setTotal(total);

    window.scrollTo({
      top: 0,
      behavior: 'smooth' // hoặc 'auto'
    });
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



  const [showPopup, setShowPopup] = useState(false);
  const CancelBooking = () => {
    setShowPopup(true);
  };

  const CancelClick = () => {
    setShowPopup(false);
    // if (confirm) {
    //   setOrderstatus(orderstate.CANCELLED);
    // } else {
    //   setOrderstatus(orderstate.PREPARING);
    // }
  };

  return (
    <>
      <Header />
      <div style={{ marginBottom: '10px' }}>
        <BackButton handler={() => navigate('/home')} />
      </div>
      <h3 style={{ marginLeft: '14%' }}>My Orders</h3>
      {clickedIndex !== null &&
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
          <div
            style={{
              display: clickedIndex !== null ? 'block' : 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative' }}> 
                <img src='/assets/images/exit.png' alt='ext' style={{ position: 'absolute', top:-10, right:-10 }} onClick={() => setClickedIndex(null)}/>
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
                        <div className={styles.status}>
                          <h5>Status: {orderstatus[detailOrder.status]}</h5>
                            <div>
                            <Button text={status} handler={()=>{}} />
                          </div>
                        </div>
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
                <div>
                {detailOrder.orders.map((bike) => (
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
                
            </div>
          
          </div>    
        </div>
      }
        {showPopup && (
          <div className={styles.popupOverlay} id="popup">
            <div className={styles.popup}>
              <p style={{ whiteSpace: 'pre-line', textAlign:'center' }}>
                {'Are you sure you want to cancel the order?'}
              </p>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  onClick={() => CancelClick(true)}
                >
                  Yes
                </button>
                <button
                  className={styles.button}
                  onClick={() => CancelClick(false)}
                >
                  No
                </button>
               </div>
            </div>
          </div>
        )}
      <div style={{
        display: clickedIndex == null ? 'flex' : 'none',
        justifyContent: 'center',
        gap: '5px',
        marginTop: '10px'
      }}>
        <div>
          {!header.order > 0 ? (
            <div className={styles.notfound}>
              <h1>Oopsssss!. You haven&apos;t added any vehicles yet.</h1>
              <img
                src="/assets/images/404.svg"
                alt="notfound"
                style={{ width: '200px' }}
              />
            </div>
          ) : (
              <div className={styles.listBike}>
                <div className={styles.rowtitle}>
                  <h5>Code</h5>
                  <h5>CreateAt</h5>
                  <h5>Status</h5>
                </div>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={styles.card}
                    data-clicked={clickedIndex === order.id}
                    onClick={() => detailBike(order.id)}
                  >
                    <p>Order {order.id}</p>
                    <p>{new Date(order.createAt).toLocaleDateString('vi-VN')}</p>
                    <p>{orderstatus[order.status]}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
