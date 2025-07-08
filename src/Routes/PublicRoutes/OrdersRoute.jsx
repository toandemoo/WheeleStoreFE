const server = import.meta.env.VITE_SERVER;

export const getOrders = async () => {
   try {
      const response = await fetch(`${server}/api/order`, {
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
      const response = await fetch(`${server}/api/order/${id}`, {
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
      const response = await fetch(`${server}/api/order/`, {
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

export const getAllOrdersAdmin = async (page, pageSize) => {
   try {
      var query = new URLSearchParams({
         page: page,
         pageSize: pageSize,
      }).toString();

      const response = await fetch(`${server}/api/order/admin/all?${query}`, {
         method: "GET",
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
         }
      });
   
      if (!response.ok) {
         const error = await response.text();
         console.error('get all orders error:', error);
         return false;
      }
   
      const data = await response.json();
      return data;
      
   } catch (error) {
      console.error('Fetch get all orders failed:', error);
      return false;
   }
}

export const getDetailOrdersAdmin = async (id) => {
   try {
      const response = await fetch(`${server}/api/order/admin/${id}`, {
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

export const FilterOrderAdmin = async (filter) => {
   try {
     if (filter.keyword === '')
     {
       return;
      }
      
     var query = new URLSearchParams({
       Keyword: filter.keyword || "",
       // Brand: filter.brand || "",
       // CarType: filter.model || "",
       // PriceMin: filter.priceMin || "",
       // PriceMax: filter.priceMax || "",
       // SortBy: filter.sortby || "",
       page: filter.page || 1,
       pageSize: filter.perPage || 10,
     });
 
     const response = await fetch(`${server}/api/order/admin/search?${query}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
       },
     });
 
     if (!response.ok) {
       const error = await response.text();
       console.error('Filter Car Admin error:', error);
       return false;
     }
 
     const data = await response.json();
     return data;
   } catch (error) {
     console.error('Fetch Filter Car Admin failed:', error);
     return false;
   }
 }
 