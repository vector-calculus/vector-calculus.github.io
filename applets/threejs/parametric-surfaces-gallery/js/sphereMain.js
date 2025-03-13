import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { sphereSurface as parametricSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    autoRotate: true,
    r: 1,
    color: '#049ef4'
};

// Scene setup
const canvas = document.querySelector('canvas.webgl');
const { scene, camera, renderer, controls } = setupScene(canvas);

// Materials
const materials = createMaterials(options);

// Geometry
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.r), 64, 64);
geometry.rotateX(-Math.PI / 2.9);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);

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

gui.add(options, 'r', 0.01, 2, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.r), 64, 64);
    geometry.rotateX(-Math.PI / 2);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

gui.add(options, 'autoRotate').name('Auto Rotate').onChange(value => {
    controls.autoRotate = value;
});

gui.close();

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();