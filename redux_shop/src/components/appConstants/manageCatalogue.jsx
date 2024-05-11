import api from "./appConstant";

export const postCategory = (data) => {
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

export const editCatalogue = (id, data) => {
  return api.put(`/catalogue/${id}`, data);
};

export const deleteCatalogue = (id) => {
  return api.delete(`/catalogue/${id}`);
};

export const addItemsToCart=(data)=>{
    return api.post(`/cart`,data)
}
export const updateItemsToCart=(id,data)=>{
    return api.put(`/cart/${id}`,data)
}
export const getItemsToCart=()=>{
    return api.get(`/cart`)
}
export const removeItemsToCart = (id) => {
  return api.delete(`/cart/${id}`);
};
export default {
  postCategory,
  getCategory,
  postCatalogue,
  getCatalogue,
  editCatalogue,
  deleteCatalogue,
  addItemsToCart,
  getItemsToCart,
  removeItemsToCart
};
