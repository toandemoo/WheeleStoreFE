import { useEffect, useState } from 'react';
import Filter from '../../components/Filter/filter';
import Card from '@components/Card/Card';
import styles from './SearchPage.module.css';
import Header from '@components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '@components/BackButton/BackButton';
import DetailPage from './DetailPage';
import { FilterCar, SearchCar} from '../../Routes/PublicRoutes/CarsRoute';

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search] = useState(location.state || {});
  const [view, setView] = useState(null);

  const [searchParams, setSearchParams] = useState({
    brand: search.brands || '',
    model: search.model || '',
    keyword: search.brands || '',
    priceMin: '',
    priceMax: '',
    sortby: '',
    // location: search.location || '',
    page: '1',
    perPage: '12',
  });

  const [motorbikes, setMotorbikes] = useState({
    data: [],
    pagination: {
      totalPages: 1,
      totalItems: 0,
      currentPage: 1,
    },
  });

  const handleMotorbikes = (newSearchParams) => {
    setSearchParams(prev => ({
      ...prev,
      ...newSearchParams,
      page: '1', // Reset về page đầu khi filter thay đổi
    }));
  };

  const selectCar = (id) => {
    setView(id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // hoặc 'auto'
    });
  }

  useEffect(() => {
    setView(null);
    const filters = async () => {
      const res = await FilterCar(searchParams);
      if (!res) {
        console.error('Failed to fetch motorbikes');
        return;
      }
      setMotorbikes({
        data: res.data.items,
        pagination: {
          totalPages: parseInt(res.data.totalPages),
          totalItems: parseInt(res.data.totalItems),
          currentPage: parseInt(res.data.pageNumber),
        },
      });
    }
    filters();
  }, [searchParams]);

  return (
    <>
      <Header />
      <BackButton handler={() => navigate('/home')} />

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ margin: '0 15px' }}>
          <Filter search={search} onHandleMotorbikes={handleMotorbikes} />
        </div>

        <div style={{ flex: 1 }}>
          {view && (
            <DetailPage id={view} onChangeView={() => setView(null)} />
          )}
          {motorbikes.pagination.totalItems > 0 ? (
            <div className={styles.listcard}>
              {motorbikes.data.map((item) => (
                <div key={item.id} onClick={() => selectCar(item.id) }>
                  <Card item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.notfound}>
              <h1 style={{ fontSize: '2em' }}>
                  Oopsssss! We have not found anything matched your search.
                  {motorbikes.pagination.totalItems}
              </h1>
              <img src='/assets/images/404.svg' alt='notfound' />
            </div>
          )}
        </div>
      </div>

      {motorbikes.pagination.totalItems > 0 && (
        <div className={styles.pagination}>
          <button
            disabled={motorbikes.pagination.currentPage === 1}
            onClick={() => {
              setSearchParams({ ...searchParams, page: (motorbikes.pagination.currentPage - 1).toString() });
            }}
            className={styles.first}
          >
            {'<<'}
          </button>

          {[...Array(motorbikes.pagination.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setSearchParams({ ...searchParams, page: (i + 1).toString() })}
              style={{ fontWeight: motorbikes.pagination.currentPage === i + 1 ? 'bold' : 'normal' }}
              className={styles.between}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={motorbikes.pagination.currentPage === motorbikes.pagination.totalPages}
            onClick={() => {
              setSearchParams({ ...searchParams, page: (motorbikes.pagination.currentPage + 1).toString() });
            }}
            className={styles.last}
          >
            {'>>'}
          </button>
        </div>
      )}
    </>
  );
}

export default SearchPage;
