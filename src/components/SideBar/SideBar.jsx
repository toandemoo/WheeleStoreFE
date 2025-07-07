import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

export default function SideBar({ collapsed, toggle }) {
   return (
         <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
               <div className={`${collapsed ? styles.sidebarItem : ""}`} >
                  <ul>
                     <li><Link to="/admin/index">Dashboard</Link></li>
                     <li><Link to="/admin/manager">Manager</Link></li>
                     <li><Link to="/admin/product">Product</Link></li>
                     <li><Link to="/admin/order">Order</Link></li>
                  </ul>
               </div>
            <button className={styles.toggleBtn} onClick={toggle}>☰</button>
         </div>
   );
}