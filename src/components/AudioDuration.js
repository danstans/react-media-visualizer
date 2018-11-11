import React from 'react'
import PropTypes from 'prop-types'

const AudioDuration = (props) => {
  return (
    <div className={props.styles.progress__container}>
      <div className={props.styles.progress}>
        <div className={props.styles.progress__currentTime}>{props.audioControls.songTime}</div>
        <div className={props.styles.progress__bar}>
          <div className={props.styles.progress__bar__percent} style={{ 'width': props.audioControls.songPercent * 100 + '%' }} />
          <div onClick={props.updateAudioTime} className={props.styles.progress__bar__translucent} />
        </div>
        <div className={props.styles.progress__songDuration}>{props.audioControls.songDuration}</div>
      </div>
    </div>
  )
}

AudioDuration.propTypes = {
  audioControls: PropTypes.object,
  updateAudioTime: PropTypes.func,
  styles: PropTypes.object
}

export default AudioDuration
