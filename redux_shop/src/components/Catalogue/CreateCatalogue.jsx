import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { CreateCatalogueAction } from "../../store/CreateCatalogueSlice";
import { getAllCategories } from "../../store/CategoryAction";
import { handleCatalogueAction } from "../../store/CatalogueAction";

const CreateCatalogue = () => {
  const dispatch=useDispatch();
  const categories=useSelector(state=>state.createCategory.categories)
  const input=useSelector(state=>state.createCatalogue.input)
  const handleInputChange=(event,name)=>{
    dispatch(CreateCatalogueAction.handleInputChange({data:name,val:event.target.value}))
    console.log(name,event.target.value,"from create catalogue")
  }

useEffect(()=>{
  dispatch(getAllCategories())
},[dispatch])

  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch(handleCatalogueAction(input))
  }

  return (
    <>
      <div className="container">
        <Link to="/createCatalogue"></Link>
        <h1>Create Catalogue</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              value={input.name}
              onChange={(event)=>handleInputChange(event,"name")}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Amount
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="amount"
              value={input.amount}
              onChange={(event)=>handleInputChange(event,"amount")}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="description"
              value={input.description}
              onChange={(event)=>handleInputChange(event,"description")}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              ItemLeft
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="itemsLeft"
              value={input.itemsLeft}
              onChange={(event)=>handleInputChange(event,"itemsLeft")}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Max Items
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="maxItems"
              value={input.maxItems}
              onChange={(event)=>handleInputChange(event,"maxItems")}
            />
          </div>
          <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
              Choose Category
            </label>
            <select class="form-select" aria-label="Default select example"
            name="category"
            value={input.category}
            onChange={(event)=>handleInputChange(event,"category")}>
              <option className="d-none">Choose a category</option>
              {categories.map(item=>(
                 <option value={item.category}>{item.category}</option>
              ))}
            </select>
          </div>
          <button type="submit" class="btn btn-primary">
            Create Catalogue
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCatalogue;
