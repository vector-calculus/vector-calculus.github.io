/**
 * Sphere as a Parametric Surface
 */
function parametricSphere(u, v, target) {
    const theta = u * Math.PI * 2;
    const phi = v * Math.PI;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);
    target.set(x, y, z);
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

// **Another Example Surface**
function kleinBottle(u, v, target) {
    u = u * Math.PI * 2;
    v = v * Math.PI * 2;
    
    let x = (Math.cos(u) * (3 + Math.cos(v))) / 2;
    let y = (Math.sin(u) * (3 + Math.cos(v))) / 2;
    let z = Math.sin(v);
    
    target.set(x, y, z);
}

export { parametricSphere, seaShell, kleinBottle }