import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllCatalogues } from "../../store/CatalogueListAction";
import { getAllCategories } from "../../store/CategoryAction";
import { useSelector, useDispatch } from "react-redux";
import { handleFormSubmit } from "../../store/EditCatalogueAction";
import { EditCategoryAction } from "../../store/EditCatalogue";
const EditCatalogue = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const catalogue = useSelector((state) => state.catalogueList.catalogue);
  const categories = useSelector((state) => state.createCategory.categories);
  const item=useSelector(state=>state.EditCatalogue.item)
  const items = catalogue.find((item) => Number(item.id) === Number(id));
  console.log(item, "item");
  const handleInputChange = (event, name) => {
    dispatch(
      EditCategoryAction.handleInputChange({
        data: name,
        val: event.target.value,
      })
    );
  };
const onPageLoad=()=>{
  dispatch(EditCategoryAction.handlePageLoad(items))
}

const handleSubmit=(event)=>{
  event.preventDefault();
  dispatch(handleFormSubmit(id,item))
}
  useEffect(() => {
    dispatch(getAllCatalogues());
    dispatch(getAllCategories());
    onPageLoad();
  }, [dispatch]);
  //getCatalogueBasedOnId();
  return (
    <div className="container">
      <Link to={`/editCatalogue/${id}`}></Link>
      <h1>Edit Catalogue</h1>
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
            value={item.name}
            onChange={(event) => handleInputChange(event, "name")}
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
            value={item.amount}
            onChange={(event) => handleInputChange(event, "amount")}
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
            value={item.description}
            onChange={(event) => handleInputChange(event, "description")}
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
            value={item.itemsLeft}
            onChange={(event) => handleInputChange(event, "itemsLeft")}
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
            value={item.maxItems}
            onChange={(event) => handleInputChange(event, "maxItems")}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Choose Category
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            name="category"
            value={item.category}
            onChange={(event) => handleInputChange(event, "category")}
          >
            <option className="d-none">Choose a category</option>
            <option className="d-none">{item.category}</option>
            {categories.map((item) => (
              <option value={item.category}>{item.category}</option>
            ))}
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Edit Catalogue
        </button>
      </form>
    </div>
  );
};

export default EditCatalogue;
