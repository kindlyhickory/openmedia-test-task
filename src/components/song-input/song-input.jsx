import React, {useEffect, useRef, useState} from 'react';
import styles from "./song-input.module.css"
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {mediaSlice} from "../../store/reducers/mediaSlice";
import {inputSlice} from "../../store/reducers/inputSlice";
import {checkMediaLink} from "../../store/actions/media";
import {LINK_REGULAR} from "../../constants/regulars";

const SongInput = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const { changeValue, toggleFocused } = inputSlice.actions;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { history } = useSelector(state => state.history);
  const { value, isFocused } = useSelector(state => state.input);
  const handleChange = (e) => {
    dispatch(changeValue(e.target.value));
  }
  function handleFocus(e) {
    dispatch(toggleFocused());
  }
  function handleBlur(e) {
    setTimeout(()=> {
      dispatch(toggleFocused())
    }, 150) ;
  }
  const onSubmit = data => {
    dispatch(checkMediaLink(value));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="audio-form">
        <label className={styles.input_label} htmlFor="audio">Insert the link</label>
        <div className={styles.input_container}>
          <input
            autoComplete="off"
            value={value}
            placeholder="https://"
            ref={inputRef}
            {...register("url", {
              onChange: (e) => handleChange(e),
              required: 'Input is required',
              pattern: {
                value: LINK_REGULAR,
                message: 'Incorrect Link'
              }
            })}
            onBlur={(e) => handleBlur(e)}
            onFocus={(e) => handleFocus(e)}
            id="audio"
            className={`${styles.url_input} ${errors.url && styles.url_input_type_error}`}
          />
          {
            !!history.length && isFocused &&
            <ul className={styles.autoCompleteList}>
              {history.map((url, index) => (
                url.includes(value) &&
                  <li key={index} className={styles.autoCompleteListItem}><p onClick={(e)=>{
                    handleChange({target: {
                      value: url
                      }})
                  }} className={styles.autoCompleteListItemText}>{url}</p></li>
              )).reverse()}
            </ul>
          }
          {errors.url && <span className={styles.error}>{errors.url.message}</span>}
          <input value="" type="submit" form="audio-form" className={styles.input_submit}/>
        </div>
      </form>
    </>
  )
};

export default SongInput;
