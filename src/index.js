import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Utils from './utils.js'
import spotifyStyles from './themes/spotify/index.scss'
import youtubeStyles from './themes/youtube/index.scss'
import soundcloudStyles from './themes/soundcloud/index.scss'
import AudioControls from './components/AudioControls'
import MediaToggles from './components/MediaToggles'
import AudioMeta from './components/AudioMeta'
import AudioPlaylist from './components/AudioPlaylist'
import AudioVisualizer from './components/AudioVisualizer'
import AudioDuration from './components/AudioDuration'
var jsmediatags = require('jsmediatags')
var Blob = require('blob')

export default class ReactMediaVisualizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      metaPlaylist: null,
      playlistIsPlaying: false,
      currentSongIndex: null,
      showPlaylist: false,
      showVisualizer: false,
      audioAnalyser: null,
      styles: null,
      audioControls: {
        songPercent: 0,
        songTime: '',
        songDuration: ''
      },
      volumeLevel: 80
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
    this.updateToggles = this.updateToggles.bind(this)
    this.selectSongFromPlaylist = this.selectSongFromPlaylist.bind(this)
    this.setAnalyser = this.setAnalyser.bind(this)
    this.chooseStyles = this.chooseStyles.bind(this)
  }

  static propTypes = {
    playlist: PropTypes.array,
    currentSongIndex: PropTypes.number,
    showVolumeBar: PropTypes.bool,
    showVisualizerToggle: PropTypes.bool,
    showPlaylistToggle: PropTypes.bool,
    playlistIsPlaying: PropTypes.bool,
    receiveStateUpdates: PropTypes.func,
    theme: PropTypes.string
  }

  static defaultProps = {
    currentSongIndex: null,
    playlist: undefined,
    showVisualizerToggle: true,
    showVolumeBar: true,
    showPlaylistToggle: true,
    playlistIsPlaying: false,
    receiveStateUpdates: null,
    theme: 'spotify'
  }

  componentWillMount() {
    this.chooseStyles(this.props.theme)
  }

  componentDidMount() {
    this.reactAudioPlayer.current.volume = this.state.volumeLevel / 100
    this.setAnalyser()
    window.addEventListener('keydown', this.checkKeyDown.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlist !== this.props.playlist) {
      this.setState({ playlist: nextProps.playlist, currentSongIndex: nextProps.currentSongIndex }, () => {
        this.playSong()
        this.getMediaTags()
      })
    } else if (nextProps.currentSongIndex !== this.props.currentSongIndex) {
      this.setState({ currentSongIndex: nextProps.currentSongIndex }, () => {
        this.playSong()
      })
    } else if (nextProps.playlistIsPlaying !== this.props.playlistIsPlaying) {
      this.setState({ playlistIsPlaying: nextProps.playlistIsPlaying }, () => {
        (this.state.playlistIsPlaying) ? this.playSong() : this.pauseSong()
      })
    } else if (nextProps.theme !== this.props.theme) {
      this.chooseStyles(nextProps.theme)
    }
  }

  checkKeyDown(e) {
    if (e.which === 27 && this.state.showVisualizer) {
      // press esc to close the visualizer
      this.setState({ showVisualizer: false })
    } else if (e.which === 32 && this.state.showVisualizer) {
      // press space to toggle playback
      this.updateIsPlaying()
    }
  }

  chooseStyles(theme) {
    switch (theme) {
      case 'spotify':
        this.props.receiveStateUpdates({ theme })
        this.setState({ styles: spotifyStyles })
        break
      case 'youtube':
        this.props.receiveStateUpdates({ theme })
        this.setState({ styles: youtubeStyles })
        break
      case 'soundcloud':
      this.props.receiveStateUpdates({ theme })
      this.setState({ styles: soundcloudStyles })
        break
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showVisualizer && <AudioVisualizer styles={this.state.styles} showVisualizer={this.state.showVisualizer} audioAnalyser={this.state.audioAnalyser} />}
        <div className={this.state.styles.av__background}>
          <div className={this.state.styles.av__container}>
            <AudioControls styles={this.state.styles} theme={this.props.theme} playlistIsPlaying={this.state.playlistIsPlaying} updateAudioTime={this.updateAudioTime} audioControls={this.state.audioControls} goPreviousSong={this.goPreviousSong} updateIsPlaying={this.updateIsPlaying} goNextSong={this.goNextSong} playlist={this.props.playlist} />
            <AudioDuration styles={this.state.styles} updateAudioTime={this.updateAudioTime} audioControls={this.state.audioControls} />
            <AudioMeta styles={this.state.styles} metaPlaylist={this.state.metaPlaylist} currentSongIndex={this.state.currentSongIndex} />
            <audio src={this.props.playlist[this.state.currentSongIndex]} ref={this.reactAudioPlayer} onTimeUpdate={this.onTimeUpdateListener} onEnded={this.goNextSong} />
            <MediaToggles theme={this.props.theme} styles={this.state.styles} showPlaylistToggle={this.props.showPlaylistToggle} showPlaylist={this.state.showPlaylist} showVisualizer={this.state.showVisualizer} showVolumeBar={this.props.showVolumeBar} showVisualizerToggle={this.props.showVisualizerToggle} volumeLevel={this.state.volumeLevel} updateVolumeLevel={this.updateVolumeLevel} updateToggles={this.updateToggles} />
          </div>
        </div>
        <AudioPlaylist styles={this.state.styles} selectSongFromPlaylist={this.selectSongFromPlaylist} updateIsPlaying={this.updateIsPlaying} showPlaylist={this.state.showPlaylist} metaPlaylist={this.state.metaPlaylist} currentSongIndex={this.state.currentSongIndex} playlistIsPlaying={this.state.playlistIsPlaying} />
      </React.Fragment>
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
    this.setState({ currentSongIndex })
    this.props.receiveStateUpdates({ currentSongIndex })
    this.pauseSong()
    this.playSong()
  }

  updateIsPlaying(isPlaying) {
    let playlistIsPlaying
    if (isPlaying !== undefined) playlistIsPlaying = isPlaying
    else playlistIsPlaying = !this.state.playlistIsPlaying
    playlistIsPlaying ? this.playSong() : this.pauseSong()
  }

  selectSongFromPlaylist(newSongIndex) {
    let currentSongIndex = newSongIndex
    this.reactAudioPlayer.current.currentTime = 0
    this.setState({ currentSongIndex })
    this.props.receiveStateUpdates({ currentSongIndex })
    this.pauseSong()
    this.playSong()
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

  updateToggles(toggles) {
    switch (toggles) {
      case 'showPlaylist':
        this.setState({ showPlaylist: !this.state.showPlaylist })
        break
      case 'showVisualizer':
        this.setState({ showVisualizer: !this.state.showVisualizer })
        break
    }
  }

  setAnalyser() {
    // eslint-disable-next-line
    const ctx = new AudioContext()
    const src = ctx.createMediaElementSource(this.reactAudioPlayer.current)
    ctx.crossOrigin = 'anonymous'
    this.reactAudioPlayer.current.crossOrigin = 'anonymous'
    let audioAnalyser = Object.assign({}, this.state.audioAnalyser)
    audioAnalyser = ctx.createAnalyser()
    src.connect(audioAnalyser)
    audioAnalyser.fftSize = 32768
    audioAnalyser.connect(ctx.destination)
    this.setState({ audioAnalyser })
  }

  getMediaTags() {
    let metaPlaylist = []
    this.state.playlist.map((song, index) => {
      let myfile = window.location.href + song
      jsmediatags.read(myfile, {
        onSuccess: function (tag) {
          let { artist, title, album, picture } = tag.tags
          const { data, type } = picture
          const byteArray = new Uint8Array(data)
          const blob = new Blob([byteArray], { type })
          const metaPlaylistArtwork = URL.createObjectURL(blob)
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
