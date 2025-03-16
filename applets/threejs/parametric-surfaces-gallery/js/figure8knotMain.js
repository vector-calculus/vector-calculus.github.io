import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { figure8knotSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    autoRotate: true,
    r: 2,
    R: 2,
    uComponent: 6.2831,
    vComponent: 6.2831,
    color: '#049ef4',
    colorBackground: '#000000'
};

// Scene setup
const canvas = document.querySelector('canvas.webgl');
const { scene, camera, renderer, controls } = setupScene(canvas);

// Materials
const materials = createMaterials(options);

// Geometry
const meshRes = { x: 180, y: 180 };
const geoScale = { x: 0.35, y: 0.35, z: 0.35 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.r, options.R, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
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

gui.add(options, 'r', 0.01, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.r, options.R, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'R', 0.01, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.r, options.R, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'uComponent', 0, 6.2931, 0.0001).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.r, options.R, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vComponent', 0, 6.2931, 0.0001).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.r, options.R, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
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