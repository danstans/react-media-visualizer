import * as THREE from 'three'

class SecondAnimation {
  constructor(scene, camera, renderer, canvasRef) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.canvasRef = canvasRef
  }

  init() {
    // set up scene environment
    this.renderer.clear()
    this.camera.fov = 20
    this.camera.position.z = 350
    this.renderer.setClearColor('#000000')

    // set up your array objects here
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#FFF' })
    // const cube = new THREE.Mesh(geometry, material)
    this.cubes = []
    for (var i = 0; i < 2048; i++) {
      let cube = new THREE.Mesh(geometry, material)
      // this.cube = cube
      cube.position.x = i * 2
      this.scene.add(cube)
      this.cubes.push(cube)
    }

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
    for (let i = this.scene.children.length - 1; i >= 0; i--) {
      const object = this.scene.children[i]
      if (object.type === 'Mesh') {
        object.geometry.dispose()
        object.material.dispose()
        this.scene.remove(object)
      }
    }
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    for (var i = 0; i < 2; i++) {
      // this.cube = cube

      this.camera.position.y = 0
      // this.cubes[i].rotation.x += 0.01
      // this.cubes[i].rotation.y += 0.01
      // this.cubes[i].rotation.z += 0.01
    }
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

export default SecondAnimation
