import * as THREE from 'three'
import { Spectrum } from './utils/Spectrum'


let fsize = 4096
let numBars = 64
let vertexShader = [
    "void main() {",
    "gl_Position = gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
].join('\n');
let fragmentShader = [
    "uniform vec3 col;",
    "uniform float alpha;",
    "void main() {",
    "gl_FragColor = vec4( col.r, col.g, col.b, alpha );",
    "}"
].join('\n');

let plane, group


class Tricentric {
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
        this.renderer.setClearColor('#000000')
        this.camera = new THREE.PerspectiveCamera(70, this.canvasRef.current.clientWidth / this.canvasRef.current.clientHeight, 0.01, 2000);
        this.camera.position.y = 0;
        this.camera.position.z = 500;

        //copy paste

        group = new THREE.Object3D();
        this.spectrum = new Spectrum();
        this.analyser.fftSize = fsize;
        let bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);

        // view.useOrthographicCamera();

        let positionZ = 498

        for (var i = 0; i < numBars; i++) {

            let geometry = new THREE.CylinderBufferGeometry(20, 20, 2, 3, 1, true);
            var uniforms = {
                col: { type: 'c', value: new THREE.Color('hsl(250, 100%, 70%)') },
                alpha: { type: 'f', value: 1 }
            };
            var material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.DoubleSide
            });
            let cylinder = new THREE.Mesh(geometry, material);
            cylinder.position.z = positionZ;
            cylinder.rotation.x = Math.PI / 2;

            positionZ -= 5;

            group.add(cylinder);
        }

        this.scene.add(group);
        // end copy paste

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
        this.analyser.getByteFrequencyData(this.dataArray);
        let visualArray = this.spectrum.GetVisualBins(this.dataArray, 32, 0, 1300);
        var avg = arrayAverage(visualArray);
        this.camera.rotation.z += (avg <= 1) ? 0 : Math.pow((avg / 8192) + 1, 2) - 1;

        if (group) {
            for (var i = 0; i < visualArray.length; i++) {
                setUniformColor(i, 308 - (visualArray[i]), parseInt(avg / 255 * 40) + 60, parseInt(visualArray[i] / 255 * 25) + 45, visualArray[i]);
                group.children[i].scale.x = ((visualArray[i] / 255) * (avg / 255)) + 0.25;
                group.children[i].scale.y = ((visualArray[i] / 255) * (avg / 255)) + 0.25;
                group.children[i].scale.z = ((visualArray[i] / 255) * (avg / 255)) + 0.25;
            }
        }
        this.renderer.render(this.scene, this.camera)
    }

    animate() {
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate.bind(this))
    }
}


function setUniformColor(groupI, h, s, l, factor) {
    //l = parseInt( (factor / 255) * 60 + 1 );
    group.children[groupI].material.uniforms.col.value = new THREE.Color('hsl(' + h + ', ' + s + '%, ' + l + '%)');
    group.children[groupI].material.uniforms.alpha.value = s / 100;
}

function arrayAverage(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

export default Tricentric
