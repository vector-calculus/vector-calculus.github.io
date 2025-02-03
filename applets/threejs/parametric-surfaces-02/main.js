/*!
Parametric Surface 2
Copyright (c) 2024 by Wakana Y.K. (https://codepen.io/wakana-k/pen/BaeypJL)
*/
"use strict";
import * as c from "three";
import { OrbitControls as u } from "three/addons/controls/OrbitControls.js";
import { ParametricGeometry as t } from "three/addons/geometries/ParametricGeometry.js";
import * as l from "three/addons/utils/BufferGeometryUtils.js";
import "three/addons/exporters/OBJExporter.js";
{
  function P(t, a) {
    t.preventDefault();
    let e = null;
    (e = t.target && t.target.dataset.index ? t.target.dataset.index : e) &&
      (o[e].children[0].material.wireframe = a);
  }
  function m(t, a, e) {
    var t = t * Math.PI * 2,
      a = (a - 0.5) * Math.PI,
      s = +Math.cos(a),
      n = s * Math.cos(t),
      s = s * Math.sin(t),
      t = 0.3 * Math.sin(a);
    e.set(n, s, t);
  }
  function d(t, a, e) {
    var t = t * Math.PI * 2,
      a = (a - 0.5) * Math.PI,
      s = +Math.cos(a),
      n = s * Math.cos(t),
      s = s * Math.sin(t),
      t = 0.3 * Math.sin(2 * a) * Math.cos(a);
    e.set(n, s, t);
  }
  function I(t, a, e) {
    var t = t * Math.PI * 2,
      a = (a - 0.5) * Math.PI,
      s = +Math.cos(a),
      n = s * Math.cos(t),
      s = s * Math.sin(t),
      a = 0.5 * Math.sin(2 * a) * Math.sin(t);
    e.set(n, s, a);
  }
  function p(t, a, e) {
    var t = t * Math.PI * 2,
      a = (a - 0.5) * Math.PI,
      s = +Math.cos(a),
      n = s * Math.cos(t),
      s = s * Math.sin(t),
      a = 0.5 * Math.sin(2 * a) * Math.sin(t) * Math.cos(t);
    e.set(n, s, a);
  }
  function f(t, a, e) {
    var t = t * Math.PI * 2,
      a = (a - 0.5) * Math.PI,
      s = +Math.cos(a),
      n = s * Math.cos(t),
      s = s * Math.sin(t),
      t = 0.3 * Math.sin(2 * a);
    e.set(n, s, t);
  }
  function w(t, a, e) {
    t = t * Math.PI * 2;
    var s = (Math.cos((a = a * Math.PI * 2)) ** 4 + Math.sin(a) ** 4) ** -0.25,
      n = (5 + s * Math.cos(a)) * Math.cos(t),
      t = (5 + s * Math.cos(a)) * Math.sin(t),
      s = s * Math.sin(a);
    return e.set(n, t, s);
  }
  function v(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 4);
    var s = 1 + 0.3 * Math.abs(Math.sin(4 * t)) - 0.3,
      n = (s = (s /= 4) * Math.sin(a)) * Math.cos(t),
      s = s * Math.sin(t);
    return e.set(n, (a / 4) * 1, s);
  }
  function D(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 3);
    var s = 1 + 0.5 * Math.abs(Math.sin(3 * t)) - 0.5,
      a = (s *= Math.sin(a)) * Math.cos(t),
      s = s * Math.sin(t),
      t = 3 * +Math.cos(t / 3);
    return e.set(a, t, s);
  }
  function g(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 5);
    var s = 1 + 0.3 * Math.abs(Math.sin(3 * t)) - 0.3,
      n = (s *= Math.sin(a)) * Math.cos(t),
      s = s * Math.sin(t),
      t = Math.cos(5 * a) / 5;
    return e.set(n, t, s);
  }
  function b(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    var s = 1 + 0.2 * Math.abs(Math.sin(4 * t)) - 0.2,
      n = (s *= Math.sin(a)) * Math.cos(t),
      s = s * Math.sin(t);
    let h;
    return (h = a <= Math.PI / 2 ? 1.6 - Math.cos(a) : +a), e.set(n, h, s);
  }
  function X(t, a, e) {
    (t = t * Math.PI * 2), (a = a * Math.PI * 1);
    var s = 1 + 0.2 * Math.abs(Math.sin(4 * t)) - 0.2,
      n = (s *= Math.sin(a)) * Math.cos(t),
      s = s * Math.sin(t);
    return e.set(n, +a, s);
  }
  function E(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    var s = 1 + 0.3 * Math.abs(Math.sin(4 * t)) - 0.3,
      n = (s *= Math.sin(a)) * Math.cos(t),
      s = s * Math.sin(t),
      t = +Math.cos(a);
    return e.set(n, t, s);
  }
  function x(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    var s = 1 + 0.5 * Math.abs(Math.sin(3 * t)) - 0.5,
      n = (s *= Math.sin(a)) * Math.cos(t),
      t = s * Math.sin(t),
      s = ((Math.cos(a) * s) / 2) * Math.cos(4 * a);
    return e.set(n, s, t);
  }
  function y(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    var s = 1 + 0.5 * Math.abs(Math.sin(3 * t)) - 0.5,
      n = (s *= Math.sin(a)) * Math.cos(t),
      t = s * Math.sin(t),
      s = ((Math.cos(a) * s) / 2) * Math.sin(a);
    return e.set(n, s, t);
  }
  function B(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    var s = 1 + 0.3 * Math.abs(Math.sin(4 * t)) - 0.3,
      n = (s *= Math.sin(a)) * Math.cos(t),
      t = s * Math.sin(t),
      a = a + s;
    return e.set(n, (a /= 2), t);
  }
  function C(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    var s = 1 + 0.3 * Math.abs(Math.sin(3 * t)) - 0.3,
      n = (s *= Math.sin(a)) * Math.cos(t),
      t = s * Math.sin(t),
      s = Math.sin(s) * a;
    return e.set(n, s, t);
  }
  function S(t, a, e) {
    (t = t * Math.PI * 2), (a *= Math.PI);
    var s,
      n = (s = +Math.sin(a)) + 0.3 * Math.abs(Math.sin(3 * t)),
      h = n * Math.cos(t),
      n = n * Math.sin(t);
    return e.set(h, a * s, n);
  }
  function L(t, a, e) {
    (t *= 2 * Math.PI), (a = a * (2 * Math.PI) - Math.PI);
    var s = Math.cos(t) * (4 + 3.8 * Math.cos(a)),
      t = Math.sin(t) * (4 + 3.8 * Math.cos(a)),
      a =
        (Math.cos(a) + Math.sin(a) - 1) *
          (1 + Math.sin(a)) *
          Math.log(1 - (Math.PI * a) / 10) +
        7.5 * Math.sin(a);
    return e.set(s, t, a);
  }
  function V(t, a, e) {
    t = t * Math.PI * 1;
    var s = (Math.PI / 2) * Math.exp(-(a = a * Math.PI * 17) / (8 * Math.PI)),
      n =
        1 -
        0.5 *
          ((5 / 4) * Math.pow(1 - ((3.6 * a) % (2 * Math.PI)) / Math.PI, 2) -
            0.25) **
            2,
      h = 1.95653 * t ** 2 * (1.27689 * t - 1) ** 2 * Math.sin(s),
      r = n * (t * Math.sin(s) + h * Math.cos(s)),
      i = r * Math.sin(a),
      r = r * Math.cos(a),
      a = n * (t * Math.cos(s) - h * Math.sin(s));
    return e.set(i, r, a);
  }
  function F(t, a, e) {
    var s;
    return (
      (t *= Math.PI),
      (a = a * Math.PI * 2),
      (s = (1 - Math.cos(t)) * Math.sin(t) * Math.cos(a)),
      (a = (1 - Math.cos(t)) * Math.sin(t) * Math.sin(a)),
      (t = Math.cos(t)),
      e.set(s, a, t)
    );
  }
  let a,
    e,
    h,
    s,
    n,
    r,
    i,
    o = [],
    M = [];
  var N, R, j, G, H;
  (r = new c.MeshNormalMaterial({ side: c.DoubleSide, wireframe: !1 })),
    ((a = new c.PerspectiveCamera(50, 1, 1, 10)).position.z = 3),
    (a.fov = 2 * Math.atan(2 / (2 * a.position.z)) * (180 / Math.PI)),
    (i = document.getElementById("c")),
    (h = new c.WebGLRenderer({
      canvas: i,
      antialias: !0,
      alpha: !0
    })).setPixelRatio(window.devicePixelRatio),
    (n = new t(w, 50, 50)).scale(0.2, 0.2, 0.2),
    (n.userData.title =
      "Superellipse<br>(from <a target='_blank' href='https://discourse.threejs.org/t/twisted-torus-parametric/56492'>PavelBoytchev</a>)"),
    M.push(n),
    (n = new t(F, 50, 50)).rotateX(-Math.PI / 2),
    n.scale(0.8, 0.8, 0.8),
    (n.userData.title = "chestnut"),
    M.push(n),
    (n = new t(L, 25, 25)).rotateX(-Math.PI / 4),
    n.scale(0.12, 0.12, 0.12),
    (n.userData.title = "apple1"),
    M.push(n),
    (n = new t(V, 25, 500)).rotateX(Math.PI / 2),
    n.scale(0.01, 0.01, 0.01),
    (n.userData.title =
      "Pinecone<br>(from <a target='_blank' href='https://nylander.wordpress.com/2006/06/21/rose-shaped-parametric-surface/'>Paul Nylander</a>)"),
    M.push(n),
    (n = new t(D, 100, 50)).scale(0.5, 0.5, 0.5),
    (n.userData.title = "spiral"),
    M.push(n),
    ((n = new t(v, 100, 100)).userData.title = "Ball chain"),
    M.push(n),
    (n = new t(S, 50, 50)).rotateX(-Math.PI / 2),
    n.scale(0.7, 0.7, 0.7),
    M.push(n),
    (n = new t(C, 50, 50)),
    M.push(n),
    (n = new t(B, 50, 25)).rotateX(Math.PI),
    (n.userData.title = "merengue4"),
    M.push(n),
    (n = new t(y, 50, 25)).rotateX(Math.PI / 2),
    (n.userData.title = "Flower1"),
    M.push(n),
    (n = new t(x, 80, 15)).rotateX(Math.PI / 2),
    (n.userData.title = "Flower2"),
    M.push(n),
    (n = new t(g, 100, 100)).rotateX(Math.PI / 2),
    (n.userData.title = "Flower3"),
    M.push(n),
    ((n = new t(E, 50, 25)).userData.title = "Deformed sphere1"),
    M.push(n),
    (n = new t(X, 50, 25)).scale(0.8, 0.8, 0.8),
    n.rotateX(Math.PI),
    (n.userData.title = "Deformed sphere2"),
    M.push(n),
    (n = new t(b, 50, 25)).scale(0.9, 0.9, 0.9),
    n.rotateX(Math.PI),
    (n.userData.title = "balloon"),
    M.push(n),
    (n = new t(I, 20, 20)).scale(0.9, 0.9, 0.9),
    n.rotateX(Math.PI),
    M.push(n),
    (n = new t(p, 20, 20)).scale(0.9, 0.9, 0.9),
    n.rotateX(Math.PI),
    M.push(n),
    (n = new t(f, 20, 20)).scale(0.9, 0.9, 0.9),
    n.rotateX(Math.PI),
    M.push(n),
    (n = new t(m, 20, 20)).scale(0.9, 0.9, 0.9),
    n.rotateX(Math.PI),
    (n.userData.title = "Go stone"),
    M.push(n),
    (n = new t(d, 20, 20)).scale(0.9, 0.9, 0.9),
    n.rotateX(Math.PI),
    M.push(n),
    (N = document.getElementById("gallery")),
    (R = new IntersectionObserver((t) => {
      for (const a of t)
        a.isIntersecting
          ? (a.target.dataset.inView = !0)
          : (a.target.dataset.inView = !1);
    }));
  for (let t = 0; t < M.length; t++) {
    e = new c.Scene();
    (j = document.createElement("article")),
      (G = ((j.className = "card"), document.createElement("div"))),
      (H =
        ((G.className = "geo"),
        (G.dataset.index = t),
        (G.dataset.inView = !0),
        j.appendChild(G),
        document.createElement("div")));
    (H.className = "title"),
      (H.innerText = "Parametric surface " + (t + 1)),
      j.appendChild(H),
      (e.userData.element = G),
      N.appendChild(j),
      (a = a.clone()),
      (e.userData.camera = a),
      ((s = new u(e.userData.camera, e.userData.element)).autoRotate = !0),
      (s.minDistance = 2),
      (s.maxDistance = 10),
      (s.enablePan = !1),
      (s.enableZoom = !1),
      (s.enableDamping = !0),
      (e.userData.controls = s),
      (n = M[M.length - t - 1]),
      (n = l.mergeVertices(n)).computeBoundingSphere(),
      n.computeVertexNormals(),
      n.center(),
      (r = r.clone()),
      e.add(new c.Mesh(n, r)),
      n.userData.title && (H.innerHTML = n.userData.title),
      o.push(e),
      G.addEventListener(
        "pointerenter",
        (t) => {
          P(t, !0);
        },
        !1
      ),
      G.addEventListener(
        "pointerleave",
        (t) => {
          P(t, !1);
        },
        !1
      ),
      G.addEventListener(
        "pointerout",
        (t) => {
          P(t, !1);
        },
        !1
      ),
      G.addEventListener(
        "pointercancel",
        (t) => {
          P(t, !1);
        },
        !1
      ),
      R.observe(G);
  }
  !(function t() {
    requestAnimationFrame(t);
    var a = i.clientWidth,
      e = i.clientHeight;
    (i.width === a && i.height === e) || h.setSize(a, e, !1),
      h.setScissorTest(!1),
      h.clear(),
      h.setScissorTest(!0),
      o.forEach(function (t) {
        var a,
          e,
          s = t.userData.element,
          n = s.getBoundingClientRect();
        "false" != s.dataset.inView &&
          ((s = n.width),
          (a = n.height),
          (s = Math.ceil(s)),
          (a = Math.ceil(a)),
          (e = n.left),
          (n =
            document.documentElement.offsetHeight -
            n.bottom -
            (document.documentElement.offsetHeight -
              h.domElement.getBoundingClientRect().bottom)),
          (e = Math.ceil(e)),
          (n = Math.ceil(n)),
          h.setViewport(e, n, s, a),
          h.setScissor(e, n, s, a),
          (e = t.userData.camera),
          t.userData.controls.update(),
          h.render(t, e));
      });
  })();
}
const e = new Lenis();
requestAnimationFrame(function t(a) {
  e.raf(a), requestAnimationFrame(t);
});