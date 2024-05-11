import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { getCategories, getItems,addItemToCart,getCartItems,updateItemToCart } from "../constants/manageCatalogue";
const Products = () => {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [renderProducts, setRenderProducts] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState("");
const [addedCartItems,setAddedCartItems]=useState([])
const navigate=useNavigate();
  const getAllCategories = async () => {
    try {
      const response = await getCategories();
      setItems(response.data);
    } catch (error) {
      console.error("something went wrong while fetching the categories");
    }
  };
  const getAllItems = async () => {
    try {
      const response = await getItems();
      console.log(response.data);
      setProducts(response.data);
      setRenderProducts(response.data);
    } catch (error) {
      console.error("something went wrong while fetching the products");
    }
  };
  const onCategoryChoose = (event) => {
    const value = event.target.value;
    setChoosenCategory(value);
    console.log(value);
    if (value === "shop all") {
      setRenderProducts([...products]);
    } else {
      let renderProducts = [...products];
      const productsonCat = renderProducts.filter(
        (item) => item.category === value
      );
      console.log(productsonCat, "productsonCat");
      setRenderProducts(productsonCat);
    }
  };
const handleAddToCart=async(id)=>{
  const choosenProduct=products.find(item=>item.id===id)
  console.log(choosenProduct)
  const updateItem={name:choosenProduct.name,quantity:1,price:choosenProduct.amount,total:choosenProduct.amount,description:choosenProduct.description,itemsLeft:choosenProduct.itemLeft,maxQuantity:choosenCategory.maxItems,category:choosenProduct.category}
  console.log(updateItem)
  const existingItem = addedCartItems.find(item => item.name.trim().toLowerCase() === updateItem.name.trim().toLowerCase());
  console.log(existingItem,"existing item")

try{
  if(!existingItem){
    const response=await addItemToCart(updateItem) 
    if(response.data){
      getAllCartItems();
      navigate("/cart")
    }
  }
  else{
    const update=addedCartItems.find(item=>item.name.trim().toLowerCase()===updateItem.name.trim().toLowerCase())
    update.total=Number(update.total)+Number(update.price)
    update.quantity=Number(update.quantity)+1
    console.log(update,"update")
     const response=await updateItemToCart(existingItem.id,update) 
     if(response.data){
      getAllCartItems();
      navigate("/cart")
     }
  }

}
catch(error){
  console.error("something went wrong while adding an item to the cart")
}
}
const getAllCartItems=async()=>{
try{
const response=await getCartItems();
setAddedCartItems(response.data)
}
catch(error){
  console.error("something went wrong while getting the cart Items")
}
}
const handleProductView=async(id)=>{
navigate(`/product/${id}`)
}
  useEffect(() => {
    getAllCategories();
    getAllItems();
    getAllCartItems();
  }, []);

  return (
    <>
      <div className="container">
        <Link to="/"></Link>
        <div className="row">
          <div className="col-3">
            <select
              class="form-select form-select-lg mb-3"
              aria-label="Large select example"
              value={choosenCategory}
              onChange={onCategoryChoose}
            >
              <option selected className="d-none">
                Open this select menu
              </option>
              <option>shop all</option>
              {items.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="col-9">
            <div className="row">
              {renderProducts.map((item) => (
                <>
                  <div className="col-4">
                    <div class="card" onClick={()=>handleProductView(item.id)}>
                      <div class="card-body">
                        <h5 class="card-title">{item.name}</h5>
                        <p class="card-text">{item.description}</p>
                        <p class="card-text">{item.itemLeft} left in store</p>
                        <h5>RS. {item.amount}</h5>
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          {/* <button type="button" class="btn btn-outline-primary">
                            Buy Now
                          </button> */}
                          <button type="button" class="btn btn-outline-primary" onClick={()=>handleAddToCart(item.id)}>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
