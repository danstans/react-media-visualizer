import React from 'react'
import PropTypes from 'prop-types'

class AudioDuration extends React.Component {
  constructor() {
    super()
    this.state = {
      height: ''
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
    this.conditionalStyle = this.conditionalStyle.bind(this)
  }

  mouseEnter() {
    if (this.props.theme === 'youtube') this.setState({ height: '6px' })
  }

  mouseLeave() {
    if (this.props.theme === 'youtube') this.setState({ height: '' })
  }

  render() {
    return (
      <div className={this.props.styles.progress__container} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div className={this.props.styles.progress} style={this.state} >
          {(this.props.theme === 'spotify' || this.props.theme === 'soundcloud') &&
          <div className={this.props.styles.progress__currentTime}>{this.props.audioControls.songTime}</div>}
          <div className={this.props.styles.progress__bar}>
            <div className={this.props.styles.progress__bar__percent} style={{ 'width': this.props.audioControls.songPercent * 100 + '%' }} />
            <div onClick={this.props.updateAudioTime} className={this.props.styles.progress__bar__translucent} />
          </div>
          {(this.props.theme === 'spotify' || this.props.theme === 'soundcloud') &&
          <div className={this.props.styles.progress__songDuration}>{this.props.audioControls.songDuration}</div>}
        </div>
      </div>
    )
  }

  conditionalStyle() {
    console.log(this.state.hoverProgress)
    return this.state.hoverProgress ? '5px' : null
  }
}

AudioDuration.propTypes = {
  audioControls: PropTypes.object,
  updateAudioTime: PropTypes.func,
  styles: PropTypes.object,
  theme: PropTypes.string
}

export default AudioDuration
