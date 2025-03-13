export function appleSurface(u, v, target) {
    u = 2 * Math.PI * u;
    v = 2 * Math.PI * v - Math.PI;

    let x = Math.cos(u) * (4 + 3.8 * Math.cos(v));
    let y = Math.sin(u) * (4 + 3.8 * Math.cos(v));
    let z = (Math.cos(v) + Math.sin(v) - 1) * (1 + Math.sin(v)) * Math.log(1 - (Math.PI * v) / 10) + 7.5 * Math.sin(v);

    target.set(x, y, z);
}

export function cylinderSurface(u, v, target, h) {
    u = 2 * Math.PI * u;
    v = h * v;

    const scale = 1;
    let x = scale * (Math.cos(u));
    let y = scale * (Math.sin(u));
    let z = scale * (v - 0.5);
    target.set(x, y, z);
}

export function mobiusSurface(u, v, target, R) {
    u = 2 * u -1;
    v = 2 * Math.PI * v;

    let x = (R + u * Math.cos(v / 2)) * Math.cos(v);
    let y = (R + u * Math.cos(v / 2)) * Math.sin(v);
    let z = u * Math.sin(v / 2)
    target.set(x, y, z);
}

export function pineconeSurface(u, v, target) {
    u = u * Math.PI * 1;
    v = v * Math.PI * 17;

    let s = (Math.PI / 2) * Math.exp(-v / (8 * Math.PI));
    let factor = 1 - 0.5 * ((5 / 4) * Math.pow(1 - ((3.6 * v) % (2 * Math.PI)) / Math.PI, 2) - 0.25) ** 2;

    let h = 1.95653 * u ** 2 * (1.27689 * u - 1) ** 2 * Math.sin(s);
    let r = factor * (u * Math.sin(s) + h * Math.cos(s));

    let x = r * Math.sin(v);
    let y = r * Math.cos(v);
    let z = factor * (u * Math.cos(s) - h * Math.sin(s)) + 65;

    target.set(x, y, z);
}

export function planeSurface(u, v, target) {
    u = 3 * u - 1.5;
    v = 3 * v - 1.5;

    const scale = 0.4;
    let x = scale * (1.5 * u - 1.0 * v + 1.0);
    let y = scale * (1.0 * u + 1.0 * v + 0.5);
    let z = scale * (1.0 * u + 1.0 * v + 1.0);

    target.set(x, y, z);
}
export function seashellSurface(u, v, target, a) {
    u *= 20;
    v *= 2 * Math.PI;
    const f = Math.exp(u / (Math.PI * 6 * 1)) - 1;
    const scale = 0.4;
    let x = scale * (2 * f * Math.cos(u) * Math.cos(v / 2) * Math.cos(v / 2));
    let y = scale * (2 * (-f) * Math.sin(u) * Math.cos(v / 2) * Math.cos(v / 2));
    let z = scale * (4 - Math.exp(u / a) - Math.sin(v) + Math.exp(u / (Math.PI * 6 * 1)) * Math.sin(v));
    target.set(x, y, z);
}

export function sphereSurface(u, v, target, r) {
    const theta = u * Math.PI * 2;
    const phi = v * Math.PI;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    target.set(x, y, z);
}

export function torusSurface(u, v, target, r, R) {
    u = 2 * Math.PI * u;
    v = 2 * Math.PI * v;


    let x = (Math.cos(u) * (r / 2 * Math.cos(v) + R));
    let y = (Math.sin(u) * (r / 2 * Math.cos(v) + R));
    let z = (r / 2 * Math.sin(v));

    target.set(x, y, z);
}