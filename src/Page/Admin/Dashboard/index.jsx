import SideBar from "../../../components/SideBar/SideBar";
import styles from "./index.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { SearchCar } from "../../../Routes/PublicRoutes/CarsRoute";
import { getAllOrdersAdmin } from "../../../Routes/PublicRoutes/OrdersRoute";
import { getUserByRole } from "../../../Routes/PublicRoutes/UserRoute";


export default function Dashboard() {
   const orderData = [
      { month: 'Jan', orders: 30 },
      { month: 'Feb', orders: 45 },
      { month: 'Mar', orders: 60 },
      { month: 'Apr', orders: 50 },
      { month: 'May', orders: 70 },
      { month: 'Jun', orders: 55 },
      { month: 'Jul', orders: 80 },
      { month: 'Aug', orders: 90 },
      { month: 'Sep', orders: 100 },
      { month: 'Oct', orders: 120 },
      { month: 'Nov', orders: 110 },
      { month: 'Dec', orders: 130 }
   ];
   
   const [collapsed, setCollapsed] = useState(false);
   const [products, setProducts] = useState(0);
   const [orders, setOrders] = useState(0);
   const [users, setUsers] = useState(0);
   useEffect(() => {
      const getData = async () => {
         var products = await SearchCar(1, 1);
         if (!products) {
            console.error('Failed to fetch products');
            return;
         }
         setProducts(products.data.totalItems);

         var orders = await getAllOrdersAdmin(1,1);
         if (!orders) {
            console.error('Failed to fetch orders');
            return;
         }
         setOrders(orders.data.totalItems);

         var users = await getUserByRole('User');
         if (!users) {
            console.error('Failed to fetch users');
         }
         setUsers(users.length);
      }
      getData();
   }, []);

   return (
      <div>
         <Header />   
         <div className={styles.container}>
            <SideBar collapsed={collapsed} toggle={() => setCollapsed(prev => !prev)} />

            <div className={`${styles.content} ${collapsed ? styles.expand : ""}`}>
               <div className={styles.title}>
                  <div className={styles.titleItem}>
                     <h4>Orders</h4>
                     <div>
                        <h6>{orders}</h6>
                     </div>
                  </div>
                  <div className={styles.titleItem}>
                     <h4>Products</h4>
                     <div>
                        <h6>{products}</h6>
                     </div>
                  </div>
                  <div className={styles.titleItem}>
                     <h4>User Registers</h4>
                     <div>
                        <h6>{users}</h6>
                     </div>
                  </div>
               </div>

               <div style={{ width: '100%', height: 400, marginBottom: 100, }}>
                  <h4 style={{ textAlign: 'center' }}>Số đơn hàng theo tháng</h4>
                  <ResponsiveContainer>
                  <BarChart data={orderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="month" />
                     <YAxis />
                     <Tooltip />
                     <Bar dataKey="orders" fill="#8884d8" />
                  </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>
   );
}