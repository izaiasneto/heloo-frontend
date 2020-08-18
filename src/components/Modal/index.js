import React from 'react'

import './styles.css'

const Modal = ({id= 'modal', onClose = () => {}, children}) => {

    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose()
    }
    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="container">
                <button onClick={onClose} className="close"/>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}


export default Modal