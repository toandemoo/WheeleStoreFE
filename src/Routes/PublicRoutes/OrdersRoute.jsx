export const getOrders = async () => {
   try {
      const response = await fetch(`http://localhost:5153/api/order`, {
         method: "GET",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
         }
      });
   
      if (!response.ok) {
         const error = await response.text();
         console.error('get orders error:', error);
         return false;
      }
   
      const data = await response.json();
      return data;
      
   } catch (error) {
      console.error('Fetch get orders failed:', error);
      return false;
   }
}

export const DetailOrders = async (id) => {
   try {
      const response = await fetch(`http://localhost:5153/api/order/${id}`, {
         method: "GET",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
         }
      });
   
      if (!response.ok) {
         const error = await response.text();
         console.error('get detail order error:', error);
         return false;
      }
   
      const data = await response.json();
      return data;
      
   } catch (error) {
      console.error('Fetch get detail order failed:', error);
      return false;
   }
}

export const createOrder = async (cars) => {
   try {
      const response = await fetch(`http://localhost:5153/api/order/`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
         },
         body: JSON.stringify({
            status: 0,
            orderCarRequest: cars
         }),
      });
   
      if (!response.ok) {
         const error = await response.text();
         console.error('create order error:', error);
         return false;
      }
   
      const data = await response.json();
      return data;
      
   } catch (error) {
      console.error('Fetch create order failed:', error);
      return false;
   }
}