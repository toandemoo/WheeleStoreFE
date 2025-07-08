const server = import.meta.env.VITE_SERVER;

export const SearchCar = async (page, pageSize) => {
  try {
    const response = await fetch(`${server}/api/car/all?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('ListCar error:', error);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch ListCar failed:', error);
    return false;
  }
};

export const DetailBike = async (id) => {
  try {
    const response = await fetch(`${server}/api/car/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('DetailBike error:', error);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch DetailBike failed:', error);
    return false;
  }
}

export const BrandsBike = async () => {
  try {
    const response = await fetch(`${server}/api/brand/all?page=1&pageSize=100`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brands Bike error:', error);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Brands Bike failed:', error);
    return false;
  }
}

export const CarTypesBike = async () => {
  try {
    const response = await fetch(`${server}/api/cartype/all?page=1&pageSize=100`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Car Type Bike error:', error);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Car Type Bike failed:', error);
    return false;
  }
}

export const FilterCar = async (filter) => {
  try {
    var query = new URLSearchParams({
      Keyword: filter.keyword || "",
      Brand: filter.brand || "",
      CarType: filter.model || "",
      PriceMin: filter.priceMin || "",
      PriceMax: filter.priceMax || "",
      SortBy: filter.sortby || "",
      Page: filter.page || 1,
      PageSize: filter.perPage || 12,
    });


    const response = await fetch(`${server}/api/car/filter?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Filter Car Bike error:', error);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Filter Car Bike failed:', error);
    return false;
  }
}

export const DeleteCar = async (id) => {
  try {
    const response = await fetch(`${server}/api/car/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Delete Car error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Fetch Delete Car failed:', error);
    return false;
  }
}

export const AddCar = async (car) => {
  // try {
    const response = await fetch(`${server}/api/car`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      },
      body: JSON.stringify({
        name: car.name,
        carTypeId: car.carTypeId,
        brandId: car.brandId,
        pricePerDay: car.price,
        imageUrl: car.imageUrl,
        status: 0,
        licensePlate: "000A312",
      }),
    });

    if (!response.ok) {
      console.log('Response object:', response); 
      return false;
    }

    return true;

  // } catch (error) {
  //   console.error('Fetch Add Car failed:', error);
  //   return false;
  // }
}

export const UpdateCar = async (id, car) => {
  try {
    const response = await fetch(`${server}/api/car/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      },
      body: JSON.stringify({
        name: car.title,
        carTypeId: car.carTypeId,
        brandId: car.brandId,
        pricePerDay: car.pricePerDay,
        imageUrl: null,
        status: 0,
        licensePlate: "000A312",
      }),
    });

    if (!response.ok) {
      console.log('Response object:', response); 
      return false;
    }

    return true;

  } catch (error) {
    console.error('Fetch Update Car failed:', error);
    return false;
  }
}

export const FilterCarAdmin = async (filter) => {
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
      Page: filter.page || 1,
      PageSize: filter.perPage || 10,
    });

    const response = await fetch(`${server}/api/car/admin/search?${query}`, {
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
