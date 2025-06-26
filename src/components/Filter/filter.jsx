import styles from './filter.module.css';
import Button from '@components/Button/Button';
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { BrandsBike, CarTypesBike } from '../../Routes/PublicRoutes/CarsRoute';

function Filter(props) {
  // const districts = [
  //   'Quận 1',
  //   'Quận 2',
  //   'Quận 3',
  //   'Quận 4',
  //   'Quận 5',
  //   'Quận 6',
  //   'Quận 7',
  //   'Quận 8',
  //   'Quận 9',
  //   'Quận 10',
  //   'Quận 11',
  //   'Quận 12',
  //   'Bình Thạnh',
  //   'Gò Vấp',
  //   'Phú Nhuận',
  //   'Tân Bình',
  //   'Tân Phú',
  //   'Bình Tân',
  //   'Thủ Đức',
  //   'Nhà Bè',
  //   'Củ Chi',
  //   'Hóc Môn',
  //   'Bình Chánh',
  //   'Cần Giờ',
  // ];

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const getMotors = async () => {
      try {
        var brandsData = await BrandsBike();
        setBrands(brandsData.data.items.map(b => b.name));
        
        var cartypesData = await CarTypesBike();
        setModels(cartypesData.data.items.map(b => b.name));

      } catch (error) {
        console.error('Error:', error);
      }
    };

    getMotors();
  }, []);

  const [search, setSearch] = useState({
    keyword: props.search.brands || '',
    brand: props.search.brands || '',
    model: props.search.model || '',
    priceMin: 0,
    priceMax: 1000000000,
    page: '1',
    perPage: '12',
  });

  useEffect(() => {
    const handleSearch = async () => {
        props.onHandleMotorbikes(search);
    };

    handleSearch();
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Filters</h3>
      </div>

      <div className={styles.brandtype}>
        <label htmlFor="brand" style={{ fontWeight: 'bolder' }}>
          Brand
        </label>
        <select
          value={search.brand}
          onChange={(e) => {
            const newBrand = e.target.value;
            setSearch((prev) => ({
              ...prev,
              brand: newBrand,
              keyword: newBrand.trim(),
            }));
          }}
          name="brand"
          id="brand"
        >
          <option value="">None</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.brandtype}>
        <label htmlFor="model" style={{ fontWeight: 'bolder' }}>
          Model
        </label>
        <select
          value={search.model}
          onChange={(e) => {
            const newModel = e.target.value;
            setSearch((prev) => ({
              ...prev,
              model: newModel,
              keyword: newModel.trim(),
            }));
          }}
          name="model"
          id="model"
        >
          <option value="">None</option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4>
          Price range (<span style={{ color: '#999999' }}>vnđ</span>)
        </h4>
        <div className={styles.price}>
          <input type="number" name='priceMin' placeholder='min'
            onChange={(e) => {
              setSearch((prev) => ({
                ...prev,
                priceMin: e.target.value
              }));
            }}
          />
          ~
          <input type="number" name='priceMax' placeholder='max'
            onChange={(e) => {
              setSearch((prev) => ({
                ...prev,
                priceMax: e.target.value
              }));
            }}
          />
        </div>
      </div>

      {/* <div className={styles.locationTT}>
        <label htmlFor="pickuplocation" style={{ fontWeight: 'bolder' }}>
          Location
        </label>
        <select
          value={search.pickuplocation}
          onChange={(e) =>
            setSearch((prev) => ({
              ...prev,
              pickuplocation: e.target.value,
              keyword: e.target.value,
            }))
          }
          name="pickuplocation"
          id="pickuplocation"
        >
          <option value="">None</option>
          {districts.map((locate, index) => (
            <option key={index} value={locate}>
              {locate}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
}

export default Filter;
