import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {logo} from "../assets/image"
import {loginSchema} from '../schemas';
import CustomInputLogin from "../components/CustomInputLogin"
import { Formik, Form } from 'formik';
import { useSignIn } from 'react-auth-kit';
import { bisUrl } from '../context/biseUrl';
import { useNavigate } from 'react-router';
import "../components/login.css"
// import {useIsAuthenticated , useAuthHeader,useSignIn} from 'react-auth-kit';

  function LogIn() {
  const logIn = useSignIn();  
  const navigate = useNavigate();
  let [isErorr,setIsErorr]= useState(false);
  // const authHeader =  useAuthHeader();


  let handelSubmit = async (values)=>{
    
      await axios.post(`${bisUrl}/login/`,{...values}).then(async (res)=>{
      if(res.data){

        await axios.get(`${bisUrl}/profile`,{headers:{'Authorization': `token ${res.data?.key}` }}).then(res =>{
            localStorage.clear();
            localStorage.permissions = res.data.permissions;
            localStorage.username = res.data.username
            console.log(res.data)
          
              }).catch(e => {
                console.error(e)
              })

        if(logIn({
          token:res.data["key"],
          expiresIn:1440,
          tokenType:'token',
          authState:res.data["key"],
        })){
              setIsErorr(false);
              navigate("/");
          }else{
            console.log("error")
          }
        }
      }).catch((e)=>{
        setIsErorr(false);
        console.error(e)
        if(e.response.status == 400){
          setIsErorr(true)
        }
      })
      
    }  

    return (
      <div className='container-fluid cont bg-white '>
      <div className=' bg-white p-4 con-form rounded shadow'>
        <div className='text-center mb-2'>
          <img src={logo} alt="logo" width={"140px"} />
        </div>
        <Formik

            initialValues ={{
              username: "",
              password:""
            }}

            validationSchema={loginSchema}
            onSubmit={(values, action)=>handelSubmit(values,action)}
            >

            {({prop}) => (
              <Form>
                <div className='row'>
                <CustomInputLogin
                  label={"أسم المستخدم:"}
                  name="username"
                  type="text"
                  placeholder="أسم المستخدم..."
                />
                <CustomInputLogin
                  label={"كلمة المرور:"}
                  name="password"
                  type="password"
                  placeholder="كلمة المرور..."
                />
                <div className="d-grad">
                    {
                      isErorr && <p className="text-danger m-0" style={{fontSize:"16px",fontWeight:"bold"}}>أنت غير مصرح تأكد من صحة المدخلات*</p>
                    }
                    <button type="submit" className="btn btn-dark  w-100 ">تسجيل الدخول</button>
                  </div>
                  </div>
              </Form>
            )}
        </Formik>
      </div>
    </div>
  )
}

export default LogIn
