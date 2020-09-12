import React from 'react'
import { GiCandleLight } from 'react-icons/gi'

function Modal({showModal,children}) {
    return (
        showModal && (
            <div className='modalBackground'>
                <div className='modalContainer'>
                    {children}
                </div>
            </div> 
        ) 
      
    )
}

export default Modal
