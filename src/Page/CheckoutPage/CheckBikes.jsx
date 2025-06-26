import styles from './CheckBikes.module.css';
import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackButton from '@components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../../Context/HeaderContext';
import Popup from '@components/PopUp/PopUp';
import { DetailBike } from '../../Routes/PublicRoutes/CarsRoute';
import { getWishlist, RemoveFromCart, updateWishlist } from '../../Routes/PublicRoutes/WishlistRoute';

function CheckBikes(props) {
  const navigate = useNavigate();
  const { header, setHeader } = useHeader();

  const [bikes, setBikes] = useState([]);
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

  const [bikeid, setBikeId] = useState([]);

  const [clickedIndex, setClickedIndex] = useState(-1);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [message, setMessage] = useState('');

  // Load bike list từ sessionStorage
  useEffect(() => {
    const loadBikes = async () => {
      const response = await getWishlist();
      if (!response) {
        console.error('Failed to fetch bike list');
        return;
      }
      setBikes(response.data);
    };
    loadBikes();
  }, []);

  // Load chi tiết bike khi click vào bike
  useEffect(() => {
    if (clickedIndex === -1) return; // Không làm gì nếu chưa click vào bike
    const detailBike = async () => {
        const response = await DetailBike(clickedIndex);
        if (!response) {
          console.error('Failed to fetch bike details');
          return;
        }
        console.log(response.data);
        setBike({
          pricePerDay: response.data.pricePerDay,
          vehicleType: response.data.carType,
          color: "Red",
          locationId: "HCM",
          year:  "2023",
          licensePlate: response.data.licensePlate,
          id: response.data.id,
          title: response.data.name,
          capacity: "150",
          gear: "Manual",
          brand: response.data.brand,
          model: "Vision",
          // -----------
          star: 5,
          fee: 20,
          deposit: 500,
          pickuplocation: 'Quận 1',
          dropofflocation: 'Quận 2',
          pickupDate: '2025-04-15',
          dropoffDate: '2025-04-15',
          pickupTime: '08:00 am',
          dropoffTime: '06:00 pm',
          bookingdocsReqs: 'ID Card & Driving License',
          img: '/assets/images/vison.jpg',
          displacement: '150',
          description: 'xe tốt',
        });
    };
    detailBike();
  }, [clickedIndex]);

  const removeBike = async (id) => {
    var res = await RemoveFromCart(id);
    if (!res) {
      console.error('Failed to remove bike from wishlist');
      return;
    }
    console.log("Removed bike from wishlist successfully"); 
    setHeader({ ...header, wishlist: header.wishlist - 1 });
    setBikes(prev => prev.filter(bike => bike.car.id !== id));
    console.log("Bike removed successfully");
  };

  // Thay đổi số lượng
  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return; 
    setBikes(prevBikes => 
      prevBikes.map(bike => 
        bike.car.id === id ? { ...bike, quantity: newQuantity } : bike
      )
    );
    var res = await updateWishlist(id, newQuantity);
    if (!res) {
      console.error('Failed to update bike quantity in wishlist');
      return;
    }
    console.log("Updated bike quantity in wishlist successfully");
  };

  // Chọn xe
  const ChooseBikeId = (inputid) => {
    if (!bikeid.includes(inputid)) {
      setBikeId(prev => [...prev, inputid]);
    }
  };
  

  // Bỏ chọn xe
  const DropBikeId = (inputid) => {
    setBikeId(prev => prev.filter(id => id !== inputid));
  };

  // Bước tiếp theo
  const nextStep = () => {
    if (!header.isLoggin) {
      setShowPopup(true);
      setMessage('Bạn cần đăng nhập để tiếp tục.');
      return;
    }

    if (bikeid.length === 0) {
      setShowPopup1(true);
      setMessage('Bạn chưa chọn xe nào.');
      return;
    }
    sessionStorage.setItem("bikeids", JSON.stringify(bikeid));
    props.currentStep(1);
  };

  return (
    <>
      <BackButton handler={() => navigate('/home') } />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          {bikes.length === 0 ? (
            <div className={styles.notfound}>
              <h1>Oopsssss!. You haven’t added any vehicles yet.</h1>
              <img src='../../../assets/images/404.svg' alt='notfound' style={{ width: 200 }} />
            </div>
          ) : (
              <>
                <div className={styles.listBike}>
                  <div className={styles.rowtitle}>
                    <h5>Choose</h5>
                    <h5>Image</h5>
                    <h5>Title</h5>
                    <h5>Price(vnđ)</h5>
                    <h5>Quantity</h5>
                    <h5>Subtotal(vnđ)</h5>
                  </div>
                {bikes.map((bike) => (
                  <div
                    key={bike.car.id}
                    className={styles.card}
                    data-clicked={clickedIndex === bike.car.id}
                    // onClick={() => setClickedIndex(bike.car.id)}
                  >
                    <div
                      className={styles.bin}
                      onClick={() => {
                        removeBike(bike.car.id);
                      }}
                    >
                      <img src="/assets/images/exit.png" alt="delete" style={{ width: 20, height: 20 }}/>
                    </div>
                    <div style={{width:"100px", textAlign:"center"}}>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          e.target.checked ? ChooseBikeId(bike.car.id) : DropBikeId(bike.car.id);
                        }}
                        style={{width:"20px", height:"20px"}}
                      />
                    </div>
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
                        <img
                          src="/assets/images/minus.png"
                          alt="minus"
                          onClick={() => {
                            handleQuantityChange(bike.car.id, bike.quantity - 1);
                          }}
                        />
                        <input
                          type="number"
                          value={bike.quantity}
                          min={1}
                          readOnly
                        />
                        <img
                          src="/assets/images/add.png"
                          alt="add"
                          onClick={() => {
                            handleQuantityChange(bike.car.id, bike.quantity + 1);
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.subcard}>
                      <p>{bike.quantity * bike.car.pricePerDay}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.button}>
                <Button text="Next" handler={nextStep} />
              </div>

              {showPopup && <Popup message={message} onClose={() => navigate('/login')} />}
              {showPopup1 && <Popup message={message} onClose={() => setShowPopup1(false)} />}
            </>
          )}
        </div>

        {/* Chi tiết bike */}
        {clickedIndex > -1 && (
          <div className={styles.section}>
            <div>
              <div
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => setClickedIndex(-1)}
              >
                <img
                  src="/assets/images/exit.png"
                  alt="exit"
                  style={{ position: 'absolute', top: 0, right: 10, width: 30 }}
                />
              </div>

              <div className={styles.subSection1}>
                {/* <img src={bike.img} alt={bike.model} className={styles.img} /> */}
              </div>

              <div className={styles.subSection2}>
                <h2>{bike.title}</h2>
                <div className={styles.price}>
                  <p>{bike.pricePerDay} vnđ / ngày</p>
                  <p>{bike.vehicleType}</p>
                </div>
                <div className={styles.status}>
                  <FontAwesomeIcon icon={faStar} />
                  <p>{bike.star}</p>
                </div>
                <div className={styles.description}>
                  <p>{bike.description}</p>
                </div>

                <div className={styles.info}>
                  <p>Pick-up location: {bike.pickuplocation}</p>
                  <p>Drop-off location: {bike.dropofflocation}</p>
                  <p>Pick-up date: {bike.pickupDate}</p>
                  <p>Drop-off date: {bike.dropoffDate}</p>
                  <p>Pick-up time: {bike.pickupTime}</p>
                  <p>Drop-off time: {bike.dropoffTime}</p>
                  <p>Booking docs required: {bike.bookingdocsReqs}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckBikes;
