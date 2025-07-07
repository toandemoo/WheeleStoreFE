import styles from "./Product.module.css";
import SideBar from "../../../components/SideBar/SideBar";
import { useEffect, useState } from "react";
import Button from '@components/Button/Button';
import Header from "../../../components/Header/Header";
import { DetailBike, SearchCar, DeleteCar, CarTypesBike, BrandsBike, AddCar, FilterCarAdmin } from "../../../Routes/PublicRoutes/CarsRoute";
import ModalWrapper from '@components/Modal/Modal';
import { useNavigate } from "react-router-dom";

export default function Product() {

   const [products, setProducts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [totalPages, setTotalPages] = useState(0);
   const [totalItems, setTotalItems] = useState(0);
   const [carType, setCarType] = useState([]);
   const [brand, setBrand] = useState([]);
   useEffect(() => {
      const fetchProducts = async () => {
         var res = await SearchCar(currentPage, pageSize);
         if (res) {
            setProducts(res.data.items);
            setTotalPages(res.data.totalPages);
            setTotalItems(res.data.totalItems);
         }

         var carTypes = await CarTypesBike();
         if (carTypes) {
            setCarType(carTypes.data.items);
         }

         var brands = await BrandsBike();
         if (brands) {
            setBrand(brands.data.items);
         }
      }
      fetchProducts();
   }, [currentPage, pageSize, totalPages, totalItems]);

   const [collapsed, setCollapsed] = useState(false); 

   const status = [
         'Available',
         'Rented',
         'Maintenance',
         'Reserved',
         'Inactive'
   ]
   

   const getPageNumbers = () => {
     const maxButtons = 5;
     let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
     let endPage = startPage + maxButtons - 1;
   
     if (endPage > totalPages) {
         endPage = totalPages;
         startPage = Math.max(endPage - maxButtons + 1, 1);
     }
   
     const pages = [];
     for (let i = startPage; i <= endPage; i++) {
       pages.push(i);
     }
   
     return pages;
   };

   const DeleteProduct = async (id) => {
      try {
         setTotalItems((prev) => prev - 1);
         const response = await DeleteCar(id);
         if (response) {
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
         }
      } catch (error) {
         console.error('DeleteProduct error:', error);
      }
   };

   const [showModal, setShowModal] = useState(false);


   const [car, setCar] = useState({
      name: '',
      amount: 0,
      carTypeId: '',
      brandId: '',
      price: 0,
      imageUrl: '',
      status: 0
   });

   const handleAddProduct = async (car) => { 
      var res = await AddCar(car);
      if (!res) {
         console.error('Failed to add product');
         alert('Failed to add product');
      }
      setTotalPages(prev => prev + 1);
   };

   const navigate = useNavigate();

   const [searchTerm, setSearchTerm] = useState('');
   useEffect(() => {
      const fetchProducts = async () => {
         var res = await FilterCarAdmin({ keyword: searchTerm, page: currentPage, perPage: pageSize });
         if (res) {
            setProducts(res.data.items);
            setTotalPages(res.data.totalPages);
            setTotalItems(res.data.totalItems);
         }
      }
      fetchProducts();
   }, [currentPage, pageSize, searchTerm]);

   return (
      <div>
         <Header />
         <div className={styles.container}>
            <SideBar collapsed={collapsed} toggle={() => setCollapsed(prev => !prev)} />
            
            <div className={`${styles.content} ${collapsed ? styles.expand : ""}`}>
               <div>
                  <div className={styles.title}>
                     <h3>Products</h3>
                     <input type="text" className={styles.searchInput} placeholder="Search id, name, price..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                     <div>
                        <Button text="+Add" handler={() => setShowModal(true)} />
                     </div>
                  </div>
                  <table>
                     <thead>
                        <tr className={styles.tableRow}>
                           <th style={{ width: '10px' }}>Stt</th>
                           <th>Image</th>
                           <th>Name</th>
                           <th>Amount</th>
                           <th>Price</th>
                           <th>State</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {     
                           products.length === 0 ?
                           <tr>
                                 <td colSpan="7" className={styles.noData}>No products available</td>
                           </tr>
                              :
                           products.map((product, index) => (
                           <tr key={index} className={styles.tableRow}>
                              <th>{(currentPage - 1) * pageSize + index + 1}</th>
                                 <th>
                                 {product.imageUrl ? (
                                       <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
                                 ) : null}
                              </th>
                              <th>{product.name}</th>
                              <th>0</th>
                              <th>{product.pricePerDay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</th>
                              <th>{status[product.status]}</th>
                              <th>
                                 <div className={styles.btn}>
                                       <Button text="View" handler={() => navigate(`/admin/product/${product.id}`) } />
                                       <Button text="Delete" handler={() => DeleteProduct(product.id) } />
                                 </div>
                              </th>
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  <div className={styles.pagination}>
                     <button disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                     >
                        Prev
                     </button>

                     {/* Trang đầu nếu cách xa */}
                     {getPageNumbers()[0] > 1 && (
                        <>
                           <button onClick={() => setCurrentPage(1)}>1</button>
                           <span>...</span>
                        </>
                     )}

                     {/* Các nút ở giữa */}
                     {getPageNumbers().map((page) => (
                        <button
                           key={page}
                           onClick={() => setCurrentPage(page)}
                           className={currentPage === page ?  styles.active : ""}
                        >
                           {page}
                        </button>
                     ))}

                     {/* Trang cuối nếu cách xa */}
                     {getPageNumbers().slice(-1)[0] < totalPages && (
                        <>
                           <span>...</span>
                           <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
                        </>
                     )}

                     <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                     </button>
                  </div>
               </div>
            </div>

            <ModalWrapper show={showModal} onClose={() => setShowModal(false)}>
               <div className={styles.modalContent}>
                  <h3 className={styles.modalTitle}>Add Product</h3>
                  <form className={styles.form}>
                     <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                           <label htmlFor="name">Name</label>
                           <input type="text" id="name" placeholder="Enter product name" value={car.name} onChange={(e) => setCar({ ...car, name: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                           <label htmlFor="amount">Amount</label>
                           <input type="number" id="amount" placeholder="Enter amount" value={car.amount} onChange={(e) => setCar({ ...car, amount: e.target.value })} />
                        </div>
                     </div>
                     <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                           <label htmlFor="carType">Car Type</label>
                           <select id="carType" value={car.carTypeId} onChange={(e) => setCar({ ...car, carTypeId: e.target.value })}>
                              <option value="">Select car type</option>
                              {carType.map((type) => (
                                 <option key={type.id} value={type.id}>{type.name}</option>
                              ))}
                           </select>
                        </div>
                        <div className={styles.formGroup}>
                           <label htmlFor="brand">Brand</label>
                           <select id="brand" value={car.brandId} onChange={(e) => setCar({ ...car, brandId: e.target.value })}>
                              <option value="">Select brand</option>
                              {brand.map((b) => (
                                 <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div className={styles.formGroup}>
                           <label htmlFor="price">Price</label>
                           <input type="number" id="price" placeholder="Enter price" value={car.price} onChange={(e) => setCar({ ...car, price: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                           <label htmlFor="image">Image URL</label>
                           <input type="text" id="image" placeholder="Enter image URL" value={car.imageUrl} onChange={(e) => setCar({ ...car, imageUrl: e.target.value })} />
                        </div>
                     <button type="submit" className={styles.submitBtn} onClick={() => handleAddProduct(car)}>Add Product</button>
                  </form>
               </div>
            </ModalWrapper>
         </div>
      </div>
   );
}