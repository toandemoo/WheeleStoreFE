export const getWishlist = async () => {
  try {
    const response = await fetch('http://localhost:5153/api/wishlist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('getWishlist error:', error);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch getWishlist failed:', error);
    return false;
  }
}

export const AddtoCart = async (id) => {
   try {
     const response = await fetch(`http://localhost:5153/api/wishlist/${id}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
       },
     });
     
     if (!response.ok) {
       const error = await response.text();
       console.error('AddtoCart error:', error);
       return false;
     }
 
     const data = await response.json();
     return data;
   } catch (error) {
     console.error('Fetch AddtoCart failed:', error);
     return false;
   }
 }
 
 export const RemoveFromCart = async (id) => {
   try {
     const response = await fetch(`http://localhost:5153/api/wishlist/${id}`, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
       },
     });
     if (!response.ok) {
       const error = await response.text();
       console.error('RemoveFromCart error:', error);
       return false;
     }
 
     const data = await response.json();
     return data;
   } catch (error) {
     console.error('Fetch RemoveFromCart failed:', error);
     return false;
   }
}
 
export const updateWishlist = async (id, quantity) => {
  try {
    const response = await fetch(`http://localhost:5153/api/wishlist/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      },
      body: JSON.stringify({
        quantity: parseInt(quantity),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('updateWishlist error:', error);
      return false;
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error('Fetch updateWishlist failed:', error);
    return false;
  }
}