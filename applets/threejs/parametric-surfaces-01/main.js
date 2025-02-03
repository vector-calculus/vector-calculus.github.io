/*!
Parametric Surface
Copyright (c) 2024 by Wakana Y.K. (https://codepen.io/wakana-k/pen/poBBRmN)
*/
"use strict";
console.clear();
import * as THREE from "three";
import { OrbitControls as t } from "three/addons/controls/OrbitControls.js";
import { ParametricGeometry as a } from "three/addons/geometries/ParametricGeometry.js";
!(function () {
  let e,
    s,
    h,
    n,
    M,
    i,
    o,
    c = [],
    r = [];
  (i = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, wireframe: !1 })),
    ((e = new THREE.PerspectiveCamera(50, 1, 1, 10)).position.z = 3);
  function u(t, a) {
    t.preventDefault();
    let e = null;
    t.target && t.target.dataset.index && (e = t.target.dataset.index),
      e && (c[e].children[0].material.wireframe = a);
  }
  function l(t, a, e) {
    let s = t;
    t += 3 * (a = a * Math.PI * 2);
    let h = Math.cos(a) * (6 - (5 / 4 + Math.sin(3 * t)) * Math.sin(t - 3 * a)),
      n = Math.sin(a) * (6 - (5 / 4 + Math.sin(3 * t)) * Math.sin(t - 3 * a)),
      M = -Math.sin(t - 3 * a) * (5 / 4 + Math.cos(3 * t));
    return (
      (h *= Math.cos(1.55 * s)),
      (n *= Math.cos(1.55 * s)),
      (M += 8 * Math.cos(s)),
      e.set(h, n, M)
    );
  }
  function P(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    let s = Math.cos(a) * (6 - (2 + Math.sin(3 * t)) * Math.sin(t - 3 * a)),
      h = Math.sin(a) * (6 - (2 + Math.sin(3 * t)) * Math.sin(t - 3 * a)),
      n = -Math.cos(t - 3 * a) * (2 + Math.sin(3 * t));
    return e.set(s, h, n);
  }
  function I(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    let s = Math.cos(a) * (5 - (6 + Math.sin(3 * t)) * Math.sin(t - 3 * a)),
      h = Math.sin(a) * (5 - (6 + Math.sin(3 * t)) * Math.sin(t - 3 * a)),
      n = -Math.cos(t - 3 * a) * (6 + Math.sin(3 * t));
    return (
      n > 6 * 1.05 && ((n = 6 * 1.05), (s = 0), (h = 0)),
      (s *= Math.cos((n + 3) / 6)),
      (h *= Math.cos((n + 3) / 6)),
      (n *= 2),
      e.set(s, h, n)
    );
  }
  function p(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    let s = Math.cos(a) * (5 - (5 + Math.cos(4 * t)) * Math.cos(t - 4 * a)),
      h = Math.sin(a) * (5 - (5 + Math.cos(4 * t)) * Math.cos(t - 4 * a)),
      n = 5 + Math.sin(4 * t);
    return e.set(s, h, n);
  }
  function d(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    let s = Math.cos(a) * (6 - (2 + Math.sin(4 * t))),
      h = Math.sin(a) * (6 - (2 + Math.sin(4 * t))),
      n = -Math.cos(t - 4 * a) * (2 + Math.sin(4 * t));
    return e.set(s, h, n);
  }
  function f(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    let s = 2 + Math.sin(3 * t + 10 * a),
      h = s * Math.cos(t) * Math.sin(a),
      n = s * Math.sin(t) * Math.cos(a),
      M = s * Math.sin(a);
    return e.set(h, n, M);
  }
  function m(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    let s = 2 + Math.sin(6 * t + 5 * a),
      h = s * Math.cos(t) * Math.sin(a),
      n = s * Math.sin(t) * Math.sin(a),
      M = s * Math.cos(a);
    return e.set(h, n, M);
  }
  function w(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    let s = 2 + Math.sin(5 * t + 10 * a),
      h = s * Math.cos(t) * Math.sin(a),
      n = s * Math.sin(t) * Math.sin(a),
      M = s * Math.cos(a);
    return e.set(h, n, M);
  }
  function D(t, a, e) {
    t *= 2;
    let s = 1 - 0.5 * (a *= 2),
      h =
        0.5 * s * Math.cos(3 * a * Math.PI) * (1 + Math.cos(t * Math.PI)) +
        0 * Math.cos(3 * a * Math.PI),
      n =
        0.5 * s * Math.sin(3 * a * Math.PI) * (1 + Math.cos(t * Math.PI)) +
        0 * Math.sin(3 * a * Math.PI),
      M = 1 * a + 0.5 * s * Math.sin(t * Math.PI);
    return e.set(h, n, M);
  }
  function g(t, a, e) {
    (t *= Math.PI), (a = a * Math.PI * 2);
    let s = ((Math.cos(t) - Math.cos(2 * t)) * Math.cos(a)) / 4,
      h = ((Math.sin(t) - Math.sin(2 * t)) * Math.sin(a)) / 4,
      n = Math.cos(t);
    return e.set(s, h, n);
  }
  function E(t, a, e) {
    (t = t * Math.PI * 2), (a *= 3);
    let s = (2.3 * Math.exp(-Math.pow(1.5 * a, 2)) - 1.2) * Math.cos(t),
      h = a,
      n = (2.3 * Math.exp(-Math.pow(1.5 * a, 2)) - 1.2) * Math.sin(t);
    return e.set(s, h, n);
  }
  function v(t, a, e) {
    (t = 3 * t - 1.5), (a *= 1);
    let s = Math.sinh(2 * t) / (Math.cos(10 * t) + Math.cosh(2 * t)),
      h = 1 * a,
      n = Math.sin(10 * t) / (Math.cos(10 * t) + Math.cosh(2 * t));
    return e.set(s, h, n);
  }
  function T(t, a, e) {
    (t *= 2 * Math.PI), (a = a * (Math.PI / 2 - 0.25) + 0.25);
    let s = 1 * Math.cos(a) * Math.cos(t),
      h = -1 / Math.tan(a),
      n = 1 * Math.cos(a) * Math.sin(t);
    return e.set(s, h, n);
  }
  function b(t, a, e) {
    t *= 2 * Math.PI;
    let s = (a *= 20) * Math.cos(t),
      h = 1 * Math.cos(2 * t + 2 * a),
      n = a * Math.sin(t);
    return e.set(s, h, n);
  }
  function S(t, a, e) {
    (t *= 2 * Math.PI), (a = a * (2 * Math.PI) - Math.PI);
    let s = 1 * Math.cos(t) * Math.cos(a),
      h = 1 * Math.sin(a) + 1 * t,
      n = 1 * Math.sin(t) * Math.cos(a);
    return e.set(s, h, n);
  }
  function R(t, a, e) {
    (t *= 1), (a *= 2 * Math.PI);
    let s = 0.6 * Math.sqrt(t * (t - 1) * (t - 2)) * Math.sin(a),
      h = t,
      n = 0.6 * Math.sqrt(t * (t - 1) * (t - 2)) * Math.cos(a);
    return e.set(s, h, n);
  }
  function H(t, a, e) {
    (t = t * Math.PI * 2 - Math.PI), (a = a * Math.PI * 2 - Math.PI);
    let s = Math.cos(t) * (5 + 4.8 * Math.cos(a)) + Math.pow(a / Math.PI, 20),
      h = Math.sin(t) * (5 + 4.8 * Math.cos(a)) + 0.25 * Math.cos(5 * t),
      n = -2.3 * Math.log(1 - 0.3157 * a) + 6 * Math.sin(a) + 2 * Math.cos(a);
    return e.set(s, h, n);
  }
  function x(t, a, e) {
    (t *= Math.PI), (a *= 2 * Math.PI);
    let s = Math.cos(t),
      h = Math.cos(a),
      n = 0.5 * Math.sin(t) * Math.sin(a);
    return e.set(s, h, n);
  }
  function X(t, a, e) {
    (t = 2 * Math.PI * t), (a = 2 * Math.PI * a);
    let s = Math.sin(7 * t) + 2,
      h =
        8 * Math.cos(t) -
        Math.cos(8 * t) -
        (7 / 8) * s * Math.sin((9 * t) / 2) * Math.cos(a),
      n = s * Math.sin(a),
      M =
        8 * Math.sin(t) -
        Math.sin(8 * t) +
        (7 / 8) * s * Math.cos((9 * t) / 2) * Math.cos(a);
    return e.set(h, n, M);
  }
  function B(t, a, e) {
    (t *= Math.PI), (a = a * Math.PI * 2);
    let s = 0.25 * Math.sin(2 * t) * Math.cos(a) ** 2,
      h = 0.25 * Math.sin(t) * Math.sin(2 * a),
      n = 0.25 * Math.cos(t) * Math.sin(2 * a);
    return e.set(s, h, n);
  }
  function C(t, a, e) {
    let s = 0.4;
    (t = 26.4 * t - 13.2), (a = 2 * a * 37.4 - 37.4);
    let h = Math.sqrt(0.84),
      n = s * ((h * Math.cosh(s * t)) ** 2 + (s * Math.sin(h * a)) ** 2),
      M = -t + (1.68 * Math.cosh(s * t) * Math.sinh(s * t)) / n,
      i =
        (2 *
          h *
          Math.cosh(s * t) *
          (-h * Math.cos(a) * Math.cos(h * a) -
            Math.sin(a) * Math.sin(h * a))) /
        n,
      o =
        (2 *
          h *
          Math.cosh(s * t) *
          (-h * Math.sin(a) * Math.cos(h * a) +
            Math.cos(a) * Math.sin(h * a))) /
        n;
    return e.set(M, o, i);
  }
  function L(t, a, e) {
    (t *= Math.PI), (a = a * Math.PI * 2);
    var s = 0.5 * (1 - Math.cos(t)) * Math.sin(t) * Math.cos(a),
      h = 0.5 * (1 - Math.cos(t)) * Math.sin(t) * Math.sin(a),
      n = Math.cos(t);
    return e.set(s, h, n);
  }
  function q(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    var s = (4 * Math.sin(t) - Math.sin(3 * t)) * Math.sin(a),
      h = 2 * Math.cos(a),
      n =
        1.2 *
        (4 * Math.cos(t) - Math.cos(2 * t) - Math.cos(3 * t) / 2) *
        Math.sin(a);
    return e.set(s, h, n);
  }
  function y(t, a, e) {
    (t = t * Math.PI * 2), (a = (a - 0.5) * Math.PI);
    const s =
        1 *
        Math.cos(t) *
        Math.cos(t) *
        Math.cos(t) *
        Math.cos(a) *
        Math.cos(a) *
        Math.cos(a),
      h =
        1 *
        Math.sin(t) *
        Math.sin(t) *
        Math.sin(t) *
        Math.cos(a) *
        Math.cos(a) *
        Math.cos(a),
      n = 1 * Math.sin(a) * Math.sin(a) * Math.sin(a);
    return e.set(s, h, n);
  }
  function V(t, a, e) {
    (t = t * Math.PI * 2), (a = (a - 0.5) * Math.PI);
    const s = 1 * Math.cos(t) * Math.cos(a) * Math.cos(a) * Math.cos(a),
      h = 1 * Math.sin(t) * Math.cos(a) * Math.cos(a) * Math.cos(a),
      n = 1 * Math.sin(a) * Math.sin(a) * Math.sin(a);
    return e.set(s, h, n);
  }
  function N(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    const s = 16 * Math.pow(Math.sin(t), 3) * Math.cos(a),
      h =
        -13 * Math.cos(t) +
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) +
        Math.cos(4 * t),
      n = -16 * Math.pow(Math.sin(t), 3) * Math.sin(a);
    return e.set(s, h, n);
  }
  function Z(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    const s = 1 * Math.sin(t),
      h = 1 * Math.sin(a),
      n = 1 * Math.sin(t + a);
    return e.set(s, h, n);
  }
  /*! from https://codepen.io/boytchev/pen/qBLKpjx */ function A(t, a, e) {
    (t *= 2 * Math.PI), (a *= 2 * Math.PI);
    var s = (Math.cos(a) ** 20 + Math.sin(a) ** 20) ** -0.05,
      h = (4 + s * Math.cos(a + 3 * t)) * Math.cos(t),
      n = (4 + s * Math.cos(a + 3 * t)) * Math.sin(t),
      M = s * Math.sin(a + 3 * t);
    return e.set(h, n, M);
  }
  function K(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 2);
    const s =
        (2 +
          Math.cos(a / 2) * Math.sin(t) -
          Math.sin(a / 2) * Math.sin(2 * t)) *
        Math.cos(a),
      h =
        (2 +
          Math.cos(a / 2) * Math.sin(t) -
          Math.sin(a / 2) * Math.sin(2 * t)) *
        Math.sin(a),
      n = Math.sin(a / 2) * Math.sin(t) + Math.cos(a / 2) * Math.sin(2 * t);
    return e.set(s, h, n);
  }
  function j(t, a, e) {
    (t = t * (2 * Math.PI) - Math.PI), (a = a * (2 * Math.PI) - Math.PI);
    let s =
        Math.cos(t) *
        (2 + Math.sin(a) * Math.cos(t) - (Math.sin(2 * a) * Math.sin(t)) / 2),
      h = Math.sin(t) * Math.sin(a) + (Math.cos(t) * Math.sin(2 * a)) / 2,
      n =
        Math.sin(t) *
        (2 + Math.sin(a) * Math.cos(t) - (Math.sin(2 * a) * Math.sin(t)) / 2);
    return e.set(s, h, n);
  }
  function z(t, a, e) {
    (t = 4 * t * Math.PI), (a = 2 * a * Math.PI);
    var s =
        (3 +
          Math.cos((3 * t) / 2) * Math.sin(a) -
          Math.sin((3 * t) / 2) * Math.sin(2 * a)) *
        Math.cos((1 * t) / 2),
      h =
        (3 +
          Math.cos((3 * t) / 2) * Math.sin(a) -
          Math.sin((3 * t) / 2) * Math.sin(2 * a)) *
        Math.sin((1 * t) / 2),
      n =
        Math.sin((3 * t) / 2) * Math.sin(a) +
        Math.cos((3 * t) / 2) * Math.sin(2 * a);
    return e.set(s, h, n);
  }
  (e.fov = 2 * Math.atan(2 / (2 * e.position.z)) * (180 / Math.PI)),
    (o = document.getElementById("c")),
    (h = new THREE.WebGLRenderer({
      canvas: o,
      antialias: !0,
      alpha: !0
    })).setPixelRatio(window.devicePixelRatio),
    ((M = new a(y, 25, 25)).userData.title = "Astroidal Ellipsoid"),
    r.push(M),
    (M = new a(V, 25, 25)).rotateX(Math.PI / 2),
    M.rotateZ(-Math.PI / 8),
    r.push(M),
    (M = new a(Z, 50, 50)).scale(0.5, 0.5, 0.5),
    (M.userData.title = "Sine Surface"),
    r.push(M),
    (M = new a(B, 50, 50)).scale(3, 3, 3),
    (M.userData.title = "Roman Surface"),
    r.push(M),
    (M = new a(f, 50, 200)).scale(0.3, 0.3, 0.3),
    r.push(M),
    (M = new a(C, 50, 50)).rotateZ(-Math.PI / 2),
    M.rotateX(-Math.PI / 4),
    M.scale(0.15, 0.15, 0.15),
    (M.userData.title = "breather"),
    r.push(M),
    (M = new a(X, 100, 25)).rotateZ(-Math.PI / 2),
    M.scale(0.1, 0.1, 0.1),
    (M.userData.title = "bonanJeenerKlein"),
    r.push(M),
    (M = new a(x, 20, 20)).scale(0.8, 0.8, 0.8),
    (M.userData.title = "Pillow"),
    r.push(M),
    (M = new a(S, 15, 15)).scale(0.3, 0.3, 0.3),
    (M.userData.title = "twistedSphere"),
    r.push(M),
    (M = new a(b, 50, 25)).rotateX(-Math.PI / 4),
    M.scale(0.06, 0.06, 0.06),
    (M.userData.title = "spiralWaves"),
    r.push(M),
    (M = new a(T, 25, 25)).scale(0.5, 0.5, 0.5),
    (M.userData.title = "bullet"),
    r.push(M),
    (M = new a(v, 300, 2)).rotateX(-Math.PI / 2),
    M.scale(0.4, 0.4, 0.4),
    (M.userData.title = "tanh Spiral"),
    r.push(M),
    (M = new a(E, 25, 15)).scale(0.5, 0.5, 0.5),
    (M.userData.title = "gauss Cylinder"),
    r.push(M),
    (M = new a(g, 20, 15)).rotateZ(-Math.PI / 2),
    (M.userData.title = "fish Surface"),
    r.push(M),
    (M = new a(D, 25, 50)).rotateX(-Math.PI / 2),
    M.scale(0.8, 0.8, 0.8),
    (M.userData.title = "seashell"),
    r.push(M),
    (M = new a(N, 50, 50)).scale(0.05, 0.05, 0.05),
    r.push(M),
    (M = new a(L, 25, 25)).rotateX(-Math.PI / 2),
    (M.userData.title = "droplet"),
    r.push(M),
    (M = new a(R, 20, 25)).scale(2, 2, 2),
    (M.userData.title = "egg"),
    r.push(M),
    (M = new a(q, 50, 20)).rotateX(-Math.PI / 2),
    M.scale(0.2, 0.2, 0.2),
    (M.userData.title = "Julia's Parametric Heart Surface"),
    r.push(M),
    (M = new a(H, 25, 25)).rotateX(-Math.PI / 4),
    M.scale(0.1, 0.1, 0.1),
    (M.userData.title = "apple2"),
    r.push(M),
    (M = new a(K, 50, 50)).scale(0.3, 0.3, 0.3),
    (M.userData.title = "Klein Bottle1"),
    r.push(M),
    (M = new a(j, 50, 50)).rotateX(-Math.PI / 2),
    M.scale(0.3, 0.3, 0.3),
    (M.userData.title = "Klein Bottle2"),
    r.push(M),
    (M = new a(A, 50, 30)).scale(0.2, 0.2, 0.2),
    (M.userData.title =
      "Twisted Torus<br>(from <a target='_blank' href='https://codepen.io/boytchev/pen/qBLKpjx'>Pavel Boytchev</a>)"),
    r.push(M),
    (M = new a(z, 50, 50)).scale(0.25, 0.25, 0.25),
    (M.userData.title = "Twisted Torus2"),
    r.push(M),
    (M = new a(P, 20, 70)).scale(0.12, 0.12, 0.12),
    (M.userData.title = "Twisted Torus3"),
    r.push(M),
    (M = new a(l, 10, 100)).rotateX(Math.PI / 2),
    M.scale(0.18, 0.18, 0.18),
    (M.userData.title = "merengue1"),
    r.push(M),
    (M = new a(I, 30, 200)).rotateX(-Math.PI / 2),
    M.scale(0.1, 0.08, 0.1),
    (M.userData.title = "merengue2"),
    r.push(M),
    (M = new a(d, 100, 100)).scale(0.2, 0.2, 0.2),
    r.push(M),
    (M = new a(p, 30, 100)).scale(0.1, 0.1, 0.1),
    r.push(M),
    (M = new a(w, 100, 100)).scale(0.3, 0.3, 0.3),
    (M.userData.title = "twistedSphere2"),
    r.push(M),
    (M = new a(m, 100, 100)).scale(0.3, 0.3, 0.3),
    (M.userData.title = "twistedSphere3"),
    r.push(M),
    (function () {
      const a = document.getElementById("gallery"),
        h = new IntersectionObserver((t) => {
          for (const a of t)
            a.isIntersecting
              ? (a.target.dataset.inView = !0)
              : (a.target.dataset.inView = !1);
        });
      for (let o = 0; o < r.length; o++) {
        s = new THREE.Scene();
        const l = document.createElement("article");
        l.className = "card";
        const P = document.createElement("div");
        (P.className = "geo"),
          (P.dataset.index = o),
          (P.dataset.inView = !0),
          l.appendChild(P);
        const I = document.createElement("div");
        (I.className = "title"),
          (I.innerText = "Parametric surface " + (o + 1)),
          l.appendChild(I),
          (s.userData.element = P),
          a.appendChild(l),
          (e = e.clone()),
          (s.userData.camera = e),
          ((n = new t(s.userData.camera, s.userData.element)).autoRotate = !0),
          (n.minDistance = 2),
          (n.maxDistance = 10),
          (n.enablePan = !1),
          (n.enableZoom = !1),
          (n.enableDamping = !0),
          (s.userData.controls = n),
          (M = r[r.length - o - 1]).computeBoundingSphere(),
          M.computeVertexNormals(),
          M.center(),
          (i = i.clone()),
          s.add(new THREE.Mesh(M, i)),
          M.userData.title && (I.innerHTML = M.userData.title),
          c.push(s),
          P.addEventListener(
            "pointerenter",
            (t) => {
              u(t, !0);
            },
            !1
          ),
          P.addEventListener(
            "pointerleave",
            (t) => {
              u(t, !1);
            },
            !1
          ),
          P.addEventListener(
            "pointerout",
            (t) => {
              u(t, !1);
            },
            !1
          ),
          P.addEventListener(
            "pointercancel",
            (t) => {
              u(t, !1);
            },
            !1
          ),
          h.observe(P);
      }
    })(),
    (function t() {
      requestAnimationFrame(t);
      (function () {
        const t = o.clientWidth,
          a = o.clientHeight;
        (o.width === t && o.height === a) || h.setSize(t, a, !1);
      })(),
        h.setScissorTest(!1),
        h.clear(),
        h.setScissorTest(!0),
        c.forEach(function (t) {
          const a = t.userData.element,
            e = a.getBoundingClientRect();
          if ("false" == a.dataset.inView) return;
          let s = e.width,
            n = e.height;
          (s = Math.ceil(s)), (n = Math.ceil(n));
          let M = e.left,
            i =
              document.documentElement.offsetHeight -
              e.bottom -
              (document.documentElement.offsetHeight -
                h.domElement.getBoundingClientRect().bottom);
          (M = Math.ceil(M)),
            (i = Math.ceil(i)),
            h.setViewport(M, i, s, n),
            h.setScissor(M, i, s, n);
          const o = t.userData.camera;
          t.userData.controls.update(), h.render(t, o);
        });
    })();
})();
const e = new Lenis();
function s(t) {
  e.raf(t), requestAnimationFrame(s);
}
requestAnimationFrame(s);