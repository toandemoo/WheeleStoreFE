import { createContext, useContext, useState } from 'react';

// 1. Tạo ngữ cảnh với giá trị mặc định rõ ràng
const HeaderContext = createContext(null);

export const HeaderProvider = ({ children }) => {
  const [header, setHeader] = useState({
    isLoggin: false,
    email: '',
    wishlist: 0,
    order: 0,
    role: 1,
  });

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === null) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
