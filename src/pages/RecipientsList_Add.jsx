import React, {useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList,faHandsHoldingChild} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { post ,get} from '../context/ApiConfig';
import Loader from '../components/Loader';
import { imag1, person } from '../assets/image';

import { bisUrl } from '../context/biseUrl';
import { listSchema } from '../schemas';
import { Formik, Form } from 'formik';
import CustomInput from '../components/CustomInput';
import CustomTextarea from '../components/CustomTextarea'
import axios from 'axios';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';



function RecipientsList_Add() {
  // let navigate = useNavigate()
  // const [name, setName] = useState("");
  // const [note, setNote] = useState("");
  let [isLoad, setIsLoad] = useState(false);
  let [points,setPoints] = useState([]);
  let [distriputionPointID,setDistriputionPointID] = useState("");
  
  let [packages,setPackages] = useState([]);
  let [packageID,setPackageID] = useState(null);
  
  
  let [searchValue,setSearchValue] = useState("");
  let [recipientWithPackage,setRecipientWithPackage] = useState([]);
  
  let [recipients,setRecipients] = useState([]);
  let [sendRecipients,setSendRecipients] = useState([]);

  let [checkAll,setCheckAll] = useState(false);

  const [isSave, setIsSave] = useState(false);
  let [nameVald, setNameVald] = useState(false);
  let [respVald, setrespVald] = useState(false);

  
  const authHeader = useAuthHeader()
  const config = {
    headers: { 'Authorization': authHeader() }
  };
  let isauth = useIsAuthenticated()

  useEffect(()=>{
    setIsLoad(true)

    if(isauth()){
      axios.get(`${bisUrl}/distributionPoint`,config).then(res=>{
        let _points = res.data.data.filter(el =>{
          return el.state == 'Active';
 
        })
        setPoints(_points) 
     })
 
      axios.get(`${bisUrl}/packages`,config).then(res=>{
        setPackages(res.data.data);
      
      })
 
 
      axios.get(`${bisUrl}/recipientDetailes`,config).then(res=>{
     setRecipients(res.data.data);
     setIsLoad(false);
    
      })
 

    }

    
},[]);


useEffect(()=>{
    setDistriputionPointID(points[0]?.id)
  },[points]);

  useEffect(()=>{
    setPackageID(packages[0]?.id)
  },[packages]);


  useEffect (()=>{
    let recList = [];
    for (let i = 0; i < recipients.length; i++) {
      let rec = {
        recipientID:recipients[i].id,
        package:packageID,
        checked:false,
        image:recipients[i].image,
        recipientName:recipients[i].name
      }
      recList.push(rec);
    }

    setRecipientWithPackage(recList);
    
    // console.log(recipientWithPackage)

  },[recipients,packageID])


  let handelSubmit = (values,action)=>{
    if(isauth()){
      axios.post(`${bisUrl}/complexStore`,{...values,distriputionPointID,"recipients":sendRecipients},config).then(()=>{

        action.resetForm();
        setIsSave(true);
        setNameVald(false);
        setrespVald(false);
  
      }).catch((e)=>{
        if(e.response.data.message == "The recipients field is required."){
          setrespVald(true);
        }
  
        if( e.response.data.message == "The name has already been taken."){
          setNameVald(true);
  
        }
      })

    }

    setTimeout(() => {

      setIsSave(false);
      
    }, 2000);
  }
  
  let handelChangeSelect = (e)=>{
    setDistriputionPointID(+e.target.value)
    }

  let handelChangeSearchValue = (e)=>{
    setSearchValue(e.target.value);
  }

  let handelCheck = (e,el)=>{
    // let {checked} = e.target
    let checked;
    recipientWithPackage.forEach((element,index)=>{
      if (element.recipientID == el.recipientID){
        let list = recipientWithPackage;
        list[index].checked = !list[index].checked;
        setRecipientWithPackage([...list]);
        checked = list[index].checked;
      }
    })

    if(checked){
      let sendList = sendRecipients;
      for (let i = 0; i < recipientWithPackage.length; i++) {
        
        if(el.recipientID == recipientWithPackage[i].recipientID){
          // console.log("yes")
          let sendRec ={
            "recipientID" : recipientWithPackage[i].recipientID,
            "packageID" : recipientWithPackage[i].package
          }
          sendList.push(sendRec);
          setSendRecipients(sendList);
          break ;
        }
      }

    }else{

      let sendList =sendRecipients;
      for (let i = 0; i < sendList.length; i++) {
        
        if(el.recipientID == sendList[i]['recipientID']){
          sendList.splice(i,1);
          setSendRecipients(sendList);
          break ;
        }
    }

    }

  }

  let handelChangePackage = (e,el)=>{
    let {checked,recipientID} = el
    if(checked){
      // console.log("yes")
      let sendList = sendRecipients;
      for (let i = 0; i < sendList.length; i++) {
        if(sendList[i].recipientID == recipientID){
          sendList[i]["packageID"] = +e.target.value;
          break;
        }
      }
      setSendRecipients([...sendList]);
      // console.log(sendRecipients)

      let list = recipientWithPackage;
      for (let i = 0; i < list.length; i++) {
        if(list[i].recipientID == recipientID){
          list[i]["package"] = +e.target.value;
          break;

        }
      }
      setRecipientWithPackage([...list])
      // console.log(recipientWithPackage)

      

    }else{
      // console.log("no")
      let list = recipientWithPackage;
      for (let i = 0; i < list.length; i++) {
        if(list[i].recipientID == recipientID){
          list[i]["package"] = +e.target.value;
          break;
        }
      }
      setRecipientWithPackage(list)
      // console.log(recipientWithPackage)

    }

  }

  let handelCheckAll = (e)=>{
    setCheckAll(!checkAll);
    let{checked} = e.target;
    
      let list = recipientWithPackage;
      list.forEach((el)=>{
        el["checked"]=!checkAll;
      })
      setRecipientWithPackage([...list]);

      if(checked){
        let list = [];
        recipientWithPackage.forEach((el,i)=>{
          let sendRec ={
            "recipientID" : recipientWithPackage[i].recipientID,
            "packageID" : recipientWithPackage[i].package
          }
          list.push(sendRec);
          setSendRecipients([...list]);
        })
      }else{

        setSendRecipients([])
      }
      
  }





  return (
    <div className='p-2'>
      { nameVald && <div class="alert alert-danger">أسم القائمة المدخل موجود بالفعل!! <b> يجب أدخال أسم فريد</b></div>}
      { respVald && <div class="alert alert-danger"> لم تحدد أي مستفيد! <b> يجب أدخال  مستفيدين</b></div>}
      {isSave && <div class="alert alert-success"><b>تم الحفظ بنجاح</b></div>}
    <Formik

    initialValues={{
      name:"",
      note:"",
    }}

    validationSchema={listSchema}
    onSubmit={(values, action)=>handelSubmit(values,action)}
    >

{({props}) => (
      <Form>          
      <div className='row g-3 container'>
        <div className='col-12 col-lg-6 col-md-12 col-12'>
        <h6 className='text-dark'><FontAwesomeIcon icon={faRectangleList} /> إضافة قائمة </h6>

        <CustomInput 
          label={"الأسم:"}
          name="name"
          type="text"
          placeholder="أسم..."
        />


        <CustomTextarea
         label={"ملاجظة :"}
         name="note"
         placeholder="ملاجظة..."
        
        />

      

        <div className="mb-3">
        <label className="form-label fs-6">نقطة الأستلام :</label>
        <select onChange={(e)=> handelChangeSelect(e)}  value={distriputionPointID} className="form-select form-select-sm"
            style={{fontSize:'14px',width:'300px' }} 
            id="floatingSelectGrid">
              {points.map(el=>{
                return <option key={el.id} value={el.id}>{el.name}</option>
              })}
            </select>
        </div>

        <Link role='button' to={"/recipientsList"} className="btn  ms-2 btn-sm">رجوع</Link>
        |
        <button type="submit" className="btn btn-dark btn-sm me-2">حفظ</button>

        </div>

        <div className="col-12  col-lg-6 col-md-12 col-12">

          <div>
          <h6 className='text-dark'><FontAwesomeIcon icon={faHandsHoldingChild} />  المستفيدين </h6>
          <input onChange={(e)=>  handelChangeSearchValue(e)} type="text" className="form-control mt-3 mx-2 form-control-sm outline-none"
          style={{fontSize:'14px',display:'inline-block',width:'300px'}}
          placeholder='بحث.. '/>
          </div>
        
        { isLoad ? <Loader/> : <div className="table-responsive mt-4" style={{fontSize:"16px"}}>
        <table className="table table-striped">
          <thead>
              <tr>
                <th scope="col">الرقم</th>
                <th scope="col"><input class="form-check-input" onChange={(e)=> handelCheckAll(e)} checked={checkAll} name="" id="" type="checkbox" value="checkedValue" aria-label="Text for screen reader"/> الكل</th>
                <th scope="col">الصورة</th>
                <th scope="col">الأسم</th>
                <th scope="col"> الحزمة</th>
              </tr>
          </thead>
          <tbody>
          { !isLoad && recipientWithPackage.map((rec,index)=>{
              return rec.recipientName.startsWith(searchValue) ? 
              <tr key={index}>
              <th scope="row">{index+1}</th>
              <td><input class="form-check-input" checked={rec.checked} onChange={(e)=> handelCheck(e,rec)}  type="checkbox" value={rec.recipientID} aria-label="Text for screen reader"/></td>
              <td>{rec.image ? <img src={`data:image/*;base64,${rec.image}`} alt="imag"  style={{borderRadius:"50%" ,objectFit:"cover"}} width={"45px"} height={"45px"}/>:<img src={person} alt="imag"  style={{borderRadius:"50%" ,objectFit:"cover"}} width={"45px"} height={"45px"}/>}</td>
              <td>{rec.recipientName}</td>
              <td>
                <select  className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }}
                onChange={(e)=> handelChangePackage(e,rec)} 
                defaultValue={rec.package}
                id="floatingSelectGrid">
                  {packages.map(el=>{
                    return <option key={el.id}  value={el.id}>{el.name}</option>
                  })}
                </select>
              </td>
            </tr>
              :
              null
            })}
          </tbody>
        </table>

        </div>}
        </div>

      </div>
     
       

      </Form>
    )}

    </Formik>
    </div>
  )
}

export default RecipientsList_Add





{/* <div className='p-2'>
<form className='pt-3' onSubmit={(e)=> handelSubmit(e)}>

 <div className='row g-3 container'>
  <div className='col-12 col-lg-6 col-md-12 col-12'>
  <h6 className='text-dark'><FontAwesomeIcon icon={faRectangleList} /> إضافة قائمة </h6>

  <div className="mb-3">
   <label className="form-label fs-6">الأسم:</label>
   <input  required onChange={(e)=> handelChangeName(e)} type="text" className="form-control mt-s form-control-sm outline-none"
   style={{fontSize:'14px',width:'300px'}}
   />
  </div>

  <div className="mb-3">
   <label className="form-label fs-6">ملاحظة :</label>
   <textarea  required onChange={(e)=> handelChangeNote(e)} type="text" className="form-control mt-s form-control-sm outline-none"
   style={{fontSize:'14px',width:'300px'}}
    />
  </div>

  <div className="mb-3">
   <label className="form-label fs-6">نقطة الأستلام :</label>
   <select onChange={(e)=> handelChangeSelect(e)}  value={distriputionPointID} className="form-select form-select-sm"
       style={{fontSize:'14px',width:'300px' }} 
       id="floatingSelectGrid">
         {points.map(el=>{
          return <option key={el.id} value={el.id}>{el.name}</option>
         })}
      </select>
  </div>

  <Link role='button' to={"/recipientsList"} className="btn  ms-2 btn-sm">رجوع</Link>
  |
  <button type="submit" className="btn btn-dark btn-sm me-2">حفظ</button>

  </div>

  <div className="col-12  col-lg-6 col-md-12 col-12">

    <div>
    <h6 className='text-dark'><FontAwesomeIcon icon={faHandsHoldingChild} />  المستفيدين </h6>
    <input onChange={(e)=>  handelChangeSearchValue(e)} type="text" className="form-control mt-3 mx-2 form-control-sm outline-none"
    style={{fontSize:'14px',display:'inline-block',width:'300px'}}
    placeholder='بحث.. '/>
    </div>
  
  { isLoad ? <Loader/> : <div className="table-responsive mt-4" style={{fontSize:"16px"}}>
  <table className="table table-striped">
    <thead>
        <tr>
          <th scope="col">الرقم</th>
          <th scope="col"><input class="form-check-input" onChange={(e)=> handelCheckAll(e)} checked={checkAll} name="" id="" type="checkbox" value="checkedValue" aria-label="Text for screen reader"/> الكل</th>
          <th scope="col">الصورة</th>
          <th scope="col">الأسم</th>
          <th scope="col"> الحزمة</th>
        </tr>
    </thead>
    <tbody>
    { !isLoad && recipientWithPackage.map((rec,index)=>{
        return rec.recipientName.startsWith(searchValue) ? 
        <tr key={index}>
        <th scope="row">{index+1}</th>
        <td><input class="form-check-input" checked={rec.checked} onChange={(e)=> handelCheck(e,rec)}  type="checkbox" value={rec.recipientID} aria-label="Text for screen reader"/></td>
        <td><img src={imag1} alt="imag"  style={{borderRadius:"50%" ,objectFit:"cover"}} width={"45px"} height={"45px"}/></td>
        <td>{rec.recipientName}</td>
        <td>
          <select  className="form-select form-select-sm"
          style={{fontSize:'14px',width:'300px' }}
          onChange={(e)=> handelChangePackage(e,rec)} 
          defaultValue={rec.package}
          id="floatingSelectGrid">
            {packages.map(el=>{
              return <option key={el.id}  value={el.id}>{el.name}</option>
            })}
          </select>
        </td>
      </tr>
        :
        null
      })}
    </tbody>
  </table>

  </div>}
  </div>

 </div>


</form>
</div> */}