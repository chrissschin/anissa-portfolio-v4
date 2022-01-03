import * as THREE from "three";
import { proxy } from "valtio";

export const damp = THREE.MathUtils.damp;
export const state = proxy({
  clicked: null,
  urls: [
    "img/chemex",
    "img/blog-index",
    "img/flavor_wheel",
    "img/jumbotron",
    "img/chemex",
    "img/blog-index",
    "img/flavor_wheel",
    "img/jumbotron",
    "img/blog-index",
    "img/flavor_wheel",
    "img/jumbotron",
  ].map((u) => `/${u}.jpg`),
});
