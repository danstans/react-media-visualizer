import * as THREE from 'three'
import { Spectrum } from './utils/Spectrum'

let fsize = 4096
let numBars = 64
let vertexShader = [
  'void main() {',
  'gl_Position = gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
  '}'
].join('\n')
let fragmentShader = [
  'void main() {',
  'gl_FragColor = vec4( gl_FragCoord.y/500.0, 0, gl_FragCoord.y/1000.0, 1.0 );',
  '}'
].join('\n')

let plane, group

class Barred {
  constructor(scene, camera, renderer, canvasRef, analyser) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.canvasRef = canvasRef
    this.analyser = analyser
  }

  init() {
    // set up scene environment
    this.renderer.clear()
    this.camera = new THREE.OrthographicCamera(this.canvasRef.current.clientWidth / -2, this.canvasRef.current.clientWidth / 2, this.canvasRef.current.clientHeight / 2, this.canvasRef.current.clientHeight / -2, 1, 1000)
    this.camera.position.y = 150
    this.camera.position.z = 500
    this.renderer.setClearColor('#000000')

    group = new THREE.Object3D()
    this.spectrum = new Spectrum()
    this.analyser.fftSize = fsize
    let bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(bufferLength)

    // view.useOrthographicCamera();

    let positionX = -20 * (numBars / 2)

    for (var i = 0; i < numBars; i++) {
      let geometry = new THREE.PlaneBufferGeometry(18, 10, 1)
      var uniforms = {}
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      })
      plane = new THREE.Mesh(geometry, material)
      plane.position.x = positionX
      positionX += 20
      group.add(plane)
    }
    this.scene.add(group)

    this.canvasRef.current.appendChild(this.renderer.domElement)
    this.start()
  }

  start() {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate.bind(this))
    }
  }

  stop() {
    window.cancelAnimationFrame(this.frameId)
    this.frameId = null
    this.canvasRef.current.removeChild(this.renderer.domElement)
    this.clearScene()
  }

  clearScene() {
    this.scene.remove(group)
  }

  renderScene() {
    this.analyser.getByteFrequencyData(this.dataArray)
    let visualArray = this.spectrum.GetVisualBins(this.dataArray, numBars, 4, 1300)
    if (group) {
      for (var i = 0; i < visualArray.length; i++) {
        group.children[i].geometry.attributes.position.array[1] = visualArray[i]
        group.children[i].geometry.attributes.position.array[4] = visualArray[i]
        group.children[i].geometry.attributes.position.needsUpdate = true
      }
    }
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate.bind(this))
  }

  checkVisualizer() {
    if (this.app.spiralCounter) {
      this.spiral.angle += 0.0008
      if (this.spiral.angle >= 13) {
        this.app.spiralCounter = false
      }
    } else {
      this.spiral.angle -= 0.0008
      if (this.spiral.angle <= 9) {
        this.app.spiralCounter = true
      }
    }
  }
}

export default Barred
