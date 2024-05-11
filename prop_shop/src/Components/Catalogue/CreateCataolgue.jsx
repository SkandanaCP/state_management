import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { createItem,getCategories } from '../../constants/manageCatalogue'
const CreateCataolgue = () => {
    const [inputFields,setInputFields]=useState({name:'',amount:'',description:'',itemLeft:'',maxItems:'',category:{name:""}})
    const [categories,setCategories]=useState([])
    const onInputChange=(event,name)=>{
        const value=event.target.value
setInputFields({...inputFields,[name]:value})
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try{
          const response=await createItem(inputFields)
          if(response.data){
            setInputFields({name:'',amount:'',description:'',itemLeft:'',maxItems:'',category:{name:""}})
          }  
        }catch(error){
console.error("somethig went wrong in creating the products")
        }
    }
    const getAllCategories=async()=>{
try{
const response=await getCategories();
setCategories(response.data)
}catch(error){
    console.error("something went wrong in fetching the categories")
}
    }
    useEffect(()=>{getAllCategories()},[])
  return (
    <>
    <div className='container'>
    <Link to="/createCatalogue"></Link>
    <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" value={inputFields.name} onChange={(event)=>onInputChange(event,"name")}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Amount</label>
    <input type="number" class="form-control" id="exampleInputPassword1" name="amount" value={inputFields.amount} onChange={(event)=>onInputChange(event,"amount")}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Description</label>
    <input type="text" class="form-control" id="exampleInputPassword1"name="description" value={inputFields.description}  onChange={(event)=>onInputChange(event,"description")}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Items Left</label>
    <input type="number" class="form-control" id="exampleInputPassword1"name="itemLeft" value={inputFields.itemLeft} onChange={(event)=>onInputChange(event,"itemLeft")}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Max items a user can choose</label>
    <input type="number" class="form-control" id="exampleInputPassword1"name="maxItems" value={inputFields.maxItems} onChange={(event)=>onInputChange(event,"maxItems")}/>
  </div>
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">Select a Category</label>
  <select class="form-select" aria-label="Default select example" name="category" value={inputFields.category.name} onChange={(event)=>onInputChange(event,"category")}>
  <option className='d-none'>Open this select menu</option>
  {categories.map(item=>
  <>
   <option value={item.name}>{item.name}</option>
  </>
)}

</select>
</div>
  <button type="submit" class="btn btn-primary">Create Product</button>
</form>
</div>
    </>
  )
}

export default CreateCataolgue