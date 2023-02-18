import { mediaSlice } from '../reducers/mediaSlice';
import { modalSlice } from '../reducers/modalSlice';
import { historySlice } from '../reducers/historySlice';

export const checkMediaLink = (value) => (dispatch) => {
  dispatch(mediaSlice.actions.checkingMediaRequest());
  fetch(value)
    // eslint-disable-next-line consistent-return
    .then((res) => {
      if (res.ok) {
        if (res.headers.get('Content-type').startsWith('audio')) {
          dispatch(mediaSlice.actions.checkingMediaSuccess(value));
          dispatch(mediaSlice.actions.setIsAudio());
        } else if (res.headers.get('Content-type').startsWith('video')) {
          dispatch(mediaSlice.actions.checkingMediaSuccess(value));
          dispatch(mediaSlice.actions.setIsVideo());
        } else {
          return Promise.reject(new Error('Invalid audio-link'));
        }
        dispatch(historySlice.actions.addToHistory(value));
      } else {
        return Promise.reject(new Error('Invalid audio-link'));
      }
    })
    .catch(() => {
      dispatch(mediaSlice.actions.checkingMediaError());
      dispatch(modalSlice.actions.showModal('Blocked by CORS or Invalid link'));
    });
};
