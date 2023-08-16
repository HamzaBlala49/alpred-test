import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCarSide, faMap, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { officeSchema, provinecSchema, storeSchema, typeVehicleSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';

function Provinces_Edit() {
    const navigate = useNavigate();
    const [isSave, setIsSave] = useState(false);
    let {Id} = useParams()
    const [element,setElement]=useState([]);
    const [name,setName]=useState("");
    const [number,setNumber]=useState("");
    const authHeader = useAuthHeader()
    let isauth = useIsAuthenticated()

    const config = {
        headers: { 'Authorization': authHeader() }
    };


    useEffect(()=>{

        if(isauth()){
    
          axios.get(`${bisUrl}/places/provinec/${Id}`,config).then(res=>{
            setElement(res.data);
          }).catch(e=>{
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
          })
    
        }
      
    },[])
    
    useEffect(()=>{
      setName(element?.name);
      setNumber(element?.numder);
    },[element]);
    


  let handelSubmit = (values,action)=>{
    if(isauth()){
      setIsSave(true)

      axios.put(`${bisUrl}/places/provinec/${Id}/`,values,config).then(()=>{
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

    <h6 className='text-dark'><FontAwesomeIcon icon={faMap} /> تعديل محافظة</h6>

    <Formik 
      initialValues={{
        name: name || "",
        numder:number ||""
      }}
      enableReinitialize={true}
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

export default Provinces_Edit