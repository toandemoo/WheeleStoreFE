import styles from './DetailProduct.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DetailBike, UpdateCar } from '../../../Routes/PublicRoutes/CarsRoute';
import Header from '../../../components/Header/Header';
import BackButton from '@components/BackButton/BackButton';
import { CarTypesBike, BrandsBike, AddCar } from "../../../Routes/PublicRoutes/CarsRoute";
import Button from '@components/Button/Button';
import Popup from '@components/PopUp/PopUp';


export default function DetailProduct() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [bike, setBike] = useState({});
  const [carType, setCarType] = useState([]);
  const [brand, setBrand] = useState([]);

  const { id } = useParams();
  useEffect(() => {
     const detailBike = async () => {
       var carTypes = await CarTypesBike();
      if (carTypes) {
         setCarType(carTypes.data.items);
      } 
       
      var brands = await BrandsBike();
      if (brands) {
         setBrand(brands.data.items);
        }
        
      if (id != null) {
        const response = await DetailBike(id);
        if (!response) {
          console.error('Failed to fetch bike details');
          return;
        }

        setBike({
          pricePerDay: response.data.pricePerDay,
          vehicleType: response.data.carType,
          carTypeId: response.data.carTypeId,
          licensePlate: response.data.licensePlate,
          id: response.data.id,
          title: response.data.name,
          brand: response.data.brandName,
          brandId: response.data.brandId,
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
  }, [id]);
   
   const updateBike = async (id, bike) => {
      const response = await UpdateCar(id, bike);
      if (!response) {
         console.error('Failed to update bike');
         alert('Update bike failed');
      }
      setShowPopup(true);
   }


  return (
     <div>
      <Header />
      <BackButton handler={() => navigate('/admin/product')} />
      <div className={styles.Container}>
        <div className={styles.section}>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={bike.img} />
            </div>
              <div>
               <div className={styles.inputGroup}>
                  <div className={styles.inputItem}>
                     <label htmlFor='title' className={styles.title}>Title</label>
                     <input type="text" value={bike.title || ''}  className={styles.brand} onChange={(e) => setBike({ ...bike, title: e.target.value })} />
                  </div>
                  <div className={styles.inputItem}>
                     <label htmlFor='year' className={styles.title}>Year</label>
                     <input type="text" value={bike.year || ''}  className={styles.brand} onChange={(e) => setBike({ ...bike, year: e.target.value })} />
                  </div>
               </div>
               <div className={styles.inputGroup}>
                  <div className={styles.inputItem}>
                     <label htmlFor='brand' className={styles.title}>Brand</label>
                     <select value={bike.brand || ''} className={styles.brand} onChange={(e) => setBike({ ...bike, brand: e.target.value })}>
                        {brand.map((item) => (
                           <option key={item.id} value={item.id}>
                              {item.name}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className={styles.inputItem}>
                     <label htmlFor='model' className={styles.title}>Model</label>
                     <select value={bike.model || ''} className={styles.brand} onChange={(e) => setBike({ ...bike, model: e.target.value })}>
                        {carType.map((item) => (
                           <option key={item.id} value={item.id}>
                              {item.name}
                           </option>
                        ))}   
                     </select>
               </div>
               </div>
               <div className={styles.inputItem}>
                  <label htmlFor='color' className={styles.title}>Color</label>
                  <input type="text" value={bike.color || ''}  className={styles.brand} onChange={(e) => setBike({ ...bike, color: e.target.value })} />
               </div>
               <div className={styles.inputItem}>
                  <label htmlFor='price' className={styles.title}>Price</label>
                  <input type="text" value={bike.pricePerDay + 'đ'}  className={styles.brand} onChange={(e) => setBike({ ...bike, pricePerDay: e.target.value })} />
               </div>
            </div>
         </div>
            <div className={styles.button}>
               <Button text='Update' handler={() => updateBike(bike.id, bike)} />
            </div>
        </div>
        </div>
        {showPopup && <Popup message={"Update car successfully"} onClose={() => setShowPopup(false)} />}
    </div>
  );
}
