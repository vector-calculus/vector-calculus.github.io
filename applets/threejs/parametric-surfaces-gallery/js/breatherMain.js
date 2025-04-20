import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { breatherSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';
 
/* 
 * This code in pretty ugly.
 * Maybe in the future I will refactor it. :P
 */

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    autoRotate: true,
    a: 0.5,
    uMin: -13.2,
    uMax: 13.2,
    vMin: -34.2,
    vMax: 34.2,
    color: '#049ef4',
    colorBackground: '#000000'
};

// Scene setup
const canvas = document.querySelector('canvas.webgl');
const { scene, camera, renderer, controls } = setupScene(canvas);

// Materials
const materials = createMaterials(options);

// Geometry
const meshRes = { x: 240, y: 240 };
const geoScale = { x: 0.3, y: 0.3, z: 0.3 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.uMin, options.uMax, options.vMin, options.vMax), meshRes.x, meshRes.y);
geometry.rotateZ(Math.PI / 2.2);
geometry.scale(geoScale.x, geoScale.y, geoScale.z);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);
scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls); // Call commonUI with necessary arguments

gui.add(options, 'a', 0.1, 0.9, 0.1).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.uMin, options.uMax, options.vMin, options.vMax), meshRes.x, meshRes.y);
    geometry.rotateZ(Math.PI / 2.2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'uMin', -50, 50, 0.01).name('uMin').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.uMin, options.uMax, options.vMin, options.vMax), meshRes.x, meshRes.y);
    geometry.rotateZ(Math.PI / 2.2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'uMax', -50, 50, 0.01).name('uMax').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.uMin, options.uMax, options.vMin, options.vMax), meshRes.x, meshRes.y);
    geometry.rotateZ(Math.PI / 2.2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vMin', -100, 100, 0.01).name('uMin').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.uMin, options.uMax, options.vMin, options.vMax), meshRes.x, meshRes.y);
    geometry.rotateZ(Math.PI / 2.2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vMax', -100, 100, 0.01).name('vMax').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.uMin, options.uMax, options.vMin, options.vMax), meshRes.x, meshRes.y);
    geometry.rotateZ(Math.PI / 2.2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

controls.autoRotate = true;
controls.autoRotateSpeed = - 0.4;

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();