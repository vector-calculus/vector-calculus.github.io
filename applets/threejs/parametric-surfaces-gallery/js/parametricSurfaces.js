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

/**
 * @param {*} u
 * @param {*} v 
 * @param {*} target 
 * Extra parameters...
 * @param {*} uComponent - slider
 * @param {*} vComponent - slider
 */

export function appleSurface(u, v, target, uComponent, vComponent) {
    u = uComponent * u;
    v = -PI + (vComponent - (-PI)) * v;

    let x = cos(u) * (4 + 3.8 * cos(v));
    let y = sin(u) * (4 + 3.8 * cos(v));
    let z = (cos(v) + sin(v) - 1) * (1 + sin(v)) * log(1 - (PI * v) / 10) + 7.5 * sin(v);

    target.set(x, y, z);
}

export function bernatSurface(u, v, target, s, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let fx, fy, fz, gx, gy, gz, q;
    fx = 4.503 * cos(v);
    fy = 3.266 * sin(v);
    fz = 0;

    gx = s * 3.006 * cos(v);
    gy = s * 2.266 * sin(v);
    gz = - s * 3.006 * cos(v);

    q = 0.251 * pow(u, 3) + 0.389 * pow(u, 2) - 1.64 * u + 1;


    let x = u * fx + q * gx;
    let y = u * fy + q * gy;
    let z = u * fz + q * gz;

    target.set(x, y, z);
}

export function cylinderSurface(u, v, target, h, uComponent, vComponent) {
    u = uComponent * u;
    v = h * v;

    let x = cos(u);
    let y = sin(u);
    let z = (v - 0.5);
    target.set(x, y, z);
}

export function dinniSurface(u, v, target, a, b, uComponent, vComponent) {
    u = uComponent * u;
    v = max(0.01, min(vComponent, v));  // Ensure v is between 0.01 and 2

    let x = a * cos(u) * sin(v);
    let y = a * sin(u) * sin(v);
    let z = a * (cos(v) + log(tan(v / 2))) + b * u;

    target.set(x, y, z);
}

export function dupincyclideSurface(u, v, target, a, b, c, d, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let h = a - c * cos(u) * cos(v);

    // Check if h is zero or very close to zero
    if (Math.abs(h) < 1e-10) {
        return null; // Return null to indicate an invalid point
    }

    let x, y, z;
    x = (d * (c - a * cos(u) * cos(v)) + b * b * cos(u)) / h;
    y = (b * sin(u) * (a - d * cos(v))) / h;
    z = (b * sin(v) * (c * cos(u) - d)) / h;

    target.set(x, y, z);
    return target; // Return the valid point

}

export function eggSurface(u, v, target, a, b, c, vComponent) {
    u = a * u;
    v = vComponent * v;

    const x = c * pow(u * (u - a) * (u - b), 0.5) * sin(v);
    const y = u;
    const z = c * pow(u * (u - a) * (u - b), 0.5) * cos(v);

    target.set(x, y, z);
    return target; // Return the valid point
}

export function enneperSurface(u, v, target, uComponent, vComponent) {
    const min = -2
    u = min + (uComponent - min) * u;
    v = min + (vComponent - min) * v;

    let x = u - pow(u, 3) / 3 + u * pow(v, 2);
    let y = v - pow(v, 3) / 3 + pow(u, 2) * v;
    let z = pow(u, 2) - pow(v, 2);

    target.set(x, y, z);
}

function projection(w, x, y, z) {
    let a, b, c;

    a = w / (1 - z);
    b = x / (1 - z);
    c = y / (1 - z);

    return { x: a, y: b, z: c }
}

export function figure8knotSurface(u, v, target, uComponent, vComponent) {
    u = 2 * PI * u;
    v = 2 * PI * v;

    let x = u - pow(u, 3) + u * pow(v, 2);
    let y = v - pow(v, 3) + pow(u, 2) * v;
    let z = pow(u, 2) - pow(v, 2);

    target.set(x, y, z);
}

export function hornSurface(u, v, target, a, b, c, uComponent, vComponent) {
    const umin = 0;
    const vmin = -PI;
    u = umin + (uComponent - umin) * u;
    v = vmin + (vComponent - vmin) * v;

    let x, y, z;
    x = (a + u * cos(v)) * sin(b * PI * u);
    y = (a + u * cos(v)) * cos(b * PI * u) + c * u;
    z = u * sin(v);

    target.set(x, y, z);
}

export function hyperhelicoidSurface(u, v, target, a, uComponent, vComponent) {
    const umin = -4;
    const vmin = -4;
    u = umin + (uComponent - umin) * u;
    v = vmin + (vComponent - vmin) * v;

    const d = 1 + cosh(u) * cosh(v);

    let x = cos(a * u) * sinh(v) / d;
    let y = sin(a * u) * sinh(v) / d;
    let z = cosh(v) * sinh(u) / d;

    target.set(x, y, z);
}

export function hyperoctahedronSurface(u, v, target, uComponent, vComponent) {
    const umin = -PI / 2;
    const vmin = -PI;
    u = umin + (uComponent - umin) * u;
    v = vmin + (vComponent - vmin) * v;

    let x = pow(cos(u) * cos(v), 3);
    let y = pow(sin(u) * cos(v), 3);
    let z = pow(sin(v), 3);

    target.set(x, y, z);
}

export function hyperspiralSurface(u, v, target, H, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x, y, z;
    x = cos(u) / u;
    y = H * v - 0.5;
    z = sin(u) / u;

    target.set(x, y, z);
}

export function juliaheartSurface(u, v, target, uComponent, vComponent) {
    // Convert parameters to radians
    u *= uComponent;
    v *= vComponent;

    let x, y, z;
    x = (4 * sin(u) - sin(3 * u)) * sin(v);
    y = 2 * cos(v);
    z = 1.2 * (4 * cos(u) - cos(2 * u) - cos(3 * u) / 2) * sin(v);

    return target.set(x, y, z);
}

export function kleinbottleSurface(u, v, target, a, b, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    const r = 2.5 * (1 - cos(u) / 2);

    let x, y, z;
    if (0 <= u && u < PI) {
        x = a * cos(u) * (1 + sin(u)) + r * cos(u) * cos(v);
        y = b * sin(u) + r * sin(u) * cos(v);
    } else if (PI <= u && u <= 2 * PI) {
        x = a * cos(u) * (1 + sin(u)) + r * cos(v + PI);
        y = b * sin(u);
    }
    z = r * sin(v);

    target.set(x, y, z);
}

export function kleinbottlenordstrandSurface(u, v, target, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x, y, z;
    x = cos(u) * (cos(u / 2) * (pow(2, 0.5) + cos(v)) + sin(u / 2) * sin(v) * cos(v));
    y = sin(u) * (cos(u / 2) * (pow(2, 0.5) + cos(v)) + sin(u / 2) * sin(v) * cos(v));
    z = - sin(u / 2) * (pow(2, 0.5) + cos(v) + cos(u / 2) * sin(v) * cos(v));

    target.set(x, y, z);
}

export function lawsonbottleSurface(u, v, target, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x, y, z, w;
    w = (sin(u) * sin(v) + sin(u / 2) * cos(v)) / pow(2, 0.5);

    x = (sin(u) * sin(v) - sin(u / 2) * cos(v)) / (pow(2, 0.5) * (1 + w));
    y = cos(u) * sin(v) / (1 + w);
    z = cos(u / 2) * cos(v) / (1 + w);

    target.set(x, y, z);
}

export function maederowlSurface(u, v, target, uComponent, vComponent) {
    u = uComponent * u;
    v = max(0.001, min(vComponent, v));

    let x = v * cos(u) - 0.5 * (v ** 2) * cos(2 * u);
    let y = - v * sin(u) - 0.5 * (v ** 2) * sin(2 * u);
    let z = 4 * exp(1.5 * log(v)) * cos(3 * u / 2) / 3
    target.set(x, y, z);
}

export function mobiusSurface(u, v, target, R, uComponent, vComponent) {
    const umin = -1;
    u = umin + (uComponent - umin) * u;
    v = vComponent * v;

    let x = (R + u * cos(v / 2)) * cos(v);
    let y = (R + u * cos(v / 2)) * sin(v);
    let z = u * sin(v / 2);
    target.set(x, y, z);
}

export function planeSurface(u, v, target, uComponent, vComponent) {
    const umin = -1.5;
    const vmin = -1.5;
    u = umin + (uComponent - umin) * u;
    v = vmin + (vComponent - vmin) * v;

    //u = 3 * u - 1.5;
    //v = 3 * v - 1.5;

    let x = (1.5 * u - 1.0 * v + 1.0);
    let y = (1.0 * u + 1.0 * v + 0.5);
    let z = (1.0 * u + 1.0 * v + 1.0);

    target.set(x, y, z);
}

/* 
 * Rose-shaped by Paul Nylander
 * https://nylander.wordpress.com/2006/06/21/rose-shaped-parametric-surface/
 */
export function roseSurface(u, v, target, uMin) {
    u = 1 * u;
    v = uMin + (20 * PI - (uMin)) * v;

    let alpha, s, c, beta, r, x, y, z;
    alpha = 1 - 0.5 * pow(5 / 4 * pow(1 - ((3.6 * v) % (2 * PI)) / PI, 2) - 0.25, 2);
    s = sin(PI / 2 * exp(- v / (8 * PI)));
    c = cos(PI / 2 * exp(- v / (8 * PI)));
    beta = 1.95653 * pow(u, 2) * pow(1.27689 * u - 1, 2);
    r = s * (u + beta * c);

    x = r * alpha * sin(v);
    y = r * alpha * cos(v);
    z = u * c - beta * s * s;

    target.set(x, y, z);
}

export function seashellSurface(u, v, target, a, uComponent, vComponent) {
    u *= uComponent;
    v *= vComponent;

    const f = exp(u / (PI * 6 * 1)) - 1;
    const scale = 0.4;
    let x = scale * (2 * f * cos(u) * cos(v / 2) * cos(v / 2));
    let y = scale * (2 * (-f) * sin(u) * cos(v / 2) * cos(v / 2));
    let z = scale * (4 - exp(u / a) - sin(v) + exp(u / (PI * 6 * 1)) * sin(v));
    target.set(x, y, z);
}

export function snailsmusselsSurface(u, v, target, a, b, c, h, k, w, R, uMin, uMax, vComponent) {

    u = uMin + (uMax - uMin) * u;
    v = 2 * PI * v;

    let x = (h + a * cos(v)) * exp(w * u) * cos(c * u);
    let y = R * (h + a * cos(v)) * exp(w * u) * sin(c * u);
    let z = (k + b * sin(v)) * exp(w * u);

    target.set(x, y, z);
}

export function sphereSurface(u, v, target, r, uComponent, vComponent) {

    u = uComponent * u;
    v = vComponent * v;

    let x, y, z;
    x = r * cos(u) * sin(v);
    y = r * sin(u) * sin(v);
    z = r * cos(v);

    target.set(x, y, z);
}

export function torusSurface(u, v, target, r, R, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x = cos(u) * (r / 2 * cos(v) + R);
    let y = sin(u) * (r / 2 * cos(v) + R);
    let z = r / 2 * sin(v);

    target.set(x, y, z);
}

export function torus8figureSurface(u, v, target, c, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x = cos(u) * (c + sin(v) * cos(u) - sin(2 * v) * sin(u) / 2);
    let y = sin(u) * sin(v) + cos(u) * sin(2 * v) / 2
    let z = sin(u) * (c + sin(v) * cos(u) - sin(2 * v) * sin(u) / 2);

    target.set(x, y, z);
}

export function torusantisymmetricSurface(u, v, target, a, r, R, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x = (R + r * cos(v) * (a + sin(u))) * cos(u);
    let y = (R + r * cos(v) * (a + sin(u))) * sin(u);
    let z = r * sin(v) * (a + sin(u));

    target.set(x, y, z);
}

export function torusbraidedSurface(u, v, target, a, n, r, R, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x = r * cos(v) * cos(u) + R * cos(u) * (1 + a * cos(n * u));
    let y = 2.5 * (r * sin(v) + a * sin(n * u));
    let z = r * cos(v) * sin(u) + R * sin(u) * (1 + a * cos(n * u));

    target.set(x, y, z);
}

export function torusknotSurface(u, v, target, size, translate) {
    u = 4 * PI * u;
    v = 2 * PI * v;

    let NN = 1.5;
    let AA = 0.6;
    let w = 3 * cos(u) / 4;

    let XX, YY, ZZ;
    XX = -size * (cos(u) * cos(v) + 3 * cos(u) * (1.5 + sin(1.5 * u) / 2)) + translate;
    YY = size * (sin(u) * cos(v) + 3 * sin(u) * (1.5 + sin(1.5 * u) / 2));
    ZZ = size * (sin(v) + 2 * cos(1.5 * u));
    let norm2 = pow(XX, 2) + pow(YY, 2) + pow(ZZ, 2);

    let x = 0.5 * XX / norm2;
    let y = 0.5 * YY / norm2;
    let z = 0.5 * ZZ / norm2;

    target.set(x, y, z);
}

export function torustwisted8Surface(u, v, target, r, R, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x = (R + r * (cos(u / 2) * sin(v) - sin(u / 2) * sin(2 * v))) * cos(u);
    let y = (R + r * (cos(u / 2) * sin(v) - sin(u / 2) * sin(2 * v))) * sin(u);
    let z = r * (sin(u / 2) * sin(v) + cos(u / 2) * sin(2 * v));

    target.set(x, y, z);
}

export function torustwistedSurface(u, v, target, n, t, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let R = pow(pow(cos(v), n) + pow(sin(v), n), -1 / n);

    let x = (4 + R * cos(t * u + v)) * cos(u);
    let y = (4 + R * cos(t * u + v)) * sin(u);
    let z = R * sin(t * u + v);

    target.set(x, y, z);
}

export function torusumbilicSurface(u, v, target, uComponent, vComponent) {
    u = uComponent * u;
    v = vComponent * v;

    let x = sin(u) * (7 + cos(u / 3 - 2 * v) + 2 * cos(u / 3 + v));
    let y = cos(u) * (7 + cos(u / 3 - 2 * v) + 2 * cos(u / 3 + v));
    let z = sin(u / 3 - 2 * v) + 2 * sin(u / 3 + v);

    target.set(x, y, z);
}

export function trefoilknotSurface(u, v, target, uComponent, vComponent, size, tx, ty, tz) {
    u = uComponent * u;
    v = vComponent * v;

    let x, y, z;
    x = -size * (cos(u) * cos(v) + 3 * cos(u) * (1.5 + sin(1.5 * u) / 2)) + tx;
    y = size * (sin(u) * cos(v) + 3 * sin(u) * (1.5 + sin(1.5 * u) / 2)) + ty;
    z = size * (sin(v) + 2 * cos(1.5 * u)) + tz;

    target.set(x, y, z);
}