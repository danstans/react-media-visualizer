import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'
import Barred from '../visualizers/Barred'
import Tricentric from '../visualizers/Tricentric'
import Spiral from '../visualizers/Spiral'
import Flower from '../visualizers/Flower'
import * as THREE from 'three'

class AudioVisualizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visualizerNumber: 0
    }
    this.canvasRef = React.createRef()
    this.handleResize = this.handleResize.bind(this)
    this.changeVisualizer = this.changeVisualizer.bind(this)
  }

  componentDidMount() {
    // set up shared renderer and canvasRef
    const [width, height] = [this.canvasRef.current.clientWidth, this.canvasRef.current.clientHeight]
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)

    this.myAnimations = [
      new Spiral(this.renderer, this.canvasRef, this.props.audioAnalyser),
      new Flower(this.renderer, this.canvasRef, this.props.audioAnalyser),
      new Barred(this.renderer, this.canvasRef, this.props.audioAnalyser),
      new Tricentric(this.renderer, this.canvasRef, this.props.audioAnalyser)
    ]
    this.myAnimations[this.state.visualizerNumber].init()

    window.addEventListener('resize', this.handleResize)
    this.canvasRef.current.addEventListener('click', this.changeVisualizer)
  }

  componentWillUnmount() {
    this.myAnimations[this.state.visualizerNumber].stop()
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    let [width, height] = [this.canvasRef.current.clientWidth, this.canvasRef.current.clientHeight]
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.canvasRef.current.appendChild(this.renderer.domElement)
  }

  render() {
    return (
      <div className={styles.visualizer} ref={this.canvasRef} />
    )
  }

  changeVisualizer() {
    this.myAnimations[this.state.visualizerNumber].stop()
    let visualizerNumber = (this.state.visualizerNumber + 1) % this.myAnimations.length
    this.setState({ visualizerNumber }, () => {
      this.myAnimations[this.state.visualizerNumber].init()
    })
  }
}

AudioVisualizer.propTypes = {
  audioAnalyser: PropTypes.object
}

export default AudioVisualizer
