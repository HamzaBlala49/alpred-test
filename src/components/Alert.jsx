import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';


function Alert({note}) {
  return (
    <div className="modal fade"  style={{zIndex:"100000",borderRadius:" 5px !important"}} id={"Modal"} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content shadow-sm" style={{borderRadius:"2px"}}>
            <div className="modal-header bg-primary text-white" style={{borderRadius:"2px"}}>
              <h1 className="modal-title fs-5" id="exampleModalLabel">ملاحظة< FontAwesomeIcon className='me-2' icon={faInfoCircle}/></h1>
              <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               {note}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Alert