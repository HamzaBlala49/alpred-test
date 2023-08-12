import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { bisUrl } from '../context/biseUrl';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faHome,faStapler ,faBuilding,faUsers,faBox,faStore,faBus,faClipboard,faUsersCog,faMoneyBill, faDriversLicense, faBusAlt, faBusSimple, faCarBurst, faCarAlt, faCarSide, faCarOn} from '@fortawesome/free-solid-svg-icons';
import { check_permissions } from '../context/permissions';

function Home_vehicle() {
    const [data,setData]  = useState([]);
    const authHeader = useAuthHeader();
    const isAuth = useIsAuthenticated();
    const config = {
      headers: { 'Authorization': authHeader() }
    };


    useEffect(()=>{
        if(isAuth()){
            axios.get(`${bisUrl}/vehicle/vehicle_home`,config).then(res =>{
                setData(res.data);
            }).catch(e=>{
                alert("هناك خظأ في تحميل البيانات تأكد من أتصالك بالشبكة")
            })
        }
    },[]) 

  return (
    <div className='row g-1'>
      <div className="row g-2">

        {
          check_permissions("vehicle.view_vehicle") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
          <Link to={"vehicle"} style={{textDecoration:"none"}} className='text-dark fs-5'>
          <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
            <div>
              <span><FontAwesomeIcon icon={faBus} /> المركبات</span>
            </div>
            <p className='mt-1 fs-1'>{data.vehicles}</p>
          </div>
          </Link>
        </div>
        }
        

        {
          check_permissions("vehicle.view_driver") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
          <Link  to={'drivers'} style={{textDecoration:"none"}} className='text-dark fs-5'>
          <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
            <div>
              <span><FontAwesomeIcon icon={faDriversLicense} /> السائقين </span>
            </div>
            <p className=' mt-1 fs-1'>{data.drivers}</p>
          </div>
          </Link>
        </div>

        }
        {
           check_permissions("vehicle.view_typesvehicle") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
          <Link to={'typeVehicle'} style={{textDecoration:"none"}} className='text-dark fs-5'>
          <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
            <div>
              <span><FontAwesomeIcon icon={faCarSide} /> أنواع المركبات</span>
            </div>
            <p className='mt-1 fs-1'>{data.types_vehicles}</p>
          </div>
          </Link>
        </div>
        }

      </div>
      
    </div>
  )
}

export default Home_vehicle