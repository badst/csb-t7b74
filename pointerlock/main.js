import { Euler, EventDispatcher, Vector3 } from "./module.js";
var PointerLockControls = function (e, o) {
  void 0 === o &&
    (console.warn(
      'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.'
    ),
    (o = document.body)),
    (this.domElement = o),
    (this.isLocked = !1),
    (this.minPolarAngle = 0),
    (this.maxPolarAngle = Math.PI);
  var t,
    n = this,
    r = { type: "change" },
    i = { type: "lock" },
    c = { type: "unlock" },
    m = new Euler(0, 0, 0, "YXZ"),
    s = Math.PI / 2,
    l = new Vector3();
  function a(o) {
    if (!1 !== n.isLocked) {
      var t = o.movementX || o.mozMovementX || o.webkitMovementX || 0,
        i = o.movementY || o.mozMovementY || o.webkitMovementY || 0;
      m.setFromQuaternion(e.quaternion),
        (m.y -= 0.002 * t),
        (m.x -= 0.002 * i),
        (m.x = Math.max(
          s - n.maxPolarAngle,
          Math.min(s - n.minPolarAngle, m.x)
        )),
        e.quaternion.setFromEuler(m),
        n.dispatchEvent(r);
    }
  }
  function u() {
    n.domElement.ownerDocument.pointerLockElement === n.domElement
      ? (n.dispatchEvent(i), (n.isLocked = !0))
      : (n.dispatchEvent(c), (n.isLocked = !1));
  }
  function d() {
    console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
  }
  (this.connect = function () {
    n.domElement.ownerDocument.addEventListener("mousemove", a, !1),
      n.domElement.ownerDocument.addEventListener("pointerlockchange", u, !1),
      n.domElement.ownerDocument.addEventListener("pointerlockerror", d, !1);
  }),
    (this.disconnect = function () {
      n.domElement.ownerDocument.removeEventListener("mousemove", a, !1),
        n.domElement.ownerDocument.removeEventListener(
          "pointerlockchange",
          u,
          !1
        ),
        n.domElement.ownerDocument.removeEventListener(
          "pointerlockerror",
          d,
          !1
        );
    }),
    (this.dispose = function () {
      this.disconnect();
    }),
    (this.getObject = function () {
      return e;
    }),
    (this.getDirection =
      ((t = new Vector3(0, 0, -1)),
      function (o) {
        return o.copy(t).applyQuaternion(e.quaternion);
      })),
    (this.moveForward = function (o) {
      l.setFromMatrixColumn(e.matrix, 0),
        l.crossVectors(e.up, l),
        e.position.addScaledVector(l, o);
    }),
    (this.moveRight = function (o) {
      l.setFromMatrixColumn(e.matrix, 0), e.position.addScaledVector(l, o);
    }),
    (this.lock = function () {
      this.domElement.requestPointerLock();
    }),
    (this.unlock = function () {
      n.domElement.ownerDocument.exitPointerLock();
    }),
    this.connect();
};
(PointerLockControls.prototype = Object.create(EventDispatcher.prototype)),
  (PointerLockControls.prototype.constructor = PointerLockControls);
export { PointerLockControls };
