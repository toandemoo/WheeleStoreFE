import { createContext, useContext, useState } from 'react';

const LicenseContext = createContext(undefined);

export const LicenseProvider = ({ children }) => {
  const [img, setImg] = useState({
    citizenid: { front: '', back: '' },
    driverlicense: { front: '', back: '' },
  });

  return (
    <LicenseContext.Provider value={{ img, setImg }}>
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicense = () => {
  const context = useContext(LicenseContext);
  if (!context) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  return context;
};
