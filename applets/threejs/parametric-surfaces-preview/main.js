/*!
Adapted from:
Parametric Surface 2
Copyright (c) 2024 by Wakana Y.K. (https://codepen.io/wakana-k/pen/BaeypJL)

This version by Juan Carlos Ponce Campuzano
07-Mar-2025
*/

"use strict";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import "three/addons/exporters/OBJExporter.js";


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('static/textures/matcaps/2.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Handles mouse interactions for texture effect
function toggleTexture(event, enable) {
  event.preventDefault();
  let index = event.target?.dataset?.index;
  if (index !== undefined) {
      const object = scenes[index].children[0];

      // Check if texture should be enabled
      if (enable) {
        // Set material back to its original material (you might need to store the original material)
          // Assuming you have the original material saved (let's call it originalMaterial)
          object.material = object.originalMaterial || new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, wireframe: false });
          
      } else {
          // Set material to MeshMatcapMaterial with texture
          object.material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, side: THREE.DoubleSide });
      }
  }
}

// **Sea Shell Surface**
function seaShell(u, v, target) {
    u *= 2;
    v *= 2;
    let factor = 1 - 0.5 * v;
    let x =
        0.5 * factor * Math.cos(3 * v * Math.PI) * (1 + Math.cos(u * Math.PI));
    let y =
        0.5 * factor * Math.sin(3 * v * Math.PI) * (1 + Math.cos(u * Math.PI));
    let z = v + 0.5 * factor * Math.sin(u * Math.PI);
    target.set(x, y, z);
}

// **Bonan-Jeener Klein Surface**
function bonanJeener(u, v, target) {
    u = 2 * Math.PI * u;
    v = 2 * Math.PI * v;
    let factor = Math.sin(7 * u) + 2;
    let x =
        8 * Math.cos(u) -
        Math.cos(8 * u) -
        (7 / 8) * factor * Math.sin((9 * u) / 2) * Math.cos(v);
    let y = factor * Math.sin(v);
    let z =
        8 * Math.sin(u) -
        Math.sin(8 * u) +
        (7 / 8) * factor * Math.cos((9 * u) / 2) * Math.cos(v);
    target.set(x, y, z);
}

function pineCone(u, v, target) {
  u = u * Math.PI * 1;
  v = v * Math.PI * 17;

  let s = (Math.PI / 2) * Math.exp(-v / (8 * Math.PI));
  let factor = 1 - 0.5 * ((5 / 4) * Math.pow(1 - ((3.6 * v) % (2 * Math.PI)) / Math.PI, 2) - 0.25) ** 2;
  
  let h = 1.95653 * u ** 2 * (1.27689 * u - 1) ** 2 * Math.sin(s);
  let r = factor * (u * Math.sin(s) + h * Math.cos(s));
  
  let x = r * Math.sin(v);
  let y = r * Math.cos(v);
  let z = factor * (u * Math.cos(s) - h * Math.sin(s));

  target.set(x, y, z);
}

function apple1(u, v, target) {
  u = 2 * Math.PI * u;
  v = 2 * Math.PI * v - Math.PI;

  let x = Math.cos(u) * (4 + 3.8 * Math.cos(v));
  let y = Math.sin(u) * (4 + 3.8 * Math.cos(v));
  let z = (Math.cos(v) + Math.sin(v) - 1) * (1 + Math.sin(v)) * Math.log(1 - (Math.PI * v) / 10) + 7.5 * Math.sin(v);

  target.set(x, y, z);
}

// =========================
// **Scene and Object Setup**
// =========================

let camera, renderer, canvas, scenes = [], geometries = [];
let material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, side: THREE.DoubleSide });

// **Initialize Camera**
camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
camera.position.z = 3;
camera.fov = 2 * Math.atan(2 / (2 * camera.position.z)) * (180 / Math.PI);

// **Get Canvas Element**
canvas = document.getElementById("c");
renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);

// **Create and Transform Geometries**
let seaShellGeometry = new ParametricGeometry(seaShell, 25, 50);
seaShellGeometry.rotateX(-Math.PI / 2);
seaShellGeometry.scale(0.8, 0.8, 0.8);
seaShellGeometry.userData.title = "Sea Shell";
geometries.push(seaShellGeometry);

let bonanJeenerGeometry = new ParametricGeometry(bonanJeener, 100, 25);
bonanJeenerGeometry.rotateZ(-Math.PI / 2);
bonanJeenerGeometry.scale(0.1, 0.1, 0.1);
bonanJeenerGeometry.userData.title = "Bonan-Jeener's Klein Surface";
geometries.push(bonanJeenerGeometry);

let pineConeGeometry = new ParametricGeometry(pineCone, 25, 400);
pineConeGeometry.rotateX(Math.PI / 2);
pineConeGeometry.scale(0.01, 0.01, 0.01);
pineConeGeometry.userData.title = "Pinecone<br>(from <a target='_blank' href='https://nylander.wordpress.com/2006/06/21/rose-shaped-parametric-surface/'>Paul Nylander</a>)";
geometries.push(pineConeGeometry);

let appleGeometry = new ParametricGeometry(apple1, 25, 25);
appleGeometry.rotateX(-Math.PI / 4);
appleGeometry.scale(0.12, 0.12, 0.12);
appleGeometry.userData.title = "Apple";
geometries.push(appleGeometry);

// ==============================
// **Create Gallery for Objects**
// ==============================

const gallery = document.getElementById("gallery");
const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        entry.target.dataset.inView = entry.isIntersecting;
    }
});

for (let i = 0; i < geometries.length; i++) {
    let scene = new THREE.Scene();

    // **Create Card**
    let card = document.createElement("article");
    card.className = "card";

    // **Create Geometry Container**
    let geoContainer = document.createElement("div");
    geoContainer.className = "geo";
    geoContainer.dataset.index = i;
    geoContainer.dataset.inView = true;
    card.appendChild(geoContainer);

    // **Create Title**
    let title = document.createElement("div");
    title.className = "title";
    title.innerText = "Parametric Surface " + (i + 1);
    card.appendChild(title);

    gallery.appendChild(card);
    scene.userData.element = geoContainer;

    // **Clone Camera**
    let sceneCamera = camera.clone();
    scene.userData.camera = sceneCamera;

    // **Setup Controls**
    let controls = new OrbitControls(sceneCamera, geoContainer);
    controls.autoRotate = true;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    scene.userData.controls = controls;

    // **Prepare Geometry**
    let geometry = geometries[geometries.length - i - 1];
    geometry = BufferGeometryUtils.mergeVertices(geometry);
    geometry.computeBoundingSphere();
    geometry.computeVertexNormals();
    geometry.center();

    // **Create and Add Mesh**
    let sceneMaterial = material.clone();
    scene.add(new THREE.Mesh(geometry, sceneMaterial));

    if (geometry.userData.title) {
        title.innerHTML = geometry.userData.title;
    }

    scenes.push(scene);

    // **Wireframe Event Listeners**
    geoContainer.addEventListener("pointerenter", (e) => toggleTexture(e, true));
    geoContainer.addEventListener("pointerleave", (e) => toggleTexture(e, false));
    geoContainer.addEventListener("pointerout", (e) => toggleTexture(e, false));
    geoContainer.addEventListener("pointercancel", (e) => toggleTexture(e, false));

    observer.observe(geoContainer);
}

// =====================
// **Render Function**
// =====================
function render() {
    requestAnimationFrame(render);
    
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
    }

    renderer.setScissorTest(false);
    renderer.clear();
    renderer.setScissorTest(true);

    scenes.forEach((scene) => {
        let element = scene.userData.element;
        let rect = element.getBoundingClientRect();

        if (element.dataset.inView === "false") return;

        let viewWidth = Math.ceil(rect.width);
        let viewHeight = Math.ceil(rect.height);
        let viewLeft = Math.ceil(rect.left);
        let viewBottom = document.documentElement.offsetHeight - rect.bottom;
        let viewBottomOffset = document.documentElement.offsetHeight - renderer.domElement.getBoundingClientRect().bottom;
        let viewY = Math.ceil(viewBottom - viewBottomOffset);

        renderer.setViewport(viewLeft, viewY, viewWidth, viewHeight);
        renderer.setScissor(viewLeft, viewY, viewWidth, viewHeight);

        let sceneCamera = scene.userData.camera;
        scene.userData.controls.update();
        renderer.render(scene, sceneCamera);
    });
}

render();

// **Smooth Scrolling with Lenis.js**
const lenis = new Lenis();
requestAnimationFrame(function animate(time) {
    lenis.raf(time);
    requestAnimationFrame(animate);
});
