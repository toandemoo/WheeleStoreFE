import Button from '@components/Button/Button';
import ModalWrapper from '@components/Modal/Modal';
import SideBar from "../../../components/SideBar/SideBar";
import styles from "./manager.module.css";
import { useEffect, useState } from "react";
import { CreateUser, DeleteUser, getUserByRole } from '../../../Routes/PublicRoutes/UserRoute';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';

export default function Manager() {
   const navigate = useNavigate();

   const [admins, setAdmins] = useState([]);
   useEffect(() => {
      const AdminApi = async () => {
         var res = await getUserByRole('Admin');
         setAdmins(res);
      }
      AdminApi();
   }, [])
   
   const role = [
      'Admin',
      'User',
      'Manager',
      'Seller',
      'Customer',
      'Shipper',
      'Accountant'
   ];

   const [collapsed, setCollapsed] = useState(false);

   const [showModal, setShowModal] = useState(false);

   const [admin, setAdmin] = useState({
      fullName: "", 
      email: "",
      phoneNumber: "",
      password: "",
      role: 0,
      birth: ""
   });

   const submit = async (admin) => {
      var res = await CreateUser({
         fullName: admin.fullName,
         email: admin.email,
         phoneNumber: admin.phoneNumber,
         password: admin.password,
         role: admin.role,
         birth: admin.birth
      });
      if (res) {
         setShowModal(false);
         setAdmins(prev => [...prev, res]);
      } 
   };

   const deleteUser = async (id) => {
      const res = await DeleteUser(id);
      if (res) {
         setAdmins(prev => prev.filter(admin => admin.id !== id));
      }
   };

   return (
      <div>
         <Header />
         <div className={styles.container}>
            <SideBar collapsed={collapsed} toggle={() => setCollapsed(prev => !prev)} />
            <div className={`${styles.content} ${collapsed ? styles.expand : ""}`}>
               <div>
                  <div className={styles.title}>
                     <h3>Managers</h3>
                     <div>
                        <Button text="+Add" handler={() => setShowModal(true)} />
                     </div>
                  </div>
                  <table>
                     <thead>
                        <tr className={styles.tableRow}>
                           <th>No.</th>
                           <th>Name</th>
                           <th>Role</th>
                           <th>CreatAt</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           admins.map((admin, index) => (
                              <tr key={admin.id || index} className={styles.tableRow}>
                                 <th>{index}</th>
                                 <th>{admin.fullName}</th>
                                 <th>{role[admin.role]}</th>
                                 <th>{new Date(admin.createdAt).toLocaleDateString('vi-VN')}</th>
                                 <th>
                                    <div className={styles.btn}>
                                       <div>
                                          <Button text="View" handler={() => { navigate('/admin/manager/profile/' + admin.id) }} />
                                       </div>
                                       <div>
                                          <Button text="Delete" handler={() => deleteUser(admin.id)} />
                                       </div>
                                    </div>
                                 </th>
                              </tr>
                           ))
                        }
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <ModalWrapper show={showModal} onClose={() => setShowModal(false)}>
            <div>
               <h3 className={styles.modalTitle}>Add Manager</h3>
               <form className={styles.form}>
                  <div className={styles.formRow}>
                     <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter name" value={admin.fullName} onChange={(e) => setAdmin({ ...admin, fullName: e.target.value })} />
                     </div>
                     <div className={styles.formGroup}>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" id="birthday" placeholder="Enter birthday" value={admin.birth} onChange={(e) => setAdmin({ ...admin, birth: e.target.value })} />
                     </div>
                  </div>
                  <div className={styles.formRow}>
                     <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter email" value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
                     </div>
                     <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" placeholder="Enter phone number" value={admin.phoneNumber} onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })} />
                     </div>
                  </div>
                  <div className={styles.formGroup}>
                     <label htmlFor="password">Password</label>
                     <input type="password" id="password" placeholder="Enter password" value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                     <label htmlFor="role">Role</label>
                     <select id="role" value={admin.role} onChange={(e) => setAdmin({ ...admin, role: e.target.value })}>
                        {role.map((r, index) => (
                           <option key={index} value={index}>{r}</option>
                        ))}
                     </select>
                  </div>
                  <div className={styles.formActions}>
                     <Button text="Submit" handler={() => submit(admin)} />
                  </div>
               </form>
            </div>
         </ModalWrapper>
      </div>
   );
}