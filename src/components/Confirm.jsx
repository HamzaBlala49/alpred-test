import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan,faSave} from '@fortawesome/free-solid-svg-icons';


function Confirm({massage,header,handelDelete,color,icon,textBtn,element}) {
  
  return (
    <div className="modal fade"  style={{zIndex:"100000",borderRadius:" 5px !important"}} id={"ModalD"} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content shadow-sm" style={{borderRadius:"2px"}}>
            <div className={`modal-header bg-${color} text-white`} style={{borderRadius:"2px"}}>
              <h1 className="modal-title fs-5" id="exampleModalLabel">{header}< FontAwesomeIcon className='me-2' icon={icon}/></h1>
              <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               {`${massage} ${element?.name|| ""}`}
            </div>
            <div className="modal-footer border-0 justify-content-start">
                  <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">الغاء</button>
                  <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal"  onClick={()=> handelDelete(element)} >{textBtn}</button>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Confirm  