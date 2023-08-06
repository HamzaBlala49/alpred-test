import { useField } from 'formik'
import React from 'react'

const CustomInputLogin = ({label,...props}) => {
    const [field,meta] = useField(props);

  return (
    <div className='mb-3'>
        <label 
        className='form-label fs-6'
        >{label}</label>

        <input
        className="form-control mt-s form-control-sm outline-none"
        {...field}
        {...props} />

        {meta.error && meta.touched && <p  className='text-danger' style={{fontSize:"12px"}}>{meta.error}</p> }

    </div>
  )
}

export default CustomInputLogin