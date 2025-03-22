import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { knotsTorusSeifertSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    p1: 2,
    q1: 2,
    R1: 1,
    r1: 1,
    p2: 2,
    q2: 3,
    R2: 1.5,
    r2: 0.4,
    uComponent: 6.2831,
    vComponent: 1,
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
const geoScale = { x: 0.5, y: 0.5, z: 0.5 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
geometry.scale(geoScale.x, geoScale.y, geoScale.z);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);

scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls); // Call commonUI with necessary arguments

gui.add(options, 'p1', 0, 7, 1).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

});

gui.add(options, 'q1', 0, 7, 1).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

});

gui.add(options, 'R1', 0, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;
});

gui.add(options, 'r1', 0, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;
});

gui.add(options, 'p2', 0, 7, 1).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

});

gui.add(options, 'q1', 0, 7, 1).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

});

gui.add(options, 'R2', 0, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;
});

gui.add(options, 'r2', 0, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;
});

gui.add(options, 'uComponent', 0, 6.2931, 0.0001).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vComponent', 0, 1, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.p1, options.q1, options.R1, options.r1, options.p2, options.q2, options.R2, options.r2, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
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