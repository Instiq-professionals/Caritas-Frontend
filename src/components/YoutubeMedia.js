import React from 'react'
import ReactPlayer from 'react-player/lazy'
 
// Lazy load the YouTube player



const YouTubeMedia = (props) => {
  return (
    <div
    style={{
      width: "100%",
      height: "336px",
      backgoundSize: "cover",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
      position: "relative",
    }}
  >
  {props.video?<ReactPlayer 
  url={props.video} 
  width='100%'
  height='100%'
  />:
  <div 
  style={{
    margin:"10%"
  }}
  >
      <img src="/assets/images/video.png"/>
      <div>Add youtube link</div>
 </div>}
  </div>
  )
}

export default YouTubeMedia
