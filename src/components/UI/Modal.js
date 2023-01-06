import React from 'react';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div>
                {props.children}
            </div>
        </div>
    );
}

const Modal = (props) => {
    const portalElement = document.getElementById('overlays');
    return (
        <Fragment>
            {/* <Backdrop />
            <ModalOverlay>{props.children}</ModalOverlay> */}
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal;
