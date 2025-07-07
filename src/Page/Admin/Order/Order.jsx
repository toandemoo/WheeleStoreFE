import styles from "./Order.module.css";
import SideBar from "../../../components/SideBar/SideBar";
import { useEffect, useState } from "react";
import Button from '@components/Button/Button';
import Header from "../../../components/Header/Header";
import { FilterOrderAdmin, getAllOrdersAdmin } from "../../../Routes/PublicRoutes/OrdersRoute";
import { useNavigate } from "react-router-dom";

export default function Order() {
   const navigate = useNavigate();
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [totalPages, setTotalPages] = useState(0);
   const [totalItems, setTotalItems] = useState(0);
   const [orders, setOrders] = useState([]);
   useEffect(() => { 
      const fetchOrders = async () => {
         var res = await getAllOrdersAdmin(currentPage, pageSize);
         if (res) {
            setOrders(res.data.items);
            setTotalPages(res.data.totalPages);
            setTotalItems(res.data.totalItems);
         } else {
            console.error("Failed to fetch orders");
         }
      }
      fetchOrders();
   }, [currentPage, pageSize]);

   const [collapsed, setCollapsed] = useState(false);

   const status = [
      'Pending',
      'Confirmed',
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled',
      'Returned',
      'Refunded'
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
    
    const [searchTerm, setSearchTerm] = useState('');
   useEffect(() => {
      const fetchProducts = async () => {
            var res = await FilterOrderAdmin({ keyword: searchTerm, page: currentPage, perPage: pageSize });
            if (searchTerm === '') {
               res = await getAllOrdersAdmin(currentPage, pageSize);
            }
            if (res) {
               setOrders(res.data.items);
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
                     <h3>Orders</h3>
                     <input type="text" className={styles.searchInput} placeholder="Search id, name, date..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                  <table>
                     <thead>
                        <tr className={styles.tableRow}>
                           <th style={{ width: '10px' }}>No.</th>
                           <th>Id</th>
                           <th>Name</th>
                           <th>Date</th>
                           <th>Status</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {  orders.length === 0 ?
                           <tr>
                              <td colSpan="7" className={styles.noData}>No products available</td>
                           </tr>
                           :
                           orders.map((order, index) => (
                           <tr className={styles.tableRow} key={order.id || index}>
                              <th>{(currentPage - 1) * pageSize + index + 1}</th>
                              <th>{order.id}</th>
                              <th>{order.name}</th>
                              <th>{new Date(order.createAt).toLocaleDateString('vi-VN')}</th>
                              <th>{status[order.status]}</th>
                              <th>
                                 <div className={styles.btn}>
                                    <Button text="View" handler={() => navigate(`/admin/order/detail/${order.id}`)} />
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
                  
                     {getPageNumbers()[0] > 1 && (
                        <>
                           <button onClick={() => setCurrentPage(1)}>1</button>
                           <span>...</span>
                        </>
                     )}
                  
                     {getPageNumbers().map((page) => (
                        <button
                           key={page}
                           onClick={() => setCurrentPage(page)}
                           className={currentPage === page ?  styles.active : ""}
                        >
                           {page}
                        </button>
                     ))}
                  
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
         </div>
      </div>
   );
}