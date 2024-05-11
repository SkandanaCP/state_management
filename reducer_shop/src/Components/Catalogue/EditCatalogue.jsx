import React,{useReducer,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getCatalogue,getCategory,updateCatalogue } from '../appConstants/manageCatalogue'
const initialState={
  catalogue:{},
  category:[]
}
const reducer=(state,action)=>{
if(action.type==="get_Catalogue"){
return {...state,catalogue:action.payload}
}
if(action.type==="get_Category"){
  return {...state,category:action.payload}
  }
  if(action.type==='handleChange'){
    return{...state,catalogue:{...state.catalogue,[action.payload1]:action.payload2}}
  }
}
const EditCatalogue = () => {
  const {id}=useParams();
 const[finalState,dispatch] =useReducer(reducer,initialState)
 console.log(finalState.catalogue)
const getAllCatalogue=async()=>{

try{
const response=await getCatalogue();
if(response.data){
  const value=response.data.find(item=>Number(item.id)===Number(id))
  dispatch({type:'get_Catalogue',payload:value})
}
}catch(error){
  console.error("something went wrong while fetching the item")
}
}
const getAllCategories=async()=>{
  try{
const response=await getCategory();
if(response.data){
  dispatch({type:'get_Category',payload:response.data})
}
  }catch(error){
    console.error("something went wrong while fetching the categories")
  }
}
const handleInputChange=(event,name)=>{
  dispatch({type:'handleChange',payload1:name,payload2:event.target.value})
}
const handleSubmit=async(event)=>{
  event.preventDefault();
  try{
const response=await updateCatalogue(id,finalState.catalogue)
if(response.data){
  console.log("success")
  getAllCatalogue();
}
  }
  catch(error){
    console.error("something went wrong while updating the catalogue")
  }
  console.log(id)
  console.log(finalState.catalogue,"submited")
}
useEffect(()=>{
  getAllCatalogue();
  getAllCategories()
},[])
  return (
    <div className='container'>
    <Link to={`/editCatalogue/${id}`}></Link>
      <h1>EditCatalogue</h1>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" value={finalState.catalogue.name} onChange={(event)=>handleInputChange(event,"name")}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Amount</label>
    <input type="number" class="form-control" id="exampleInputPassword1" name="amount" value={finalState.catalogue.amount} onChange={(event)=>handleInputChange(event,"amount")}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Description</label>
    <input type="text" class="form-control" id="exampleInputPassword1" name="description" value={finalState.catalogue.description} onChange={(event)=>handleInputChange(event,"description")}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Items Left</label>
    <input type="number" class="form-control" id="exampleInputPassword1" name="itemsLeft" value={finalState.catalogue.itemsLeft} onChange={(event)=>handleInputChange(event,"itemsLeft")}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Max items a user can choose</label>
    <input type="number" class="form-control" id="exampleInputPassword1" name="maxItems" value={finalState.catalogue.maxItems}  onChange={(event)=>handleInputChange(event,"maxItems")}/>
  </div>
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">Select a Category</label>
  <select class="form-select" aria-label="Default select example" name="category" value={finalState.catalogue.category} onChange={(event)=>handleInputChange(event,"category")}>
<option className='d-none'>{finalState.catalogue.category}</option>
{finalState.category.map(item=>(<>
  <option value={item.name}>{item.name}</option>
</>))}
</select>
</div>
  <button type="submit" class="btn btn-primary">Update Product</button>
</form>
    </div>
  
  )
}

export default EditCatalogue