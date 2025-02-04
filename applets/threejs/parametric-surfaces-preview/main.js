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
    (n = new t(D, 25, 50)).rotateX(-Math.PI / 2),
    n.scale(0.8, 0.8, 0.8),
    (n.userData.title = "Sea shell"),
    M.push(n),
    (n = new t(L, 25, 25)).rotateX(-Math.PI / 4),
    n.scale(0.12, 0.12, 0.12),
    (n.userData.title = "Apple"),
    M.push(n),
    (n = new t(V, 25, 500)).rotateX(Math.PI / 2),
    n.scale(0.01, 0.01, 0.01),
    (n.userData.title =
      "Pinecone<br>(from <a target='_blank' href='https://nylander.wordpress.com/2006/06/21/rose-shaped-parametric-surface/'>Paul Nylander</a>)"),
    M.push(n),
    (n = new t(X, 100, 25)).rotateZ(-Math.PI / 2),
    n.scale(0.1, 0.1, 0.1),
    (n.userData.title = "Bonan-Jeener's Klein Surface"),
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