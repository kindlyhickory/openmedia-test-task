import React, {useState} from 'react';
import styles from "./song-input.module.css"
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {audioSlice} from "../../store/reducers/audioSlice";
import {inputSlice} from "../../store/reducers/inputSlice";
import {checkAudioLink} from "../../store/actions/audio";
import {LINK_REGULAR} from "../../constants/regulars";

const SongInput = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  console.log(errors)

  const {changeValue} = inputSlice.actions;
  const handleChange = (e) => {
    dispatch(changeValue(e.target.value));
  }
  const { value } = useSelector(state => state.input);
  const onSubmit = data => {
    console.log(data)
    dispatch(checkAudioLink(value));
  };

  // const audio = new Audio("https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals");

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id="audio-form">
        <label className={styles.input_label} htmlFor="audio">Insert the link</label>
        <div className={styles.input_container}>
          <input
            value={value}
            placeholder="https://"
            {...register("url", {
              onChange: (e) => handleChange(e),
              required: 'Input is required',
              pattern: {
                value: LINK_REGULAR,
                message: 'Incorrect Link'
              }
            })}
            id="audio"
            className={`${styles.url_input} ${errors.url && styles.url_input_type_error}`}
          />
          {errors.url && <span className={styles.error}>{errors.url.message}</span>}
          <input value="" type="submit" form="audio-form" className={styles.input_submit}/>
        </div>
      </form>
    </>
  )
};

export default SongInput;
