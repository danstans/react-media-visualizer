import React, { Component } from 'react'
import './styles.css'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: []
    }
  }

  componentDidMount() {
    fetch('media.js')
    .then(res => res.json())
    .then(media => this.setState({media}))
  }

  render () {
    return (
      <div className="main">
        {this.state.media.map((playlist, index) => (
          <div className="playlist-square" key={`playlist-${index}`}>
            <img src={playlist.albumArtwork} alt={playlist.albumName} />
            <div className="play-button" onClick={() => this.props.updatePlaylist(playlist.songs)}>
            {
              (this.props.playlist === playlist.songs && this.props.playlistIsPlaying) ? (<i className="fa fa-pause" />) : (<i className="fa fa-play" />)
            }
            </div>
          </div>
        ))}
      </div>
    )
  }
}
