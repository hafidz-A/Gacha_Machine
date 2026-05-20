import anime from "https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.es.js";

export function burstHearts({ layer, originX = window.innerWidth / 2, originY = window.innerHeight / 2, count = 20 }) {
  if (!layer) return;
  const particles = Array.from({ length: count }, (_, index) => {
    const particle = document.createElement("span");
    particle.className = "heart-particle";
    particle.textContent = index % 4 === 0 ? "✦" : index % 3 === 0 ? "💖" : "♥";
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.color = index % 4 === 0 ? "#FFD700" : index % 3 === 0 ? "#C084FC" : "#FF4D88";
    layer.appendChild(particle);
    return particle;
  });

  anime({
    targets: particles,
    translateX: () => anime.random(-210, 210),
    translateY: () => anime.random(-190, 120),
    rotate: () => anime.random(-160, 160),
    scale: [
      { value: () => anime.random(80, 135) / 100, duration: 130 },
      { value: 0, duration: 900 },
    ],
    opacity: [
      { value: 1, duration: 80 },
      { value: 0, duration: 1120 },
    ],
    easing: "easeOutExpo",
    duration: 1200,
    delay: anime.stagger(18),
    complete: () => particles.forEach((particle) => particle.remove()),
  });
}

export function startDomIdleAnimations() {
  anime({
    targets: ".floaty",
    translateY: () => anime.random(-18, 18),
    translateX: () => anime.random(-8, 8),
    rotate: () => anime.random(-9, 9),
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: () => anime.random(1800, 2800),
    delay: anime.stagger(120),
  });
}
