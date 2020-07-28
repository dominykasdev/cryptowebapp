import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ title, content, actions, onDismiss, visible }) => {
    return (
        <div className={`modalContainer ${visible ? 'visible' : ''}`} onClick={onDismiss}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modalTitle">{title}</div>
                <div className="modalContent">{content}</div>
                <div className="modalActions">{actions}</div>
            </div>
        </div>
    );
}


export default Modal;