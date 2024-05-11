import api from "./appConstants";

export const createCategory = (data) => {
  return api.post("/category", data);
};

export const getCategory = () => {
  return api.get("/category");
};
export const postCatalogue = (data) => {
  return api.post("/catalogue", data);
};

export const getCatalogue = () => {
  return api.get("/catalogue");
};

export const updateCatalogue = (id, data) => {
  return api.put(`/catalogue/${id}`, data);
};
export const deleteProduct = (id) => {
  return api.delete(`/catalogue/${id}`);
};
export const addCartItems = (data) => {
  return api.post(`/cartItems`, data);
};
export const getCartItems = () => {
  return api.get("/cartItems");
};
export const updateCartItems=(id,data)=>{
    return api.put(`/cartItems/${id}`,data)
}
export const deleteCartItems=(id)=>{
    return api.delete(`/cartItems/${id}`)
}
export default {
  createCategory,
  getCategory,
  postCatalogue,
  getCatalogue,
  updateCatalogue,
  deleteProduct,
  addCartItems,
  getCartItems,
  updateCartItems,
  deleteCartItems
};
