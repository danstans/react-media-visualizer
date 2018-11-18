import React from 'react'
import PropTypes from 'prop-types'
import YoutubePlaylist from './AudioPlaylist/YoutubePlaylist'
// import styles from './styles.scss'

function getThemePlaylist(props) {
  switch (props.theme) {
    case 'youtube':
      return <YoutubePlaylist
        styles={props.styles}
        metaPlaylist={props.metaPlaylist}
        currentSongIndex={props.currentSongIndex}
        updateIsPlaying={props.updateIsPlaying}
        playlistIsPlaying={props.playlistIsPlaying}
        selectSongFromPlaylist={props.selectSongFromPlaylist} />
    default:
      return <div />
  }
}

const AudioPlaylist = (props) => {
  return (
    (props.showPlaylist)
      ? getThemePlaylist(props)
      : null
  )
}

AudioPlaylist.propTypes = {
  metaPlaylist: PropTypes.array,
  showPlaylist: PropTypes.bool,
  styles: PropTypes.object,
  theme: PropTypes.string,
  currentSongIndex: PropTypes.number,
  updateIsPlaying: PropTypes.func,
  playlistIsPlaying: PropTypes.bool,
  selectSongFromPlaylist: PropTypes.func
}

export default AudioPlaylist
