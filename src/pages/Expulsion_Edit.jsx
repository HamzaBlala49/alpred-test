import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStore,faMoneyBill, faBox} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { expulsionSchema, financeSchema, officeSchema, storeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import CustomTextarea from '../components/CustomTextarea';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import CustomSelect from '../components/CustomSelect';

function Expulsion_Edit() {
  const [isSave, setIsSave] = useState(false);
  const [office,setOffice] = useState([]);
  const [officeId,setOfficeId] = useState(null);
  const [city,setCity] = useState([]);
  const [cityId,setCityId] = useState(null);
  const [customer,setCustomer] = useState([]);
  const [customerId,setCustomerId] = useState([]);
  let navigate = useNavigate()
  let {Id} = useParams()
  const [element,setElement]=useState([]);
  const [type_currency,setType_currency] = useState(1);
  const [type_price,setType_price] = useState(1);
  const [precious,setPrecious] = useState(0);

  const [price,setPrice] = useState("");
  const [content,setContent] = useState("");
  const [recipient_phone_1,setRecipient_phone_1] = useState("");
  const [recipient_name,setRecipient_name] = useState("");
  const [recipient_phone_2,setRecipient_phone_2] = useState("");
  const authHeader = useAuthHeader()
  let isauth = useIsAuthenticated()
  const config = {
    headers: { 'Authorization': authHeader() }
  };

  useEffect(()=>{

    if(isauth()){

      axios.get(`${bisUrl}/office/expulsions/${Id}/`,config).then(res=>{
        setElement(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })
    
      axios.get(`${bisUrl}/office/office/`,config).then(res=>{
        setOffice(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })


      axios.get(`${bisUrl}/places/city/`,config).then(res=>{
        setCity(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })

      axios.get(`${bisUrl}/office/customers/`,config).then(res=>{
        setCustomer(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })


    }
  
},[]);

useEffect(()=>{
  setCityId(element?.to_city);
  setCustomerId(element?.customer);
  setOfficeId(element?.to_office);
  setPrecious(element?.precious);
  setPrice(element?.price);
  setType_price(element?.type_price);
  setRecipient_phone_2(element?.recipient_phone_2);
  setRecipient_phone_1(element?.recipient_phone_1);
  setRecipient_name(element?.recipient_name);
  setType_currency(element?.type_currency);
  setContent(element?.content);
},[element]);

let handelSubmit = (values,action)=>{
  console.log("dsds")
  if(isauth()){
    let {content,price,recipient_phone_1,recipient_phone_2,recipient_name} = values;

    axios.put(`${bisUrl}/office/expulsions/${Id}/`,{content,price,recipient_phone_1:`+967${recipient_phone_1}`,recipient_phone_2:`+967${recipient_phone_2}`,recipient_name,type_price,type_currency,precious,customer:customerId,to_office:officeId,to_city:cityId},config).then(()=>{
        action.resetForm();
        // setIsSave(true);
       navigate("/expulsion")
    }).catch((e)=>{
        console.log(e)
        alert("حدث خطأ أثناء عملية الأضافة")
    })

  }


}




  return (
    <div className='p-2 container-fluid'>

    {/* {isSave && <div class="alert alert-success"><b>تم الحفظ بنجاح</b></div>} */}
    <h6 className='text-dark'><FontAwesomeIcon icon={faBox} /> تعديل طرد </h6>
  <Formik 
      initialValues={{
        content:content,
        recipient_phone_1:+recipient_phone_1?.length == 13 ? +recipient_phone_1?.slice(4,13): +recipient_phone_1?.slice(3,12),
        recipient_phone_2: recipient_phone_2?.length == 13 ? +recipient_phone_2?.slice(4,13): +recipient_phone_2?.slice(3,12),
        recipient_name:recipient_name,
        price:price
      }}
      enableReinitialize={true}
      validationSchema={expulsionSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {(props) => (
        <Form>
          <div className='row g-3'>
            <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={"أسم المستلم:"}
                name="recipient_name"
                type="text"
                placeholder="أسم العميل.."
              />
            </div>

            <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomTextarea
                label={" المحتوى:"}
                name="content"
              />
            </div>

            <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={"رقم الهاتف 1:"}
                name="recipient_phone_1"
                type="number"

              />
            </div>
            <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={" رقم الهاتف 2:"}
                name="recipient_phone_2"
                type="number"

              />
            </div>
          <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={"السعر:"}
                name="price"
                type="number"

              />
          </div>
          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6">نوع العملة :</label>
            <select onChange={(e)=> setType_currency(+e.target.value)}  value={type_currency} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  <option value="1">ريال يمني عملة عدن</option>
                  <option value="2">ريال سعودي</option>
                  <option value="3">دولار</option>
                  <option value="4">ريال يمني عملة صنعاء</option>
              </select>
          </div>

          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6">نوع الدفع :</label>
            <select onChange={(e)=> setType_price(+e.target.value)}  value={type_price} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  <option value="1">نقد</option>
                  <option value="2">اجل</option>
              </select>
          </div>

          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6">  أهمية الطرد :</label>
            <select onChange={(e)=> setPrecious(+e.target.value)}  value={precious} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  <option value="0">غير ثمين</option>
                  <option value="1">ثمين</option>
              </select>
          </div>

          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6">المدينة :</label>
            <select onChange={(e)=> setCityId(+e.target.value)}  value={cityId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {city.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>

          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6"> الى المكتب:</label>
            <select onChange={(e)=> setOfficeId(+e.target.value)}  value={officeId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {office.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>

          <div className="col-12 col-lg-6 col-md-6 col-sm-12 mb-3">
            <label className="form-label fs-6"> العميل:</label>
            <select onChange={(e)=> setCustomerId(+e.target.value)}  value={customerId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {customer.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>

          
          </div>
          <Link role='button' to={"/expulsion"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
       
      )}
    </Formik>
  </div>
  )
}

export default Expulsion_Edit