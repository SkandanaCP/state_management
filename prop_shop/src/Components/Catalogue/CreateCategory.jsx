import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { createCategory,getCategories } from "../../constants/manageCatalogue";
const CreateCategory = () => {
    const [inputField,setInputField]=useState({name:""})
    const [categories,setCategories]=useState([])
    const onInputChange=(event,name)=>{
        const value=event.target.value
        setInputField({...inputField,[name]:value})
    }
    const onhandleSubmit=async(event)=>{
        event.preventDefault();
       try{
const response=await createCategory(inputField)
if(response.data){
    setInputField({name:""})
    getAllCategories()
}
       }catch(error){
console.error("something went wrong while creating the category")
       }
    }
    const getAllCategories=async()=>{
        try{
const response=await getCategories();
setCategories(response.data)
        }
        catch(error){
console.error("something went wrong while getting the categories")
        }
    }

    useEffect(()=>{
        getAllCategories()
    },[])
  return (
    <>
      <div className="container">
        <Link to="createCategory"></Link>
        <h1>Create Category</h1>
        <form onSubmit={onhandleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Create Category
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={inputField.name}
              name="name"
              onChange={(event)=>onInputChange(event,"name")}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Create
          </button>
        </form>
        <div  className='card mt-3'>
            <div className='card-body'>
            {categories.map(item=>
            <p>{item.name}</p>)}
            </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
