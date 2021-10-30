import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import { Dialog, Transition } from '@headlessui/react'
import Backdrop from './Backdrop';

import './Prompt.css';

const ModalOverlay = (props) => {
    const content = (
        <div className = "modal">
            <div className = "modal-header">
                Warning
            </div>
            <div className = "modal-content">
                {props.header}
                <div className = "modal-actions">
                    {props.children}
                </div>  
            </div>
                          
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}
const Prompt = (props) => {    
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

export default Prompt;