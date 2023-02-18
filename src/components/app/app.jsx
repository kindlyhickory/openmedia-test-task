import React from 'react';
import { useSelector } from 'react-redux';
import MediaPlayer from '../media-player/media-player';
import SongInput from '../song-input/song-input';
import Loader from '../Loader/loader';
import Modal from '../modal/modal';

function App() {
  const { isRequestCheck, isErrorCheck, mediaLink } = useSelector((state) => state.media);

  const { isErrorModalOpened } = useSelector((state) => state.errorModal);

  return (
    <>
      {
        // eslint-disable-next-line no-nested-ternary
        mediaLink.length && !isRequestCheck && !isErrorCheck
          ? <MediaPlayer />
          : !mediaLink.length && !isRequestCheck
            ? <SongInput />
            : <Loader />
      }
      {isErrorModalOpened && <Modal />}
    </>

  );
}

export default App;
