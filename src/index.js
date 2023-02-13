import React from 'react';
import ReactDOM from 'react-dom/client';
import AudioPlayer from "./components/audio-player/audio-player";

const root = ReactDOM.createRoot(document.getElementById('player-container-react'));
root.render(
    <AudioPlayer/>
);
