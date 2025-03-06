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
const matcapTexture = textureLoader.load('static/textures/matcaps/2.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const matcapTextureText = textureLoader.load('static/textures/matcaps/2.png');
matcapTextureText.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load('static/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Parametric Surfaces', {
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
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTextureText });
    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);
});

/**
 * Create Geometries
 */
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, side: THREE.DoubleSide });

const objects = [];
const rotationSpeeds = []; // Array to store unique rotation speeds
const maxObjects = 500;

// Function to create Klein bottle
const kleinGeometry = new ParametricGeometry(ParametricGeometries.klein, 40, 40);

const torusGeometry = new THREE.TorusGeometry(10, 4, 30, 30);

const knotGeometry = new THREE.TorusKnotGeometry(10, 2, 90, 50);

const sphereGeometry = new ParametricGeometries.SphereGeometry(5, 30, 30);

// Function to create Möbius strip
const mobiusGeometry = new ParametricGeometry((u, v, target) => {
    u = u * Math.PI * 2; // Map u to [0, 2π]
    v = v * 2 - 1; // Map v to [-1,1] for proper width scaling

    const R = 6; // Radius of Möbius strip
    //const w = 1.5; // Half-width of the strip

    // Parametric equations for Möbius strip
    const x = (R + 2 * v * Math.cos(u / 2)) * Math.cos(u);
    const y = (R + 2 * v * Math.cos(u / 2)) * Math.sin(u);
    const z = v * Math.sin(u / 2);

    target.set(x, y, z);
}, 50, 50);

scene.background = new THREE.Color('#f9fafb'); // Set background to black (hex format)

for (let i = 0; i < maxObjects; i++) {
    let geometry;

    const randomType = Math.random();
    if (randomType < 0.2) {
        geometry = knotGeometry
    } else if (randomType < 0.4) {
        geometry = torusGeometry;
    } else if (randomType < 0.6) {
        geometry = kleinGeometry;
    } else if (randomType < 0.8) {
        geometry = kleinGeometry;
    } else {
        geometry = mobiusGeometry;
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
    const min = 0.01;  // Set your desired minimum value
    const max = 0.03;   // Set your desired maximum value

    // Generate a random number in the range [min, max]
    const scale = Math.random() * (max - min) + min;
    object.scale.set(scale, scale, scale);

    scene.add(object);
    objects.push(object);

    // Store unique rotation speed
    rotationSpeeds.push({
        x: (Math.random() - 0.5) * 2, // Random speed between -1 and 1
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2
    });
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
    //const elapsedTime = clock.getElapsedTime();

    // Rotate objects independently
    objects.forEach((object, i) => {
        object.rotation.x += rotationSpeeds[i].x * 0.005; // Adjust speed factor if needed
        object.rotation.y += rotationSpeeds[i].y * 0.005;
        object.rotation.z += rotationSpeeds[i].z * 0.005;
    });

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
