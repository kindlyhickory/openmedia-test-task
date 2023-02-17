
import {audioSlice} from "../reducers/audioSlice";
import {modalSlice} from "../reducers/modalSlice";

export const checkAudioLink = (value) => dispatch => {
  dispatch(audioSlice.actions.checkingMediaRequest());
  fetch(value)
    .then(res => {
      console.log(res);
      if (res.ok) {
        if (res.headers.get('Content-type').startsWith('audio')) {
          dispatch(audioSlice.actions.checkingMediaSuccess(value));
          dispatch(audioSlice.actions.setIsAudio())
        } else if (res.headers.get('Content-type').startsWith('video')) {
          dispatch(audioSlice.actions.checkingMediaSuccess(value))
          dispatch(audioSlice.actions.setIsVideo())
        }

      } else {
        return Promise.reject({message: 'Invalid audio-link'})
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(audioSlice.actions.checkingMediaError())
      dispatch(modalSlice.actions.showModal('Invalidl ink'));
    })
}
