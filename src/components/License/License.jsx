import { useRef } from 'react';
import styles from './License.module.css';
import { useLicense } from '../../Context/LicenseContext';

function License({ name }) {
  const fileInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const { img, setImg } = useLicense();

  const handleClick = (index) => {
    fileInputRefs[index].current.click();
  };

  const handleChange = (event, side) => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);

    if (name === 'CitizenID') {
      setImg({
        ...img,
        citizenid: {
          ...img.citizenid,
          [side]: imageUrl,
        },
      });
    } else {
      setImg({
        ...img,
        driverlicense: {
          ...img.driverlicense,
          [side]: imageUrl,
        },
      });
    }
  };

  const isCitizen = name === 'CitizenID';
  const sectionStyle =
    name === 'DriverLicense'
      ? { borderColor: '#ff9999', backgroundColor: '#ff9999' }
      : { borderColor: '#8cd47e', backgroundColor: '#8cd47e' };

  const frontImg = isCitizen ? img.citizenid.front : img.driverlicense.front;
  const backImg = isCitizen ? img.citizenid.back : img.driverlicense.back;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
        <div className={styles.section1} style={sectionStyle}>
          <div className={styles.citizen}>
            <div className={styles.label}>
              <p>Front View</p>
              <img
                src={frontImg || '/assets/images/image 12.svg'}
                onClick={() => handleClick(0)}
                alt="Front view"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefs[0]}
              onChange={(e) => handleChange(e, 'front')}
              style={{ display: 'none' }}
            />
          </div>

          <div className={styles.citizen}>
            <div className={styles.label}>
              <p>Back View</p>
              <img
                src={backImg || '/assets/images/image 12.svg'}
                onClick={() => handleClick(1)}
                alt="Back view"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefs[1]}
              onChange={(e) => handleChange(e, 'back')}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default License;
