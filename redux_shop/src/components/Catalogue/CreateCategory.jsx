import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { CreateCategoryAction } from '../../store/CreateCategorySlice'
import { useSelector,useDispatch } from 'react-redux'
import { postCategoryAction } from '../../store/CategoryAction'
import { getAllCategories } from '../../store/CategoryAction'
const CreateCategory = () => {
    const input=useSelector(state=>state.createCategory.input)
    const submitValues=useSelector(state=>state.createCategory.submitValues)
    const categories=useSelector(state=>state.createCategory.categories)
    console.log(categories,"consoling the categories")
    const dispatch=useDispatch()

const handleChange=(event,name)=>{
dispatch(CreateCategoryAction.handleInputChange({data:name,val:event.target.value}))
console.log(name,val)
    }
const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(input,"data being input 101")
    console.log(submitValues,"data being consioled 101")
    dispatch(postCategoryAction(input))
    dispatch(CreateCategoryAction.handleInputChange(({data:"category",val:''})))
    getAllCategories();
}
useEffect(()=>{
dispatch(getAllCategories())
},[dispatch])
  return (
    <div className='container'>
    <Link to='/createCategory'></Link>
     <h1>CreateCategory</h1>
     <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Create Category</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="category"value={input.category}onChange={(event)=>handleChange(event,"category")}/>
  </div>
  <button type="submit" class="btn btn-primary">Create Category</button>
</form>
  <div class="card">
  <div class="card-body">
    <p>
    {categories.map(item=>(<>
    <p>{item.category}</p>
    </>))}
    </p>
  </div>
</div>


    </div>
   
  )
}

export default CreateCategory