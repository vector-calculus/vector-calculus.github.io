import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { knotTorusSurface as parametricSurface, torusSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    p: 7,
    q: 3,
    R1: 7,
    R2: 2.5,
    r: 1,
    showTorus: false,
    uComponent: 6.2831,
    vComponent: 6.2831,
    autoRotate: true,
    color: '#049ef4',
    colorBackground: '#000000'
};

let d = 2 * (options.R2 - options.r);

// Scene setup
const canvas = document.querySelector('canvas.webgl');
const { scene, camera, renderer, controls } = setupScene(canvas);

// Materials
const materials = createMaterials(options);

// Geometry
const meshRes = { x: 500, y: 50 };
const geoScale = { x: 0.1, y: 0.1, z: 0.1 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p, options.q, options.R1, options.R2, options.r, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
geometry.scale(geoScale.x, geoScale.y, geoScale.z);

let geometryTorus = new ParametricGeometry((u, v, target) => torusSurface(u, v, target, d, options.R1, 6.2831, 6.2831), 32, 32);
geometryTorus.scale(geoScale.x, geoScale.y, geoScale.z);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);

let materialTorus = new THREE.MeshPhongMaterial({
    color: '#ff00ff',
    shininess: 200,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
    //wireframe: true
});

let meshTorus = new THREE.Mesh(geometryTorus, materialTorus);
meshTorus.visible = options.showTorus; // Ensure visibility matches the option
scene.add(meshTorus);

scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls); // Call commonUI with necessary arguments

gui.add(options, 'p', 0, 20, 1).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p, options.q, options.R1, options.R2, options.r, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

});

gui.add(options, 'q', 0, 20, 1).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p, options.q, options.R1, options.R2, options.r, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

});

gui.add(options, 'R1', 0, 10, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p, options.q, options.R1, options.R2, options.r, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

    // Update torus
    geometryTorus.dispose();
    geometryTorus = new ParametricGeometry((u, v, target) => torusSurface(u, v, target, 2 * (options.R2 - options.r), options.R1, 6.2831, 6.2831), 32, 32);
    geometryTorus.scale(geoScale.x, geoScale.y, geoScale.z);
    meshTorus.geometry = geometryTorus;

});

gui.add(options, 'R2', 0, 10, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p, options.q, options.R1, options.R2, options.r, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

    // Update torus
    geometryTorus.dispose();
    geometryTorus = new ParametricGeometry((u, v, target) => torusSurface(u, v, target, 2 * (options.R2 - options.r), options.R1, 6.2831, 6.2831), 32, 32);
    geometryTorus.scale(geoScale.x, geoScale.y, geoScale.z);
    meshTorus.geometry = geometryTorus;

});

gui.add(options, 'r', 0, 2, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p, options.q, options.R1, options.R2, options.r, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

    // Update torus
    geometryTorus.dispose();
    geometryTorus = new ParametricGeometry((u, v, target) => torusSurface(u, v, target, 2 * (options.R2 - options.r), options.R1, 6.2831, 6.2831), 32, 32);
    geometryTorus.scale(geoScale.x, geoScale.y, geoScale.z);
    meshTorus.geometry = geometryTorus;

});

gui.add(options, 'uComponent', 0, 6.2931, 0.0001).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p, options.q, options.R1, options.R2, options.r, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vComponent', 0, 6.2931, 0.0001).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p, options.q, options.R1, options.R2, options.r, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

// Add the show/hide torus control
gui.add(options, 'showTorus').name('Show Torus').onChange((value) => {
    meshTorus.visible = value;
});

// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper(1);
// scene.add(axesHelper);

controls.autoRotate = true;
controls.autoRotateSpeed = - 0.9;

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();