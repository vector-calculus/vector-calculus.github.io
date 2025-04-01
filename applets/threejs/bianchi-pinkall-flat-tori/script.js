import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';


const scale = 5;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.up.set(0, 0, 1);
camera.position.set(-scale, -scale, scale);

// OrbitControls is now in the examples directory
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

let a = 0.5, b = 0.5, nMax = 10, n = 0;
let direction = 1;
let paused = true, count = 100;

function f(u, v, target = new THREE.Vector3()) {
  // both u and v run from zero to one in Three.js
  const U = 2 * Math.PI * u;
  const V = Math.PI * v;

  const gamma = a + b * Math.sin(2 * n * V);

  const x = Math.cos(gamma) * Math.cos(U + V);
  const y = Math.cos(gamma) * Math.sin(U + V);
  const z = Math.sin(gamma) * Math.cos(U - V);
  const w = Math.sin(gamma) * Math.sin(U - V);

  return target.set(x / (1 - w), y / (1 - w), z / (1 - w));
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-scale, scale, 0);
camera.add(light);
scene.add(camera);

const ambient = new THREE.AmbientLight(0x555555);
scene.add(ambient);

const uSteps = 150, vSteps = 150;

// ParametricGeometry is deprecated - using BufferGeometry instead
const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshPhongMaterial({ wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Initialize vertices
const positions = new Float32Array((uSteps + 1) * (vSteps + 1) * 3);
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

function updateGeometry() {
  const positionAttribute = geometry.getAttribute('position');
  const positions = positionAttribute.array;
  
  for (let j = 0; j <= vSteps; j++) {
    for (let i = 0; i <= uSteps; i++) {
      const idx = (i + j * (uSteps + 1)) * 3;
      const v = f(i / uSteps, j / vSteps);
      positions[idx] = v.x;
      positions[idx + 1] = v.y;
      positions[idx + 2] = v.z;
    }
  }
  
  positionAttribute.needsUpdate = true;
  geometry.computeVertexNormals();
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);

  if (!paused) n += direction * 0.005;

  if (n < 0 || n > nMax) direction = -direction;

  if (n <= 0 && !paused) { n = 0; paused = true; count = 100; }
  if (paused) count--;
  if (count === 0 && paused) paused = false;

  updateGeometry();
  material.color.setHSL(n / nMax, 1, 0.5);

  mesh.rotation.x += 0.0005;
  mesh.rotation.z += 0.001;
}

// Initial update
updateGeometry();
render();