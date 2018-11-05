import React, { Component } from 'react'
import styles from './styles.scss'
import * as THREE from 'three'

class AudioVisualizer extends Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    const [width, height] = [this.canvasRef.current.clientWidth, this.canvasRef.current.clientHeight]

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube

    this.canvasRef.current.appendChild(this.renderer.domElement)
    this.start()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    this.stop()
    this.canvasRef.current.removeChild(this.renderer.domElement)
    window.removeEventListener('resize', this.handleResize)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
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
}

export default AudioVisualizer