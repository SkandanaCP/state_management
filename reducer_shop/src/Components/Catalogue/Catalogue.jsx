import React,{useReducer,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { getCatalogue,deleteProduct } from '../appConstants/manageCatalogue'
const initialState={
  category:[]
}
const reducer=(state,action)=>{
  if(action.type==='fetch_Catalogue'){
    return{...state,category:action.payload}
  }
}
const Catalogue = () => {
  const [finalState,dispatch]=useReducer(reducer,initialState)
    const navigate=useNavigate()
    const getAllCatalogue=async()=>{
try{
const response=await getCatalogue();
if(response.data){
  dispatch({type:'fetch_Catalogue',payload:response.data})
}
}catch(error){
console.error("Something went wrong while fetching the catalogue")
}
    }
    const handleDelete=async(id)=>{
try{
const response=await deleteProduct(id)
if(response.data){
  getAllCatalogue();
}
}
catch(error){
  console.error("something went wrong while deleting the catalogue")
}
    }
    useEffect(()=>{
      getAllCatalogue();
    },[])
  return (
   <>
   <div className='container'>
   <Link to="catalogue"></Link>
   <h1>catalogue</h1>
   <div className='d-flex justify-content-end'>
   <button type="button" class="btn btn-primary me-2"onClick={()=>navigate("/createCatalogue")} >Create Catalogue</button>
   <button type="button" class="btn btn-primary"onClick={()=>navigate("/createCategory")}>Create Category</button>
   </div>
   <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
   
      {finalState.category.map((item,index)=>(
        <>
         <tr>
        <td>{index+1}</td>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <button type="button" class="btn btn-primary"onClick={()=>navigate(`/editCatalogue/${item.id}`)} >Edit</button>
      <button type="button" class="btn btn-primary" onClick={()=>handleDelete(item.id)}>Delete</button>
      </tr>
        </>
      ))}
     
  </tbody>
</table>
   </div>
   </>
  )
}

export default Catalogue