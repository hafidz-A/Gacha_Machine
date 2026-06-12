import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm";
import barba from "https://cdn.jsdelivr.net/npm/@barba/core@2.10.3/+esm";
import gsap from "https://esm.sh/gsap@3.12.5";
import { initScene } from "./scene.js";
import {
  pageLoadTimeline,
  playCapsuleOpen,
  playDispense,
  resetMachine,
  setupScrollMotion,
} from "./animations.js";
import { getRandomMessage } from "./messages.js";
import { startDomIdleAnimations } from "./particles.js";
import { initScatteredBalls, addOpenedMessage, closePopup } from "./scattered-balls.js";

const canvas = document.querySelector("#scene-canvas");
const loader = document.querySelector("[data-loader]");
const loaderBar = document.querySelector("[data-loader-bar]");
const particlesLayer = document.querySelector("[data-particles]");
const wipe = document.querySelector("[data-radial-wipe]");

const panels = {
  idle: document.querySelector('[data-state-panel="idle"]'),
  slot: document.querySelector('[data-state-panel="slot"]'),
  message: document.querySelector('[data-state-panel="message"]'),
};

const ui = {
  badge: document.querySelector(".love-badge"),
  spinButton: document.querySelector("[data-spin-button]"),
  slotBall: document.querySelector("[data-open-capsule]"),
  messageCard: document.querySelector("[data-message-card]"),
  messageText: document.querySelector("[data-message-text]"),
  resetButton: document.querySelector("[data-reset-button]"),
};

let currentState = "idle";
let busy = false;

function setBusy(value) {
  busy = value;
  ui.spinButton.disabled = value;
  ui.slotBall.disabled = value;
  ui.resetButton.disabled = value;
}

function waitForTimeline(timeline) {
  return new Promise((resolve) => {
    timeline.eventCallback("onComplete", resolve);
  });
}

function setState(state) {
  currentState = state;
  document.body.dataset.state = state;
  if (state !== 'idle') closePopup();
}

function initLenis() {
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 0.75,
    touchMultiplier: 1.2,
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

function initBarba() {
  barba.init({
    prevent: () => true,
    transitions: [
      {
        name: "bucin-radial-wipe",
        leave(data) {
          return gsap.to(data.current.container, { scale: 0.96, filter: "blur(14px)", duration: 0.24 });
        },
        enter(data) {
          return gsap.from(data.next.container, { scale: 1.04, filter: "blur(14px)", duration: 0.32 });
        },
      },
    ],
  });
}

async function boot() {
  if (!canvas) return;
  initBarba();
  initLenis();
  startDomIdleAnimations();

  const sceneApi = await initScene({
    canvas,
    onProgress(progress) {
      if (loaderBar) loaderBar.style.width = `${Math.round(progress * 72)}%`;
    },
  });

  pageLoadTimeline({ canvas, loader, loaderBar, machineParts: sceneApi.machineParts, ui });
  setupScrollMotion({ sceneApi });
  initScatteredBalls();

  ui.spinButton.addEventListener("click", async () => {
    if (busy || currentState !== "idle") return;
    setBusy(true);
    const timeline = playDispense({
      sceneApi,
      ui,
      panels,
      wipe,
      particlesLayer,
      onState: setState,
    });
    await waitForTimeline(timeline);
    setBusy(false);
  });

  ui.slotBall.addEventListener("click", async () => {
    if (busy || currentState !== "slot") return;
    setBusy(true);
    const message = getRandomMessage();
    addOpenedMessage(message);
    const timeline = playCapsuleOpen({
      sceneApi,
      ui,
      panels,
      wipe,
      particlesLayer,
      message,
      onState: setState,
    });
    await waitForTimeline(timeline);
    setBusy(false);
  });

  ui.resetButton.addEventListener("click", async () => {
    if (busy || currentState !== "message") return;
    setBusy(true);
    const timeline = resetMachine({
      sceneApi,
      ui,
      panels,
      wipe,
      onState: setState,
    });
    await waitForTimeline(timeline);
    setBusy(false);
  });
}

boot().catch((error) => {
  console.error(error);
  if (loader) {
    loader.innerHTML = '<div class="loader-copy">Mesinnya lagi malu. Refresh sekali ya.</div>';
  }
});
