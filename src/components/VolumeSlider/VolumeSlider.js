import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'

const style = { width: '80%', margin: '7%' }

class VolumeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverVolume: false
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  static propTypes = {
    volumeLevel: PropTypes.number,
    updateVolumeLevel: PropTypes.func
  }

  mouseEnter() {
    this.setState({ hoverVolume: true })
  }

  mouseLeave() {
    this.setState({ hoverVolume: false })
  }

  render() {
    return (
      <div className={styles.volume__slider} onMouseLeave={this.mouseLeave}>
        {this.state.hoverVolume && (
          <React.Fragment>
            <i className='fa fa-volume-off' />
            <Slider min={0} max={100} defaultValue={this.props.volumeLevel} onChange={this.props.updateVolumeLevel} style={style} />
          </React.Fragment>
        )
        }
        <i className='fa fa-volume-up' onMouseEnter={this.mouseEnter} />
      </div>
    )
  }
}

export default VolumeSlider
