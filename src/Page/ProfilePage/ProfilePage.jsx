import Header from '@components/Header/Header';
import styles from './ProfilePage.module.css';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Popup from '@components/PopUp/PopUp';
import Loading from '@components/Loading/Loading';
import BackButton from '@components/BackButton/BackButton';
import { UserApi } from '@routes/PublicRoutes/UserRoute';
import { UpdateUserApi } from '../../Routes/PublicRoutes/UserRoute';
import { useHeader } from '../../Context/HeaderContext';

function ProfilePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { header, setHeader } = useHeader();
  
  const [userInfor, setUserInfor] = useState({
    password: '********',
    phoneNumber: '0123456789',
    fullName: "user",
    email: "user@gmail.com",
    address: '',
    birth: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const user = await UserApi();
      if (!user) {
        setMessage('Do not display information!\nPlease reload the page.');
        setShowPopup(true);
      } 
      setUserInfor({
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        email: user.email,
        address: user.address,
        birth: user.birth,
        profilePicture: user.profileImage,
        password: '********'
      });
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      var res = await UpdateUserApi(userInfor);
      setLoading(false);
      if (!res) {
        setMessage('Update user information failed.');
        setShowPopup(true);
      }
      setHeader({ ...header, email: userInfor.email});
      setMessage('Update information successful!');
      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setMessage('Update information failed!\nPlease try again.');
      setShowPopup(true);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);

      // Hiển thị ảnh preview tạm thời
      const url = URL.createObjectURL(file);
      setUserInfor((prev) => ({ ...prev, profilePicture: url }));

      try {
        // const token = localStorage.getItem('usertoken') || '';
        // const decoded = jwtDecode(token);
        // const userId = decoded.sub;

        // Thông thường upload file cần formData, đây bạn đang cập nhật url tạm nên backend cần hỗ trợ update url string
        // Nếu backend cần upload file thật, bạn sẽ cần upload riêng (chưa có trong code bạn)

        // await fetch('http://localhost:3000/users/' + userId, {
        //   method: 'PUT',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     profilePicture: url,
        //   }),
        // });

        setLoading(false);
        setMessage('Update avatar successful!');
        setShowPopup(true);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
        setMessage('Update avatar failed!\nPlease try again.');
        setShowPopup(true);
      }
    }
  };

  return (
    <>
      {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
      {loading && <Loading />}
      <Header />
      <BackButton handler={() => navigate('/home')} />
      <div className={styles.main}>
        <div className={styles.avatar}>
          <label>
            <img
              src={userInfor.profilePicture || '/assets/images/circleUser.svg'}
              alt="Avatar"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ffffff',
                borderRadius: '50%',
                cursor: 'pointer',
                width: '300px',
                height: '300px',
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className={styles.container}>
          <h3>Information</h3>
          <div className={styles.input}>
            <div className={styles.infor}>
              <div>
                <label htmlFor='fullName'>Full name</label>
                <input
                  type="text"
                  value={userInfor.fullName}
                  onChange={(e) => setUserInfor({ ...userInfor, fullName: e.target.value })}
                  placeholder="abc"
                  name="full name"
                  id="full name"
                />
              </div>
              <div>
                <label htmlFor='email'>Email</label>
                <input
                  type="email"
                  id='email'
                  value={userInfor.email}
                  onChange={(e) => setUserInfor({ ...userInfor, email: e.target.value })}
                  placeholder="abc@gmail.com"
                  name="email"
                  disabled
                />
              </div>
              <div>
                <label htmlFor='birth'>Birthdat</label>
                <input
                  type="date"
                  id='birth'
                  value={userInfor.birth?.substring(0, 10)}
                  onChange={(e) => setUserInfor({ ...userInfor, birth: e.target.value })}
                  placeholder="1/1/1"
                  name="birth"
                />
              </div>
            </div>
            
            <div className={styles.infor}>
              <div>
                <label htmlFor="phoneNumber">Phone</label>
                <input
                  type="text"
                  value={userInfor.phoneNumber}
                  onChange={(e) => setUserInfor({ ...userInfor, phoneNumber: e.target.value })}
                  placeholder="0123456"
                  name="phoneNumber"
                  id ="phoneNumber"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={userInfor.password}
                  onChange={(e) => setUserInfor({ ...userInfor, password: e.target.value })}
                  placeholder="***********"
                  name="password"
                  id="password"
                />
              </div>
            </div>
            <div className={styles.infor}>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  value={userInfor.address}
                  onChange={(e) => setUserInfor({ ...userInfor, address: e.target.value })}
                  placeholder="a/b/c"
                  name="address"
                  id="address"
                  className={styles.addressWrapper }
                />
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <Button text="Update" handler={handleUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
