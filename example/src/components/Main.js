import React, { Component } from 'react'
import './styles.css'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: [],
      selectedAlbum: null
    }
    this.selectAlbum = this.selectAlbum.bind(this)
    this.clearSelectedAlbum = this.clearSelectedAlbum.bind(this)
  }

  componentDidMount() {
    fetch('media.js')
      .then(res => res.json())
      .then(media => this.setState({ media }))
  }

  showPlaylists() {
    return (
      <React.Fragment>
        <h2>Albums</h2>
        <div className="grid">{this.state.media.map((playlist, index) => (
          <div className="playlist-square" onClick={() => this.selectAlbum(playlist)} key={`playlist-${index}`}>
            <img src={playlist.albumArtwork} alt={playlist.albumName} />
            <div className="play-button" onClick={() => this.props.updatePlaylist(playlist.songs)}>
              {(this.props.playlist === playlist.songs && this.props.playlistIsPlaying)
                ? (<i className="fa fa-pause" />)
                : (<i className="fa fa-play" style={{ paddingLeft: '3px' }} />)}
            </div>
          </div>))}
        </div>
      </React.Fragment>
    )
  }

  showAlbum() {
    return (
      <React.Fragment>
        <div className="album">
          <span onClick={this.clearSelectedAlbum}>‹ Back to Soundtracks</span>
          <div className="album-meta">
            <img src={this.state.selectedAlbum.albumArtwork} alt={this.state.selectedAlbum.albumName} />
            <span>{this.state.selectedAlbum.albumName}</span>
          </div>
          <div className="album-playlist">
          {this.state.selectedAlbum.songNames.map((songName, index) => (
            <div key={`songname-${index}`} className="playlist-song" onClick={() => this.props.updatePlaylist(this.state.selectedAlbum.songs, index)}>
              {(this.props.playlist === this.state.selectedAlbum.songs && this.props.playlistIsPlaying && this.props.currentSongIndex === index)
                  ? (<i className="fa fa-pause" />)
                  : (<i className="fa fa-play" style={{ paddingLeft: '3px' }} />)}
              <span>{songName}</span>
            </div>
          ))}
          </div>
        </div>

      </React.Fragment>
    )
  }

  render() {
    return (
      <main>
        <div className="albums">
          {this.state.selectedAlbum ? this.showAlbum() : this.showPlaylists()}
        </div>
        <div>
          Documentation goes here
        </div>
      </main>
    )
  }

  selectAlbum(selectedAlbum) {
    this.setState({ selectedAlbum })
  }

  clearSelectedAlbum() {
    this.setState({ selectedAlbum: null })
  }
}
