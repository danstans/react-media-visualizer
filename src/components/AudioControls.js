import React from 'react'
import PropTypes from 'prop-types'

const AudioControls = (props) => {
  return (
    <div className={props.styles.av__playback}>
      <div className={props.styles.icons}>
        <i className='fa fa-random' />
        <i onClick={props.goPreviousSong} className='fa fa-step-backward' />
        {props.playlistIsPlaying
          ? (<i onClick={() => props.updateIsPlaying()} className='fa fa-pause-circle fa-2x' />)
          : (<i onClick={() => props.updateIsPlaying()} className='fa fa-play-circle fa-2x' />)}
        <i onClick={props.goNextSong} className='fa fa-step-forward' />
        <i className='fa fa-repeat' />
      </div>
    </div>
  )
}

AudioControls.propTypes = {
  goPreviousSong: PropTypes.func,
  playlistIsPlaying: PropTypes.bool,
  updateIsPlaying: PropTypes.func,
  goNextSong: PropTypes.func,
  styles: PropTypes.object
}

export default AudioControls
