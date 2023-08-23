import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCarSide, faLocation, faLocationDot, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { directorateSchema, officeSchema, provinecSchema, storeSchema, typeVehicleSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import BtnLoader from '../components/BtnLoader';


function City_Edit() {
    const navigate = useNavigate();
    const [isSave, setIsSave] = useState(false);
    let {Id} = useParams()
    const [name,setName]=useState("");
    const [element,setElement]=useState([]);
    const [directorate ,setdirectorate] =useState([]);
    const [directorateId ,setdirectorateId] =useState("");
    const authHeader = useAuthHeader()
    let isauth = useIsAuthenticated()

    const config = {
        headers: { 'Authorization': authHeader() }
    };

    useEffect(()=>{

        if(isauth()){
    
          axios.get(`${bisUrl}/places/directorate/`,config).then(res=>{
            setdirectorate(res.data);
          }).catch(e=>{
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
          })

          axios.get(`${bisUrl}/places/city/${Id}`,config).then(res=>{
            setElement(res.data);
          }).catch(e=>{
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
          })
    
        }
      
    },[])
    
    useEffect(()=>{
        setName(element?.name);
        setdirectorateId(element?.directorate);
      },[element]);
    


  let handelSubmit = (values,action)=>{
    if(isauth()){
      setIsSave(true)

      axios.put(`${bisUrl}/places/city/${Id}/`,{...values,"directorate":directorateId},config).then(()=>{
          setIsSave(false);
          action.resetForm();
          navigate('/location_home/city')
    
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

    <h6 className='text-dark'><FontAwesomeIcon icon={faLocationDot} /> تعديل مدينة</h6>

    <Formik 
      initialValues={{
        name:name||"",
      }}
      enableReinitialize={true}
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
            <label className="form-label fs-6">المديرية :</label>
            <select onChange={(e)=> setdirectorateId(+e.target.value)}  value={directorateId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {directorate.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>
      

          <Link role='button' to={"/location_home/city"} className="btn  ms-2 btn-sm">رجوع</Link>
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

export default City_Edit