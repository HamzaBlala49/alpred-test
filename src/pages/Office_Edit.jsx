import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding, faL} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { officeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

function Office_Edit() {
  let navigate = useNavigate()
  let {Id} = useParams()
  const [element,setElement]=useState([]);
  const [isSave, setIsSave] = useState(false);
  const [phoneVal , setPhoneVal] = useState(false);
  const [name, setName] = useState("");
  const [phone,setPhone] = useState("")
  const [city,setCity] = useState([]);
  const [cityId,setCityId] = useState(null);
  const [users,setUsers] = useState([]);
  const [checkedUsers,setCheckedUsers] = useState([]);
  const [sendUsers,setSendUsers] = useState([]);
  const authHeader = useAuthHeader();
  let isauth = useIsAuthenticated();

  const config = {
    headers: { 'Authorization': authHeader() }
  };

  useEffect(()=>{

      if(isauth()){

         axios.get(`${bisUrl}/office/office/${Id}`,config).then(res=>{
          setElement(res.data)
        }).catch(e=>{
          alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
        })

         axios.get(`${bisUrl}/places/city`,config).then(res=>{
          setCity(res.data);
        }).catch(e=>{
          alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
        })

         axios.get(`${bisUrl}/accounts/users`,config).then(res=>{
          setUsers(res.data);
        }).catch(e=>{
          alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
        })
      }
    
  },[])

  useEffect(()=>{
    setCityId(element?.city);
    setName(element?.name);
    setPhone(element?.phone);
    setSendUsers(element?.user)
  },[element]);

  // useEffect(()=>{
  //   let _users = [];
  //   users.forEach((el)=>{
  //     let user = {
  //       id:el.id,
  //       name:el.username,
  //       isCheck : false,
  //     }
  //     _users.push(user);
  //   })

  //   setCheckedUsers([..._users])

   


  // },[users]);

  // useEffect(()=>{

  //   let checkUsers = checkedUsers;

  //   checkedUsers.forEach(el =>{
  //     if(sendUsers.includes(el.id)){
  //       el.isCheck = true;
  //     }
  //   });

  //   // setCheckedUsers([...checkUsers]);


  // },[checkedUsers])

  

  

  let handelSubmit = (values,action)=>{
    if(isauth()){
      setIsSave(true);
      let {name,phone} = values;
      console.log(phone)

      axios.put(`${bisUrl}/office/office/${Id}/`,{name,phone:`+967${phone}`,user:sendUsers,city:cityId},config).then(()=>{
        action.resetForm();
        setIsSave(false);
          navigate("/office");
    
      }).catch((e)=>{
          setIsSave(false);
          console.error(e)
          alert("حدث خطأ أثناء عملية الأضافة")
      })
    }
  }

  let handelcheck = (e)=>{

    let list = sendUsers
    if(e.target.checked){
      list.push(+e.target.value);
    }else{
      let i = list.indexOf(+e.target.value)
      list.splice(i,1);
    }
    setSendUsers([...list]);

  }


  return (
    <div className='p-2 container-fluid'>

    {phoneVal && <div class="alert alert-danger"><b> رقم الهاتف المدخل غير صالح</b></div>}

    <h6 className='text-dark'><FontAwesomeIcon icon={faBuilding} /> إضافة مكتب </h6>

    <Formik 
      initialValues={{
        name:""||name,
        phone:""|| phone?.length == 13 ? +phone?.slice(4,13): +phone?.slice(3,12) ,
      }}
      validationSchema={officeSchema}
      enableReinitialize={true}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {(props) => (
        <Form>
          <CustomInput
            label={"أسم المكتب:"}
            name="name"
            type="text"
            placeholder="الأسم..."
          />

          <CustomInput
            label={"رقم الهاتف:"}
            name="phone"
            type="text"
          />

          <div className="mb-3">
            <label className="form-label fs-6">المدينة :</label>
            <select onChange={(e)=> setCityId(+e.target.value)}  value={cityId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {city.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>

          <div className='mb-3'>
          <label className="form-label fs-6 d-block">المستخدمين:</label>
           {users?.map(el=>{  return <div class="form-check form-check-inline" key={el.id}>
                <input class="form-check-input" checked={ sendUsers?.includes(el.id) ? true : false} onChange={(e)=> handelcheck(e)} type="checkbox" id={el.id} value={el.id}/>
                <label class="form-check-label" for="inlineCheckbox1">{el.username}</label>
              </div>
           })}

          </div>

          


          <Link role='button' to={"/office"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Office_Edit