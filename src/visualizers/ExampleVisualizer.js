class ExampleVisualizer {
  constructor(renderer, canvasRef, analyser) {
    this.renderer = renderer
    this.canvasRef = canvasRef
    this.analyser = analyser
  }

  init() {
    // called from the audiovisualizer react component
    this.setUpEnvironment()
    this.setUpScene()

    this.canvasRef.current.appendChild(this.renderer.domElement)
    this.start()
  }

  // set up scene and camera
  setUpEnvironment() {
  }

  // set up the objects in the scene
  setUpScene() {
  }

  start() {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate.bind(this))
    }
  }

  stop() {
    // this is called when component unmounts or visualizer switches
    window.cancelAnimationFrame(this.frameId)
    this.frameId = null
    this.canvasRef.current.removeChild(this.renderer.domElement)
    // remove your scene objects
  }

  animate() {
    //  make some modifications to your scene then render
    this.renderer.render(this.scene, this.camera)
    this.frameId = window.requestAnimationFrame(this.animate.bind(this))
  }
}

export default ExampleVisualizer
