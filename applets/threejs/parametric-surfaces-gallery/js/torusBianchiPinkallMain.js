import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { torusBianchiPinkallSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    autoRotate: true,
    n: 10,
    a: 0.4,
    b: 0.2,
    uComponent: 6.2831,
    vComponent: 3.1415,
    color: '#049ef4',
    colorBackground: '#000000'
};

// Scene setup
const canvas = document.querySelector('canvas.webgl');
const { scene, camera, renderer, controls } = setupScene(canvas);

// Materials
const materials = createMaterials(options);

// Geometry
const meshRes = { x: 150, y: 150 };
const geoScale = { x: 1.5, y: 1.5, z: 1.5 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.n, options.a, options.b, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
geometry.rotateX(-Math.PI / 3);
geometry.scale(geoScale.x, geoScale.y, geoScale.z);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);
scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls); // Call commonUI with necessary arguments

gui.add(options, 'n', 0, 10, 1).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.n, options.a, options.b, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'a', 0, 1, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.n, options.a, options.b, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'b', 0, 0.65, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.n, options.a, options.b, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'uComponent', 0, 6.2931, 0.0001).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.n, options.a, options.b, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vComponent', 0, 3.1415, 0.0001).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.n, options.a, options.b, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

controls.autoRotate = true;
controls.autoRotateSpeed = - 0.9;

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();