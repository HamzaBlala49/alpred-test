import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { customerSchema} from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';


function Customer_Add() {
  const [isSave, setIsSave] = useState(false);
  const navigate = useNavigate();
  const [city,setCity] = useState([]);
  const [place,setPlace] = useState("");
  const [doc_url,setDoc_url] = useState("");
  const [type_doc,setType_doc] = useState(1);


  const authHeader = useAuthHeader()
  let isauth = useIsAuthenticated()
  const config = {
    headers: { 'Authorization': authHeader() }
  };

  useEffect(()=>{

    if(isauth()){
      axios.get(`${bisUrl}/places/city/`,config).then(res=>{
        setCity(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })

    }
  
},[])

  useEffect(()=>{
    setPlace(city[0]?.id)
  },[city]);


let handelSubmit = (values,action)=>{
  if(isauth()){
    let {name , phone_1 ,phone_2 ,number_doc} = values;
    let formData =  new FormData();
    formData.append("name",name)
    formData.append("phone_1",`+967${phone_1}`)
    formData.append("phone_2",`+967${phone_2}`)
    formData.append("number_doc",+number_doc)
    formData.append("place",place)
    formData.append("doc_url",doc_url)
    formData.append("type_doc",type_doc)
    setIsSave(true);
    axios.post(`${bisUrl}/office/customers/`,formData,config).then(()=>{
        action.resetForm();
        setIsSave(false)
        navigate("/customer")
    }).catch((e)=>{
        setIsSave(false)
        console.log(e)
        alert("حدث خطأ أثناء عملية الأضافة")
    })

  }


}


  return (
    <div className='p-2 container-fluid'>
    <h6 className='text-dark'><FontAwesomeIcon icon={faUsers} /> إضافة عميل </h6>

  <Formik 
      initialValues={{
        name:"",
        phone_2:"",
        phone_1:"",
        number_doc:"",
      }}
      onSubmit = {(values, action)=> handelSubmit(values,action)}
      // validationSchema={customerSchema}
    >
      {({isSubmitting}) => (
        <Form>
          <div className='row g-1'>
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
                label={"رقم الهاتف 1:"}
                name="phone_1"
                type="text"
              />
            </div>
            <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={"رقم الهاتف 2:"}
                name="phone_2"
                type="text"

              />
            </div>
          <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={"رقم الهوية:"}
                name="number_doc"
                type="text"
              />
          </div>
          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6">نوع الهوية :</label>
            <select onChange={(e)=> setType_doc(+e.target.value)}  value={type_doc} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  <option value="1">بطاقة شخصية</option>
                  <option value="2">جواز سفر</option>
              </select>
          </div>

          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6">المدينة :</label>
            <select onChange={(e)=> setPlace(+e.target.value)}  value={place} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {city.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>

          <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
            <label className="form-label fs-6"> صورة الهوية:</label>
            <input  accept='image/*' onChange={(e)=> setDoc_url(e.target.files[0])} type="file" className="form-control mt-s form-control-sm outline-none"
            style={{fontSize:'14px',width:'300px'}}
            />
          </div>

          <div className='col-12 col-lg-6 mb-3 col-md-6 col-sm-12'>
          <label className="form-label fs-6"> </label>
          {
            doc_url ? <img src={URL.createObjectURL(doc_url)} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" />
            :  <img src="" className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" />

          }
          </div>

          </div>
          <Link role='button' to={"/customer"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
       
      )}
    </Formik>
  </div>
  )
}

export default Customer_Add







