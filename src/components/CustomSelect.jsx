import { useField } from 'formik'
import React from 'react'

const CustomSelect = ({label,...props}) => {
    const [field,meta] = useField(props);
    
  return (
    <div className='mb-3'>
        <label 
        className='form-label fs-6'
        >{label}</label>

      <select 
        className="form-select form-select-sm"
        style={{fontSize:'14px',width:'300px' }} 
        id="floatingSelectGrid"
        {...field}
        {...props}
      >

      </select>
      {meta.error && meta.touched && <p  className='text-danger' style={{fontSize:"12px"}}>{meta.error}</p> }


    </div>
  )
}

export default CustomSelect