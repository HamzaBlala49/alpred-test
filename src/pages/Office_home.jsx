import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { bisUrl } from '../context/biseUrl';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faHome,faStapler ,faBuilding,faUsers,faBox,faStore,faBus,faClipboard,faUsersCog,faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import { check_permissions } from '../context/permissions';


function Office_home() {
    const [data,setData]  = useState([]);
    const authHeader = useAuthHeader();
    const isAuth = useIsAuthenticated();
    const config = {
      headers: { 'Authorization': authHeader() }
    };

    useEffect(()=>{
        if(isAuth()){
            axios.get(`${bisUrl}/office/office_home`,config).then(res =>{
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
          check_permissions("office.view_office") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
          <Link to={"/office"} style={{textDecoration:"none"}} className='text-dark fs-5'>
          <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
            <div>
              <span><FontAwesomeIcon icon={faBuilding} /> المكاتب</span>
            </div>
            <p className='mt-1 fs-1'>{data.office}</p>
          </div>
          </Link>
        </div>
        }
        

        {
          check_permissions("office.view_customer") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
          <Link  to={'/customer'} style={{textDecoration:"none"}} className='text-dark fs-5'>
          <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
            <div>
              <span><FontAwesomeIcon icon={faUsers} /> العملاء </span>
            </div>
            <p className=' mt-1 fs-1'>{data.customer}</p>
          </div>
          </Link>
        </div>

        }
        {/* {
           check_permissions("office.view_expulsion") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
          <Link to={'/expulsion'} style={{textDecoration:"none"}} className='text-dark fs-5'>
          <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
            <div>
              <span><FontAwesomeIcon icon={faBox} /> الطرود</span>
            </div>
            <p className='mt-1 fs-1'>{data.expulsion}</p>
          </div>
          </Link>
        </div>

        } */}

        {

            check_permissions("office.view_store")&&<div className='col-12 col-lg-4 col-md-4 col-sm-12'>
            <Link to={"/store"} style={{textDecoration:"none"}} className='text-dark fs-5'>
            <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
              <div>
                <span><FontAwesomeIcon icon={faStore} /> المخازن </span>
              </div>
              <p className='mt-1 fs-1'>{data.store}</p>
            </div>
            </Link>
            </div>

        }

        {
            check_permissions("office.view_trip") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
            <Link to={"/trip"} style={{textDecoration:"none"}} className='text-dark fs-5'>
            <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
              <div>
                <span><FontAwesomeIcon icon={faBus} /> الرحلات </span>
              </div>
              <p className='mt-1 fs-1'>{data.trip}</p>
            </div>
            </Link>
          </div>

        }
        
        {
           check_permissions("office.view_motionrecording") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
           <Link to={"/records"} style={{textDecoration:"none"}} className='text-dark fs-5'>
           <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
             <div>
               <span><FontAwesomeIcon icon={faClipboard} /> السجلات </span>
             </div>
             <p className='mt-1 fs-1'>{data.record}</p>
           </div>
           </Link>
         </div>

        }


        

        {
            check_permissions("office.view_finamcefund") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
            <Link to={"/finance"} style={{textDecoration:"none"}} className='text-dark fs-5'>
            <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
              <div>
                <span><FontAwesomeIcon icon={faMoneyBill} /> المالية </span>
              </div>
              <p className='mt-1 fs-1'>{data.finamce}</p>
            </div>
            </Link>
          </div>
        }

        

      </div>
      
    </div>
  )
}

export default Office_home