import React, { Component } from 'react'
import styles from './styles.scss'
import PropTypes from 'prop-types'
import VolumeSlider from './VolumeSlider/VolumeSlider'

const fabStyle = { marginLeft: '15px', cursor: 'pointer' }

class MediaToggles extends Component {
  static propTypes = {
    showVolumeBar: PropTypes.bool,
    showPlaylistToggle: PropTypes.bool,
    showPlaylist: PropTypes.bool,
    showVisualizerToggle: PropTypes.bool,
    showVisualizer: PropTypes.bool,
    volumeLevel: PropTypes.number,
    updateVolumeLevel: PropTypes.func,
    updateToggles: PropTypes.func
  }

  render() {
    return (
      <div className={styles.media__toggles}>
        {this.props.showVolumeBar ? (
          <VolumeSlider volumeLevel={this.props.volumeLevel} updateVolumeLevel={this.props.updateVolumeLevel} />
        ) : null}
        {this.props.showPlaylistToggle ? (
          <i className='fa fa-list-ol' style={{...fabStyle, ...{ color: this.props.showPlaylist ? 'white' : '' }}} onClick={() => this.props.updateToggles('showPlaylist')} />
        ) : null}
        {this.props.showVisualizerToggle ? (
          <i className='fab fa-react' style={{...fabStyle, ...{ color: this.props.showVisualizer ? 'white' : '' }}} onClick={() => this.props.updateToggles('showVisualizer')} />
        ) : null}
      </div>
    )
  }
}

export default MediaToggles
