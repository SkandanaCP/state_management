import React,{useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { getAllCatalogues,handledeleteCatalogue } from '../../store/CatalogueListAction'
import { CatalogSliceAction } from '../../store/CatalogueListSlice'
import { useSelector,useDispatch } from 'react-redux'
const Catalogue = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const catalogue= useSelector(state=>state.catalogueList.catalogue)
    console.log(catalogue,"catalog")
    const handledeleteCatalogues=(id)=>{
     dispatch(handledeleteCatalogue(id))
   dispatch(getAllCatalogues())
    }
    useEffect(()=>{
dispatch(getAllCatalogues())
    },[dispatch])
  return (
    <div className='container'>
    <div className='d-flex justify-content-end'>

  <button class="btn btn-primary me-2" type="button" onClick={()=>navigate(`/createCatalogue`)}>Create Catalogue</button>
  <button class="btn btn-primary" type="button" onClick={()=>navigate(`/createCategory`)}>Create Category</button>

    </div>
    <Link to='/catalogue'></Link>
    <h1>Catalogue</h1>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {catalogue.map(item=>(
      <>
       <tr>
     
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>
      <button type="button" class="btn btn-outline-primary me-2"onClick={()=>navigate(`/editCatalogue/${item.id}`)}>Edit</button>
  <button type="button" class="btn btn-outline-primary" onClick={()=>handledeleteCatalogues(item.id)}>Delete</button>
      </td>
    </tr>
      </>
    ))}
   
  </tbody>
</table>
    </div>
    
  )
}

export default Catalogue