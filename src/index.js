import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Utils from './utils.js'
import styles from './styles.css'
import AudioControls from './components/AudioControls'
import MediaToggles from './components/MediaToggles'

export default class ReactMediaVisualizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      songIsPlaying: false,
      currentSongIndex: props.currentSongIndex,
      audioControls: {
        songPercent: 0,
        songTime: '',
        songDuration: ''
      },
      volumeLevel: 30
    }
    this.reactAudioPlayer = React.createRef()
    this.updateIsPlaying = this.updateIsPlaying.bind(this)
    this.goNextSong = this.goNextSong.bind(this)
    this.goPreviousSong = this.goPreviousSong.bind(this)
    this.playSong = this.playSong.bind(this)
    this.pauseSong = this.pauseSong.bind(this)
    this.onTimeUpdateListener = this.onTimeUpdateListener.bind(this)
    this.updateAudioTime = this.updateAudioTime.bind(this)
    this.updateVolumeLevel = this.updateVolumeLevel.bind(this)
  }

  static propTypes = {
    playlist: PropTypes.array,
    currentSongIndex: PropTypes.number,
    showVolumeBar: PropTypes.bool,
    showVisualizerToggle: PropTypes.bool,
    showPlaylistToggle: PropTypes.bool,
    // updatePlaylistIsPlaying: PropTypes.func,
    receiveStateUpdates: PropTypes.func
  }

  static defaultProps = {
    currentSongIndex: 0,
    playlist: undefined,
    showVisualizerToggle: true,
    showVolumeBar: true,
    showPlaylistToggle: true,
    // updatePlaylistIsPlaying: null,
    receiveStateUpdates: null
  }

  componentDidMount() {
    this.reactAudioPlayer.current.volume = this.state.volumeLevel / 100
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlist !== this.props.playlist) {
      this.setState({playlist: nextProps.playlist, currentSongIndex: nextProps.currentSongIndex}, () => {
        console.log('you are here because the playlist updated')
        this.playSong()
      })
    } else if (nextProps.currentSongIndex !== this.props.currentSongIndex) {
      this.setState({currentSongIndex: nextProps.currentSongIndex}, () => {
        this.playSong()
      })
    }
  }

  render() {
    return (
      <div className={styles.av}>
        <AudioControls songIsPlaying={this.state.songIsPlaying} updateAudioTime={this.updateAudioTime} audioControls={this.state.audioControls} goPreviousSong={this.goPreviousSong} updateIsPlaying={this.updateIsPlaying} goNextSong={this.goNextSong} playlist={this.props.playlist} />
        <audio src={this.props.playlist[this.state.currentSongIndex]} ref={this.reactAudioPlayer} onTimeUpdate={this.onTimeUpdateListener} onEnded={this.goNextSong} />
        <MediaToggles showPlaylistToggle={this.props.showPlaylistToggle} showVolumeBar={this.props.showVolumeBar} showVisualizerToggle={this.props.showVisualizerToggle} volumeLevel={this.state.volumeLevel} updateVolumeLevel={this.updateVolumeLevel} />
      </div>
    )
  }

  goPreviousSong() {
    if (this.reactAudioPlayer.current.currentTime < 2) {
      let currentSongIndex = Utils.mod(this.state.currentSongIndex - 1, this.props.playlist.length)
      this.setState({ currentSongIndex })
      this.props.receiveStateUpdates({currentSongIndex})
    }
    this.reactAudioPlayer.current.currentTime = 0
    this.pauseSong()
    this.playSong()
  }

  goNextSong() {
    let currentSongIndex = (this.state.currentSongIndex + 1) % this.props.playlist.length
    this.reactAudioPlayer.current.currentTime = 0
    this.pauseSong()
    this.playSong()
    this.setState({ currentSongIndex })
    this.props.receiveStateUpdates({currentSongIndex})
  }

  updateIsPlaying(isPlaying) {
    let songIsPlaying
    if (isPlaying !== undefined) songIsPlaying = isPlaying
    else songIsPlaying = !this.state.songIsPlaying
    songIsPlaying ? this.playSong() : this.pauseSong()
  }

  onTimeUpdateListener() {
    let currentTime = this.reactAudioPlayer.current.currentTime
    let currentDuration = this.reactAudioPlayer.current.duration
    let percent = (currentTime / currentDuration)
    let audioControls = Object.assign({}, this.state.audioControls)
    if (isNaN(percent)) {
      audioControls.songPercent = 0
    } else {
      audioControls.songPercent = percent
      audioControls.songTime = Math.floor(currentTime.toFixed(0) / 60) + ':' + (currentTime.toFixed(0) % 60 ? Utils.minTwoDigits((currentTime.toFixed(0) % 60)) : '00')
      audioControls.songDuration = Math.floor(currentDuration.toFixed(0) / 60) + ':' + (currentDuration.toFixed(0) % 60 ? Utils.minTwoDigits(currentDuration.toFixed(0) % 60) : '00')
    }
    this.setState({ audioControls })
  }

  playSong() {
    if (this.state.playlist !== undefined && this.state.playlist.length !== 0) {
      setTimeout(function () {
        this.reactAudioPlayer.current.play()
      }.bind(this), 0)
      this.setState({ songIsPlaying: true })
      this.props.receiveStateUpdates({playlistIsPlaying: true})
    }
  }

  pauseSong() {
    this.reactAudioPlayer.current.pause()
    this.setState({ songIsPlaying: false })
    this.props.receiveStateUpdates({playlistIsPlaying: false})
  }

  updateAudioTime(event) {
    event.persist()
    if (this.state.playlist !== undefined && this.state.playlist.length !== 0) {
      let songPercentage = event.nativeEvent.layerX / event.target.clientWidth
      let currentTime = songPercentage * this.reactAudioPlayer.current.duration
      this.reactAudioPlayer.current.currentTime = currentTime
      let audioControls = Object.assign({}, this.state.audioControls)
      audioControls.songPercent = songPercentage
      this.setState({ audioControls })
    }
  }

  updateVolumeLevel(value) {
    this.reactAudioPlayer.current.volume = value / 100
    this.setState({ volumeLevel: value })
  }
}
