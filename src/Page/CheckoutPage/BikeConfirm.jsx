import React, { useEffect, useState } from 'react';
import styles from './BikeConfirm.module.css';
import Button from '@components/Button/Button';
import BackButton from '@components/BackButton/BackButton';
import { CarCheckout, Payment } from '../../Routes/PublicRoutes/PaymentRoute';
import { UserApi } from '../../Routes/PublicRoutes/UserRoute';
import { useHeader } from '../../Context/HeaderContext';
import { createOrder } from '../../Routes/PublicRoutes/OrdersRoute';

function BikeConfirm(props) {
  const [bikes, setBikes] = useState([]);
  const [user, setUser] = useState({
    fullName: '',
    birth: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const { header } = useHeader();

  const [total, setTotal] = useState();

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

      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
  
    getAllItems();
  }, []);
  

  const nextStep = async () => {
    try {
      var cars = bikes.map(b => ({
        carId: b.car.id,
        quantity: b.quantity
      }));
      var orderid = await createOrder(cars);
      if (orderid) {
        sessionStorage.setItem('orderid', orderid.data);
        await Payment(total, "Order", header.email, orderid.data);
      }

    } catch (err) {
      console.error("Lỗi khi gọi create order API:", err);
    }
  };

  return (
    <>
      <BackButton handler={() => props.currentStep(0)} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        marginTop: '10px'
      }}>
        <div className={styles.listBike}>
          <div className={styles.infor}>
            <div className={styles.inforItem}>
              <div>
                <label htmlFor="fullname">Full name</label>
                <input type='text' id='fullname' name='fullname' value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                ></input>
              </div>
              <div>
                <label htmlFor="birth">Birthday</label>
                <input type='date' id='Birth' name='birth' value={user.birth?.substring(0, 10)}
                  onChange={(e) => setUser({ ...user, birth: e.target.value })}
                ></input>
              </div>
            </div>
            <div className={styles.inforItem}>
              <div>
                <label htmlFor="email">Email</label>
                <input type='email' id='email' name='email' value={user.email} readOnly ></input>
              </div>
              <div>
                <label htmlFor="phone">Phone number</label>
                <input type='number' id='phone' name='phone' value={user.phoneNumber}
                  onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                ></input>
              </div>
            </div>
            <div  className={styles.inforItem}>
              <div>
                <label htmlFor="address">Address</label>
                <input type='text' id='address' name='address' className={styles.addressWrapper} value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                ></input>
              </div>
            </div>
            <div className={styles.inforItem}>
              <div>
                <label htmlFor="total">Total</label>
                <input type='text' id='total' name='total' value={total + 'vnđ'} readOnly ></input>
              </div>
            </div>
          </div>
        </div>

        <div>
          {bikes.length === 0 ? (
            <div className={styles.notfound}>
              <h1>Oopsssss! You haven't added any vehicles yet.</h1>
              <img src='../../../assets/images/404.svg' alt='notfound' style={{ width: '200px' }} />
            </div>
          ) : (
            <>
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

              <div className={styles.button}>
                <Button text='Next' handler={nextStep} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BikeConfirm;
