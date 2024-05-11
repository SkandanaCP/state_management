import api from "./appConstants";

export const createItem = (data) => {
  return api.post("createItems", data);
};
export const createCategory = (data) => {
  return api.post("categories", data);
};
export const getCategories = () => {
  return api.get("/categories");
};
export const getItems = () => {
  return api.get("/createItems");
};
export const updateItem = (id, data) => {
  return api.put(`/createItems/${id}`, data);
};
export const deleteItems = (id) => {
  return api.delete(`/createItems/${id}`);
};
export const addItemToCart = (data) => {
  return api.post(`/userCart`, data);
};
export const updateItemToCart=(id,data)=>{
    return api.put(`/userCart/${id}`,data)
}
export const removeItemsfromCart=(id)=>{
    return api.delete(`/userCart/${id}`)
}
export const getCartItems = () => {
  return api.get("/userCart");
};
export default {
  createItem,
  createCategory,
  getCategories,
  getItems,
  updateItem,
  deleteItems,
  addItemToCart,
  getCartItems,
  updateItemToCart,
  removeItemsfromCart
};
