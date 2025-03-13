import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import * as PS from './parametricSurfaces.js';

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const geometry = new ParametricGeometry(PS.parametricSphere, 32, 32);

// Load MatCap texture
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('static/textures/matcaps/2.png');

// Define materials
const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const normalMaterial = new THREE.MeshNormalMaterial();

const sphereMesh = new THREE.Mesh(geometry, matcapMaterial);
scene.add(sphereMesh);

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

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 1, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    wireframe: false    // Default wireframe state
};

// Add material toggle dropdown
gui.add(options, 'material', ['Matcap', 'Normal']).onChange((value) => {
    sphereMesh.material = value === 'Matcap' ? matcapMaterial : normalMaterial;
    sphereMesh.material.wireframe = options.wireframe; // Keep wireframe state
});

// Add wireframe toggle
gui.add(options, 'wireframe').onChange((value) => {
    sphereMesh.material.wireframe = value;
});


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
