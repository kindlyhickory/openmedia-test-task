import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './media-player.module.css';
import play from '../../images/play.svg';
import pause from '../../images/pause.svg';
import { mediaSlice } from '../../store/reducers/mediaSlice';
import Loader from '../Loader/loader';

function MediaPlayer() {
  const dispatch = useDispatch();
  const {
    backToInput, setIsPlaying, setCurrentTime, setVolume, setIsRadio, setReadyState, toggleIsMuted,
  } = mediaSlice.actions;
  const {
    mediaLink, isPlaying, currentTime, volume, isRadio, readyState, isMuted, isVideo,
  } = useSelector((state) => state.media);

  const mediaPlayer = useRef();
  const progressBar = useRef(null);
  const animationRef = useRef(null);
  const volumeBar = useRef(null);
  const backButtonRef = useRef(null);
  const playButtonRef = useRef(null);

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${(progressBar.current.value / Math.floor(mediaPlayer.current.duration)) * 100}%`);
    if (Number.isFinite(mediaPlayer.current.duration)) {
      dispatch(setCurrentTime(progressBar.current.value));
    } else {
      dispatch(setCurrentTime(mediaPlayer.current.currentTime));
    }
  };

  const changeVolumeCurrentValue = (value = volume) => {
    volumeBar.current.style.setProperty('--seek-before-volume-width', `${value}%`);
  };

  const whilePlaying = () => {
    if (mediaPlayer.current.readyState === 0 || mediaPlayer.current.readyState === 1) {
      dispatch(setReadyState(false));
    } else {
      dispatch(setReadyState(true));
    }
    if (Number.isFinite(mediaPlayer.current.duration)) {
      progressBar.current.value = mediaPlayer.current.currentTime;
    } else {
      progressBar.current.value = 0;
    }
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };
  const changeVolume = ({ target }) => {
    mediaPlayer.current.volume = target.value / 100;
    dispatch(setVolume(target.value));
    changeVolumeCurrentValue(target.value);
  };

  const changeVolumeFromKeyboard = (value) => {
    dispatch(setVolume(Number(volumeBar.current.value) + value));
    volumeBar.current.value = Number(volumeBar.current.value) + value;
    mediaPlayer.current.volume = volumeBar.current.value / 100;
    changeVolumeCurrentValue(Number(volumeBar.current.value));
  };

  const changeTime = (value) => {
    mediaPlayer.current.currentTime += value;
    progressBar.current.value = mediaPlayer.current.currentTime;
    changePlayerCurrentTime();
  };

  const changeRange = () => {
    mediaPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };
  const setPlayer = () => {
    const seconds = Math.floor(mediaPlayer.current.duration);
    if (!Number.isFinite(mediaPlayer.current.duration)) {
      dispatch(setIsRadio());
    }
    progressBar.current.max = seconds;
    progressBar.current.style.setProperty('--seek-before-width', `${(progressBar.current.value / Math.floor(mediaPlayer.current.duration)) * 100}%`);
    changeVolumeCurrentValue();
    changeVolume({ target: volumeBar.current });
  };

  function keyDownHandler(e) {
    if (e.code === 'KeyP') {
      playButtonRef.current.click();
    } else if (e.code === 'KeyB') {
      backButtonRef.current.click();
    } else if (e.code === 'Equal' || e.code === 'NumpadAdd') {
      changeVolumeFromKeyboard(10);
    } else if (e.code === 'Minus' || e.code === 'NumpadSubtract') {
      changeVolumeFromKeyboard(-10);
    } else if (e.code === 'KeyM') {
      dispatch(toggleIsMuted());
    } else if (e.code === 'ArrowRight') {
      changeTime(10);
    } else if (e.code === 'ArrowLeft') {
      changeTime(-10);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    dispatch(setIsPlaying(!isPlaying));
    if (!prevValue) {
      mediaPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      mediaPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <div className={styles.mediaPlayerContainer}>
      <button
        type="button"
        ref={backButtonRef}
        className={styles.backButton}
        onClick={() => {
          if (isPlaying) {
            playButtonRef.current.click();
          }
          dispatch(backToInput());
        }}
      >
        ← Back
      </button>
      <div className={styles.mediaPlayer}>
        {isVideo
          ? (
            <video
              className={styles.video}
              onLoadedMetadata={setPlayer}
              onEnded={() => isPlaying && playButtonRef.current.click()}
              src={mediaLink}
              muted={isMuted}
              ref={mediaPlayer}
              preload="metadata"
            >
              <track kind="captions" src={mediaLink} />
            </video>
          )
          : (
            <audio
              onLoadedMetadata={setPlayer}
              onEnded={() => isPlaying && playButtonRef.current.click()}
              src={mediaLink}
              muted={isMuted}
              ref={mediaPlayer}
              preload="metadata"
            >
              <track src={mediaLink} kind="captions" />
            </audio>
          )}
        <div className={styles.mediaPlayerControls}>
          <div className={styles.playAndLoadContainer}>
            <input aria-label="play-button" ref={playButtonRef} type="image" src={isPlaying ? pause : play} onClick={togglePlayPause} className={styles.playPause} />
            {!readyState && <Loader />}
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

    </div>

  );
}

export default MediaPlayer;
