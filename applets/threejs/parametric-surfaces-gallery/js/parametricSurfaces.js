// Define commonly used Math functions
const cos = Math.cos;
const sin = Math.sin;
const cosh = Math.cosh;
const sinh = Math.sinh;
const log = Math.log;
const exp = Math.exp;
const pow = Math.pow;
const tan = Math.tan;
const PI = Math.PI;
const max = Math.max;
const min = Math.min;

export function appleSurface(u, v, target) {
    u = 2 * PI * u;
    v = 2 * PI * v - PI;

    let x = cos(u) * (4 + 3.8 * cos(v));
    let y = sin(u) * (4 + 3.8 * cos(v));
    let z = (cos(v) + sin(v) - 1) * (1 + sin(v)) * log(1 - (PI * v) / 10) + 7.5 * sin(v);

    target.set(x, y, z);
}

export function cylinderSurface(u, v, target, h) {
    u = 2 * PI * u;
    v = h * v;

    const scale = 1;
    let x = scale * cos(u);
    let y = scale * sin(u);
    let z = scale * (v - 0.5);
    target.set(x, y, z);
}

export function dinniSurface(u, v, target, a, b) {
    u = 4 * PI * u;
    v = max(0.01, min(2, v));  // Ensure v is between 0.01 and 2

    let x = a * cos(u) * sin(v);
    let y = a * sin(u) * sin(v);
    let z = a * (cos(v) + log(tan(v / 2))) + b * u;

    target.set(x, y, z);
}

export function enneperSurface(u, v, target) {
    u = 3 * u - 1.5;
    v = 3 * v - 1.5;

    let x = u - pow(u, 3) + u * pow(v, 2);
    let y = v - pow(v, 3) + pow(u, 2) * v;
    let z = pow(u, 2) - pow(v, 2);

    target.set(x, y, z);
}

export function hornSurface(u, v, target, a, b, c) {
    u = 1 * u;
    v = 2 * PI * v - PI;

    let x, y, z;
    x = (a + u * cos(v) ) * sin(b * PI * u);
    y = (a + u * cos(v) ) * cos(b * PI * u) + c * u;
    z = u * sin(v);

    target.set(x, y, z);
}

export function hyperhelicoidSurface(u, v, target, a) {
    u = 8 * u - 4;
    v = 8 * v - 4;

    const d = 1 + cosh(u) * cosh(v);

    let x = sinh(v) * cos(a * u) / d;
    let y = sinh(v) * sin(a * u) / d;
    let z = cosh(v) * sinh(u) / d;

    target.set(x, y, z);
}

export function hyperoctahedronSurface(u, v, target) {
    u = PI * u - PI / 2;
    v = 2 * PI * v - PI;

    let x = pow(cos(u) * cos(v), 3);
    let y = pow(sin(u) * cos(v), 3);
    let z = pow(sin(v), 3);

    target.set(x, y, z);
}

export function hyperspiralSurface(u, v, target, H, a) {
    u = a * u;
    v = 1 * v;

    let x = cos(u) / u;
    let y = H * v - 0.5;
    let z = sin(u) / u;

    target.set(x, y, z);
}

export function juliaheartSurface(u, v, target) {
    // Convert parameters to radians
    u *= PI * 2;
    v *= PI;

    const x = (4 * sin(u) - sin(3 * u)) * sin(v);
    const y = 2 * cos(v);
    const z = 1.2 * (4 * cos(u) - cos(2 * u) - cos(3 * u) / 2) * sin(v);

    return target.set(x, y, z);
}

export function kleinbottleSurface(u, v, target, a, b, c) {
    u = c * u;
    v = 2 * PI * v;

    const r = 2.5 * (1 - cos(u) / 2);

    let x, y, z;
    if (0 <= u && u < PI) {
        x = a * cos(u) * (1 + sin(u)) + r * cos(u) * cos(v);
        y = b * sin(u) + r * sin(u) * cos(v);
        z = r * sin(v);
    } else if (PI <= u && u <= 2 * PI) {
        x = a * cos(u) * (1 + sin(u)) + r * cos(v + PI);
        y = b * sin(u);
        z = r * sin(v);
    }

    target.set(x, y, z);
}

export function mobiusSurface(u, v, target, R) {
    u = 2 * u - 1;
    v = 2 * PI * v;

    let x = (R + u * cos(v / 2)) * cos(v);
    let y = (R + u * cos(v / 2)) * sin(v);
    let z = u * sin(v / 2);
    target.set(x, y, z);
}

export function pineconeSurface(u, v, target) {
    u = u * PI * 1;
    v = v * PI * 17;

    let s = (PI / 2) * exp(-v / (8 * PI));
    let factor = 1 - 0.5 * pow((5 / 4) * pow(1 - ((3.6 * v) % (2 * PI)) / PI, 2) - 0.25, 2);

    let h = 1.95653 * pow(u, 2) * pow(1.27689 * u - 1, 2) * sin(s);
    let r = factor * (u * sin(s) + h * cos(s));

    let x = r * sin(v);
    let y = r * cos(v);
    let z = factor * (u * cos(s) - h * sin(s)) + 65;

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
    v *= 2 * PI;
    const f = exp(u / (PI * 6 * 1)) - 1;
    const scale = 0.4;
    let x = scale * (2 * f * cos(u) * cos(v / 2) * cos(v / 2));
    let y = scale * (2 * (-f) * sin(u) * cos(v / 2) * cos(v / 2));
    let z = scale * (4 - exp(u / a) - sin(v) + exp(u / (PI * 6 * 1)) * sin(v));
    target.set(x, y, z);
}

export function sphereSurface(u, v, target, r) {
    const theta = u * PI * 2;
    const phi = v * PI;
    const x = r * sin(phi) * cos(theta);
    const y = r * sin(phi) * sin(theta);
    const z = r * cos(phi);
    target.set(x, y, z);
}

export function torusSurface(u, v, target, r, R) {
    u = 2 * PI * u;
    v = 2 * PI * v;

    let x = cos(u) * (r / 2 * cos(v) + R);
    let y = sin(u) * (r / 2 * cos(v) + R);
    let z = r / 2 * sin(v);

    target.set(x, y, z);
}