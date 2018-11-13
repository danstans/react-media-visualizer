import React from 'react'
import PropTypes from 'prop-types'

const AudioMeta = (props) => {
  if (props.metaPlaylist && Number.isInteger(props.currentSongIndex) && props.metaPlaylist[props.currentSongIndex]) {
    return (
      <div className={props.styles.meta}>
        <div className={props.styles.meta__img}>
          <img src={props.metaPlaylist[props.currentSongIndex].picture} alt={props.metaPlaylist[props.currentSongIndex].title} />
        </div>
        <div className={props.styles.meta__tags}>
          <span className={props.styles.meta__tags__title}>{props.metaPlaylist[props.currentSongIndex].title}</span>
          <span className={props.styles.meta__tags__artist}>
            {(props.theme === 'spotify' || props.theme === 'soundcloud') && <span>{props.metaPlaylist[props.currentSongIndex].artist} </span>}
            {(props.theme === 'youtube') && <span>
              {props.metaPlaylist[props.currentSongIndex].artist} • {props.metaPlaylist[props.currentSongIndex].album} • {props.metaPlaylist[props.currentSongIndex].year}
            </span>}
          </span>
        </div>
      </div>
    )
  } else return <div className={props.styles.meta} />
}

AudioMeta.propTypes = {
  metaPlaylist: PropTypes.array,
  currentSongIndex: PropTypes.number,
  styles: PropTypes.object
}

export default AudioMeta
