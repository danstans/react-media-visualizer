import React from 'react'
import PropTypes from 'prop-types'
import VolumeSlider from './VolumeSlider/VolumeSlider'

const fabStyle = { marginLeft: '15px', cursor: 'pointer' }

const MediaToggles = (props) => {

  const highlightColor = function(conditional) {
    if (props.theme === 'spotify' && conditional) return 'white'
    else if (props.theme === 'soundcloud' && conditional) return '#f50'
    else return ''
  }

  return (
    <div className={props.styles.media__toggles}>
      {props.showVolumeBar ? (
        <VolumeSlider theme={props.theme} styles={props.styles} volumeLevel={props.volumeLevel} updateVolumeLevel={props.updateVolumeLevel} />
      ) : null}
      {props.showPlaylistToggle ? (
        <i className='fa fa-list-ol' style={{...fabStyle, ...{ color: highlightColor(props.showPlaylist) }}} onClick={() => props.updateToggles('showPlaylist')} />
      ) : null}
      {props.showVisualizerToggle ? (
        <i className='fab fa-react' style={{...fabStyle, ...{ color: highlightColor(props.showVisualizer) }}} onClick={() => props.updateToggles('showVisualizer')} />
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
  styles: PropTypes.object,
  theme: PropTypes.string
}

export default MediaToggles
