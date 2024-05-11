import React, { useReducer,useEffect } from "react";
import { Link } from "react-router-dom";
import { createCategory,getCategory } from "../appConstants/manageCatalogue";
const initialState = {
  input: { name: "" },
  //submitValues: { name: "" },
  categories:[]
};
const reducer = (state, action) => {
  if (action.type === "InputChange") {
    console.log(state, "printing from reducer");
    return {
      ...state,
      input: { ...state.input, name: action.payload },
      //submitValues: { ...state.submitValues, name: action.payload },
    };
  }
  else if (action.type==="getCategory"){
    console.log(state,"from reducers")
return {...state,categories:action.payload}

  }
  // if (action.type === "handleSubmit") {
  //   console.log("Payload in reducer:", state.submitValues);
  //   return {
  //     ...state,
  //     submitValues: { ...state.submitValues, name: action.payload },
  //   };
  // }
};
const CreateCategory = () => {
  const [input, dispatch] = useReducer(reducer, initialState);
console.log(input.categories.map(item=>item.name),"outside function....")
  const handleInputChange = (event) => {
    dispatch({ type: "InputChange", payload: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //dispatch({ type: "handleSubmit", payload: input.input.name });
    //console.log(input.submitValues, "printng from handleSubmit");
     try{
      const response=await createCategory(input.input);
      dispatch({type:"InputChange",payload:""})
      getAllCategories();
     }
     catch(error){
      console.error("something went wrong while creating categories")
     }
  };

  const getAllCategories=async()=>{
try{
const response=await getCategory();
if(response.data){
dispatch({type:'getCategory',payload:response.data})
console.log(response.data,"from getAllCategories")
}

}catch(error){
  console.error("something went wrong while fetching the categories")
}
  }

  useEffect(()=>{
getAllCategories()
  },[])
  return (
    <div className="container">
      <Link to="/createCategory"></Link>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Create Category
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={input.input.name}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Create Category
        </button>
      </form>
      <div class="card mt-2">
  <div class="card-body">
  <p>{input.categories.map(item=><p>{item.name}</p>)}</p>
  </div>
</div>
    </div>
  );
};

export default CreateCategory;
