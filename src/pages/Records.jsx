import React, { useState ,useEffect} from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd,faInfoCircle,faTrashCan, faPenToSquare,faUsers, faClipboard, faL, faPrint} from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { bisUrl } from '../context/biseUrl';
import Confirm from '../components/Confirm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import { check_permissions } from '../context/permissions';

function Records() {
  const [data, setData] = useState([]);
  let [isLoad, setIsLoad] = useState(false);
  let [element,setElement] = useState(null);
  let [searchValue,setSearchValue] = useState("")
  let [selectValue,setSelectValue] = useState("old");
  let [selectValue2,setSelectValue2] = useState("");
  let [selectValue3,setSelectValue3] = useState("0");
  let [transformationList,setTransformationList] = useState([]);
  let [isTransformation,setIsTransformation] = useState(false)

  const [trips,setTrips] = useState([]);
  let [selectValue4,setSelectValue4] = useState("");
  
  const [stores,setStores] = useState([]);
  let [selectValue5,setSelectValue5] = useState("");

  const authHeader = useAuthHeader()
  const config = {
    headers: { 'Authorization': authHeader() }
  };
  let isauth = useIsAuthenticated();

  useEffect(() => {
    setIsLoad(true)

    if(isauth()){
      axios.get(`${bisUrl}/office/records/`,config).then(res=>{
        setData(res.data);
        setIsLoad(false)

      }).catch(e=>{
        console.error(e)
      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

      axios.get(`${bisUrl}/office/trips/`,config).then(res=>{
        setTrips(res.data);
        }).catch(e=>{
            console.error(e)
            alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
        })


        axios.get(`${bisUrl}/office/stores/`,config).then(res=>{

            setStores(res.data);
            
            }).catch(e=>{
                console.error(e)
                alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
            })

    }

  },[])

  useEffect(() => {

    setIsLoad(true)

    if(isauth()){
      axios.get(`${bisUrl}/office/records/`,config).then(res=>{
        setData(res.data);
        setIsLoad(false)

      }).catch(e=>{
        console.error(e)
      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

      axios.get(`${bisUrl}/office/trips/`,config).then(res=>{
        setTrips(res.data);
        }).catch(e=>{
            console.error(e)
            alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
        })


        axios.get(`${bisUrl}/office/stores/`,config).then(res=>{

            setStores(res.data);
            
            }).catch(e=>{
                console.error(e)
                alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
        })

    }
  
    
  }, [isTransformation])
  


  useEffect(()=>{
    if(selectValue == "new"){
      setData([...data.reverse()]);
    }else{
      setData([...data.reverse()]);
    }
  },[selectValue])

  let handelElement = (el)=>{
    setElement(el)
  }

  let handelDelete = (el)=>{

    if(isauth()){

      axios.delete(`${bisUrl}/office/records/${el.id}`,config).then(()=>{
        let _data= data;
        const index = _data.indexOf(el);
        _data.splice(index,1);
        setData([..._data]);

      }).catch(e=>{
        console.error(e)
        alert("هناك خطأ حدث أثناء الخذف!!")
      })

    }

  }

  let handelChangeSearchValue = (e)=>{
      setSearchValue(e.target.value);
  }

  let handelChangeSelect = (e)=>{
    setSelectValue(e.target.value)
  }

  let handelChangeSelect2 = (e)=>{
    setTransformationList([]);
    setSelectValue2(e.target.value)
    if(e.target.value == ""){
      setSelectValue3("");
      setSelectValue4("");
      setSelectValue5("");
    }
  }

  let handelChangeSelect3 = (e)=>{
    setSelectValue3(e.target.value)
    if(e.target.value == "1"){
      setSelectValue5("");
    }else if(e.target.value == "3"){
      setSelectValue4("");
    }else{
      setSelectValue4("");
      setSelectValue5("");
    }
  }
  let handelChangeSelect4 = (e)=>{
    setSelectValue4(e.target.value)
  }

  let handelChangeSelect5 = (e)=>{
    setSelectValue5(e.target.value)
  }

  let handelCheck =(e,el)=>{
    let list  = transformationList;
    if(e.target.checked){
      list.push(el)
    }else{
      let index = list.indexOf(el)
      list.splice(index,1);
    }

    setTransformationList([...list])
  }

  let handelSubmit = ()=> {
    if(isauth){
        if(transformationList){
          axios.post(`${bisUrl}/office/records/`,{"records":transformationList,"expulsion_status":+selectValue3,"trip":selectValue5 ||null ,"store" : selectValue4 || null},config).then(()=>{
            setIsTransformation(!isTransformation);
            setSelectValue2("")
            setSelectValue3("")
            setSelectValue4("")
            setSelectValue5("")
            setTransformationList([]);

          }).catch((e)=>{
            console.log(e)
            alert("حدث خطأ أثناء عملية الأضافة")
          })

        }
    }
  }



  return (
    <div className='p-2'>

    <h6 className='text-dark'><FontAwesomeIcon icon={faClipboard} /> إدارة السجلات </h6>

    <div className='row g-3 mt-3'>

      <div className='col-12 col-lg-1 col-md-3 col-sm-12'>
        <Link to={'/office_home'} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
      </div>

      {
          check_permissions("office.add_customer") ? <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link to={'add'} className="btn btn-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">إضافة سجل <FontAwesomeIcon icon={faAdd} /></Link>
          </div> : <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link className="btn btn-secondary btn-sm w-100" style={{fontSize:'14px',cursor:"not-allowed"}} role="button">إضافة سجل <FontAwesomeIcon icon={faAdd} /></Link>
          </div>
      }

      <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
        
      <input 
        onChange={(e)=>  handelChangeSearchValue(e)} 
        type="text" 
        className="form-control  form-control-sm outline-none"
        style={{fontSize:'14px'}}
        placeholder='بحث.. '/>
      </div>

      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> handelChangeSelect(e)} value={selectValue} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="old">قديم</option>
            <option value="new">جديد</option>
        </select>
      </div>


      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> handelChangeSelect2(e)} value={selectValue2} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">الكل</option>
            <option value="0">أستلام مكتب</option>
            <option value="1">أستلام مخزني</option>
            <option value="2">تسليم مخزني</option>
            <option value="3">أستلام مركبة </option>
            <option value="4">تسليم مركبة </option>
            <option value="5">أستلام المستلم</option>
        </select>
      </div>

      {
        selectValue2 && check_permissions("office.add_motionrecording")?<div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> handelChangeSelect3(e)} value={selectValue3} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="0">أستلام مكتب</option>
            <option value="1">أستلام مخزني</option>
            <option value="2">تسليم مخزني</option>
            <option value="3">أستلام مركبة </option>
            <option value="4">تسليم مركبة </option>
            <option value="5">أستلام المستلم</option>
        </select>
      </div>: null
      }

      {
        selectValue3 == "1" && selectValue2 !="" && check_permissions("office.add_motionrecording")?<div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> handelChangeSelect4(e)} value={selectValue4} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">أختر المخزن</option>
            {stores.map(el=>{
              return <option value={el.id}>{el.name}</option>
            })}
        </select>
      </div>: null
      }

      {
        selectValue3 == "3" && selectValue2 !="" && check_permissions("office.add_motionrecording")?<div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> handelChangeSelect5(e)} value={selectValue5} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">أختر الرحلة</option>
            {trips.map(el => {
              return <option value={el.id}>{el.name}</option>
            })}
        </select>
      </div>: null
      }

      {
        selectValue2 && check_permissions("office.add_motionrecording")? <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
         <button className='btn btn-sm btn-info w-100' onClick={(e)=> handelSubmit()} style={{fontSize:'14px',fontWeight:"bold"}} >تحويل</button>
      </div>:null
      }

      {
        check_permissions("office.view_motionrecording") ? <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
         <Link role='button' to={"/print__2"} className='btn btn-sm btn-warning w-100'  style={{fontSize:'14px',fontWeight:"bold"}} > <FontAwesomeIcon icon={faPrint} /> طباعة السجلات</Link>
      </div>:null
      }



    </div>

    {isLoad ?
    <Loader/>
       : 
      <div className="table-responsive mt-4" style={{fontSize:"16px"}}>
      <table className="table table-striped">
        <thead>
            <tr>
              <th scope='col'> {selectValue2 && "اختيار"}</th>
              <th scope="col">الرقم</th>
              <th scope="col">رقم الطرد</th>
              <th scope="col">حالة الطرد</th>
              <th scope="col">المخزن</th>
              <th scope="col">الرحلة</th>
              <th scope="col">وجهة الطرد</th>
              <th scope="col">تاريخ الانشاء</th>
              <th scope="col" className='text-success'>تعديل</th>
              <th scope="col" className='text-danger'>حذف</th>
            </tr>
        </thead>
        <tbody>
          { data.map((el,index)=>{

            return el.expulsion.toString().startsWith(searchValue) && el.expulsion_status.toString().startsWith(selectValue2)? <tr key={index}>
            <th scope="row">{selectValue2 && <input class="form-check-input"  onChange={(e)=> handelCheck(e,el)}  type="checkbox" aria-label="Text for screen reader"/> }</th>
            <th scope="row">{selectValue =="old" ? index+1 : data.length - index}</th>
            <td>{el.expulsion}</td>
            <td>{el.name_expulsion_status}</td>
            <td>{el.name_store || "لايوجد"}</td>
            <td>{el.trip || "لايوجد"}</td>
            <td>{el.name_city || "لايوجد"}</td>
            <td>{el.create_at.slice(0,10)}</td>
            {
                check_permissions("office.change_motionrecording")?  <td> <Link  to={`${el.id}`} role='button'><FontAwesomeIcon className='text-success' icon={faPenToSquare} /></Link></td>: <td> <Link  style={{cursor:"not-allowed"}} role='button'><FontAwesomeIcon className='text-secondary' icon={faPenToSquare} /></Link></td>
            }

            {
              check_permissions("office.delete_motionrecording") ? <td> <a role='button'  data-bs-toggle="modal"   onClick={()=> handelElement(el)}  data-bs-target={"#ModalD"}><FontAwesomeIcon className='text-danger'  icon={faTrashCan} /></a></td> : <td> <a role='button'  style={{cursor:"not-allowed"}} ><FontAwesomeIcon className='text-secondary'  icon={faTrashCan} /></a></td>
            }
          </tr>
          :
          null

          })}

        </tbody>
      </table>
      </div>
      }
      
    {!isLoad && <Confirm header={"حذف"} massage={"هل تريد حذف العميل؟"} handelDelete={handelDelete} element={element} color={"danger"} icon={faTrashCan} textBtn={"حذف"}  />}


  </div>
  )
}

export default Records