export function commonUI(gui, options, scene, materials, mesh, wireframeMesh, controls) {
    gui.add(options, 'material', ['Matcap', 'Normal', 'Phong']).name('Style').onChange((value) => {
        mesh.material = value === 'Matcap' ? materials.matcapMaterial :
            value === 'Normal' ? materials.normalMaterial :
                materials.phongMaterial;
        if (value === 'Phong') {
            colorController.show();
            colorBackgroundController.show();
        } else {
            colorController.hide();
            colorBackgroundController.hide();
        }
    });

    const colorController = gui.addColor(options, 'color').name('Color').onChange((value) => {
        materials.phongMaterial.color.set(value);
    });
    const colorBackgroundController = gui.addColor(options, 'colorBackground').name('Background').onChange((value) => {
        scene.background.set(value);
    });

    colorController.hide();
    colorBackgroundController.hide();

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

    gui.add(options, 'autoRotate').name('Auto Rotate').onChange(value => {
        controls.autoRotate = value;
    });

    gui.close();
}