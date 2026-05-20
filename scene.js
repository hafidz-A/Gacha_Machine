import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { RGBELoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/RGBELoader.js";
import { RectAreaLightUniformsLib } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { createGachaMachine } from "./machine.js";

const HDRI_URL = "https://raw.githubusercontent.com/mrdoob/three.js/r158/examples/textures/equirectangular/royal_esplanade_1k.hdr";

export async function initScene({ canvas, onProgress = () => {} }) {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  RectAreaLightUniformsLib.init();

  const scene = new THREE.Scene();
  const restCameraZ = isMobile ? 7.45 : 7.35;
  const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.05, restCameraZ);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const ambient = new THREE.AmbientLight("#fff0e8", 0.6);
  scene.add(ambient);

  const key = new THREE.DirectionalLight("#fff3ea", 2.2);
  key.position.set(3.8, 5.2, 4.6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 14;
  key.shadow.camera.left = -5;
  key.shadow.camera.right = 5;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -5;
  scene.add(key);

  const rim = new THREE.DirectionalLight("#ffd5e6", 1.2);
  rim.position.set(-3.6, 3.6, 2.2);
  scene.add(rim);

  const domeLight = new THREE.PointLight("#ff8bbd", 0.78, 4.2, 1.7);
  domeLight.position.set(0, 0.92, 0.6);
  scene.add(domeLight);

  const faceGlow = new THREE.RectAreaLight("#ff5f9f", 2.2, 2.5, 1.8);
  faceGlow.position.set(0, -0.82, 1.55);
  faceGlow.lookAt(0, -0.82, 0);
  scene.add(faceGlow);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 80),
    new THREE.ShadowMaterial({ color: "#b33269", opacity: 0.14 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.56;
  floor.receiveShadow = true;
  scene.add(floor);

  const machineParts = createGachaMachine({ isMobile });
  machineParts.root.position.y = isMobile ? 0.03 : 0.08;
  machineParts.root.scale.setScalar(isMobile ? 0.7 : 0.74);
  machineParts.root.rotation.x = -0.03;
  scene.add(machineParts.root);

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  try {
    const hdrTexture = await new RGBELoader().loadAsync(
      HDRI_URL,
      (event) => {
        if (event.lengthComputable) {
          onProgress(Math.min(0.86, event.loaded / event.total));
        }
      },
    );
    const envMap = pmrem.fromEquirectangular(hdrTexture).texture;
    scene.environment = envMap;
    machineParts.domeMaterial.envMap = envMap;
    machineParts.domeMaterial.needsUpdate = true;
    hdrTexture.dispose();
  } catch (error) {
    console.warn("HDRI failed to load, using procedural lighting fallback.", error);
  } finally {
    pmrem.dispose();
    onProgress(1);
  }

  let scrollProgress = 0;
  const clock = new THREE.Clock();

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function setScrollProgress(value) {
    scrollProgress = THREE.MathUtils.clamp(value, 0, 1);
  }

  function render() {
    const elapsed = clock.getElapsedTime();
    machineParts.capsules.forEach((ball) => {
      if (ball.userData.detached) return;
      const home = ball.userData.home;
      ball.position.y = home.y + Math.sin(elapsed * 1.4 + ball.userData.phase) * 0.035;
      ball.rotation.x += 0.003;
      ball.rotation.y += 0.004;
    });

    machineParts.machine.rotation.y = THREE.MathUtils.lerp(
      machineParts.machine.rotation.y,
      THREE.MathUtils.degToRad(8) * scrollProgress,
      0.08,
    );
    machineParts.machine.rotation.z = Math.sin(elapsed * 0.5) * 0.006;
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(render);
  window.addEventListener("resize", resize);

  return {
    scene,
    camera,
    renderer,
    machineParts,
    isMobile,
    restCameraZ,
    setScrollProgress,
    dispose() {
      window.removeEventListener("resize", resize);
      renderer.setAnimationLoop(null);
      renderer.dispose();
    },
  };
}
