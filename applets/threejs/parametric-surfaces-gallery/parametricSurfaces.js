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
    u *= 20;
    v *= 2 * Math.PI;
    const f = Math.exp(u / (Math.PI * 6 * 1)) - 1;
    const scale = 0.4;
    let x = scale * ( 2 * f * Math.cos(u) * Math.cos(v / 2) * Math.cos(v / 2));
    let y = scale * ( 2 * (-f) * Math.sin(u) * Math.cos(v / 2) * Math.cos(v / 2));
    let z = scale * ( 4 - Math.exp(u / (options.a)) - Math.sin(v) + Math.exp(u / (Math.PI * 6 * 1)) * Math.sin(v));
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