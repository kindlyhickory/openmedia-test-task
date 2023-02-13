import React, {useState} from 'react';
import styles from "./audio-player.module.css"
import { useForm } from "react-hook-form";

const AudioPlayer = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [value, setValue] = useState('');

  console.log(watch("url"));

  const onSubmit = data => console.log(data);

  // const audio = new Audio("https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="audio-form">
        <label className={styles.input_label} htmlFor="audio">Insert the link</label>
        <div className={styles.input_container}>
          <input
            value={value}
            placeholder="https://"
            {...register("url", {
              onChange: (e) => setValue(e.target.value),
              required: 'Укажите',
              pattern: {
                value: /^https?:\/\/(www\.)?[\w-\\.]+\.[a-z]{2,3}[\w-._~:/?#[\]@!$&'()*+,;=]*#?/,
                message: 'Некорректная ссылка'
              }
            })}
            id="audio"
            className={`${styles.url_input} ${errors.url && styles.url_input_type_error}`}
          />
          {errors.url && <span className={styles.error}>Error message here</span>}
          <input value="" type="submit" form="audio-form" className={styles.input_submit}/>
        </div>
      </form>
    </>
  )
};

export default AudioPlayer;
