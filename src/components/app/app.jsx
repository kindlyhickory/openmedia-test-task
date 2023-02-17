import React from 'react';
import AudioPlayer from "../audio-player/audio-player";
import SongInput from "../song-input/song-input";
import {useSelector} from "react-redux";
import Loader from "../Loader/loader";
import Modal from "../modal/modal";

const App = () => {

  const { isRequestCheck, isErrorCheck, audioLink } = useSelector(state => state.audio);

  const { isErrorModalOpened } = useSelector(state => state.errorModal);

  return (<>
      {
        audioLink.length && !isRequestCheck && !isErrorCheck
        ? <AudioPlayer/>
        : !audioLink.length && !isRequestCheck
          ? <SongInput/>
          : <Loader/>
      }
      {isErrorModalOpened && <Modal/>}
  </>

  )
};

export default App;
