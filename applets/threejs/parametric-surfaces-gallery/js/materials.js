import * as THREE from 'three';

export function createMaterials(options) {
    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load('static/textures/matcaps/3.png');

    const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, side: THREE.DoubleSide });
    const normalMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const phongMaterial = new THREE.MeshPhongMaterial({ color: options.color, shininess: 100, side: THREE.DoubleSide });
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, wireframe: true });

    return { matcapMaterial, normalMaterial, phongMaterial, wireframeMaterial };
}