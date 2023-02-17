import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isRequestCheck: false,
  isErrorCheck: false,
  isAudio: false,
  isVideo: false,
  mediaLink: '',
  isPlaying: false,
  currentTime: 0,
  volume: 5,
  isRadio:false,
  readyState: true,
  isMuted: false,
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    toggleIsMuted(state) {
      state.isMuted = !state.isMuted
    },
    setReadyState(state,action) {
      state.readyState = action.payload
    },
    setIsRadio(state, action) {
      state.isRadio = true
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload
    },
    backToInput(state) {
      state.isRequestCheck = false
      state.isErrorCheck = false
      state.mediaLink = ''
      state.isPlaying = false
      state.currentTime = 0
      state.isRadio = false
      state.readyState = true
    },
    checkingMediaRequest(state, action) {
      state.isRequestCheck = true
      state.isErrorCheck = false
      state.mediaLink = ''
    },
    checkingMediaSuccess(state, action) {
      state.isRequestCheck = false
      state.isErrorCheck = false
      state.mediaLink = action.payload;
    },
    checkingMediaError(state, action) {
      state.isErrorCheck = true
      state.isRequestCheck = false
      state.mediaLink = ''
    },
    setIsVideo(state) {
      state.isVideo = true
    },
    setIsAudio(state) {
      state.isAudio = true
    }
    // checkingAudioRequest(state) {
    //   state.isRequestCheck = true
    //   state.isErrorCheck = false
    //   state.audioLink = '';
    // },
    // checkingAudioSuccess(state, action) {
    //   state.isRequestCheck = false
    //   state.isErrorCheck = false
    //   state.audioLink = action.payload;
    // },
    // checkingAudioError(state) {
    //   state.isRequestCheck = false
    //   state.isErrorCheck = true
    //   state.audioLink = '';
    // }
  }
})

export default audioSlice.reducer
