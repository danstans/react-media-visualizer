import React from 'react'
import PropTypes from 'prop-types'
import VolumeSlider from './VolumeSlider/VolumeSlider'
import SpotifyPlaylist from './AudioPlaylist/SpotifyPlaylist'
import SoundcloudPlaylist from './AudioPlaylist/SoundcloudPlaylist'

const fabStyle = { marginLeft: '15px', cursor: 'pointer' }

const MediaToggles = (props) => {
  const highlightColor = function (conditional) {
    if (props.theme === 'spotify' && conditional) return 'white'
    else if (props.theme === 'soundcloud' && conditional) return '#f50'
    else if (props.theme === 'youtube' && conditional) return 'white'
    else return ''
  }

  const getThemePlaylist = (props) => {
    switch (props.theme) {
      case 'spotify':
        return <SpotifyPlaylist
          styles={props.styles}
          metaPlaylist={props.metaPlaylist}
          currentSongIndex={props.currentSongIndex}
          updateIsPlaying={props.updateIsPlaying}
          playlistIsPlaying={props.playlistIsPlaying}
          selectSongFromPlaylist={props.selectSongFromPlaylist} />
      case 'soundcloud':
        return <SoundcloudPlaylist
          styles={props.styles}
          metaPlaylist={props.metaPlaylist}
          currentSongIndex={props.currentSongIndex}
          updateIsPlaying={props.updateIsPlaying}
          playlistIsPlaying={props.playlistIsPlaying}
          selectSongFromPlaylist={props.selectSongFromPlaylist}
        />
      default:
        return <div />
    }
  }

  return (
    <div className={props.styles.media__toggles}>
      {props.showVolumeBar ? (
        <VolumeSlider theme={props.theme} styles={props.styles} volumeLevel={props.volumeLevel} updateVolumeLevel={props.updateVolumeLevel} />
      ) : null}
      {props.showPlaylistToggle ? (
        <React.Fragment>
          {(props.showPlaylist)
            ? getThemePlaylist(props)
            : null}
          <i className='fa fa-list-ol' style={{ ...fabStyle, ...{ color: highlightColor(props.showPlaylist) } }} onClick={() => props.updateToggles('showPlaylist')} />
        </React.Fragment>
      ) : null}
      {props.showVisualizerToggle ? (
        <i className='fab fa-react' style={{ ...fabStyle, ...{ color: highlightColor(props.showVisualizer) } }} onClick={() => props.updateToggles('showVisualizer')} />
      ) : null}
    </div>
  )
}

MediaToggles.propTypes = {
  showVolumeBar: PropTypes.bool,
  metaPlaylist: PropTypes.array,
  volumeLevel: PropTypes.number,
  currentSongIndex: PropTypes.number,
  updateVolumeLevel: PropTypes.func,
  updateIsPlaying: PropTypes.func,
  showPlaylistToggle: PropTypes.bool,
  showPlaylist: PropTypes.bool,
  updateToggles: PropTypes.func,
  showVisualizerToggle: PropTypes.bool,
  playlistIsPlaying: PropTypes.bool,
  showVisualizer: PropTypes.bool,
  styles: PropTypes.object,
  theme: PropTypes.string,
  selectSongFromPlaylist: PropTypes.func
}

export default MediaToggles
