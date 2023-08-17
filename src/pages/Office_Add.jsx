import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding, faL} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { officeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import BtnLoader from '../components/BtnLoader';


function Office_Add() {
  const navigate = useNavigate();
  const [isSave, setIsSave] = useState(false);
  const [city,setCity] = useState([]);
  const [cityId,setCityId] = useState(null);
  const [users,setUsers] = useState([]);
  const [sendUsers,setSendUsers] = useState([]);
  const authHeader = useAuthHeader()
  let isauth = useIsAuthenticated()
  let [usersVal,setUsersVal] = useState(false);


  const config = {
    headers: { 'Authorization': authHeader() }
  };

    useEffect(()=>{
   

      if(isauth()){

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
    setCityId(city[0]?.id)
  },[city]);
  

  let handelSubmit = (values,action)=>{
    if(sendUsers.length > 0){
      if(isauth()){
        setIsSave(true);
        axios.post(`${bisUrl}/office/office/`,{...values,user:sendUsers,city:cityId},config).then(()=>{
            action.resetForm();
            setIsSave(false);
            setUsersVal(false);
            navigate('/office')
      
        }).catch((e)=>{
            console.log(e);
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
        })
      }

    }else{
      setUsersVal(true);
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

    {/* {phoneVal && <div class="alert alert-danger"><b> رقم الهاتف المدحل غير صالح</b></div>} */}

    <h6 className='text-dark'><FontAwesomeIcon icon={faBuilding} /> إضافة مكتب </h6>

    <Formik 
      initialValues={{
        name:"",
        phone:""
      }}
      validationSchema={officeSchema}
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
            {users.map(el=>{  return <div class="form-check form-check-inline" key={el.id}>
                  <input class="form-check-input" onChange={(e)=> handelcheck(e)} type="checkbox" id={el.id} value={el.id}/>
                  <label class="form-check-label" for="inlineCheckbox1">{el.username}</label>
                </div>
            })}
            {
              usersVal && <p className='text-danger' style={{fontSize:"14px"}}>*يجب أن تختار مستخدم</p>
            }
          </div>

          


          <Link role='button' to={"/office"} className="btn  ms-2 btn-sm">رجوع</Link>
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

export default Office_Add