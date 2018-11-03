import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

const AudioControls = (props) => {
  return (
    <div className={styles.av__playback}>
      <div className={styles.audio__controls}>
        <div className={styles.icons}>
          <i className='fa fa-random' />
          <i onClick={props.goPreviousSong} className='fa fa-step-backward' />
          {props.playlistIsPlaying
            ? (<i onClick={() => props.updateIsPlaying()} className='fa fa-pause-circle fa-2x' />)
            : (<i onClick={() => props.updateIsPlaying()} className='fa fa-play-circle fa-2x' />)}
          <i onClick={props.goNextSong} className='fa fa-step-forward' />
          <i className='fa fa-repeat' />
        </div>
        <div className={styles.progress}>
          <div className={styles.progress__currentTime}>{props.audioControls.songTime}</div>
          <div className={styles.progress__bar}>
            <div className={styles.progress__bar__percent} style={{ 'width': props.audioControls.songPercent * 100 + '%' }} />
            <div onClick={props.updateAudioTime} className={styles.progress__bar__translucent} />
          </div>
          <div className={styles.progress__songDuration}>{props.audioControls.songDuration}</div>
        </div>
      </div>
    </div>
  )
}

export default AudioControls
