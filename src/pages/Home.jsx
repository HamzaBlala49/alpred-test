import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faL} from '@fortawesome/free-solid-svg-icons';
import { faArrowsToDot} from '@fortawesome/free-solid-svg-icons';
import { faRectangleList} from '@fortawesome/free-solid-svg-icons';
import { faUsers} from '@fortawesome/free-solid-svg-icons';
import { faClipboard} from '@fortawesome/free-solid-svg-icons';
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen} from '@fortawesome/free-solid-svg-icons';
import { faHandsHoldingChild} from '@fortawesome/free-solid-svg-icons';
import { faCubesStacked} from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
// import { get } from '../context/ApiConfig';
import { bisUrl } from '../context/biseUrl';
import Loader from '../components/Loader';
// import { person } from '../assets/image';
// import { providerContext } from '../App';
import { useAuthHeader,useIsAuthenticated} from 'react-auth-kit';
import axios from 'axios';
function Home() {

  const authHeader = useAuthHeader()
  const config = {
    headers: { 'Authorization': authHeader() }
  };

//   console.log(config.headers)

  // const [data, setData] = useState([]);
//   let [isLoad, setIsLoad] = useState(false);
//   const [points,setPoints] = useState([]);
//   const [packages , setPackages] = useState([]);
//   const [lists , setLists] = useState([]);
//   const [recp , setRecp] = useState([]);
//   let isAuth = useIsAuthenticated()
useEffect(()=>{
  axios.get(`${bisUrl}/office/office/`,config).then(res =>{
    console.log(res.data)
  })

},[])

//   useEffect(()=>{
//     setIsLoad(true)
//     if(isAuth()){

//       axios.get(`${bisUrl}/home`,config).then(res=>{
//         setData(res.data);
//         setIsLoad(false)

//       }).catch(e=>{
//         console.error(e)
//         alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
//       })
  
//       axios.get(`${bisUrl}/recipientDetailes`,config).then(res=>{
//           setRecp(res.data.data);
  
//       }).catch(e=>{
//         console.error(e)
//           alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
//       })
  
//       axios.get(`${bisUrl}/packages`,config).then(res=>{
//           setPackages(res.data.data);
  
//       }).catch(e=>{
//         console.error(e)
//         alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
//       })
  
//       axios.get(`${bisUrl}/recipientsList`,config).then(res=>{
//           setLists(res.data.data);
  
//         }).catch(e=>{
//         console.error(e)

//           alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
//       })
  
//       axios.get(`${bisUrl}/distributionPoint`,config).then(res=>{
//           setPoints(res.data.data);
  
//         }).catch(e=>{
//         console.error(e)

//           alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
//       })


//     }
  


//   },[])
// console.log(data)
  return (
    // <div className='row g-1'>
    //   <div className="row g-2">
    //     <div className='col-12 col-lg-3 col-md-4 col-sm-12'>
    //       <Link to={"/recipientsList"} style={{textDecoration:"none"}} className='text-dark fs-5'>
    //       <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
    //         <div>
    //           <span><FontAwesomeIcon icon={faRectangleList} /> قوائم التوزيع </span>
    //         </div>
    //         <p className='mt-1 fs-1'>{lists.length}</p>
    //       </div>
    //       </Link>
    //     </div>
    //     <div className='col-12 col-lg-3 col-md-4 col-sm-12'>
    //       <Link  to={'distributionPoints'} style={{textDecoration:"none"}} className='text-dark fs-5'>
    //       <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
    //         <div>
    //           <span><FontAwesomeIcon icon={faArrowsToDot} /> النقاط </span>
    //         </div>
    //         <p className=' mt-1 fs-1'>{points.length}</p>
    //       </div>
    //       </Link>
    //     </div>
    //     <div className='col-12 col-lg-3 col-md-4 col-sm-12'>
    //       <Link to={'recipientDetailes'} style={{textDecoration:"none"}} className='text-dark fs-5'>
    //       <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
    //         <div>
    //           <span><FontAwesomeIcon icon={faHandsHoldingChild} /> المستفيدين</span>
    //         </div>
    //         <p className='mt-1 fs-1'>{recp.length}</p>
    //       </div>
    //       </Link>
    //     </div>
    //     <div className='col-12 col-lg-3 col-md-4 col-sm-12'>
    //       <Link to={"/packages"} style={{textDecoration:"none"}} className='text-dark fs-5'>
    //       <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
    //         <div>
    //           <span><FontAwesomeIcon icon={faBoxOpen} /> الحزم </span>
    //         </div>
    //         <p className='mt-1 fs-1'>{packages.length}</p>
    //       </div>
    //       </Link>
    //     </div>

    //   </div>
    //   <div className='row mt-5'>
       
    //     <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
    //     <h5 className='text-dark'><FontAwesomeIcon icon={faHandsHoldingChild} /> آخر المستفيدين </h5>
    //     <Link to={'recipientDetailes'}>أدارة</Link>
    //     {isLoad ?
    //           <Loader/>
    //           :
    //           <div className="table-responsive mt-4" style={{fontSize:"16px"}}>
    //           <table className="table table-striped">
    //             <thead>
    //                 <tr>
    //                   <th scope="col">الرقم</th>
    //                   <th scope="col">الصورة</th>
    //                   <th scope="col">الأسم</th>
    //                   <th scope="col">رقم الهاتف</th>
    //                   <th scope="col">رقم البراكود</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //               {data.recipients?.map((el,index)=>{
    //                 return<tr key={index}>
    //                 <th scope="row">{ index+1 }</th>
    //                 <td>{el.image ? <img src={`data:image/*;base64,${el.image}`} alt="imag"  style={{borderRadius:"50%" ,objectFit:"cover"}} width={"45px"} height={"45px"}/>:<img src={person} alt="imag"  style={{borderRadius:"50%" ,objectFit:"cover"}} width={"45px"} height={"45px"}/>}</td>
    //                 <td>{el.name}</td>
    //                 <td>{el.phoneNum}</td>
    //                 <td>{el.barcode}</td>
    //               </tr>
    //               })}
    //             </tbody>
    //           </table>
    //           </div>
    //           }
    //     </div>  
    //     <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
    //     <h5 className='text-dark'><FontAwesomeIcon icon={faClipboard} /> آخر السجلات </h5>
    //     <Link to={'/distributionRecords'}>أدارة</Link>
    //     {isLoad ?
    // <Loader/>
    //    :<div className="table-responsive mt-4" style={{fontSize:"16px"}}>
    //   <table className="table table-striped">
    //     <thead>
    //         <tr>
    //           <th scope="col">الرقم</th>
    //           <th scope="col">أسم المستلم</th>
    //           <th scope="col">القائمة </th>
    //           <th scope="col">النقطة</th>
    //           <th scope="col">الموزع</th>
    //           <th scope="col" >التاريخ </th> 
    //           <th scope="col" >حالتها </th>
    //           <th scope="col" >أسم الحزمة</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //       {data.distributionRecord?.map((el,index)=>{
    //         return <tr key={index}>
    //         <th scope="row">{index+1}</th>
    //         <td>{el.recipientName}</td>
    //         <td>{el.listName}</td>
    //         <td>{el.distriputionPointName}</td>
    //         <td>{el.distriputerName}</td>
    //         <td>{el.recrptionDate == "0000-00-00" ? "لايوجد" : el.recrptionDate}</td>
    //         <td>{el.state == "Not" ? "لم تسلم" : "سلمت"}</td>
    //         <td>{el.package?.name}</td>
    //       </tr>
    //       })}
    //     </tbody>
    //   </table>
    //   </div>
   
    //   }
    //     </div>

    //   </div>
    // </div>
    <>Home</>
  )
}

export default Home