import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { hyperspiralSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    autoRotate: true,
    H: 1,
    uComponent: 25,
    vComponent: 1,
    color: '#049ef4',
    colorBackground: '#000000'
};

// Scene setup
const canvas = document.querySelector('canvas.webgl');
const { scene, camera, renderer, controls } = setupScene(canvas);

// Materials
const materials = createMaterials(options);

// Geometry
const meshRes = { x: 125, y: 80 };
const geoScale = { x: 1.5, y: 1.5, z: 1.5 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.H, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
geometry.rotateX(-Math.PI / 2);
geometry.scale(geoScale.x, geoScale.y, geoScale.z);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);
scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
gui.add(options, 'material', ['Matcap', 'Normal', 'Phong']).name('Style').onChange((value) => {
    mesh.material = value === 'Matcap' ? materials.matcapMaterial :
        value === 'Normal' ? materials.normalMaterial :
            materials.phongMaterial;
    if (value === 'Phong') {
        colorController.show();
    } else {
        colorController.hide();
    }
});

const colorController = gui.addColor(options, 'color').name('Color').onChange((value) => {
    materials.phongMaterial.color.set(value);
});
colorController.hide();

gui.add(options, 'mesh').name('Mesh').onChange((value) => {
    if (value) {
        if (!scene.children.includes(wireframeMesh)) {
            scene.add(wireframeMesh);
        }
    } else {
        if (scene.children.includes(wireframeMesh)) {
            scene.remove(wireframeMesh);
        }
    }
    wireframeMesh.visible = value;
});

gui.add(options, 'H', 0.01, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.H, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'uComponent', 5, 40, 0.01).name('u').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.H, options.uComponent, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'autoRotate').name('Auto Rotate').onChange(value => {
    controls.autoRotate = value;
});

gui.close();

controls.autoRotate = true;
controls.autoRotateSpeed = - 0.6;

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();