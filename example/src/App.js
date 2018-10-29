import React, { Component } from 'react'

import ReactMediaVisualizer from 'react-media-visualizer'
import Main from './components/Main'
import Navbar from './components/Navbar'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      playlistIsPlaying: false
    }
    this.ReactMediaVisualizer = React.createRef()
    this.updatePlaylist = this.updatePlaylist.bind(this)
    this.updatePlaylistIsPlaying = this.updatePlaylistIsPlaying.bind(this)
  }

  render() {
    return (
      <React.Fragment>
        <div className="content">
          <Navbar />
          <Main 
            updatePlaylist={this.updatePlaylist} 
            playlist={this.state.playlist} 
            playlistIsPlaying={this.state.playlistIsPlaying} />
        </div>
        <ReactMediaVisualizer
          ref={this.ReactMediaVisualizer}
          playlist={this.state.playlist}
          updatePlaylistIsPlaying={this.updatePlaylistIsPlaying}
          currentSongIndex={0} />
      </React.Fragment>
    )
  }

  updatePlaylist(playlist) {
    if (playlist !== this.state.playlist) {
      this.setState({playlist, playlistIsPlaying: true})
    } else {
      this.setState({playlist, playlistIsPlaying: !this.state.playlistIsPlaying})
    }
    !this.state.playlistIsPlaying ? this.ReactMediaVisualizer.current.playSong() : this.ReactMediaVisualizer.current.pauseSong()
  }

  updatePlaylistIsPlaying(playlistIsPlaying) {
    this.setState({playlistIsPlaying})
  }
}
