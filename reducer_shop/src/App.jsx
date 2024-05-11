import { useState } from 'react'
import Navbar from './Components/Navbar'
import Catalogue from './Components/Catalogue/Catalogue'
import Products from './Components/Products/Products'
import Cart from './Components/Cart'
import CreateCategory from './Components/Catalogue/CreateCategory'
import CreateCatalogue from './Components/Catalogue/CreateCatalogue'
import EditCatalogue from './Components/Catalogue/EditCatalogue'
import ProductItem from './Components/Products/ProductItem'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {


  return (
    <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
   <Route path='/products' element={<Products/>}/>
   <Route path='/cart' element={<Cart/>}/>
    <Route path='/catalogue' element={<Catalogue/>}/>
    <Route path='/createCategory' element={<CreateCategory/>}/>
    <Route path='/createCatalogue' element={<CreateCatalogue/>}/>
    <Route path="/editCatalogue/:id" element={<EditCatalogue/>}/>
    <Route path="/product/:id" element={<ProductItem/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
