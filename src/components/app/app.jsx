import React from 'react';
import AudioPlayer from "../audio-player/audio-player";
import SongInput from "../song-input/song-input";
import {useSelector} from "react-redux";
import Loader from "../Loader/loader";
import Modal from "../modal/modal";

const App = () => {

  const { isRequestCheck, isErrorCheck, mediaLink } = useSelector(state => state.audio);

  const { isErrorModalOpened } = useSelector(state => state.errorModal);

  return (<>
      {
        mediaLink.length && !isRequestCheck && !isErrorCheck
        ? <AudioPlayer/>
        : !mediaLink.length && !isRequestCheck
          ? <SongInput/>
          : <Loader/>
      }
      {isErrorModalOpened && <Modal/>}
  </>

  )
};

export default App;
