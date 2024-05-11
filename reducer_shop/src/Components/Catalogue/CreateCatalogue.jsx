import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategory, postCatalogue } from "../appConstants/manageCatalogue";
const initialState = {
  input: {
    name: "",
    amount: "",
    description: "",
    itemsLeft: "",
    maxItems: "",
    category: "",
  },
  category: [],
};
const reducer = (state, action) => {
  if (action.type === "fetch_Categories") {
    return { ...state, category: action.payload };
  } else if (action.type === "handleChange") {
    console.log(state.input,"from reducers")
    return {
      ...state,
      input: { ...state.input, [action.payload1]: action.payload2 },
    };
  }
};
const CreateCatalogue = () => {
  const [finalState, dispatch] = useReducer(reducer, initialState);
  const getAllCategories = async () => {
    try {
      const response = await getCategory();
      if (response.data) {
        dispatch({ type: "fetch_Categories", payload: response.data });
      }
    } catch (error) {
      console.error("soemthing went wrong while fetching the categories");
    }
  };

  const handleInputChange = (event, name) => {
    dispatch({
      type: "handleChange",
      payload1: name,
      payload2: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(finalState.input,"posting input")

    try {
      const response = await postCatalogue(finalState.input);
      if (response.data) {
        // Reset input fields
        dispatch({ type: "handleChange", payload1: "name", payload2: "" });
        dispatch({ type: "handleChange", payload1: "amount", payload2: "" });
        dispatch({ type: "handleChange", payload1: "description", payload2: "" });
        dispatch({ type: "handleChange", payload1: "itemsLeft", payload2: "" });
        dispatch({ type: "handleChange", payload1: "maxItems", payload2: "" });
        dispatch({ type: "handleChange", payload1: "category", payload2: "" });
      }
    } catch {
      console.error("soemthing went wrong while posting the catalogue ");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="container">
      <Link to="createCatalogue"></Link>
      <h1>CreateCatalogue</h1>
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
            value={finalState.input.name}
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
            id="exampleInputPassword1"
            name="amount"
            value={finalState.input.amount}
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
            id="exampleInputPassword1"
            name="description"
            value={finalState.input.description}
            onChange={(event) => handleInputChange(event, "description")}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Items Left
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleInputPassword1"
            name="itemsLeft"
            value={finalState.input.itemsLeft}
            onChange={(event) => handleInputChange(event, "itemsLeft")}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Max items a user can choose
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleInputPassword1"
            name="maxItems"
            value={finalState.input.maxItems}
            onChange={(event) => handleInputChange(event, "maxItems")}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Select a Category
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            name="category"
            value={finalState.input.category}
            onChange={(event) => handleInputChange(event, "category")}
          >
            <option className="d-none">Open this select menu</option>
            <option>shop all</option>
            {finalState.category.map((item) => (
              <>
                <option value={item.name}>{item.name}</option>
              </>
            ))}
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateCatalogue;
