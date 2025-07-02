import Header from '@components/Header/Header';
import Category from '../../components/Category/Category';
import Button from '@components/Button/Button';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { BrandsBike, CarTypesBike } from '../../Routes/PublicRoutes/CarsRoute';
import { getWishlist } from '../../Routes/PublicRoutes/WishlistRoute';
import { getOrders } from '../../Routes/PublicRoutes/OrdersRoute';
import { useHeader } from '../../Context/HeaderContext';


function HomePage() {
  // const priceMax = ['100.000', '300.000', '500.000', '700.000'];
  const [search, setSearch] = useState({
    brands: '',
    model: '',
    // location: '',
    // price: '',
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const navigate = useNavigate();

  const { login, setHeader } = useHeader();
  useEffect(() => {
        
    async function getMotors() {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("access_token");
        const email = params.get("email");
          
        if (token) {
          localStorage.setItem("accesstoken", token);
          var mywishlist =  await getWishlist();
          var myOrders = await getOrders();
          setHeader({ ...login, isLoggin: true, email: email, wishlist: mywishlist.data.length, order: myOrders.data.length });
        } 

        var brandsData = await BrandsBike();
        setBrands(brandsData.data.items.map(b => b.name));

        var cartypesData = await CarTypesBike();
        setModels(cartypesData.data.items.map(b => b.name));

      } catch (error) {
        console.error('Error - HomePage:', error);
      }
    }
    getMotors();
  }, []);

  const handleSelectBrands = (brand) => {
    setSearch(prev => ({ ...prev, brands: brand, model: '' }));
  };

  const handleSearch = () => {
    navigate('/search', { state: search });
  };

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div>
          <h1>
            Exploring Ho Chi Minh City,
            <img
              style={{width: 30, height: 30, marginLeft: 5 }}
              src="/assets/images/mortorbike.svg"
              alt="Motorbike Icon"
            />
            <br />
            <b>
              Rent a <span style={{ color: '#FFB54C' }}>MotorBike</span>
            </b>
          </h1>

          <div>
            <h3>Choose your motorbike</h3>
            <div style={{ display: 'flex', gap: 40, margin: 0, padding: 0 }}>
              <Category
                text="Brands"
                icon="/assets/images/motorcycle.png"
                list={brands}
                onChange={handleSelectBrands}
              />
              <Category
                text="Models"
                icon="/assets/images/map.svg"
                list={models}
                onChange={model => setSearch(prev => ({ ...prev, model }))}
              />
              {/* <Category
                text="Price"
                icon="/assets/images/dollar.svg"
                list={priceMax}
                onChange={price => setSearch(prev => ({ ...prev, price }))}
              /> */}
            </div>

            <div className={styles.button}>
              <Button text="Search" handler={handleSearch} />
            </div>
          </div>
        </div>

        <img
          className={styles.homeImage}
          src="/assets/images/image1.svg"
          alt="Motorbike Rental"
        />
      </div>
    </>
  );
}

export default HomePage;
