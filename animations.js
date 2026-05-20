import gsap from "https://esm.sh/gsap@3.12.5";
import { CustomEase } from "https://esm.sh/gsap@3.12.5/CustomEase";
import { ScrollTrigger } from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
import { TextPlugin } from "https://esm.sh/gsap@3.12.5/TextPlugin";
import anime from "https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.es.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { burstHearts } from "./particles.js";

gsap.registerPlugin(CustomEase, ScrollTrigger, TextPlugin);
CustomEase.create("buttonSquish", "M0,0 C0.5,0 0.5,1 1,1");

export function pageLoadTimeline({ canvas, loader, loaderBar, machineParts, ui }) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  gsap.set(canvas, { opacity: 0 });
  gsap.set(machineParts.root.position, { y: machineParts.root.position.y + 1.35 });
  gsap.set(machineParts.domeMaterial, { transmission: 0, opacity: 0.12 });
  gsap.set(ui.badge, { opacity: 0, y: -22 });
  gsap.set(ui.spinButton, { opacity: 0, scale: 0.75, y: 20 });

  tl.to(loaderBar, { width: "100%", duration: 0.55, ease: "power2.out" })
    .to(loader, { opacity: 0, duration: 0.45, pointerEvents: "none" })
    .to(canvas, { opacity: 1, duration: 0.8 }, "-=0.2")
    .to(machineParts.root.position, { y: machineParts.root.position.y - 1.35, duration: 1.2, ease: "back.out(1.4)" }, "-=0.35")
    .to(machineParts.domeMaterial, { transmission: machineParts.domeMaterial.transmission || 0.95, opacity: 0.44, duration: 0.85 }, "-=0.75")
    .to(machineParts.capsules.map((ball) => ball.scale), {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.72,
      stagger: 0.05,
      ease: "elastic.out(1, 0.58)",
    }, "-=0.42")
    .to(ui.badge, { opacity: 1, y: 0, duration: 0.48 }, "-=0.22")
    .to(ui.spinButton, { opacity: 1, scale: 1, y: 0, duration: 0.58, ease: "back.out(1.8)" }, "-=0.12");

  gsap.to(ui.spinButton, {
    filter: "drop-shadow(0 0 18px rgba(255, 77, 136, 0.5))",
    duration: 1.1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  return tl;
}

export function setupScrollMotion({ sceneApi }) {
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => sceneApi.setScrollProgress(self.progress),
  });
}

export function transitionToState(nextState, { fromElement, panels, wipe }) {
  const target = panels[nextState];
  if (!target) return gsap.timeline();

  const rect = fromElement?.getBoundingClientRect?.();
  if (rect) {
    gsap.set(wipe, {
      left: rect.left + rect.width / 2,
      top: rect.top + rect.height / 2,
    });
  }

  const active = Object.values(panels).find((panel) => panel.classList.contains("is-active"));
  const tl = gsap.timeline();
  tl.set(wipe, { opacity: 1, scale: 0 })
    .to(wipe, { scale: 1, duration: 0.42, ease: "power3.inOut" })
    .to(active, { opacity: 0, scale: 0.96, filter: "blur(14px)", duration: 0.28, ease: "power2.in" }, "-=0.2")
    .add(() => {
      active?.classList.remove("is-active");
      target.classList.add("is-active");
    })
    .fromTo(target, { opacity: 0, scale: 1.04, filter: "blur(14px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.38, ease: "power3.out" })
    .to(wipe, { opacity: 0, scale: 1.2, duration: 0.35, ease: "power2.out" }, "-=0.2");
  return tl;
}

export function playDispense({ sceneApi, ui, panels, wipe, particlesLayer, onState }) {
  const { machineParts, camera } = sceneApi;
  const available = machineParts.capsules.filter((ball) => ball.visible && !ball.userData.detached);
  const selected = available[Math.floor(Math.random() * available.length)] || machineParts.capsules[0];
  selected.userData.detached = true;

  anime({
    targets: machineParts.capsules.filter((ball) => ball !== selected).map((ball) => ball.rotation),
    x: "+=0.42",
    y: "+=0.58",
    direction: "alternate",
    loop: 3,
    duration: 90,
    easing: "easeInOutSine",
    delay: anime.stagger(12),
  });

  const tl = gsap.timeline();
  tl.to(ui.spinButton, { scaleY: 0.85, scaleX: 1.08, duration: 0.08, ease: "buttonSquish" })
    .to(ui.spinButton, { scaleY: 1, scaleX: 1, duration: 0.15, ease: "buttonSquish" })
    .to(camera.position, { z: sceneApi.restCameraZ - 0.8, duration: 0.4, ease: "power2.out" }, 0)
    .to(machineParts.crank.rotation, { z: "-=6.283", duration: 0.62, ease: "back.inOut(1.7)" }, 0)
    .to(selected.position, { x: 0, y: 0.54, z: 0.35, duration: 0.42, ease: "power2.out" }, 0.12)
    .to(selected.position, { y: -1.65, z: 0.74, duration: 0.58, ease: "power2.in" })
    .to(selected.scale, { x: 0.65, y: 0.65, z: 0.65, duration: 0.34, ease: "power2.in" }, "-=0.38")
    .to(machineParts.slotMaterial, { emissiveIntensity: 1.4, duration: 0.12, yoyo: true, repeat: 3 }, "-=0.18")
    .set(selected, { visible: false })
    .to(machineParts.dispensedBall.scale, { x: 1, y: 1, z: 1, duration: 0.38, ease: "back.out(2)" })
    .add(() => burstHearts({ layer: particlesLayer, count: 22 }), "-=0.18")
    .add(() => onState?.("slot"))
    .add(() => transitionToState("slot", { fromElement: ui.spinButton, panels, wipe }))
    .to(camera.position, { z: sceneApi.restCameraZ, duration: 0.6, ease: "power2.out" }, "-=0.1")
    .to(ui.slotBall, { opacity: 1, scale: 1, duration: 0.45, ease: "elastic.out(1, 0.62)" }, "-=0.38");

  return tl;
}

export function playCapsuleOpen({ sceneApi, ui, panels, wipe, particlesLayer, message, onState }) {
  const { machineParts, camera } = sceneApi;
  const tl = gsap.timeline();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  machineParts.openCapsule.visible = true;
  gsap.set(machineParts.openCapsule.scale, { x: 0.001, y: 0.001, z: 0.001 });
  gsap.set(machineParts.openCapsule.position, { x: 0, y: 0.14, z: 1.78 });
  gsap.set([machineParts.openTop.rotation, machineParts.openBottom.rotation], { x: 0 });
  gsap.set(machineParts.paper.rotation, { x: -Math.PI / 2 });
  gsap.set(ui.messageCard, { opacity: 0, rotateX: -90, scale: 0.82 });
  ui.messageText.textContent = "";

  tl.to(ui.slotBall, { top: "50%", width: 150, scale: 1.12, duration: 0.5, ease: "back.inOut(1.4)" })
    .to(machineParts.dispensedBall.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.2 }, 0)
    .to(machineParts.openCapsule.scale, { x: 2.25, y: 2.25, z: 2.25, duration: 0.58, ease: "back.out(1.6)" }, 0.12)
    .to(ui.slotBall, { opacity: 0, duration: 0.16, ease: "power1.out" }, 0.42)
    .to(camera.position, { z: sceneApi.restCameraZ - 1.45, duration: 0.45, ease: "power2.out" }, 0.08)
    .to(machineParts.openTop.rotation, { x: THREE.MathUtils.degToRad(-120), duration: 0.72, ease: "back.out(1.7)" })
    .to(machineParts.openBottom.rotation, { x: THREE.MathUtils.degToRad(38), duration: 0.52, ease: "back.out(1.6)" }, "-=0.5")
    .to(machineParts.paper.rotation, { x: 0, duration: 0.78, ease: "elastic.out(1, 0.62)" }, "-=0.22")
    .to(machineParts.openCapsule.rotation, { z: "+=0.08", duration: 1.8, ease: "sine.inOut" }, "-=0.12")
    .add(() => burstHearts({ layer: particlesLayer, originX: centerX, originY: centerY, count: 26 }), "-=0.46")
    .add(() => onState?.("message"))
    .add(() => transitionToState("message", { fromElement: ui.slotBall, panels, wipe }))
    .to(machineParts.openCapsule.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.32, ease: "power2.in" }, "-=0.05")
    .to(ui.messageCard, { opacity: 1, rotateX: 0, scale: 1, duration: 0.72, ease: "elastic.out(1, 0.68)" }, "-=0.25")
    .to(ui.messageText, { text: message, duration: Math.min(2.6, message.length * 0.04), ease: "none" }, "-=0.24")
    .fromTo(ui.resetButton, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.1");

  return tl;
}

export function resetMachine({ sceneApi, ui, panels, wipe, onState }) {
  const { machineParts, camera } = sceneApi;
  const tl = gsap.timeline();
  tl.add(() => onState?.("idle"))
    .add(() => transitionToState("idle", { fromElement: ui.resetButton, panels, wipe }))
    .to(camera.position, { z: sceneApi.restCameraZ, duration: 0.5, ease: "power2.out" }, 0)
    .to(ui.slotBall, { opacity: 0, scale: 0.7, width: 86, top: "calc(50% + 184px)", duration: 0.25 }, 0)
    .to(machineParts.dispensedBall.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.2 }, 0)
    .to(machineParts.openCapsule.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.2 }, 0)
    .add(() => {
      machineParts.openCapsule.visible = false;
      const hiddenBalls = machineParts.capsules.filter((ball) => !ball.visible);
      const ball = hiddenBalls[0] || machineParts.capsules.find((candidate) => candidate.userData.detached);
      if (ball) {
        ball.visible = true;
        ball.userData.detached = false;
        ball.position.copy(ball.userData.home);
        ball.scale.setScalar(0.001);
        gsap.to(ball.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "elastic.out(1, 0.7)" });
      }
    });
  return tl;
}
