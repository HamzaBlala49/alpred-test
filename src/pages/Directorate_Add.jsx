import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCarSide, faMapLocation, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { directorateSchema, officeSchema, provinecSchema, storeSchema, typeVehicleSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';

function Directorate_Add() {
    const navigate = useNavigate();
    const [isSave, setIsSave] = useState(false);
    const [provinec ,setProvinec] =useState([]);
    const [provinecId ,setProvinecId] =useState("");
    const authHeader = useAuthHeader()
    let isauth = useIsAuthenticated()

    const config = {
        headers: { 'Authorization': authHeader() }
    };

    useEffect(()=>{

        if(isauth()){
    
          axios.get(`${bisUrl}/places/provinec/`,config).then(res=>{
            setProvinec(res.data);
          }).catch(e=>{
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
          })
    
        }
      
    },[])
    
    useEffect(()=>{
      setProvinecId(provinec[0]?.id);
    },[provinec]);
    


  let handelSubmit = (values,action)=>{
    console.log("dddd")
    if(isauth()){
      setIsSave(true)

      axios.post(`${bisUrl}/places/directorate/`,{...values,"provinec":provinecId},config).then(()=>{
          setIsSave(false);
          action.resetForm();
          navigate('/location_home/directorate')
    
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

    <h6 className='text-dark'><FontAwesomeIcon icon={faMapLocation} /> إضافة مديرية</h6>

    <Formik 
      initialValues={{
        name:"",
      }}
      validationSchema={directorateSchema}
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

        <div className="mb-3">
            <label className="form-label fs-6">المحافظة :</label>
            <select onChange={(e)=> setProvinecId(+e.target.value)}  value={provinecId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {provinec.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>
      

          <Link role='button' to={"/location_home/directorate"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Directorate_Add