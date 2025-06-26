import styles from './Card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Card(props) {
  const [bikes] = useState({
    id: props.item.id,
    title: props.item.name,
    brand: props.item.brandName,
    model: props.item.carType,
    licensePlate: props.item.licensePlate,
    pricePerDay: props.item.pricePerDay,
    imageUrl: props.item.imageUrl,
    //------------------------------------------
    
    vehicleType: "Motorbike",
    color: "Red",
    locationId: "hoho", // sửa từ loctionId thành locationId
    year: "2025",
    capacity: "025",
    gear: "0234", // nếu gear thực ra không phải year thì sửa lại
    // ----------- thêm các trường khác
    fee: 20,
    deposit: 500,
    pickuplocation: 'Quận 1',
    dropofflocation: 'Quận 2',
    pickupDate: '2025-04-15',
    dropoffDate: '2025-04-15',
    pickupTime: '08:00 am',
    dropoffTime: '06:00 pm',
    star: 5,
    bookingdocsReqs: 'ID Card & Driving License',
    img: '/assets/images/vison.jpg',
    displacement: '150',
    description: 'xe tốt',
  });

  return (
    <div className={styles.container}>
      <img className={styles.image} src={bikes.img} alt="image" />
      <div>
        <div>
          <h2 className={styles.title}>{bikes.title}</h2>
          <div className={styles.DescriptStar}>
            <h3 className={styles.description}>{bikes.brand}</h3>
            <h5 className={styles.star}>
              {bikes.star}
              <FontAwesomeIcon icon={faStar} />
            </h5>
          </div>
          {/* <h3 className={styles.location}>
            <span>
              <img
                style={{ maxWidth: '20px', paddingRight: '5px' }}
                src="../../../assets/images/uparrow.png"
                alt="uparrow"
              />
              {bikes.pickuplocation}
            </span>
            <span>
              <img
                style={{ maxWidth: '20px', paddingRight: '5px' }}
                src="../../../assets/images/downarrow.png"
                alt="downarrow"
              />
              {bikes.dropofflocation}
            </span>
          </h3> */}
          <h4 className={styles.price}>
            {bikes.pricePerDay}
            <span style={{ color: '#999999' }}> vnđ</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Card;
