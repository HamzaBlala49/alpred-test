import { useField } from 'formik'
import React from 'react'

const CustomTextarea = ({label,...props}) => {
    const [field,meta] = useField(props);

  return (
    <div className='mb-3'>
        <label 
        className='form-label fs-6'
        >{label}</label>

        <textarea
        className="form-control mt-s form-control-sm outline-none"
        style={{fontSize:'14px',width:'300px'}}
        rows={"3"}
        {...field} {...props} />

        {meta.error && meta.touched && <p  className='text-danger' style={{fontSize:"12px"}}>{meta.error}</p> }

    </div>
  )
}

export default CustomTextarea
