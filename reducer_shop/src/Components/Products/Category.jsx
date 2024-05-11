import React, { useContext } from "react";
import { productContext } from "./Products";
const Category = () => {
  const context = useContext(productContext);
  return (
    <>
      <select
        class="form-select form-select-lg mb-3"
        aria-label="Large select example"
        name="categroy"
        value={context.finalState.input.name}
        onChange={(event) => context.onInputChange(event, "category")}
      >
        <option>Shop All</option>
        {context.finalState.category.map((item) => (
          <>
            <option value={item.name}>{item.name}</option>
          </>
        ))}
      </select>
    </>
  );
};

export default Category;
