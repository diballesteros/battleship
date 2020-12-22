import React from 'react';
import './Modal.css';
import Button from '../button/Button';

interface ModalProps {
  children: string;
  modalFn: () => void;
  modalText: string;
}

const Modal: React.FC<ModalProps> = ({ children, modalText, modalFn }) => (
  <div className="modal-background">
    <div className="modal">
      <h2>{modalText}</h2>
      <Button clicked={() => modalFn()} disabled={false}>
        {children}
      </Button>
    </div>
  </div>
);

export default Modal;
