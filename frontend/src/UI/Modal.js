import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import Backdrop from './Backdrop';

import './Modal.css';

const ModalOverlay = (props) => {
    const content = (
        <div className = "modal">
            <div className = "modal-header">
                {props.header}
            </div>
            <div className = "modal-content">
                {props.children}
            </div>                
            <div className = "modal-footer">
                {props.footer}
                <button className = "map-close-button btn btn-danger" onClick = {props.onCancel}>x</button>
            </div>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}
const Modal = (props) => {    
    return (
        <React.Fragment>

            {props.show && <Backdrop onClick = {props.onCancel}></Backdrop>}
            <CSSTransition 
                in = {props.show}
                mountOnEnter
                unmountOnExit
                timeout = {200}
                classNames = "modal">
                    <ModalOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;