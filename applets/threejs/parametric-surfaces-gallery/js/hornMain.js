import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { hornSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    autoRotate: true,
    a: 4,
    b: 2,
    c: 3.5,
    uComponent: 1,
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
const meshRes = { x: 64, y: 64 };
const geoScale = { x: 0.25, y: 0.25, z: 0.25 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
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

gui.add(options, 'a', 1.5, 5, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'b', 0, 5, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'c', -5, 7, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'uComponent', 0, 1, 0.01).name('u').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vComponent', -3.1415, 3.1415, 0.0001).name('v').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 3);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

controls.autoRotate = true;
controls.autoRotateSpeed = - 0.7;

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();