import BackButton from '@components/BackButton/BackButton';
import { useState, useEffect } from 'react';
import styles from './DetailOrder.module.css';
import Button from '@components/Button/Button';
import Popup from '@components/PopUp/PopUp';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailOrdersAdmin } from '../../../Routes/PublicRoutes/OrdersRoute';
import { getUserById } from '../../../Routes/PublicRoutes/UserRoute';
import Header from '../../../components/Header/Header';


export default function DetailOrder() {

  const navigate = useNavigate();

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

  const {id} = useParams();
  useEffect(() => {
    const getAllItems = async () => {  
      try {
        const res = await getDetailOrdersAdmin(id);
         setBikes(res.data.orders);
         setOrder(res.data);

        var total = 0;
        res.data.orders.forEach(e => {
          total = total + e.quantity * e.car.pricePerDay;
        });
        setTotal(total);

        const user = await getUserById(res.data.userId);
        setUser(user);
      
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
  
    getAllItems();
  }, []);

  return (
     <>
      <Header />
      <div style={{ marginBottom: '10px' }}>
        <BackButton handler={() => navigate('/admin/order')} />
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
                     <h5>2. Order information</h5>
                     <h5>Total: {total} vnđ</h5>
                     <h5>Status: {orderstatus[order.status]}</h5>
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
    </>
  );
}

