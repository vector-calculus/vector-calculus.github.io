import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { ParametricGeometries } from 'three/addons/geometries/ParametricGeometries.js';

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('static/textures/matcaps/3.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load('static/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Vector Calculus', {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });

    textGeometry.center();
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);
});

/**
 * Create Geometries
 */
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

const objects = [];
const maxObjects = 250;

// Function to create Klein bottle
const kleinGeometry = new ParametricGeometry(ParametricGeometries.klein, 20, 20);

const torusGeometry =  new THREE.TorusGeometry( 13, 6, 20, 20 );

const knotGeometry = new THREE.TorusKnotGeometry( 10, 2, 90, 20 )

scene.background = new THREE.Color(0x000000); // Set background to black (hex format)

for (let i = 0; i < maxObjects; i++) {
    let geometry;

    const randomType = Math.random();
    if (randomType < 0.33) {
        geometry = knotGeometry
    } else if (randomType < 0.66) {
        geometry = torusGeometry;
    } else {
        geometry = kleinGeometry;
    }

    const object = new THREE.Mesh(geometry, material);

    // Random position
    object.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );

    // Random rotation
    object.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );

    // Random scale
    const scale = Math.random() * 0.03;
    object.scale.set(scale, scale, scale);

    scene.add(object);
    objects.push(object);
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 1, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate objects
    objects.forEach((object, i) => {
        object.rotation.x = 0.6 * elapsedTime;
        object.rotation.y = 0.3 * elapsedTime;
    });

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
