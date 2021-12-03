import * as THREE from "https://cdn.skypack.dev/three";
import { PointerLockControls } from "../pointerlock/main.js";

class Renderer {
  constructor() {
    this.scale = {
      w: window.innerWidth,
      h: window.innerHeight
    };
    this.renderer = new THREE.WebGLRenderer({
      antialias: true // make user-controllable later
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.scale.w / this.scale.h,
      0.1,
      1000
    );
    this.clock = new THREE.Clock();
    this.camController = new PointerLockControls(this.camera, document.body);
    this.objs = [];

    this.keys = {};
  }
  setup() {
    // first setup renderer
    this.renderer.setSize(this.scale.w, this.scale.h);
    document.body.appendChild(this.renderer.domElement);

    // then setup camera (for now, only change position)
    document.addEventListener("click", () => {
      this.camController.lock();
    });
    this.camera.position.z = 5;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // then setup listeners

    // document.addEventListener("keydown", (event) => {

    //   // keys[event.key] = true;
    // });

    // document.addEventListerner("keyup", (event) => {
    //   // keys[event.key] = false;
    // });

    // then initialize the scene
    this.initScene();
    // finally, run
    this.render();
  }
  initScene() {
    // load the base scene. placeholder for future pre-"get server objs and load"
    for (let i = 0; i < 3; i++) {
      this.objs.push({
        geo: new THREE.BoxGeometry(),
        mat: new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          wireframe: true
        })
      });
    }
    this.objs.forEach((obj, i) => {
      let temp = new THREE.Mesh(obj.geo, obj.mat);

      // placeholder for position randomizing

      let r = Math.floor(Math.random() * 2);

      let x = i > 0 ? (this.objs[i - 1].pos.x || 0) + r : 0;
      let y = i > 0 ? (this.objs[i - 1].pos.y || 0) + r : 0;

      temp.position.x = x;
      temp.position.y = y;

      this.scene.add(temp);
      this.objs[i].pos = temp.position;
    });
    // create floor
    let floorGeo = new THREE.PlaneGeometry(100, 100);
    let floorMat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide
    });
    let plane = new THREE.Mesh(floorGeo, floorMat);
    plane.position.set(0, 0, -20);
    this.scene.add(plane);
  }
  render() {
    let delta = this.clock.getDelta();
    requestAnimationFrame(() => this.render());
    // code here
    // if (this.keys["w"]) {
    //   this.camContoller.moveForward(1);
    // }
    this.renderer.render(this.scene, this.camera);
  }
}

export { Renderer };
