import React, { useState } from 'react'

function Print_2() {
    const [data,setData] = useState([]);
    const [selectValue,setSelectValue] = useState("");
    const [selectValue2,setSelectValue2] = useState("");
    const [selectValue3,setSelectValue3] = useState("");
    const [selectValue4,setSelectValue4] = useState("");

    const handelSearch = ()=>{
        console.log("")
    }


    return (
    <div className='p-2'>
        <div className='row g-1 mt-3'>
            <div className='col-12 col-lg-3 col-md-3 col-sm-12'>  
                <input 
                onChange={(e)=>  handelChangeSearchValue(e)} 
                type="text" 
                className="form-control  form-control-sm outline-none"
                style={{fontSize:'14px'}}
                placeholder='بحث.. '/>
            </div>

            <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
                <select onChange={(e)=> setSelectValue(e.target.value)} value={selectValue} className="form-select form-select-sm"
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

            <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
                <select onChange={(e)=> handelChangeSelect(e)} value={selectValue} className="form-select form-select-sm"
                style={{fontSize:'14px'}} 
                id="floatingSelectGrid">
                    <option value="old">قديم</option>
                    <option value="new">جديد</option>
                </select>
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
                <select onChange={(e)=> handelChangeSelect(e)} value={selectValue} className="form-select form-select-sm"
                style={{fontSize:'14px'}} 
                id="floatingSelectGrid">
                    <option value="old">قديم</option>
                    <option value="new">جديد</option>
                </select>
            </div>




        </div>
    </div>
    )
}

export default Print_2