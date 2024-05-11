import React,{useEffect} from 'react'
import { getAllCategories } from '../../store/CategoryAction';
import { getAllProducts } from '../../store/ProductAction';
import { useDispatch,useSelector } from 'react-redux';
import { ProductActions } from '../../store/ProductSlice';
const Category = () => {
    const dispatch=useDispatch();
    const category=useSelector(state=>state.createCategory.categories)
    const Catalogue=useSelector(state=>state.ProductSlice.Catalogue)
    console.log(Catalogue)
    const handleCategoryChange=(event)=>{
        const val=event.target.value
        const item=Catalogue.filter(item=>item.category.trim().toLowerCase()===val.trim().toLowerCase())
        console.log(item,"item")
        if(val==='shop all'){
            dispatch(ProductActions.filterCatalogue(Catalogue))         
        }
       else{
        dispatch(ProductActions.filterCatalogue(item))
       }
    }
    useEffect(()=>{
dispatch(getAllCategories())
dispatch(getAllProducts())
    },[dispatch])
  return (
    <>
    <select class="form-select" aria-label="Default select example" onChange={handleCategoryChange}>
  <option className='d-none'selected>Choose a Category</option>
  <option >shop all</option>
  {category.map(item=>(<option value={item.category}>{item.category}</option>))}
</select>
    </>
  )
}

export default Category