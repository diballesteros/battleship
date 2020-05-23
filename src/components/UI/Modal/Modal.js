import React from 'react';
import './Modal.css';
import Button from '../button/Button';

const Modal = (props) => {
    return (
        <div className="modal-background">
            <div className="modal">
                <label>{props.modalText}</label>
                <Button clicked={() => props.modalFn()}>{props.children}</Button>
            </div> 
        </div> 
    );
}

export default Modal;