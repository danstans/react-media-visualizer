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
    this.ReactMediaVisualizer = React.createRef()
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
          ref={this.ReactMediaVisualizer}
          playlist={this.state.playlist}
          receiveStateUpdates={this.receiveStateUpdates}
          currentSongIndex={this.state.currentSongIndex} />
      </React.Fragment>
    )
  }

  updatePlaylist(playlist, currentSongIndex) {
    // New playlist
    playlist = playlist.map(song => song.src)
    let playlistIsPlaying = this.state.playlistIsPlaying
    if (JSON.stringify(playlist) !== JSON.stringify(this.state.playlist)) {
      this.setState({ playlist, playlistIsPlaying: true, currentSongIndex: 0 })}
    // Not new playlist, just toggling play or pause
    else this.setState({ playlistIsPlaying: !playlistIsPlaying })
    // New Song index
    if (currentSongIndex !== this.state.currentSongIndex) this.setState({ currentSongIndex })
    !this.state.playlistIsPlaying ? this.ReactMediaVisualizer.current.playSong() : this.ReactMediaVisualizer.current.pauseSong()
  }

  receiveStateUpdates(payload) {
    this.setState(payload)
  }
}
