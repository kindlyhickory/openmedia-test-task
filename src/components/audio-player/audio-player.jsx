import React, { useState, useRef, useEffect } from 'react'
import styles from "./audio-player.module.css";
import play from "../../images/play.svg"
import pause from "../../images/pause.svg"
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import {useDispatch, useSelector} from "react-redux";
import {audioSlice} from "../../store/reducers/audioSlice";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const dispatch = useDispatch();

  const { backToInput } = audioSlice.actions;

  const { audioLink } = useSelector(state => state.audio);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const volumeBar= useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    progressBar.current.max = seconds;
    changeVolume();
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / Math.floor(audioPlayer.current.duration) * 100}%`)
    changeVolumeCurrentValue();
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }
  const whilePlaying = () => {
    if (isFinite(audioPlayer.current.duration)) {
      progressBar.current.value = audioPlayer.current.currentTime;
    } else {
      progressBar.current.value = 0;
    }
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }
  const changeVolume = () => {
    audioPlayer.current.volume = volumeBar.current.value/100;
    changeVolumeCurrentValue()
  }


  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / Math.floor(audioPlayer.current.duration) * 100}%`)
    if (isFinite(audioPlayer.current.duration)) {
      setCurrentTime(progressBar.current.value);
    } else {
      setCurrentTime(audioPlayer.current.currentTime);
    }
  }

  const changeVolumeCurrentValue = () => {
    volumeBar.current.style.setProperty('--seek-before-volume-width', `${volumeBar.current.value}%`)
  }

  return (
    <div className={styles.audioPlayerContainer}>
      <span className={styles.backButton} onClick={() => dispatch(backToInput())}>← Back</span>
      <div className={styles.audioPlayer}>
        <audio ref={audioPlayer} src={audioLink} preload="metadata"></audio>
        <input type="image" src={isPlaying ? pause : play} onClick={togglePlayPause} className={styles.playPause}>
        </input>
        <div className={styles.progressBarContainer}>
          <input type="range" className={styles.progressBar} defaultValue="0" min="0" ref={progressBar} onChange={changeRange} />
        </div>
        <div className={styles.durationVolumeContainer}>
          <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
          <div className={styles.volumeBarContainer}>
            <input type="range" className={styles.volumeBar} defaultValue="10" min="0" max="100" ref={volumeBar} onChange={changeVolume} />
          </div>
        </div>
      </div>
  </div>

  )
}

export default AudioPlayer
