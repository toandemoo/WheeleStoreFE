const server = import.meta.env.VITE_SERVER;

export const Payment = async (amount, orderDescription, name, orderid) => {
   try {
       const response = await fetch(`${server}/api/payment`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
         },
         body: JSON.stringify({
            orderType: "other",
            amount: amount,
            orderDescription: orderDescription,
            name: name,
            orderid : orderid
         }),
       });
   
       if (!response.ok) {
         return false;
      }
      
      const data = await response.json();
      window.location.href = data.url;
   
       return true;
     } catch (error) {
       console.error('Registration failed:', error);
       return false;
     }
}

export const CarCheckout = async (ids) => {
  try {
    const query = ids.map(id => `ids=${id}`).join('&');
    const token = localStorage.getItem('accesstoken');
    const response = await fetch(`${server}/api/wishlist/car-checkout?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }
   
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    return false;
  }
}

