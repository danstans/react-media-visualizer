import React from 'react'
import PropTypes from 'prop-types'
import VolumeSlider from './VolumeSlider/VolumeSlider'

const fabStyle = { marginLeft: '15px', cursor: 'pointer' }

const MediaToggles = (props) => {
  return (
    <div className={props.styles.media__toggles}>
      {props.showVolumeBar ? (
        <VolumeSlider styles={props.styles} volumeLevel={props.volumeLevel} updateVolumeLevel={props.updateVolumeLevel} />
      ) : null}
      {props.showPlaylistToggle ? (
        <i className='fa fa-list-ol' style={{...fabStyle, ...{ color: props.showPlaylist ? 'white' : '' }}} onClick={() => props.updateToggles('showPlaylist')} />
      ) : null}
      {props.showVisualizerToggle ? (
        <i className='fab fa-react' style={{...fabStyle, ...{ color: props.showVisualizer ? 'white' : '' }}} onClick={() => props.updateToggles('showVisualizer')} />
      ) : null}
    </div>
  )
}

MediaToggles.propTypes = {
  showVolumeBar: PropTypes.bool,
  volumeLevel: PropTypes.number,
  updateVolumeLevel: PropTypes.func,
  showPlaylistToggle: PropTypes.bool,
  showPlaylist: PropTypes.bool,
  updateToggles: PropTypes.func,
  showVisualizerToggle: PropTypes.bool,
  showVisualizer: PropTypes.bool,
  styles: PropTypes.object
}

export default MediaToggles
