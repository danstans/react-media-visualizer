import * as THREE from 'three'

var vertexShader = [
  "void main() {",
      "gl_Position = gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
  "}"
].join('\n');
var fragmentShader = [
  "void main() {",
      "gl_FragColor = vec4( gl_FragCoord.y/500.0, 0, gl_FragCoord.y/1000.0, 1.0 );",
  "}"
].join('\n');

class HillFog {
  constructor(scene, camera, renderer, canvasRef, analyser) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.canvasRef = canvasRef
    this.analyser = analyser
  }

  init() {
    // set up scene environment
    this.renderer.setClearColor('#000000')
    this.camera = new THREE.OrthographicCamera( this.canvasRef.current.clientWidth / - 2, this.canvasRef.current.clientWidth / 2, this.canvasRef.current.clientHeight / 2, this.canvasRef.current.clientHeight / - 2, 1, 1000 );
    this.camera.position.y = 150;
    this.camera.position.z = 500;
    // set up your array objects here
    this.geometry = new THREE.PlaneBufferGeometry(900, 40, 127)
    var uniforms = {};
    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
    let plane = new THREE.Mesh(this.geometry, material);
    this.scene.add(plane);


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
    this.analyser.fftSize = 256;
    var bufferLength = this.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    if (this.geometry) {
      for (var i = 0; i < bufferLength; i++) {
        this.geometry.attributes.position.array[i * 3 + 1] = dataArray[i] / 3;
      }
      this.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate.bind(this))
  }
}

export default HillFog
