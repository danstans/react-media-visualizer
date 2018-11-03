import React, { Component } from 'react'
import styles from './styles.scss'

const AudioPlaylist = (props) => {
  if (props.metaPlaylist && props.showPlaylist) {
    return (
      <div className={styles.audio__playlist}>
        <span>
          <span className={styles.songNum} />
          <span className={styles.songName}><b>SONG</b></span>
        </span>
        {props.metaPlaylist.map((song, index) => (
          <span key={`playlist-item-${index}`}>
            <span className={styles.songNum}>
              {props.currentSongIndex === index
                ? (props.playlistIsPlaying
                  ? <span onClick={() => props.updateIsPlaying()}><i className='fa fa-pause fa-xs' /></span>
                  : <span onClick={() => props.updateIsPlaying()}><i className='fa fa-play fa-xs' /></span>
                ) : (<span onClick={() => props.selectSongFromPlaylist(index)}>{index + 1}</span>)}
            </span>
            {props.currentSongIndex === index
              ? <span onClick={() => props.updateIsPlaying()} className={styles.songName}>{song.title}</span>
              : <span onClick={() => props.selectSongFromPlaylist(index)} className={styles.songName}>{song.title}</span>}
          </span>
        ))}
      </div>
    )
  } else if (props.showPlaylist) {
    return (
      <div className={styles.audio__playlist}>
        <span>
          <span className={styles.songNum} />
          <span className={styles.songName}><b>No Playlist Selected</b></span>
        </span>
      </div>
    )
  } else return null
}

export default AudioPlaylist
