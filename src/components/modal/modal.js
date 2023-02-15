import React from 'react';
import ReactDOM from "react-dom";
import styles from './modal.module.css'
import closeButton from '../../images/close_button.svg'
import {useDispatch, useSelector} from "react-redux";
import {modalSlice} from "../../store/reducers/modalSlice";

const Modal = () => {

  const { errorMessage } = useSelector(state => state.errorModal);
  const dispatch = useDispatch()

  const { hideModal } = modalSlice.actions;

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.attention}></div>
      <div className={styles.textContainer}>
        <span className={styles.warning}>Warning</span>
        <span className={styles.errorText}>{errorMessage}</span>
      </div>
      <button onClick={()=> dispatch(hideModal())} className={styles.closeButton}>
        <img src={closeButton}/>
      </button>
    </div>,
    document.getElementById("modals")
  )
};

export default Modal;
