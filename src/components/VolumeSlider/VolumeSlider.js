import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'

const style = { width: '80%', margin: '7%' }
const soundcloudStyle = { height: '80%' }

class VolumeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverVolume: false
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  mouseEnter() {
    this.setState({ hoverVolume: true })
  }

  mouseLeave() {
    this.setState({ hoverVolume: false })
  }

  render() {
    return (
      <div className={this.props.styles.volume__slider} onMouseLeave={this.mouseLeave}>
        {this.props.theme === 'spotify'
          ? this.state.hoverVolume && (
            <React.Fragment>
              <i className='fa fa-volume-off' />
              <Slider min={0} max={100} defaultValue={this.props.volumeLevel} onChange={this.props.updateVolumeLevel} style={style} />
            </React.Fragment>)
          : null}
        {this.props.theme === 'soundcloud'
          ? this.state.hoverVolume && (
            <div className={this.props.styles.slider__background}>
              <Slider vertical min={0} max={100} trackStyle={{ backgroundColor: '#f50', height: 10 }} handleStyle={{borderColor: '#f50', backgroundColor: '#f50'}} railStyle={{ backgroundColor: '#ccc'}} defaultValue={this.props.volumeLevel} onChange={this.props.updateVolumeLevel} style={soundcloudStyle} />
            </div>
          ): null
        }
        <i className='fa fa-volume-up' onMouseEnter={this.mouseEnter} />
      </div>
    )
  }
}

VolumeSlider.propTypes = {
  volumeLevel: PropTypes.number,
  updateVolumeLevel: PropTypes.func,
  styles: PropTypes.object
}

export default VolumeSlider
