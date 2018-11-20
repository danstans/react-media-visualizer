import React, { Component } from 'react'

import ReactMediaVisualizer from 'react-media-visualizer'
import Main from './components/Main'
import Navbar from './components/Navbar'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: null,
      playlistIsPlaying: false,
      currentSongIndex: 0,
      theme: 'youtube'
    }
    this.updatePlaylist = this.updatePlaylist.bind(this)
    this.receiveStateUpdates = this.receiveStateUpdates.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
  }

  render() {
    return (
      <React.Fragment>
        <div className="react-media-vis-body">
          <Navbar />
          <Main
            updatePlaylist={this.updatePlaylist}
            currentSongIndex={this.state.currentSongIndex}
            playlist={this.state.playlist}
            theme={this.state.theme}
            handleThemeChange={this.handleThemeChange}
            playlistIsPlaying={this.state.playlistIsPlaying} />
        </div>
        <ReactMediaVisualizer
          playlist={this.state.playlist}
          receiveStateUpdates={this.receiveStateUpdates}
          playlistIsPlaying={this.state.playlistIsPlaying}
          theme={this.state.theme}
          currentSongIndex={this.state.currentSongIndex} />
      </React.Fragment>
    )
  }

  updatePlaylist(playlist, currentSongIndex) {
    // New playlist received, get array containing song sources
    playlist = playlist.map(song => song.src)
    if (Number.isInteger(currentSongIndex)) {
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

  handleThemeChange(event) {
    this.setState({theme: event.target.value})
  }

  receiveStateUpdates(payload) {
    this.setState(payload)
  }
}
