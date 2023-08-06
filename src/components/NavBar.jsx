import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser,faSignOut,faHome,faStapler ,faBuilding,faUsers,faBox,faStore,faBus,faClipboard,faUsersCog,faMoneyBill} from '@fortawesome/free-solid-svg-icons';

import { Link, NavLink } from 'react-router-dom';
import './NavBar.css'
import { useSignOut } from 'react-auth-kit';


function NavBar() {
  const logout = useSignOut();

   let handelLogout = ()=> logout();

  return (
    <>
        <nav className="navbar navbar-expand-lg  p-2"  style={{position:"sticky", top:"0px", backgroundColor:"gray" ,zIndex:"100000"}}>
          <div className="container-fluid">

            <div>
              <FontAwesomeIcon icon={faUser} className='text-light' style={{fontSize:"19px"}} />
              <span className='me-3 text-light' style={{color:"#575757",fontSize:"19px"}}>{localStorage.getItem('username')}</span>
            </div>

              <button className="navbar-toggler border-0  d-block d-lg-none d-md-none d-sm-block" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

            <div className="collapse navbar-collapse"  id="navbarNavDropdown">
              <ul className="navbar-nav d-block   navbar-ul d-lg-none d-md-none d-sm-block ">
              <li className='nav-item'>
                <NavLink to={"/"}><FontAwesomeIcon icon={faHome} /> الرئيسية</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={'/office_home'}><FontAwesomeIcon icon={faBuilding} /> إدارة المكاتب</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={"/transportation_home"}><FontAwesomeIcon icon={faUsers} /> إدارة النقل</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={"/address_home"} ><FontAwesomeIcon icon={faBox} /> إدارة الأماكن</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={"/users_home"}><FontAwesomeIcon icon={faUsersCog} /> إدارة المستخدمين</NavLink>
              </li>
                
                <li className="nav-item">
                  <Link className='text-danger' onClick={()=>handelLogout()}> <FontAwesomeIcon icon={faSignOut} /> تسجيل الخروج  </Link>
                </li>
                
              </ul>
            </div>
            <h6 onClick={()=> handelLogout()} className='text-danger  d-none d-lg-block m-0 p-0 d-md-block d-sm-none' style={{cursor:"pointer"}}>تسجيل الخروج</h6>
          </div>
        </nav>
    </>
  )
}


export default NavBar





