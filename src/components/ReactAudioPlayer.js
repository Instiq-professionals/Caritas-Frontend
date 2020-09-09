import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = () => {
  return (
    <>
   <ReactAudioPlayer
     src="/assets/audio/DJ-Neptune-Ft.-Joeboy-Mr-Eazi-Nobody.mp3"
     autoPlay
     controls
   />
    </>
  )
}

export default AudioPlayer
