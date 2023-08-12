import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDriversLicense, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { driverSchema, officeSchema, storeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';

function Drivers_Add() {
    const navigate = useNavigate();
    const [isSave, setIsSave] = useState(false);
    
    const [Status_Ind,setStatus_Ind] = useState(1);
    const [b_day,setB_day] = useState("");
    const [docm_url,setDocm_url] = useState("");
    const [docm_1_url,setDocm_1_url] = useState("");




    const authHeader = useAuthHeader()
    let isauth = useIsAuthenticated()

    const config = {
        headers: { 'Authorization': authHeader() }
    };



    let handelSubmit = (values,action)=>{
        if(isauth()){
          let {name,ind} = values;
          let formData =  new FormData();
          formData.append("name",name);
          formData.append("ind",ind);
          formData.append("b_day",b_day);
          formData.append("Status_Ind",Status_Ind);
          formData.append("docm_url",docm_url);
          formData.append("docm_1_url",docm_1_url);
          setIsSave(true);

          axios.post(`${bisUrl}/vehicle/driver/`,formData,config).then(()=>{
              action.resetForm();
              setIsSave(false)
              navigate("/transportation_home/drivers")
          }).catch((e)=>{
              setIsSave(false)
              console.log(e)
              alert("حدث خطأ أثناء عملية الأضافة")
          })
      
        }
      
      
      }
    

  return (
    <div className='p-2 container-fluid'>

    {/* {phoneVal && <div class="alert alert-danger"><b> رقم الهاتف المدحل غير صالح</b></div>} */}

    <h6 className='text-dark'><FontAwesomeIcon icon={faDriversLicense} /> إضافة سائق </h6>

    <Formik 
      initialValues={{
        name:"",
        ind:""
      }}
      validationSchema={driverSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {(props) => (
        <Form>
        <div className='row g-3'>
          <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
            <CustomInput
              label={"الأسم:"}
              name="name"
              type="text"
              placeholder="الأسم.."
            />
          </div>
          <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
            <CustomInput
              label={"رقم الهوية:"}
              name="ind"
              type="text"
            />
          </div>

        <div className="col-12 col-lg-6 col-md-6 col-sm-12">
          <label className="form-label fs-6">نوع الهوية :</label>
          <select onChange={(e)=> setStatus_Ind(+e.target.value)}  value={Status_Ind} className="form-select form-select-sm"
              style={{fontSize:'14px',width:'300px' }} 
              id="floatingSelectGrid">
                <option value="1">جواز سفر</option>
                <option value="2">بطاقة شخصية</option>
                <option value="3">بطاقة معرفة</option>
            </select>
        </div>

        <div className="col-12 col-lg-6 col-md-6 col-sm-12">
          <label className="form-label fs-6">تاريخ الميلاد :</label>
           <input type="date" onChange={(e)=>setB_day(e.target.value)} style={{fontSize:'14px',width:'300px'}} className="form-control mt-s form-control-sm outline-none" />
        </div>

        <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
          <label className="form-label fs-6"> صورة الهوية:</label>
          <input  accept='image/*' onChange={(e)=> setDocm_url(e.target.files[0])} type="file" className="form-control mt-s form-control-sm outline-none"
          style={{fontSize:'14px',width:'300px'}}
          />
        </div>

        <div className='col-12 col-lg-6 mb-3 col-md-6 col-sm-12'>
        <label className="form-label fs-6"> </label>
        {
          docm_url ? <img src={URL.createObjectURL(docm_url)} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" />
          :  <img src="" className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" />

        }
        </div>


        <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
          <label className="form-label fs-6"> صورة اليسن:</label>
          <input  accept='image/*' onChange={(e)=> setDocm_1_url(e.target.files[0])} type="file" className="form-control mt-s form-control-sm outline-none"
          style={{fontSize:'14px',width:'300px'}}
          />
        </div>

        <div className='col-12 col-lg-6 mb-3 col-md-6 col-sm-12'>
        <label className="form-label fs-6"> </label>
        {
          docm_1_url ? <img src={URL.createObjectURL(docm_1_url)} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" />
          :  <img src="" className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" />

        }
        </div>

        </div>
        <Link role='button' to={"/transportation_home/drivers"} className="btn  ms-2 btn-sm">رجوع</Link>
        |
        <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">حفظ</button>
      </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Drivers_Add