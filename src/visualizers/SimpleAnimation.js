import * as THREE from 'three'

class SimpleAnimation {
  constructor(scene, camera, renderer, canvasRef) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.canvasRef = canvasRef
  }

  init() {
    // set up scene environment
    this.renderer.clear()
    this.camera.position.z = 4
    this.renderer.setClearColor('#000000')

    // set up your array objects here
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    const cube = new THREE.Mesh(geometry, material)
    this.cube = cube
    this.scene.add(cube)
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
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.cube.rotation.z += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate.bind(this))
  }
}

export default SimpleAnimation
