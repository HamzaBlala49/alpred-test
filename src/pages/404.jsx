import React from 'react'
// import { P404 } from '../assets/image'
import { Link } from 'react-router-dom'
function Page404() {
  return (
    <div className='bg-dark text-white'>
      <div className='text-center'
        style={{
          display:"flex",
          flexDirection:"column",
          alignContent:"center",
          alignItems:"center",
          gap:"10px"
        }}
      >
        <img src={P404} alt="" style={{width:"360px",height:"360px"}} srcset="" />
        <h1 style={{fontSize:"100px"}} className='text-white'>404</h1>
        <h3>NOT FOUND</h3>
        <p>هل تُهت عن مسار النظام ؟! أضغط <Link to={"/"}>هنا</Link> للرجوع للصفحة الرئيسية</p>

      </div>
        
    </div>
  )
}

export default Page404