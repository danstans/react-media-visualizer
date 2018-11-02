import React, { Component } from 'react'

import ReactMediaVisualizer from 'react-media-visualizer'
import Main from './components/Main'
import Navbar from './components/Navbar'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      playlistIsPlaying: false,
      currentSongIndex: 0
    }
    this.updatePlaylist = this.updatePlaylist.bind(this)
    this.receiveStateUpdates = this.receiveStateUpdates.bind(this)
  }

  render() {
    return (
      <React.Fragment>
        <div className="content">
          <Navbar />
          <Main
            updatePlaylist={this.updatePlaylist}
            currentSongIndex={this.state.currentSongIndex}
            playlist={this.state.playlist}
            playlistIsPlaying={this.state.playlistIsPlaying} />
        </div>
        <ReactMediaVisualizer
          playlist={this.state.playlist}
          receiveStateUpdates={this.receiveStateUpdates}
          playlistIsPlaying={this.state.playlistIsPlaying}
          currentSongIndex={this.state.currentSongIndex} />
      </React.Fragment>
    )
  }

  updatePlaylist(playlist, currentSongIndex) {
    // New playlist
    // get only the song sources
    playlist = playlist.map(song => song.src) 
    if (currentSongIndex) {
      if (JSON.stringify(playlist) !== JSON.stringify(this.state.playlist))
      this.setState({ playlist, playlistIsPlaying: true, currentSongIndex: currentSongIndex })
      // Not new playlist, just toggling play or pause
      else this.setState({ playlistIsPlaying: !this.state.playlistIsPlaying })
      // New Song index
      if (currentSongIndex !== this.state.currentSongIndex) this.setState({ currentSongIndex })
    } else {
      if (JSON.stringify(playlist) !== JSON.stringify(this.state.playlist))
        this.setState({ playlist, playlistIsPlaying: true, currentSongIndex: 0 })
      else this.setState({ playlistIsPlaying: !this.state.playlistIsPlaying })
    }
  }

  receiveStateUpdates(payload) {
    this.setState(payload)
  }
}
