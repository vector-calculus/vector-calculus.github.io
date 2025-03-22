import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { torusknotSurface as parametricSurface, sphereSurface, trefoilknotSurface } from './parametricSurfaces.js';
import { createMaterials } from './materials.js';
import { setupScene } from './sceneSetup.js';
import { commonUI } from './commonUI.js';

// GUI setup
const gui = new GUI();
const options = {
    material: 'Matcap', // Default material
    mesh: false,
    size: 0.12,
    translate: -0.71,
    autoRotate: false,
    color: '#049ef4',
    colorBackground: '#000000'
};

// Scene setup
const canvas = document.querySelector('canvas.webgl');
const { scene, camera, renderer, controls } = setupScene(canvas);

// Materials
const materials = createMaterials(options);

// Geometry
const meshRes = { x: 500, y: 100 };
const geoScale = { x: 1, y: 1, z: 1 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.size, options.translate), meshRes.x, meshRes.y);
geometry.rotateX(Math.PI/2);
geometry.scale(geoScale.x, geoScale.y, geoScale.z);

let geometrySphere = new ParametricGeometry((u, v, target) => sphereSurface(u, v, target, 1, 6.2831, 3.1415), 20, 20);
geometrySphere.rotateX(Math.PI/2);
geometrySphere.scale(geoScale.x, geoScale.y, geoScale.z);

// Create wireframe for sphere
const wireframeGeometrySphere = new THREE.WireframeGeometry(geometrySphere);
const wireframeMaterialSphere = new THREE.LineBasicMaterial({ color: 0xbfbfbf }); // White wireframe
const wireframeSphere = new THREE.LineSegments(wireframeGeometrySphere, wireframeMaterialSphere);


let geometryKnot = new ParametricGeometry((u, v, target) => trefoilknotSurface(u, v, target, 4 * Math.PI, 2 * Math.PI, options.size, options.translate, 0, 0), 64, 64);
geometryKnot.rotateX(Math.PI/2);
geometryKnot.scale(geoScale.x, geoScale.y, geoScale.z);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);

let materialSphere = new THREE.MeshPhongMaterial({
    color: '#ffffff', 
    //shininess: 100, 
    side: THREE.DoubleSide, 
    transparent: true,
    opacity: 0.1, 
    wireframe: true
});

let meshSphere = new THREE.Mesh(geometrySphere, materialSphere);
scene.add(meshSphere);
scene.add(wireframeSphere);


let materialKnot = new THREE.MeshPhongMaterial({
    color: '#00ffff', 
    shininess: 200, 
    side: THREE.DoubleSide, 
    transparent: true,
    opacity: 0.5, 
    //wireframe: true
});

let meshKnot = new THREE.Mesh(geometryKnot, materialKnot);
scene.add(meshKnot);

scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls); // Call commonUI with necessary arguments

gui.add(options, 'size', 0.01, 2, 0.01).name('Dilate').onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.size, options.translate), meshRes.x, meshRes.y);
    geometry.rotateX(Math.PI/2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;

    wireframeMesh.geometry = geometry;

    // Update the trefoil knot surface
    geometryKnot.dispose();
    geometryKnot = new ParametricGeometry((u, v, target) => trefoilknotSurface(u, v, target, 4 * Math.PI, 2 * Math.PI, options.size, options.translate, 0, 0), 64, 64);
    geometryKnot.rotateX(Math.PI / 2);
    geometryKnot.scale(geoScale.x, geoScale.y, geoScale.z);
    meshKnot.geometry = geometryKnot;
    
});

// gui.add(options, 'translate', -3, 3, 0.01).name('Translate').onChange(() => {
//     geometry.dispose();
//     geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.size, options.translate), meshRes.x, meshRes.y);
//     geometry.rotateX(Math.PI/2);
//     geometry.scale(geoScale.x, geoScale.y, geoScale.z);
//     mesh.geometry = geometry;
//     wireframeMesh.geometry = geometry;

//     // Update the trefoil knot surface
//     geometryKnot.dispose();
//     geometryKnot = new ParametricGeometry((u, v, target) => trefoilknotSurface(u, v, target, 4 * Math.PI, 2 * Math.PI, options.size, options.translate, 0, 0), 64, 64);
//     geometryKnot.rotateX(Math.PI / 2);
//     geometryKnot.scale(geoScale.x, geoScale.y, geoScale.z);
//     meshKnot.geometry = geometryKnot;
// });


let time = 0; // Time variable for animation

function animate() {
    time += 0.001; // Adjust speed of animation here
    options.translate = Math.sin(time) * 3; // Example: Oscillating translation

    // Update geometry dynamically
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => 
        parametricSurface(u, v, target, options.size, options.translate), 
        meshRes.x, meshRes.y
    );
    geometry.rotateX(Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;

    // Update the trefoil knot surface
    geometryKnot.dispose();
    geometryKnot = new ParametricGeometry((u, v, target) => 
        trefoilknotSurface(u, v, target, 4 * Math.PI, 2 * Math.PI, options.size, options.translate, 0, 0), 
        64, 64
    );
    geometryKnot.rotateX(Math.PI / 2);
    geometryKnot.scale(geoScale.x, geoScale.y, geoScale.z);
    meshKnot.geometry = geometryKnot;

    requestAnimationFrame(animate);
}

// Start animation
animate();

gui.open();

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

controls.autoRotate = false;
controls.autoRotateSpeed = - 0.9;

// Animation loop
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();