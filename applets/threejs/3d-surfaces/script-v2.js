import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { ParametricGeometries } from 'three/addons/geometries/ParametricGeometries.js';

//import gsap from 'gsap';

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
const matcapTextureText = textureLoader.load('static/textures/matcaps/11.png');
matcapTextureText.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    'static/fonts/Palatino_Roman.json',
    (font) =>
    {
        // Material
        const materialText = new THREE.MeshMatcapMaterial({ matcap: matcapTextureText })

        // Text
        const textGeometry = new TextGeometry(
            'Parametric\n Surfaces',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, materialText)
        scene.add(text)

        
    }
)
/**
 * Create Geometries
 */
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, side: THREE.DoubleSide });

const objects = [];
const rotationSpeeds = []; // Array to store unique rotation speeds
const maxObjects = 800;

// Function to create Klein bottle
const kleinGeometry = new ParametricGeometry(ParametricGeometries.klein, 40, 40);

const torusGeometry = new THREE.TorusGeometry(10, 4, 30, 30);

const knotGeometry = new THREE.TorusKnotGeometry(10, 2, 90, 50);

//const sphereGeometry = new ParametricGeometries.SphereGeometry(5, 30, 30);

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

scene.background = new THREE.Color('#000'); // Set background to black (hex format)

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

    

    const radius = 1 + 6 * Math.cbrt(Math.random());  // Cube root ensures uniform distribution inside the sphere
    const theta = Math.random() * Math.PI * 2;  // Random azimuthal angle
    const phi = Math.acos(2 * Math.random() - 1); // Random polar angle (ensures uniformity)

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    object.position.set(x, y, z);

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

// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

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
camera.position.set(0, 0, 0);
scene.add(camera);

gsap.to(camera.position, {
    x: 0,
    y: 1,
    z: 4,
    duration: 5,
    ease: "power2.in",
    onUpdate: () => camera.lookAt(0, 0, 0)
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = - 0.2;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

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