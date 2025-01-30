import React from 'react';

import { TextDto } from '../../types/TextDto';

import './Modal.css';

interface ModalProps {
  resultTexts: TextDto | TextDto[];
  closeModal: (bol: boolean) => void;
}

const Modal = ({resultTexts, closeModal}: ModalProps) => {

  const handleClick = () => {
    closeModal(true)
  }

  return (
      <div className="modalContainer">
        <div className="modal">
        {Array.isArray(resultTexts) ? 
        resultTexts.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <p>{item.text}</p>
          </div>
        ))
        :
        (
        <div>
          <h2>{resultTexts.name}</h2>
          <p>{resultTexts.text}</p>
        </div>
        )}
        </div>
        <button
          className='mobalBtn'
          onClick={handleClick}
        >
          Окей!
        </button>
      </div>
  );
};

export default Modal;
