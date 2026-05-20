import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { RoundedBoxGeometry } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/geometries/RoundedBoxGeometry.js";

const capsuleColors = ["#FF6B9D", "#FF4757", "#A855F7", "#FF6B9D", "#C084FC", "#FFB5C8"];

function createBodyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 256, 512);
  gradient.addColorStop(0, "#ff91c2");
  gradient.addColorStop(0.55, "#ff4d88");
  gradient.addColorStop(1, "#d83177");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 512);
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.ellipse(82, 88, 72, 22, -0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(88,18,58,0.16)";
  ctx.fillRect(0, 440, 256, 72);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makeCapsuleBall(color, radius = 0.22) {
  const group = new THREE.Group();
  const shellMaterial = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.3,
    roughness: 0.2,
    emissive: new THREE.Color(color).multiplyScalar(0.04),
  });
  const bandMaterial = new THREE.MeshStandardMaterial({
    color: "#fff5f8",
    metalness: 0.12,
    roughness: 0.28,
  });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 38, 24), shellMaterial);
  const band = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.02, radius * 0.035, 10, 64), bandMaterial);
  band.rotation.x = Math.PI / 2;
  group.add(sphere, band);
  group.userData.shellMaterial = shellMaterial;
  group.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return group;
}

function makeHeartShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.2);
  shape.bezierCurveTo(0, 0.08, -0.18, -0.08, -0.32, 0.08);
  shape.bezierCurveTo(-0.48, 0.26, -0.18, 0.48, 0, 0.62);
  shape.bezierCurveTo(0.18, 0.48, 0.48, 0.26, 0.32, 0.08);
  shape.bezierCurveTo(0.18, -0.08, 0, 0.08, 0, 0.2);
  return shape;
}

function createDecorations(group) {
  const heartShape = makeHeartShape();
  const heartMaterial = new THREE.MeshStandardMaterial({
    color: "#ff82ae",
    roughness: 0.42,
    metalness: 0.05,
    emissive: "#3c091d",
    emissiveIntensity: 0.04,
  });
  const starMaterial = new THREE.MeshStandardMaterial({
    color: "#ffd700",
    roughness: 0.3,
    metalness: 0.18,
    emissive: "#ffb300",
    emissiveIntensity: 0.12,
  });

  [
    [-1.15, -0.62, 0.72, 0.18],
    [1.18, -0.42, 0.68, 0.15],
    [-0.9, -1.04, 0.76, 0.13],
  ].forEach(([x, y, z, scale]) => {
    const heart = new THREE.Mesh(new THREE.ExtrudeGeometry(heartShape, { depth: 0.04, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01 }), heartMaterial);
    heart.position.set(x, y, z);
    heart.scale.setScalar(scale);
    heart.rotation.z = -0.18 + x * 0.08;
    heart.castShadow = true;
    group.add(heart);
  });

  [
    [1.08, 0.4, 0.62],
    [-1.03, 0.24, 0.65],
  ].forEach(([x, y, z]) => {
    const sparkle = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), starMaterial);
    sparkle.position.set(x, y, z);
    sparkle.rotation.z = Math.PI / 4;
    sparkle.castShadow = true;
    group.add(sparkle);
  });
}

export function createGachaMachine({ isMobile = false } = {}) {
  const root = new THREE.Group();
  const machine = new THREE.Group();
  root.add(machine);

  const bodyTexture = createBodyTexture();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    map: bodyTexture,
    roughness: 0.34,
    metalness: 0.08,
    aoMapIntensity: 0.35,
  });
  const body = new THREE.Mesh(new RoundedBoxGeometry(1.95, 2.35, 0.74, 10, 0.18), bodyMaterial);
  body.position.y = -0.95;
  body.castShadow = true;
  body.receiveShadow = true;
  machine.add(body);

  const base = new THREE.Mesh(
    new RoundedBoxGeometry(2.2, 0.42, 0.88, 8, 0.14),
    new THREE.MeshStandardMaterial({ color: "#ff8fbd", roughness: 0.42, metalness: 0.08 }),
  );
  base.position.y = -2.28;
  base.castShadow = true;
  base.receiveShadow = true;
  machine.add(base);

  const domeMaterial = new THREE.MeshPhysicalMaterial({
    color: "#ffd5e3",
    transparent: true,
    opacity: 0.44,
    transmission: isMobile ? 0 : 0.95,
    roughness: isMobile ? 0.16 : 0.05,
    thickness: 0.5,
    ior: 1.5,
    reflectivity: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    side: THREE.DoubleSide,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.08, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2), domeMaterial);
  dome.position.y = 0.52;
  dome.castShadow = true;
  dome.receiveShadow = false;
  machine.add(dome);

  const domeRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.08, 0.07, 16, 96),
    new THREE.MeshStandardMaterial({ color: "#ff76ac", roughness: 0.22, metalness: 0.16 }),
  );
  domeRim.position.y = 0.52;
  domeRim.rotation.x = Math.PI / 2;
  domeRim.castShadow = true;
  machine.add(domeRim);

  const slotMaterial = new THREE.MeshStandardMaterial({
    color: "#532138",
    roughness: 0.58,
    metalness: 0.05,
    emissive: "#250612",
    emissiveIntensity: 0.08,
  });
  const slot = new THREE.Mesh(new RoundedBoxGeometry(1.06, 0.27, 0.1, 6, 0.08), slotMaterial);
  slot.position.set(0, -1.7, 0.405);
  slot.castShadow = false;
  slot.receiveShadow = true;
  machine.add(slot);

  const coinSlot = new THREE.Mesh(
    new RoundedBoxGeometry(0.48, 0.12, 0.08, 5, 0.04),
    new THREE.MeshStandardMaterial({ color: "#80264f", roughness: 0.48, metalness: 0.3 }),
  );
  coinSlot.position.set(0.48, -0.86, 0.425);
  coinSlot.castShadow = true;
  machine.add(coinSlot);

  const crank = new THREE.Group();
  const crankPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.34, 0.1, 48),
    new THREE.MeshStandardMaterial({ color: "#fff5f8", roughness: 0.24, metalness: 0.18 }),
  );
  crankPlate.rotation.x = Math.PI / 2;
  const crankKnob = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 32, 16),
    new THREE.MeshStandardMaterial({ color: "#ff4d88", roughness: 0.22, metalness: 0.16 }),
  );
  crankKnob.position.set(0.22, -0.08, 0.08);
  crank.add(crankPlate, crankKnob);
  crank.position.set(-0.46, -0.9, 0.47);
  crank.traverse((child) => {
    if (child.isMesh) child.castShadow = true;
  });
  machine.add(crank);

  createDecorations(machine);

  const capsules = [];
  const ballCount = isMobile ? 6 : 12;
  const positions = [
    [-0.56, 0.74, 0.14], [-0.18, 0.78, 0.11], [0.2, 0.75, 0.14], [0.58, 0.72, 0.1],
    [-0.48, 1.08, -0.02], [-0.12, 1.12, -0.04], [0.25, 1.08, -0.02], [0.5, 1.02, -0.04],
    [-0.35, 1.4, -0.1], [0, 1.44, -0.08], [0.34, 1.38, -0.1], [0.02, 0.47, 0.22],
  ];

  positions.slice(0, ballCount).forEach((position, index) => {
    const ball = makeCapsuleBall(capsuleColors[index % capsuleColors.length], isMobile ? 0.19 : 0.21);
    ball.position.set(...position);
    ball.scale.setScalar(0.001);
    ball.userData.home = ball.position.clone();
    ball.userData.phase = index * 0.8;
    machine.add(ball);
    capsules.push(ball);
  });

  const dispensedBall = makeCapsuleBall("#ff4757", 0.24);
  dispensedBall.position.set(0, -1.7, 0.72);
  dispensedBall.scale.setScalar(0.001);
  machine.add(dispensedBall);

  const openCapsule = new THREE.Group();
  const topHalf = new THREE.Mesh(
    new THREE.SphereGeometry(0.34, 44, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: "#ff6b9d", roughness: 0.2, metalness: 0.18 }),
  );
  const bottomHalf = new THREE.Mesh(
    new THREE.SphereGeometry(0.34, 44, 20, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: "#ff4757", roughness: 0.2, metalness: 0.18 }),
  );
  topHalf.position.y = 0.03;
  bottomHalf.position.y = -0.03;
  const paper = new THREE.Mesh(
    new THREE.PlaneGeometry(0.86, 0.48),
    new THREE.MeshStandardMaterial({ color: "#fff0db", roughness: 0.7, side: THREE.DoubleSide }),
  );
  paper.position.z = 0.05;
  paper.rotation.x = -Math.PI / 2;
  openCapsule.add(topHalf, bottomHalf, paper);
  openCapsule.position.set(0, -0.2, 1.25);
  openCapsule.scale.setScalar(0.001);
  openCapsule.visible = false;
  openCapsule.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  machine.add(openCapsule);

  return {
    root,
    machine,
    body,
    dome,
    domeMaterial,
    capsules,
    slot,
    slotMaterial,
    crank,
    dispensedBall,
    openCapsule,
    openTop: topHalf,
    openBottom: bottomHalf,
    paper,
  };
}
