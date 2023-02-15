
import {audioSlice} from "../reducers/audioSlice";
import axios from "axios";
import {modalSlice} from "../reducers/modalSlice";

export const checkAudioLink = (value) => dispatch => {
  dispatch(audioSlice.actions.checkingAudioRequest());
  fetch(value)
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        dispatch(audioSlice.actions.checkingAudioSuccess(value));
      } else {
        return Promise.reject({message: 'Invalid audio-link'})
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(audioSlice.actions.checkingAudioError())
      dispatch(modalSlice.actions.showModal(err.message));
    })
}
