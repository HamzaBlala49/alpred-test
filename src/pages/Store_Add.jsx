import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { officeSchema, storeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import BtnLoader from '../components/BtnLoader';

function Store_Add() {
  const navigate = useNavigate();
  const [isSave, setIsSave] = useState(false);
  const [office,setOffice] = useState([]);
  const [officeId,setOfficeId] = useState(null);
  const authHeader = useAuthHeader()
  let isauth = useIsAuthenticated()

  const config = {
    headers: { 'Authorization': authHeader() }
  };

    useEffect(()=>{

      if(isauth()){

        axios.get(`${bisUrl}/office/office/`,config).then(res=>{
          setOffice(res.data);
        }).catch(e=>{
          alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
        })

      }
    
  },[])

  useEffect(()=>{
    setOfficeId(office[0]?.id)
  },[office]);

  

  let handelSubmit = (values,action)=>{
    if(isauth()){
      setIsSave(true)

      axios.post(`${bisUrl}/office/stores/`,{...values,office:officeId},config).then(()=>{
          setIsSave(false);
          action.resetForm();
          navigate('/store')
    
      }).catch((e)=>{
          setIsSave(false);

          if(e.response.status == 400){
            let messes = '';
            for (const i in e.response.data) {
              let listError = e.response.data[i];
              listError.forEach(el => {
                messes +=` تحذير : ${el} \n` 
              })
              
            }
            alert(messes)
          }else{
            alert("حدث خطأ أثناء عملية الأضافة")
          }
          console.log(e)
      })
    }
    
  
  }


  return (
    <div className='p-2 container-fluid'>

    {/* {phoneVal && <div class="alert alert-danger"><b> رقم الهاتف المدحل غير صالح</b></div>} */}

    <h6 className='text-dark'><FontAwesomeIcon icon={faStore} /> إضافة مخزن </h6>

    <Formik 
      initialValues={{
        name:"",
        number:""
      }}
      validationSchema={storeSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {(props) => (
        <Form>
          <CustomInput
            label={"أسم المخزن:"}
            name="name"
            type="text"
            placeholder="الأسم..."
          />

          <CustomInput
            label={"رقم المخزن:"}
            name="number"
            type="number"
          />

          <div className="mb-3">
            <label className="form-label fs-6">المكتب :</label>
            <select onChange={(e)=> setOfficeId(+e.target.value)}  value={officeId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {office.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>
      


          <Link role='button' to={"/store"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">
              {
                isSave ? <BtnLoader/> : "حفظ"
              } 
          </button>
        </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Store_Add