import React, { Component } from 'react'
import styles from './styles.scss'

const AudioMeta = (props) => {
  if (props.metaPlaylist && Number.isInteger(props.currentSongIndex) && props.metaPlaylist[props.currentSongIndex]) {
    return (
      <div className={styles.meta}>
        <div className={styles.meta__img}>
          <img src={props.metaPlaylist[props.currentSongIndex].picture} alt={props.metaPlaylist[props.currentSongIndex].title} />
        </div>
        <div className={styles.meta__tags}>
          <span className={styles.meta__tags__title}>{props.metaPlaylist[props.currentSongIndex].title}</span>
          <span className={styles.meta__tags__artist}>{props.metaPlaylist[props.currentSongIndex].artist}</span>
        </div>
      </div>
    )
  } else return <div className={styles.meta} />
}

export default AudioMeta
