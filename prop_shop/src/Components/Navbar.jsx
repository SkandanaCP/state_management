import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pearl Connect</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/">Products</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/cart">Cart</Link>
          </li>
          {/* <li class="nav-item">
            <Link class="nav-link" to="/checkout">Checkout</Link>
          </li> */}
          <li class="nav-item">
            <Link class="nav-link" to="/catalogue">Manage Catalogue</Link>
          </li>
        
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;
