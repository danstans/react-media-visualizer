import React from 'react'
import PropTypes from 'prop-types'

const AudioControls = (props) => {
  return (
    <div className={props.styles.av__playback}>
      <div className={props.styles.icons}>
        {props.theme === 'spotify' && <i className='fa fa-random' />}
        <i onClick={props.goPreviousSong} className='fa fa-step-backward' />
        {props.theme === 'spotify'
          ? (props.playlistIsPlaying 
            ? (<i onClick={() => props.updateIsPlaying()} className='fa fa-pause-circle fa-2x' />)
            : (<i onClick={() => props.updateIsPlaying()} className='fa fa-play-circle fa-2x' />))
          : null}
        {props.theme === 'soundcloud'
          ? (props.playlistIsPlaying 
            ? (<i onClick={() => props.updateIsPlaying()} className='fa fa-pause' />)
            : (<i onClick={() => props.updateIsPlaying()} className='fa fa-play' />))
          : null}
        <i onClick={props.goNextSong} className='fa fa-step-forward' />
        {props.theme === 'spotify' && <i className='fa fa-redo' />}
        {props.theme === 'soundcloud' &&
        <React.Fragment>
          <i className='fa fa-random' /><i className="fa fa-redo" />
        </React.Fragment>}
      </div>
    </div>
  )
}

AudioControls.propTypes = {
  goPreviousSong: PropTypes.func,
  playlistIsPlaying: PropTypes.bool,
  updateIsPlaying: PropTypes.func,
  goNextSong: PropTypes.func,
  styles: PropTypes.object,
  theme: PropTypes.string
}

export default AudioControls
