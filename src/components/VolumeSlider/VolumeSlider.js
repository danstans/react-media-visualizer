import React, { Component } from 'react'
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
  }

  mouseEnter() {
    this.setState({ hoverVolume: true })
  }

  mouseLeave() {
    this.setState({ hoverVolume: false })
  }

  log(value) {
    console.log(value)
  }

  render() {
    return (
      <div className={styles.volume__slider} onMouseLeave={this.mouseLeave.bind(this)}>
        {this.state.hoverVolume && (
          <React.Fragment>
            <i className="fa fa-volume-off"></i>
            <Slider min={0} max={100} defaultValue={this.props.volumeLevel} onChange={this.props.updateVolumeLevel} style={style} />
          </React.Fragment>
        )
        }
        <i className="fa fa-volume-up" onMouseEnter={this.mouseEnter.bind(this)} />
      </div>
    )
  }
}

export default VolumeSlider