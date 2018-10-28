import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

class AudioControls extends Component {
  static propTypes = {
    songIsPlaying: PropTypes.bool,
    updateIsPlaying: PropTypes.func,
    goPreviousSong: PropTypes.func,
    goNextSong: PropTypes.func,
    updateAudioTime: PropTypes.func,
    audioControls: PropTypes.object
  }

  static defaultProps = {
    songIsPlaying: false,
    updateIsPlaying: null,
    goPreviousSong: null,
    goNextSong: null,
    updateAudioTime: null,
    audioControls: null
  }

  render () {
    return (
      <div className={styles.av__playback}>
        <div className={styles.audio__controls}>
          <div className={styles.icons}>
            <i className="fa fa-random" />
            <i onClick={this.props.goPreviousSong} className="fa fa-step-backward" />
            {this.props.songIsPlaying
              ? (<i onClick={() => this.props.updateIsPlaying()} className="fa fa-pause-circle fa-2x" />)
              : (<i onClick={() => this.props.updateIsPlaying()} className="fa fa-play-circle fa-2x" />)}
            <i onClick={this.props.goNextSong} className="fa fa-step-forward" />
            <i className="fa fa-repeat" />
          </div>
          <div className={styles.progress}>
            <div className={styles.progress__currentTime}>{this.props.audioControls.songTime}</div>
            <div className={styles.progress__bar}>
              <div className={styles.progress__bar__percent} style={{'width': this.props.audioControls.songPercent * 100 + '%'}} />
              <div onClick={this.props.updateAudioTime} className={styles.progress__bar__translucent} />
            </div>
            <div className={styles.progress__songDuration}>{this.props.audioControls.songDuration}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioControls
