import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStore} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { officeSchema, storeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

function Store_Edit() {
  let navigate = useNavigate()
  let {Id} = useParams()
  const [isSave, setIsSave] = useState(false);
  const [element,setElement]=useState([]);
  const [name,setName]=useState("");
  const [number,setNumber]=useState("");
  const [OfficeId,setOfficeId]=useState("");
  const [office,setOffice] = useState([]);
  

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

      axios.get(`${bisUrl}/office/stores/${Id}/`,config).then(res=>{
        setElement(res.data)
      }).catch(e=>{
        console.log(e)
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })

    }
  
},[])

useEffect(()=>{
  setName(element?.name);
  setNumber(element?.number);
  setOfficeId(element?.office);
},[element]);


let handelSubmit = (values,action)=>{
  if(isauth()){
    setIsSave(true)

    axios.put(`${bisUrl}/office/stores/${Id}/`,{...values,office:OfficeId},config).then(()=>{
        setIsSave(false)
        action.resetForm();
        navigate("/store")
  
    }).catch((e)=>{
        setIsSave(false)
        console.error(e)
        alert("حدث خطأ أثناء عملية الأضافة")
    })
  }
}




  return (
    <div className='p-2 container-fluid'>

    {/* {isSave && <div class="alert alert-success"><b>تم الحفظ بنجاح</b></div>} */}
    {/* {phoneVal && <div class="alert alert-danger"><b> رقم الهاتف المدحل غير صالح</b></div>} */}

    <h6 className='text-dark'><FontAwesomeIcon icon={faStore} /> إضافة مكتب </h6>

    <Formik 
      enableReinitialize={true}
      initialValues={{
        name:"" || name,
        number:"" || number
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
            <select onChange={(e)=> setOfficeId(+e.target.value)}  value={OfficeId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {office.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>
      


          <Link role='button' to={"/store"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Store_Edit