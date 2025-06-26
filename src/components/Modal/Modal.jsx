import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Modal({ item, user, onClose }) {
  const navigate = useNavigate();

  // Sửa lỗi chính tả locationId
  const [bikes] = useState({
    pricePerDay: item.pricePerDay,
    vehicleType: item.vehicleType,
    color: item.color,
    locationId: item.locationId, // sửa thành đúng key
    year: item.year,
    licensePlate: item.licensePlate,
    id: item.id,
    img: '/assets/images/vison.jpg',
    brand: 'Honda',
    model: 'Winner X',
    displacement: 500,
    pickuplocation: 'Quận 1',
    dropofflocation: 'Quận 2',
    dropoffDate: '06:00 PM',
    pickupDate: '08:00 AM',
    star: 4,
    title: 'Honda Airblade 2021',
    bookingdocsReqs: 'ID Card & Driving License',
    capacity: 125,
    gear: 'No',
    description: 'xe tốt',
    fee: 20,
  });

  const handleSubmit = () => {
    navigate('/checkout', { state: { user, bike: bikes } });
  };

  return (
    <div onClick={onClose} className={styles.container}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>

        <div className={styles.imageSection}>
          <img src={bikes.img} alt={bikes.title} className={styles.mainImage} />
          <div className={styles.thumbnailContainer}>
            {/* Bạn có thể render ảnh động hoặc list ảnh thật từ props nếu có */}
            <img src={bikes.img} alt="Thumbnail" />
            <img src={bikes.img} alt="Thumbnail" />
            <img src={bikes.img} alt="Thumbnail" />
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.content0}>
            <h3 className={styles.title}>{bikes.title}</h3>
            <h4 style={{ fontSize: '1.5em' }}>
              <span>{bikes.star}</span>
              <FontAwesomeIcon icon={faStar} style={{ color: '#FFDD00' }} />
            </h4>
          </div>

          <div className={styles.content1}>
            <h4>type: <span>{bikes.vehicleType}</span></h4>
            <h4>capacity: <span>{bikes.capacity}cc</span></h4>
            <h4>gear: <span>{bikes.gear}</span></h4>
          </div>

          <div className={styles.content2}>
            <div>
              <h3>Pickup Info</h3>
              <h4>
                <span>Location: {bikes.pickuplocation}</span><br /><br />
                <span>Date time: {bikes.pickupDate}</span>
              </h4>
            </div>
            <div>
              <h3>DropOff Info</h3>
              <h4>
                <span>Location: {bikes.dropofflocation}</span><br /><br />
                <span>Date time: {bikes.dropoffDate}</span>
              </h4>
            </div>
          </div>

          <h4>deposit: <span>{bikes.displacement}k (min. 100k)</span></h4>
          <h4>Booking Docs REQs: <span>{bikes.bookingdocsReqs}</span></h4>

          <div className={styles.content3}>
            <h4>Price/hour: <span>{bikes.fee}k/hour</span></h4>
            <h4>Price/day: <span>{bikes.pricePerDay}k/day</span></h4>
          </div>

          <div className={styles.button}>
            <Button text='Book Now' handler={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
