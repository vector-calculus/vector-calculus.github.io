import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { enneperSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    autoRotate: true,
    uComponent: 2,
    vComponent: 2,
    color: '#049ef4',
    colorBackground: '#000000'
};

// Scene setup
const canvas = document.querySelector('canvas.webgl');
const { scene, camera, renderer, controls } = setupScene(canvas);

// Materials
const materials = createMaterials(options);

// Geometry
const meshRes = { x: 64, y: 64 };
const geoScale = { x: 0.2, y: 0.2, z: 0.2 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
geometry.rotateX(-Math.PI / 2);
geometry.scale(geoScale.x, geoScale.y, geoScale.z);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);
scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls); // Call commonUI with necessary arguments

gui.add(options, 'uComponent', -2, 2, 0.01).name('u').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vComponent', -2, 2, 0.01).name('v').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

controls.autoRotate = true;
controls.autoRotateSpeed = - 0.6;

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();