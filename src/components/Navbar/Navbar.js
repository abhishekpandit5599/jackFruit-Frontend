import React from 'react';
import './Navbar.css';
import {useLocation,Link,useNavigate} from 'react-router-dom';
import Logo from './favicon.png';

const Navbar =()=> {
  let location = useLocation();
  let navigate = useNavigate();
  

  // Handle Menu 
  const handleMenu =() =>{
    let liTag = document.getElementsByClassName('menu-option');
    Array.from(liTag).forEach((element) =>{
      if(element.style.display !== 'block'){
        element.style.display = 'block';
      }else{
        element.style.display = 'none';
      }
    })
  }

  // Handle Logout
  const handleLogout =()=>{
    localStorage.removeItem('auth-token');
    navigate("/login");
  }


    return(
      <>
        <nav className='navbar'>
          <Link to="/"><img src={Logo} alt=''/></Link>
          <div className='brand-name'><h2>Taxable income</h2></div>
          <i onClick={handleMenu} className="placeicon menu-icon fas fa-bars"></i>
          <ul>
            {localStorage.getItem("auth-token") &&
            <li className='menu-option'><Link className={`${location.pathname==='/'?"active":""}`} to="/"><i className="placeicon fas fa-home"></i> Home</Link></li>
            }
            {!localStorage.getItem("auth-token")?<>
            <li className='menu-option'><Link className={`${location.pathname==='/login'?"active":""}`} to="/login"><i className="placeicon far fa-sign-in-alt"></i> Login</Link></li>
            <li className='menu-option'><Link className={`${location.pathname==='/signup'?"active":""}`} to="/signup"><i className="placeicon far fa-user-plus"></i> Sign up</Link></li>
            </> : 
              <li className='menu-option'><button className='logout-btn' onClick={handleLogout}><i className="placeicon far fa-sign-out-alt"></i> Logout</button></li>
            }
          </ul>
        </nav>
      </>
    );
}

export default Navbar;
