import React from 'react';
import MediaPlayer from "../media-player/media-player";
import SongInput from "../song-input/song-input";
import {useSelector} from "react-redux";
import Loader from "../Loader/loader";
import Modal from "../modal/modal";

const App = () => {

  const { isRequestCheck, isErrorCheck, mediaLink } = useSelector(state => state.media);

  const { isErrorModalOpened } = useSelector(state => state.errorModal);

  return (<>
      {
        mediaLink.length && !isRequestCheck && !isErrorCheck
        ? <MediaPlayer/>
        : !mediaLink.length && !isRequestCheck
          ? <SongInput/>
          : <Loader/>
      }
      {isErrorModalOpened && <Modal/>}
  </>

  )
};

export default App;
