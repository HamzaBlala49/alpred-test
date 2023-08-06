import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWarning} from '@fortawesome/free-solid-svg-icons';



function WarringAlert({element,handelIsSend}) {
  return (
    <div className="modal fade"  style={{zIndex:"100000",borderRadius:" 5px !important"}} id={"ModalD2"} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-scrollable">
      <div className="modal-content shadow-sm" style={{borderRadius:"2px"}}>
        <div className={`modal-header bg-warning text-white`} style={{borderRadius:"2px"}}>
          <h1 className="modal-title fs-5" id="exampleModalLabel">تحذير< FontAwesomeIcon className='me-2' icon={faWarning}/></h1>
          <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <span className='text-danger'>عند أرسال  القائمة لا يمكنك بعدها تعديل أو حذف القائمة</span>
            <br/>
           <b>هل أنت متأكد من  أرسال <i>{element?.name}</i>؟</b>
        </div>
        <div className="modal-footer border-0 justify-content-start">
              <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">الغاء</button>
              <button type="button" className="btn btn-warning btn-sm" data-bs-dismiss="modal"  onClick={()=> handelIsSend(element)} >أرسال</button>
      </div>
      </div>
    </div>
</div>
  )
}

export default WarringAlert