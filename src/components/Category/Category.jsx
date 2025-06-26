import { useRef, useState } from 'react';
import styles from './Category.module.css';

function Category({ text, icon, list, onChange }) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('');

  const handleButtonClick = () => {
    if (dateInputRef.current && dateInputRef.current.showPicker) {
      dateInputRef.current.showPicker(); // Chỉ gọi khi trình duyệt hỗ trợ
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={icon} alt="Motorbike Icon" />
      </div>
      <div>
        {text === 'Pickup Date' ? (
          <div>
            <button onClick={handleButtonClick} className={styles.select}>
              {date || 'Pickup Date'}
            </button>
            <input
              ref={dateInputRef}
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                onChange(e.target.value);
              }}
              style={{ visibility: 'hidden', position: 'absolute' }}
            />
          </div>
        ) : (
          <select
            className={styles.select}
            onChange={(e) => onChange(e.target.value)}
            defaultValue=""
          >
            <option value="">{text}</option>
            {list.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default Category;
