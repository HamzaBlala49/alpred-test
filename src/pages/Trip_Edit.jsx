import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBus, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { officeSchema, storeSchema, tripSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import BtnLoader from '../components/BtnLoader';

function Trip_Edit() {
  let navigate = useNavigate()
  let {Id} = useParams()
  const [isSave, setIsSave] = useState(false);
  const [element,setElement]=useState([]);
  const [name,setName]=useState("");
  const [OfficeId,setOfficeId]=useState("");
  const [office,setOffice] = useState([]);
  const [vehicles,setVehicles] = useState([]);
  const [vehicleId,setVehicleId] = useState("");

  const [from_office,setFrom_office] = useState("");
  const [user,setUser] = useState("");
  
  const authHeader = useAuthHeader()
  let isauth = useIsAuthenticated()
  const config = {
    headers: { 'Authorization': authHeader() }
  };

  useEffect(()=>{

    if(isauth()){

      axios.get(`${bisUrl}/office/trips/${Id}`,config).then(res=>{
        setElement(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })


      axios.get(`${bisUrl}/office/office/`,config).then(res=>{
        setOffice(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })

      axios.get(`${bisUrl}/vehicle/vehicle/`,config).then(res=>{
        setVehicles(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })

    }
  
},[])

useEffect(()=>{
  setName(element?.name);
  setOfficeId(element?.to_office);
  setVehicleId(element?.vehicle)
  setFrom_office(element?.from_office)
  setUser(element?.user)
},[element]);

let handelSubmit = (values,action)=>{
  if(isauth()){
    setIsSave(true)

    axios.put(`${bisUrl}/office/trips/${Id}/`,{...values,"to_office":OfficeId,"vehicle":vehicleId,user,from_office},config).then(()=>{
      setIsSave(false);
      action.resetForm();
      navigate('/trip')

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
    <h6 className='text-dark'><FontAwesomeIcon icon={faBus} /> إضافة رحلة </h6>
    <Formik 
      enableReinitialize={true}
      initialValues={{
        name:name||"",
      }}
      validationSchema={tripSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {(props) => (
        <Form>
          <CustomInput
            label={"أسم الرحلة:"}
            name="name"
            type="text"
            placeholder="الأسم..."
          />

          <div className="mb-3">
            <label className="form-label fs-6"> الئ مكتب:</label>
            <select onChange={(e)=> setOfficeId(e.target.value)}  value={OfficeId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  <option value="">لايوجد</option>
                  {office.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>

          <div className="mb-3">
            <label className="form-label fs-6"> السائق:</label>
            <select onChange={(e)=> setVehicleId(+e.target.value)}  value={vehicleId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {vehicles.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name_driver}</option>
                  })}
              </select>
          </div>
      


          <Link role='button' to={"/trip"} className="btn  ms-2 btn-sm">رجوع</Link>
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

export default Trip_Edit