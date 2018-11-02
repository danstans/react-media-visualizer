import React, { Component } from 'react'
import styles from './styles.scss'

class AudioMeta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      metaPlaylist: props.metaPlaylist,
      currentSongIndex: props.currentSongIndex,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.metaPlaylist !== nextProps.metaPlaylist && nextProps.metaPlaylist.length > 0) {
      this.setState({ metaPlaylist: nextProps.metaPlaylist, currentSongIndex: nextProps.currentSongIndex })
    } else if (this.state.currentSongIndex !== nextProps.currentSongIndex && this.state.metaPlaylist) {
      this.setState({ currentSongIndex: nextProps.currentSongIndex })
    }
  }

  render() {
    if (this.state.metaPlaylist) {
      return (
        <div className={styles.meta}>
          <div className={styles.meta__img}>
            <img src={this.state.metaPlaylist[this.state.currentSongIndex].picture} alt={this.state.metaPlaylist[this.state.currentSongIndex].title} />
          </div>
          <div className={styles.meta__tags}>
            <span className={styles.meta__tags__title}>{this.state.metaPlaylist[this.state.currentSongIndex].title}</span>
            <span className={styles.meta__tags__artist}>{this.state.metaPlaylist[this.state.currentSongIndex].artist}</span>
          </div>
        </div>
      )
    } else return <div className={styles.meta}></div>
  }
}

export default AudioMeta