import React, { Component } from 'react'
import styles from './styles.scss'
import PropTypes from 'prop-types'
import VolumeSlider from './VolumeSlider/VolumeSlider'

const fabStyle = { marginLeft: '15px', cursor: 'pointer' }

const MediaToggles = (props) => {
  return (
    <div className={styles.media__toggles}>
      {props.showVolumeBar ? (
        <VolumeSlider volumeLevel={props.volumeLevel} updateVolumeLevel={props.updateVolumeLevel} />
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

export default MediaToggles
