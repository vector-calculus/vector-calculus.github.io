import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { snailsmusselsSurface as parametricSurface } from './parametricSurfaces.js';
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
    a: 1.25,
    b: 1.25,
    c: 1.0,
    h: 3.5,
    k: 0.0,
    w: 0.12,
    R: 1,
    uMin: -40,
    uMax: -1,
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
const meshRes = { x: 180, y: 100 };
const geoScale = { x: 0.25, y: 0.25, z: 0.25 };
let geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.h, options.k, options.w, options.R, options.uMin, options.uMax, options.vComponent), meshRes.x, meshRes.y);
geometry.rotateX(-Math.PI / 2);
geometry.scale(geoScale.x, geoScale.y, geoScale.z);

// Mesh
let mesh = new THREE.Mesh(geometry, materials.matcapMaterial);
scene.add(mesh);
scene.background = new THREE.Color('#000000'); // Initial Black background

// Wireframe mesh
let wireframeMesh = new THREE.Mesh(geometry, materials.wireframeMaterial);

// GUI controls
commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls); // Call commonUI with necessary arguments


// Function to create geometry
function createGeometry(params) {
    const geometry = new ParametricGeometry(
        (u, v, target) => parametricSurface(u, v, target, params.a, params.b, params.c, params.h, params.k, params.w, params.R, params.uMin, params.uMax, params.vComponent),
        meshRes.x, meshRes.y
    );
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    return geometry;
}

// Function to update parameters and regenerate geometry
function updateParameters(params) {
    Object.assign(options, params); // Update options with new params
    // options.a = params.a;
    // options.b = params.b;
    // options.c = params.c;
    // options.h = params.h;
    // options.k = params.k;
    // options.w = params.w;
    // options.R = params.R;
    // options.uMin = params.uMin;
    // options.uMax = params.uMax;

    // Regenerate the geometry with the new parameters
    geometry = createGeometry(options);

    // Create a new mesh with the updated geometry
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;

    // Add the new mesh to the scene
    scene.add(mesh);

    // If the wireframe mesh was visible before, add it back to the scene
    if (options.mesh) {
        scene.add(wireframeMesh);
    }
}

// Function to update GUI controls
function updateControls(params) {
    Object.keys(params).forEach(key => {
        if (controls[key] !== undefined) {
            controls[key] = params[key];
            // Find the corresponding GUI controller and update its display
            gui.controllersRecursive().forEach(controller => {
                if (controller.property === key) {
                    controller.updateDisplay();
                }
            });
        }
    });
}

function setAstroceras() {
    const params = {
        a: 1.25,
        b: 1.25,
        c: 1.0,
        h: 3.5,
        k: 0.0,
        w: 0.12,
        R: 1,
        uMin: -40,
        uMax: -1
    };
    updateParameters(params);
    controls.a = params.a;
    controls.b= params.b;
    controls.c= params.c;
    controls.h= params.h;
    controls.k= params.k;
    controls.w= params.w;
    aControl.updateDisplay();
    bControl.updateDisplay();
    cControl.updateDisplay();
    hControl.updateDisplay();
    kControl.updateDisplay();
    wControl.updateDisplay();
    
}

function setBellerophina() {
    const params = {
        a: 0.85,
        b: 1.2,
        c: 1.0,
        h: 0.75,
        k: 0.0,
        w: 0.06,
        R: 1,
        uMin: -10,
        uMax: -1
    };
    updateParameters(params);
    controls.a = params.a;
    controls.b= params.b;
    controls.c= params.c;
    controls.h= params.h;
    controls.k= params.k;
    controls.w= params.w;
    aControl.updateDisplay();
    bControl.updateDisplay();
    cControl.updateDisplay();
    hControl.updateDisplay();
    kControl.updateDisplay();
    wControl.updateDisplay();
}

function setMyarrenaria() {
    const params = {
        a: 0.85,
        b: 1.6,
        c: 3.0,
        h: 0.9,
        k: 0,
        w: 2.5,
        R: 1,
        uMin: -4,
        uMax: 0.4
    };

    updateParameters(params);
    controls.a = params.a;
    controls.b= params.b;
    controls.c= params.c;
    controls.h= params.h;
    controls.k= params.k;
    controls.w= params.w;
    aControl.updateDisplay();
    bControl.updateDisplay();
    cControl.updateDisplay();
    hControl.updateDisplay();
    kControl.updateDisplay();
    wControl.updateDisplay();
}

function setNaticastellata() {
    const params = {
        a: 2.6,
        b: 2.4,
        c: 1.0,
        h: 1.25,
        k: -2.8,
        w: 0.19,
        R: 1,
        uMin: -20,
        uMax: -1
    };

    updateParameters(params);
    controls.a = params.a;
    controls.b= params.b;
    controls.c= params.c;
    controls.h= params.h;
    controls.k= params.k;
    controls.w= params.w;
    aControl.updateDisplay();
    bControl.updateDisplay();
    cControl.updateDisplay();
    hControl.updateDisplay();
    kControl.updateDisplay();
    wControl.updateDisplay();
}

function setNautilus() {
    const params = {
        a: 1.0,
        b: 0.6,
        c: 1.0,
        h: 1.0,
        k: 0,
        w: 0.18,
        R: 1,
        uMin: -20,
        uMax: 1
    };

    updateParameters(params);
    controls.a = params.a;
    controls.b= params.b;
    controls.c= params.c;
    controls.h= params.h;
    controls.k= params.k;
    controls.w= params.w;
    aControl.updateDisplay();
    bControl.updateDisplay();
    cControl.updateDisplay();
    hControl.updateDisplay();
    kControl.updateDisplay();
    wControl.updateDisplay();
}

function setPseudoheliceras() {
    const params = {
        a: 1.6,
        b: 1.6,
        c: 1.0,
        h: 1.5,
        k: -7.0,
        w: 0.075,
        R: 1,
        uMin: -50,
        uMax: -1
    };
    updateParameters(params);
    controls.a = params.a;
    controls.b= params.b;
    controls.c= params.c;
    controls.h= params.h;
    controls.k= params.k;
    controls.w= params.w;
    aControl.updateDisplay();
    bControl.updateDisplay();
    cControl.updateDisplay();
    hControl.updateDisplay();
    kControl.updateDisplay();
    wControl.updateDisplay();
    
}

gui.add({ setAstroceras: () => setAstroceras() }, 'setAstroceras').name('Astroceras');
gui.add({ setBellerophina: () => setBellerophina() }, 'setBellerophina').name('Bellerophina');
gui.add({ setMyarrenaria: () => setMyarrenaria() }, 'setMyarrenaria').name('Myarrenaria');
gui.add({ setNaticastellata: () => setNaticastellata() }, 'setNaticastellata').name('Naticastellata');
gui.add({ setNautilus: () => setNautilus() }, 'setNautilus').name('Nautilus');
gui.add({ setPseudoheliceras: () => setPseudoheliceras() }, 'setPseudoheliceras').name('Pseudoheliceras');

const aControl = gui.add(options, 'a', 0, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.h, options.k, options.w, options.R, options.uMin, options.uMax, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

const bControl = gui.add(options, 'b', 0, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.h, options.k, options.w, options.R, options.uMin, options.uMax, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

const cControl = gui.add(options, 'c', 0, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.h, options.k, options.w, options.R, options.uMin, options.uMax, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

const hControl = gui.add(options, 'h', -3, 3, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.h, options.k, options.w, options.R, options.uMin, options.uMax, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

const kControl = gui.add(options, 'k', -7, 7, 0.01).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.h, options.k, options.w, options.R, options.uMin, options.uMax, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
    geometry.scale(geoScale.x, geoScale.y, geoScale.z);
    mesh.geometry = geometry;
    wireframeMesh.geometry = geometry;
});

const wControl = gui.add(options, 'w', -0.25, 1, 0.001).onChange(() => {
    geometry.dispose();
    geometry = new ParametricGeometry((u, v, target) => parametricSurface(u, v, target, options.a, options.b, options.c, options.h, options.k, options.w, options.R, options.uMin, options.uMax, options.vComponent), meshRes.x, meshRes.y);
    geometry.rotateX(-Math.PI / 2);
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