import { useState } from 'react';
import styles from './Verify.module.css';
import License from '@components/License/License';
import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import { useLicense } from '../../Context/LicenseContext';
import Popup from '@components/PopUp/PopUp';

function VerifyPage({ currentStep }) {
  const [showCitizenID, setShowCitizenID] = useState(true);

  const { img } = useLicense();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const nextStep = () => {
    if (!img.citizenid.front || !img.citizenid.back) {
      setMessage('Please upload your Citizen ID');
      setShowPopup(true);
      return;
    }
    if (!img.driverlicense.front || !img.driverlicense.back) {
      setMessage('Please upload your Driver License');
      setShowPopup(true);
      return;
    }
    currentStep(3);
  };

  const optionStyle = (active) => ({
    fontWeight: 'bolder',
    margin: 0,
    padding: active ? '5px 10px' : undefined,
    borderRadius: active ? '10px' : undefined,
    backgroundColor: active ? '#F8D66D' : undefined,
    border: active ? '1px solid #F8D66D' : undefined,
    boxShadow: active ? '0 0 20px rgba(0,0,0,0.25)' : undefined,
    cursor: 'pointer',
  });

  return (
    <div>
      <BackButton handler={() => currentStep(1)} />
      <div className={styles.options}>
        <p
          onClick={() => setShowCitizenID(true)}
          style={optionStyle(showCitizenID)}
        >
          Citizen ID
        </p>
        <p
          onClick={() => setShowCitizenID(false)}
          style={optionStyle(!showCitizenID)}
        >
          Driver License
        </p>
      </div>

      <div>
        {showCitizenID ? <License name="CitizenID" /> : <License name="DriverLicense" />}
      </div>

      <div className={styles.button}>
        <Button text="Next" handler={nextStep} />
      </div>

      {showPopup && (
        <Popup message={message} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default VerifyPage;
