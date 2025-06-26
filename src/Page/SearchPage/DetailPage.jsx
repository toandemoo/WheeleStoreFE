import { useState, useEffect } from 'react';
import styles from './DetailPage.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button/Button';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from '@components/PopUp/PopUp';
import { DetailBike } from '../../Routes/PublicRoutes/CarsRoute';
import { AddtoCart } from '../../Routes/PublicRoutes/WishlistRoute';
import { useHeader } from '../../Context/HeaderContext';

function DetailPage(props) {
  const navigate = useNavigate();
  const [bike, setBike] = useState({
    pricePerDay: 54,
    vehicleType: 45,
    color: 45,
    locationId: 45,
    year: 45,
    licensePlate: 45,
    id: 45,
    // -----------
    fee: 20,
    deposit: 500,
    pickuplocation: 'Quận 1',
    dropofflocation: 'Quận 2',
    pickupDate: '2025-04-15',
    dropoffDate: '2025-04-15',
    pickupTime: '08:00 am',
    dropoffTime: '06:00 pm',
    star: 4,
    title: 'sdfsdf',
    bookingdocsReqs: 'ID Card & Driving License',
    capacity: 34,
    gear: 34,
    img: '/assets/images/vison.jpg',
    brand: 34,
    model: 34,
    displacement: '150',
    description: 'xe tốt',
  });
  
  const { header, setHeader } = useHeader();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const detailBike = async () => {
      if (props.id != null) {
        const response = await DetailBike(props.id);
        if (!response) {
          console.error('Failed to fetch bike details');
          return;
        }

        setBike({
          pricePerDay: response.data.pricePerDay,
          vehicleType: response.data.carType,
          licensePlate: response.data.licensePlate,
          id: response.data.id,
          title: response.data.name,
          brand: response.data.brandName,
          // -----------
          model: "Vision",
          capacity: "150",
          gear: "Manual",
          color: "Red",
          locationId: "HCM",
          year:  "2023",
          star: 5,
          img: '/assets/images/vison.jpg',
          displacement: '150',
          description: 'xe tốt',
        });
      }
    };
    detailBike();
  }, [props.id]);

  const addToCart = async (id) => {
    var res = await AddtoCart(id);
    if (res) {
      if(header.wishlist === 0 || header.wishlist === undefined) {
        setHeader({ ...header, wishlist: 1 });
      } else {
        setHeader({ ...header, wishlist: header.wishlist + 1 });
      }
      setMessage('Product has been added to the cart.');
      setShowPopup(true);
    } else {
      setMessage('Failed to add product to cart');
      setShowPopup(true);
    }
  };

  return (
    <div>
      {/* <h2 className={styles.title}>Detail Bike</h2> */}
      <div className={styles.Container}>
        <div className={styles.section}>
          <div
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => props.onChangeView(null)}
          >
            <img
              src='/assets/images/exit.png'
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            />
          </div>
          {/* <h1>Details</h1> */}
          <div className={styles.section1}>
            <div className={styles.img}>
              <img src={bike.img} />
            </div>
            <div>
              <div className={styles.descript}>
                <h4 className={styles.title} style={{ color: '#006600' }}>
                  {bike.title}
                </h4>
                <div className={styles.infor}>
                  <span style={{ fontWeight: 'bolder' }}>
                    {bike.star}
                    <FontAwesomeIcon icon={faStar} style={{ color: '#FFDD00' }} />
                  </span>
                  <span>
                    <span className={styles.title} style={{ fontSize: '1.3em' }}>
                      {bike.pricePerDay}
                    </span>
                    <span style={{ color: '#a6a6a6' }}>vnđ</span>
                  </span>
                </div>
                <div className={styles.infor}>
                  <span className={styles.type}>Vehicle Type:</span>
                  <span style={{ fontWeight: 'bolder' }}>{bike.vehicleType}</span>
                </div>
                <div className={styles.infor}>
                  <span className={styles.type}>Capacity:</span>
                  <span style={{ fontWeight: 'bolder' }}>{bike.capacity}cc</span>
                </div>
                <div className={styles.infor}>
                  <span className={styles.type}>Brand:</span>
                  <span style={{ fontWeight: 'bolder' }}>{bike.brand}</span>
                </div>
                <div className={styles.infor}>
                  <span className={styles.type}>Color:</span>
                  <span style={{ fontWeight: 'bolder' }}>{bike.color}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <Button text='+WishList' handler={() => addToCart(props.id)} />
            <Button text='Checkout' handler={() => navigate('/checkout')} />
          </div>
          {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
