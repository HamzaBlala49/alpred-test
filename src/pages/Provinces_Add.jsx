import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCarSide, faMap, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { officeSchema, provinecSchema, storeSchema, typeVehicleSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';

function Provinces_Add() {
    const navigate = useNavigate();
    const [isSave, setIsSave] = useState(false);
    const authHeader = useAuthHeader()
    let isauth = useIsAuthenticated()

    const config = {
        headers: { 'Authorization': authHeader() }
    };


  let handelSubmit = (values,action)=>{
    if(isauth()){
      setIsSave(true)

      axios.post(`${bisUrl}/places/provinec/`,values,config).then(()=>{
          setIsSave(false);
          action.resetForm();
          navigate('/location_home/provinec')
    
      }).catch((e)=>{
          setIsSave(false);
          console.log(e)

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

      })
    }
    
  
  }
  return (
    <div className='p-2 container-fluid'>

    {/* {phoneVal && <div class="alert alert-danger"><b> رقم الهاتف المدحل غير صالح</b></div>} */}

    <h6 className='text-dark'><FontAwesomeIcon icon={faMap} /> إضافة محافظة</h6>

    <Formik 
      initialValues={{
        name:"",
        numder:""
      }}
      validationSchema={provinecSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {(props) => (
        <Form>

          <CustomInput
            label={" الأسم:"}
            name="name"
            type="text"
            placeholder="الأسم..."
          />

        <CustomInput
            label={" رقم المحافظة:"}
            name="numder"
            type="text"
          />
      

          <Link role='button' to={"/location_home/provinec"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Provinces_Add