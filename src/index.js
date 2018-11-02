import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Utils from './utils.js'
import styles from './styles.css'
import AudioControls from './components/AudioControls'
import MediaToggles from './components/MediaToggles'
import AudioMeta from './components/AudioMeta'
var jsmediatags = require('jsmediatags')


export default class ReactMediaVisualizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      metaPlaylist: null,
      playlistIsPlaying: false,
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
    playlistIsPlaying: PropTypes.bool,
    receiveStateUpdates: PropTypes.func
  }

  static defaultProps = {
    currentSongIndex: null,
    playlist: undefined,
    showVisualizerToggle: true,
    showVolumeBar: true,
    showPlaylistToggle: true,
    playlistIsPlaying: false,
    receiveStateUpdates: null
  }

  componentDidMount() {
    this.reactAudioPlayer.current.volume = this.state.volumeLevel / 100
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlist !== this.props.playlist) {
      this.setState({ playlist: nextProps.playlist, currentSongIndex: nextProps.currentSongIndex }, () => {
        this.getMediaTags()
        this.playSong()
      })
    } else if (nextProps.currentSongIndex !== this.props.currentSongIndex) {
      this.setState({ currentSongIndex: nextProps.currentSongIndex }, () => {
        this.playSong()
      })
    } else if (nextProps.playlistIsPlaying !== this.props.playlistIsPlaying) {
      this.setState({ playlistIsPlaying: nextProps.playlistIsPlaying }, () => {
        (this.state.playlistIsPlaying) ? this.playSong() : this.pauseSong()
      })
    }
  }

  render() {
    return (
      <div className={styles.av}>
        <AudioControls playlistIsPlaying={this.state.playlistIsPlaying} updateAudioTime={this.updateAudioTime} audioControls={this.state.audioControls} goPreviousSong={this.goPreviousSong} updateIsPlaying={this.updateIsPlaying} goNextSong={this.goNextSong} playlist={this.props.playlist} />
        <AudioMeta metaPlaylist={this.state.metaPlaylist} currentSongIndex={this.state.currentSongIndex} />
        <audio src={this.props.playlist[this.state.currentSongIndex]} ref={this.reactAudioPlayer} onTimeUpdate={this.onTimeUpdateListener} onEnded={this.goNextSong} />
        <MediaToggles showPlaylistToggle={this.props.showPlaylistToggle} showVolumeBar={this.props.showVolumeBar} showVisualizerToggle={this.props.showVisualizerToggle} volumeLevel={this.state.volumeLevel} updateVolumeLevel={this.updateVolumeLevel} />
      </div>
    )
  }

  goPreviousSong() {
    if (this.reactAudioPlayer.current.currentTime < 2) {
      let currentSongIndex = Utils.mod(this.state.currentSongIndex - 1, this.props.playlist.length)
      this.setState({ currentSongIndex })
      this.props.receiveStateUpdates({ currentSongIndex })
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
    this.props.receiveStateUpdates({ currentSongIndex })
  }

  updateIsPlaying(isPlaying) {
    let playlistIsPlaying
    if (isPlaying !== undefined) playlistIsPlaying = isPlaying
    else playlistIsPlaying = !this.state.playlistIsPlaying
    playlistIsPlaying ? this.playSong() : this.pauseSong()
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
      this.setState({ playlistIsPlaying: true })
      this.props.receiveStateUpdates({ playlistIsPlaying: true })
    }
  }

  pauseSong() {
    this.reactAudioPlayer.current.pause()
    this.setState({ playlistIsPlaying: false })
    this.props.receiveStateUpdates({ playlistIsPlaying: false })
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

  getMediaTags() {
    let metaPlaylist = []
    this.state.playlist.map((song, index) => {
      let myfile = window.location.href + song
      jsmediatags.read(myfile, {
        onSuccess: function (tag) {
          let { artist, title, album, picture } = tag.tags
          const { data, type } = picture;
          const byteArray = new Uint8Array(data);
          const blob = new Blob([byteArray], { type });
          const metaPlaylistArtwork = URL.createObjectURL(blob);
          metaPlaylist[index] = { artist, title, album, picture: metaPlaylistArtwork }
        },
        onError: function (err) {
          console.log(err)
        }
      })
    })
    this.setState({ metaPlaylist })
  }
}
