import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import Checkout from './Components/Checkout';
import Catalogue from './Components/Catalogue/Catalogue';
import Cart from './Components/Cart';
import CreateCataolgue from './Components/Catalogue/CreateCataolgue';
import CreateCategory from './Components/Catalogue/CreateCategory';
import EditCatalogue from './Components/Catalogue/EditCatalogue';
import ProductItem from './Components/Products/ProductItem';
function App() {
  return (
 
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/createCatalogue" element={<CreateCataolgue />} />
        <Route path="/createCategory" element={<CreateCategory />} />
        <Route path="/editCatalogue/:id" element={<EditCatalogue />} />
    <Route path="/product/:id" element={<ProductItem/>}/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
