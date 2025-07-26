import { axiosInstance } from './axios';

export const getProducts = async () => {
  try {
    const res = await axiosInstance.get("/products"); 
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductDetails = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching product details for ID ${id}:`, error);
    throw error;
  }
};

export const addProductToCart = async (cartData) => {
  try {
    const res = await axiosInstance.post(`/carts`, cartData); 
    return res.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const GetAllCart = async () => {
  try {
    const res = await axiosInstance.get(`/carts`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all carts:", error);
    throw error;
  }
};

export const GetSingleCart = async (id) => {
  try {
    const res = await axiosInstance.get(`/carts/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching cart with ID ${id}:`, error);
    throw error;
  }
};

export const updateProductCart = async ({ id, userId, products }) => {
  try {
    const res = await axiosInstance.put(`/carts/${id}`, {
      id,
      userId,
      products,
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating cart with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCartItem = async (id) => {
  try {
    const res = await axiosInstance.delete(`/carts/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting cart item with ID ${id}:`, error);
    throw error;
  }
};
