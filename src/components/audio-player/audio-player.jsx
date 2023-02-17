import React, { useState, useRef, useEffect } from 'react'
import styles from "./audio-player.module.css";
import play from "../../images/play.svg"
import pause from "../../images/pause.svg"
import {useDispatch, useSelector} from "react-redux";
import {audioSlice} from "../../store/reducers/audioSlice";
import Loader from "../Loader/loader";
import {set} from "react-hook-form";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const { backToInput, setIsPlaying, setCurrentTime, setVolume, setIsRadio,  setReadyState, toggleIsMuted} = audioSlice.actions;
  const { audioLink, isPlaying, currentTime, volume, isRadio, readyState, isMuted } = useSelector(state => state.audio);

  const audioPlayer = useRef();
  const progressBar = useRef(null);
  const animationRef = useRef(null);
  const volumeBar= useRef(null);
  const backButtonRef = useRef(null);
  const playButtonRef = useRef(null);

  const setPlayer = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    console.log(seconds);
    if (!isFinite(audioPlayer.current.duration)) {
      dispatch(setIsRadio());
    }
    progressBar.current.max = seconds;
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / Math.floor(audioPlayer.current.duration) * 100}%`)
    changeVolumeCurrentValue();
    changeVolume({target: volumeBar.current});
  }

  // useEffect(() => {
  //   const seconds = Math.floor(audioPlayer.current.duration);
  //   console.log(seconds);
  //   progressBar.current.max = seconds;
  //   progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / Math.floor(audioPlayer.current.duration) * 100}%`)
  //   changeVolumeCurrentValue();
  //   changeVolume({target: volumeBar.current});
  // }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState, audioPlayer?.current?.src]);

  function keyDownHandler (e) {
    if (e.code === "KeyP") {
      playButtonRef.current.click();
    } else if (e.code === 'KeyB') {
      backButtonRef.current.click();
    } else if (e.code === 'Equal' || e.code === 'NumpadAdd') {
      changeVolumeFromKeyboard(10)
    } else if (e.code === 'Minus' || e.code === 'NumpadSubtract') {
      changeVolumeFromKeyboard(-10)
    } else if (e.code === 'KeyM') {
      dispatch(toggleIsMuted())
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
  },[])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    dispatch(setIsPlaying(!isPlaying));
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }
  const whilePlaying = () => {
    if (audioPlayer.current.readyState === 0 || audioPlayer.current.readyState === 1) {
      dispatch(setReadyState(false));
    } else {
      dispatch(setReadyState(true));
    }
    if (isFinite(audioPlayer.current.duration)) {
      progressBar.current.value = audioPlayer.current.currentTime;
    } else {
      progressBar.current.value = 0;
    }
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }
  const changeVolume = ({target}) => {
    dispatch(setVolume(target.value))
    audioPlayer.current.volume = target.value/100;
    changeVolumeCurrentValue()
  }

  const changeVolumeFromKeyboard = (value) => {
    dispatch(setVolume(Number(volumeBar.current.value) + value));
    volumeBar.current.value = Number(volumeBar.current.value) + value;
    audioPlayer.current.volume = volumeBar.current.value/100;
    changeVolumeCurrentValue(Number(volumeBar.current.value) );
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / Math.floor(audioPlayer.current.duration) * 100}%`)
    if (isFinite(audioPlayer.current.duration)) {
      dispatch(setCurrentTime(progressBar.current.value))
    } else {
      dispatch(setCurrentTime(audioPlayer.current.currentTime))
    }
  }

  const changeVolumeCurrentValue = (value = volume) => {
    volumeBar.current.style.setProperty('--seek-before-volume-width', `${value}%`)
  }

  return (
    <div className={styles.audioPlayerContainer}>

      <button ref={backButtonRef} className={styles.backButton} onClick={() => {
        if (isPlaying) {
          playButtonRef.current.click()
        }
        dispatch(backToInput())
      }}>← Back</button>
      <div className={styles.audioPlayer}>
        <audio onLoadedMetadata={setPlayer} onEnded={()=>{isPlaying && playButtonRef.current.click() }} src={audioLink} muted={isMuted} ref={audioPlayer} preload="metadata"></audio>
        <div className={styles.playAndLoadContainer}>
          <input ref={playButtonRef} type="image" src={isPlaying ? pause : play} onClick={togglePlayPause} className={styles.playPause}>
          </input>
          {!readyState && <Loader/>}
        </div>
        <div className={styles.progressBarContainer}>
          <span className={styles.radioLabel}>{isRadio ? 'radio' : ''}</span>
          <input disabled={isRadio} type="range" className={styles.progressBar} defaultValue="0" min="0" ref={progressBar} onChange={changeRange} />
        </div>
        <div className={styles.durationVolumeContainer}>
          <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
          <div className={styles.volumeBarContainer}>
            <span className={styles.mutedLabel}>{isMuted ? 'muted' : ''}</span>
            <input type="range" className={styles.volumeBar} value={volume} min="0" max="100" ref={volumeBar} onChange={changeVolume} />
          </div>
        </div>
      </div>
  </div>

  )
}

export default AudioPlayer
