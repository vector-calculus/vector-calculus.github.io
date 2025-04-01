/*
  Updated version of 
  Gravity (three.js / instancing / glsl)
  using Three.js version 1.74.0
  by Martin Schuhfuss (https://codepen.io/usefulthink)
  
  This is an example for the usage of instanced geometries in
  three.js and their incredible performance. It renders a huge 
  number of arrow-shapes following their gravitational path 
  around an invisible center.

  This version by 
  Juan Carlos Ponce Campuzano
  11/Mar/2025
*/

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Constants
const NUM_INSTANCES = 6000;
const ARROW_FORWARD = new THREE.Vector3(0, 0, 1);
const UP = new THREE.Vector3(0, 1, 0);
const v3 = new THREE.Vector3();

/* Class and extra functions */
class Arrow {
  constructor(index, buffers) {
    this.index = index;
    this.buffers = buffers;

    this.offsets = {
      position: index * 3,
      rotation: index * 4,
      color: index * 4
    };

    this.rotation = new THREE.Quaternion();
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.color = new THREE.Color();

    this.init();
    this.update(0);
  }

  init() {
    this.color.setHSL(0.55, rnd(0.3, 0.9), rnd(0.1, 0.9));
    this.color.toArray(this.buffers.color, this.offsets.color);

    // Initial position in spherical coordinates
    const radius = rnd(20, 300, 1.6);
    const phi = Math.PI / 2 + rnd(-0.1, 0.1);
    const theta = rnd(0, 2 * Math.PI);
    this.position.setFromSphericalCoords(radius, phi, theta);


    v3.set(rnd(5), rnd(4), rnd(3));
    this.velocity.copy(this.position)
      .cross(UP)
      .normalize()
      .multiplyScalar(Math.PI * Math.PI)
      .add(v3);
  }

  update(dt) {
    if (dt === 0) return; // Skip if no time has passed

    // Compute gravity force (towards the origin)
    const gravityFactor = -Math.PI / this.position.lengthSq();
    this.velocity.addScaledVector(this.position, gravityFactor);

    // Update position from velocity
    this.position.addScaledVector(this.velocity, dt);

    // Update rotation from velocity direction
    if (this.velocity.lengthSq() > 0) {
      this.rotation.setFromUnitVectors(ARROW_FORWARD, this.velocity.clone().normalize());
    }

    // Write updated values into attribute buffers
    this.buffers.position.set(this.position.toArray(), this.offsets.position);
    this.buffers.rotation.set(this.rotation.toArray(), this.offsets.rotation);
  }
}

/* Random values */
function rnd(min = 1, max = 0, pow = 1) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  const rnd = (pow === 1) ? Math.random() : Math.pow(Math.random(), pow);
  return (max - min) * rnd + min;
}

/**
 * Creates the arrow-geometry.
 * @return {THREE.BufferGeometry}
 */
const getArrowGeometry = () => {
  const shape = new THREE.Shape([
    [-1.5, -1], [-0.03, 3], [-0.01, 3.017], [0.0, 1.0185],
    [0.01, 3.017], [0.03, 3], [1.5, -1], [0, -0.5]
  ].map(p => new THREE.Vector2(...p)));

  const arrowGeometry = new THREE.ExtrudeGeometry(shape, {
    amount: 0.3,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: 0.03,
    bevelSegments: 2
  });

  // Orient the geometry into the x/z-plane, roughly centered
  const matrix = new THREE.Matrix4()
    .makeRotationX(Math.PI / 2)
    .setPosition(new THREE.Vector3(0, 0.15, 0));

  arrowGeometry.applyMatrix4(matrix);

  //return new THREE.InstancedBufferGeometry().copy(arrowGeometry);; // Already a BufferGeometry
  return arrowGeometry;
};

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 5000);
camera.position.set(-80, 50, 20);
camera.lookAt(new THREE.Vector3(0, 0, 0));

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000);

// Debugging logs
//console.log('Camera position:', camera.position);
//console.log('Arrow geometry:', getArrowGeometry());

/*
 * Define Geometry
 */
const numInstances = NUM_INSTANCES;

// Setup instance-attribute buffers
const iOffsets = new Float32Array(numInstances * 3);
const iRotations = new Float32Array(numInstances * 4);
const iColors = new Float32Array(numInstances * 4);

// Setup geometry with instance-attributes
const geometry = new THREE.InstancedBufferGeometry();
const baseGeometry = getArrowGeometry();

// Copy attributes from the base geometry
geometry.index = baseGeometry.index;
geometry.attributes.position = baseGeometry.attributes.position;
geometry.attributes.normal = baseGeometry.attributes.normal;

geometry.setAttribute('iOffset', new THREE.InstancedBufferAttribute(iOffsets, 3));
geometry.setAttribute('iRotation', new THREE.InstancedBufferAttribute(iRotations, 4));
geometry.setAttribute('iColor', new THREE.InstancedBufferAttribute(iColors, 4));

geometry.attributes.iRotation.setUsage(THREE.DynamicDrawUsage);
geometry.attributes.iOffset.setUsage(THREE.DynamicDrawUsage);

const arrows = [];
for (let index = 0; index < numInstances; index++) {
  arrows.push(new Arrow(index, {
    position: iOffsets,
    rotation: iRotations,
    color: iColors
  }));
}

/**
 * Define material required to render the instanced geometry. 
 * We are using a raw shader material so we don't 
 * have to deal with possible naming-conflicts and so on.
 */
const material = new THREE.RawShaderMaterial({
  uniforms: {},
  vertexShader: `
    precision highp float;
    // uniforms (all provided by default by three.js)
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;
    
    // default attributes (from arrow-geometry)
    attribute vec3 position;
    attribute vec3 normal;

    // instance attributes
    attribute vec3 iOffset;
    attribute vec4 iRotation;
    attribute vec4 iColor;
    
    // shading-parameters
    varying vec3 vLighting;
    varying vec4 vColor;

    // apply a rotation-quaternion to the given vector 
    // (source: https://goo.gl/Cq3FU0)
    vec3 rotate(const vec3 v, const vec4 q) {
      vec3 t = 2.0 * cross(q.xyz, v);
      return v + q.w * t + cross(q.xyz, t);
    }

    void main() {
      // compute lighting (source: https://goo.gl/oS2vIY)
      vec3 ambientColor = vec3(1.0) * 0.7;
      vec3 directionalColor = vec3(1.0) * 0.9;
      vec3 lightDirection = normalize(vec3(-0.5, 1.0, 1.5));

      // diffuse-shading
      vec3 n = rotate(normalMatrix * normal, iRotation);
      vLighting = ambientColor + 
          (directionalColor * max(dot(n, lightDirection), 0.0));

      vColor = iColor;

      // instance-transform, mesh-transform and projection
      gl_Position = projectionMatrix * modelViewMatrix * 
          vec4(iOffset + rotate(position, iRotation), 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    varying vec3 vLighting;
    varying vec4 vColor;

    void main() {
      gl_FragColor = vColor * vec4(vLighting, 1.0);
      gl_FragColor.a = 1.0;
    }
  `,
  side: THREE.DoubleSide,
  transparent: false
});

/**
 * Define the mesh
 */
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.frustumCulled = false;

/**
 * Animate
 */
const update = (() => {
  let prevTime = performance.now();

  return (time) => {
    const dt = Math.min((time - prevTime) / 1000, 0.1);
    arrows.forEach(a => a.update(dt));
    Object.values(geometry.attributes).forEach(attr => attr.needsUpdate = true);
    prevTime = time;
  };
})();

(function animate() {
  requestAnimationFrame(animate);
  update(performance.now());
  controls.update();
  renderer.render(scene, camera);
})();