import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Products from "./components/Products/Products"
import Cart from "./components/Products/Cart"
import Catalogue from "./components/Catalogue/Catalogue"
import CreateCategory from "./components/Catalogue/CreateCategory"
import CreateCatalogue from "./components/Catalogue/CreateCatalogue"
import EditCatalogue from "./components/Catalogue/EditCatalogue"
import ProductItem from "./components/Products/ProductItem"
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Products/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/catalogue' element={<Catalogue/>}/>
    <Route path='/createCategory' element={<CreateCategory/>}/>
    <Route path='/createCatalogue' element={<CreateCatalogue/>}/>
    <Route path="/editCatalogue/:id" element={<EditCatalogue/>}/>
    <Route path="/item/:id" element={<ProductItem/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
