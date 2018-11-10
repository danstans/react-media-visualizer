// Source
// https://github.com/soniaboller/audible-visuals

import * as THREE from 'three'
import { Spectrum } from './utils/Spectrum'

let particles = null

class Flower {
  constructor(renderer, canvasRef, analyser) {
    this.renderer = renderer
    this.canvasRef = canvasRef
    this.analyser = analyser
    this.spiral = {
      intensity: 0.18,
      R: 0.7,
      G: 0,
      B: 0.7,
      radius: 50,
      aFlower: 25,
      bFlower: 0,
      flowerAngle: 2.86,
      fov: 35,
      animate: true,
      flowerCounter: true
    }
  }

  init() {
    // set up scene environment
    this.setUpEnvironment()
    this.setUpScene()

    this.canvasRef.current.appendChild(this.renderer.domElement)
    this.start()
  }

  setUpEnvironment() {
    this.scene = new THREE.Scene()
    var fov = 20
    this.camera = new THREE.PerspectiveCamera(fov, this.canvasRef.current.clientWidth / this.canvasRef.current.clientHeight, 1, 10000)
    this.camera.position.set(0, 0, 170)
    this.renderer.setClearColor('#000000')

    let fsize = 4096
    this.analyser.fftSize = fsize
    let bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(bufferLength)
    this.spectrum = new Spectrum()
  }

  setUpScene() {
    particles = []
    var geometry = new THREE.CircleGeometry(0.3, 32)
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })

    for (var i = 0; i <= 2048; i++) {
      var particle = particles[i++] = new THREE.Mesh(geometry, material)
      this.scene.add(particle)
    }
  }

  start() {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate.bind(this))
    }
  }

  animate() {
    this.animateParticles()
    this.changeAngle()
    this.camera.lookAt(this.scene.position)
    this.renderer.render(this.scene, this.camera)
    this.frameId = window.requestAnimationFrame(this.animate.bind(this))
  }

  animateParticles() {
    var timeFrequencyData = new Uint8Array(this.analyser.fftSize)
    var timeFloatData = new Float32Array(this.analyser.fftSize)
    this.analyser.getByteTimeDomainData(timeFrequencyData)
    this.analyser.getFloatTimeDomainData(timeFloatData)
    for (var j = 0; j <= particles.length; j++) {
      let particle = particles[j++]
      var R = this.spiral.R + (timeFloatData[j])
      var G = this.spiral.G - (timeFloatData[j])
      var B = this.spiral.B - (timeFloatData[j])
      particle.material.color.setRGB(R, G, B)
      particle.position.x = (this.spiral.aFlower + this.spiral.bFlower * ((this.spiral.flowerAngle / 100) * j)) *
        Math.cos(((this.spiral.flowerAngle / 100) * j)) +
        Math.sin(j / (this.spiral.flowerAngle / 100)) * 17
      particle.position.y = (this.spiral.aFlower + this.spiral.bFlower * ((this.spiral.flowerAngle / 100) * j)) *
        Math.sin(((this.spiral.flowerAngle / 100) * j)) +
        Math.cos(j / (this.spiral.flowerAngle / 100)) * 17
      particle.position.z = (timeFloatData[j] * timeFrequencyData[j] * this.spiral.intensity)
      this.camera.position.y = 0
      this.camera.fov = this.spiral.fov
      this.camera.updateProjectionMatrix()
    }
  }

  changeAngle() {
    if (this.spiral.flowerCounter) {
      this.spiral.flowerAngle += 0.0000004
      if (this.spiral.flowerAngle >= 2.87) {
        this.spiral.flowerCounter = false
      }
    } else {
      this.spiral.flowerAngle -= 0.0000004
      if (this.spiral.flowerAngle <= 2.85) {
        this.spiral.flowerCounter = true
      }
    }
  }

  stop() {
    window.cancelAnimationFrame(this.frameId)
    this.frameId = null
    this.canvasRef.current.removeChild(this.renderer.domElement)
    for (let i = this.scene.children.length - 1; i >= 0; i--) {
      const object = this.scene.children[i]
      if (object.type === 'Mesh') {
        object.geometry.dispose()
        object.material.dispose()
        this.scene.remove(object)
      }
    }
  }
}

export default Flower
