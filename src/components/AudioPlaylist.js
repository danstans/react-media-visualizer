import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

class AudioPlaylist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      metaPlaylist: props.metaPlaylist,
      currentSongIndex: props.currentSongIndex
    }
  }

  static propTypes = {
    metaPlaylist: PropTypes.array,
    currentSongIndex: PropTypes.number,
    showPlaylist: PropTypes.bool,
    playlistIsPlaying: PropTypes.bool,
    updateIsPlaying: PropTypes.func,
    selectSongFromPlaylist: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.metaPlaylist !== nextProps.metaPlaylist && nextProps.metaPlaylist.length > 0) {
      this.setState({ metaPlaylist: nextProps.metaPlaylist, currentSongIndex: nextProps.currentSongIndex })
    } else if (this.state.currentSongIndex !== nextProps.currentSongIndex && this.state.metaPlaylist) {
      this.setState({ currentSongIndex: nextProps.currentSongIndex })
    }
  }

  render() {
    if (this.state.metaPlaylist && this.props.showPlaylist) {
      return (
        <div className={styles.audio__playlist}>
          <span>
            <span className={styles.songNum} />
            <span className={styles.songName}><b>SONG</b></span>
          </span>
          {this.state.metaPlaylist.map((song, index) => (
            <span key={`playlist-item-${index}`}>
              <span className={styles.songNum}>
                {this.props.currentSongIndex === index
                  ? (this.props.playlistIsPlaying
                    ? <span onClick={() => this.props.updateIsPlaying()}><i className='fa fa-pause fa-xs' /></span>
                    : <span onClick={() => this.props.updateIsPlaying()}><i className='fa fa-play fa-xs' /></span>
                  ) : (<span onClick={() => this.props.selectSongFromPlaylist(index)}>{index + 1}</span>)}
              </span>
              {this.props.currentSongIndex === index
                ? <span onClick={() => this.props.updateIsPlaying()} className={styles.songName}>{song.title}</span>
                : <span onClick={() => this.props.selectSongFromPlaylist(index)} className={styles.songName}>{song.title}</span>}
            </span>
          ))}
        </div>
      )
    } else if (this.props.showPlaylist) {
      return (
        <div className={styles.audio__playlist}>
          <span>
            <span className={styles.songNum} />
            <span className={styles.songName}><b>SONG</b></span>
          </span>
        </div>
      )
    } else return null
  }
}

export default AudioPlaylist
