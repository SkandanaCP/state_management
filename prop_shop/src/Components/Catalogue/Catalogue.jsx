import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { getItems,deleteItems, updateItem } from '../../constants/manageCatalogue'
const Catalogue = () => {
  const navigate=useNavigate()
  const [items,setItems]=useState([])
  const getAllItems=async()=>{
    try{
const response=await getItems();
setItems(response.data)
    }
    catch(error){
      console.error("something went wrong while fetching the items")
    }
  }
  const handleEditClick=(id)=>{
    const findItems=items.find(item=>item.id===id)
    if(findItems){
      navigate(`/editCatalogue/${findItems.id}`)
    }
  }
  const handleDeleteClick=async(id)=>{


    try{
      const response=await deleteItems(id);
      setItems(items.filter(item=>item.id!==id))
  }catch(error){
    console.error("something went wrong in deleting the items")
  }
  }
  useEffect(()=>{
getAllItems();
  },[])
  return (
    <>
    <div className='container'>
    <Link to='/catalogue'></Link>
    <div className='d-flex justify-content-end'>
    <button type="button" class="btn btn-primary me-2" onClick={()=>navigate("/createCatalogue")}>Create Catalogue</button>
    <button type="button" class="btn btn-primary" onClick={()=>navigate("/createCategory")}>Create Category</button>
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
   
      {items.map((item,index)=>(
        <>
         <tr>
        <td>{index+1}</td>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <button type="button" class="btn btn-primary" onClick={()=>handleEditClick(item.id)}>Edit</button>
      <button type="button" class="btn btn-primary" onClick={()=>handleDeleteClick(item.id)}>Delete</button>
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