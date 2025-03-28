import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { paraboloidSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    autoRotate: true,
    a: 1,
    h: 1,
    uComponent: 1,
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
const meshRes = { x: 64, y: 64 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.h, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
geometry.translate(0,0,-0.5);
geometry.rotateX(-Math.PI / 2.2);


// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);
scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls); // Call commonUI with necessary arguments

gui.add(options, 'a', 0, 2, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.h,options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.translate(0,0,-0.5);
    geometry.rotateX(-Math.PI / 2.2);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'h', 0.5, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.h, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.translate(0,0,-0.5);
    geometry.rotateX(-Math.PI / 2.2);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'uComponent', 0.01, 1.5, 0.01).name('u').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.h, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.translate(0,0,-0.5);
    geometry.rotateX(-Math.PI / 2.2);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'vComponent', 0, 6.2831, 0.0001).name('v').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.h, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.translate(0,0,-0.5);
    geometry.rotateX(-Math.PI / 2.2);
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