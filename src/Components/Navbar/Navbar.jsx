import React from 'react'
import image1 from '../../Images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../Context/context';
import { cartContext } from '../Context/cartContext';


export default function Navbar() {

const navFunc = useNavigate()

const {token, setToken }  = useContext(authContext);
const {numOfCartItems} = useContext(cartContext);


function logOutUser () {

  localStorage.removeItem('tkn');

  setToken(null);

  navFunc('/login');

} 

return  <>
  
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    
    <img src={image1} alt=''></img>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
       

      {token ? <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/product">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/category">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brand">Brands</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link position-relative" to="/cart"> 
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {numOfCartItems}
    <span className="visually-hidden">unread messages</span>
  </span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/allorders">All Orders</Link>
        </li>
 </> : ""}


       
      </ul>

      <ul className="navbar-nav ms-auto align-items-center mb-2 mb-lg-0">
        <li className="nav-item">
          <i className='fa-brands me-2 fa-facebook-f'></i>
          <i className='fa-brands me-2 fa-twitter'></i>
          <i className='fa-brands me-2 fa-whatsapp'></i>
          <i className='fa-brands me-2 fa-linkedin'></i>
        </li>



          {token ? <>
          
          <li className="nav-item">
             <Link className="nav-link" to="/profile">Profile</Link>
          </li> 
          <li className="nav-item">
            <span onClick={logOutUser}  style={{cursor : 'pointer'}} className='nav-link'>LogOut</span>
          </li>
          </> : <>
          
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>


          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>

          
          </>}
       
       


       
       
      </ul>
    </div>
  </div>
</nav>
  
  </>
    
  
}
