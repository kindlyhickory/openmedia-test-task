import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './song-input.module.css';
import { inputSlice } from '../../store/reducers/inputSlice';
import { checkMediaLink } from '../../store/actions/media';
import { LINK_REGULAR } from '../../constants/regulars';

function SongInput() {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const { changeValue, toggleFocused } = inputSlice.actions;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { history } = useSelector((state) => state.history);
  const { value, isFocused } = useSelector((state) => state.input);
  const handleChange = (e) => {
    dispatch(changeValue(e.target.value));
  };
  function handleFocus() {
    dispatch(toggleFocused());
  }
  function handleBlur() {
    setTimeout(() => {
      dispatch(toggleFocused());
    }, 150);
  }
  const onSubmit = () => {
    dispatch(checkMediaLink(value));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="audio-form">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={styles.input_label} htmlFor="audio">Insert the link</label>
      <div className={styles.input_container}>
        <input
          autoComplete="off"
          value={value}
          placeholder="https://"
          ref={inputRef}
          {...register('url', {
            onChange: (e) => handleChange(e),
            pattern: {
              value: LINK_REGULAR,
              message: 'Incorrect Link',
            },
          })}
          onBlur={(e) => handleBlur(e)}
          onFocus={(e) => handleFocus(e)}
          id="audio"
          className={`${styles.url_input} ${errors.url && styles.url_input_type_error}`}
        />
        {
            !!history.length && isFocused
            && (
            <ul className={styles.autoCompleteList}>
              {history.map((url, index) => (
                url.includes(value)
                  && (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index} className={styles.autoCompleteListItem}>
                    <button
                      type="button"
                      onClick={() => {
                        handleChange({
                          target: {
                            value: url,
                          },
                        });
                      }}
                      className={styles.autoCompleteListItemText}
                    >
                      {url}
                    </button>
                  </li>
                  )
              )).reverse()}
            </ul>
            )
          }
        {errors.url && <span className={styles.error}>{errors.url.message}</span>}
        <input value="" type="submit" form="audio-form" className={styles.input_submit} />
      </div>
    </form>
  );
}

export default SongInput;
