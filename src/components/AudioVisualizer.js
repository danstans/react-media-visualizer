import React, { Component } from 'react'
import styles from './styles.scss'
import SimpleAnimation from '../visualizers/SimpleAnimation'
import SecondAnimation from '../visualizers/SecondAnimation'
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
    // set up three scene, camera, renderer and canvasRef
    const [width, height] = [this.canvasRef.current.clientWidth, this.canvasRef.current.clientHeight]
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)

    this.myAnimations = [
      new SimpleAnimation(new THREE.Scene(), this.camera, this.renderer, this.canvasRef),
      new SecondAnimation(new THREE.Scene(), this.camera, this.renderer, this.canvasRef)
    ]
    this.myAnimations[this.state.visualizerNumber].init()

    window.addEventListener('resize', this.handleResize)
    this.canvasRef.current.addEventListener('click', this.changeVisualizer)
  }

  componentWillUnmount() {
    this.myAnimations[this.state.visualizerNumber].stop()
    // this.canvasRef.current.removeChild(this.renderer.domElement)

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
    this.setState({visualizerNumber}, () => {
      this.myAnimations[this.state.visualizerNumber].init()
    })
  }
}

export default AudioVisualizer
