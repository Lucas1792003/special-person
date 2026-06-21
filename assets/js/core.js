/* core.js — floating hearts + smooth page transitions (shared) */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GLYPHS = ["💗", "💕", "🩷", "💖", "🌸", "✨"];

  /* ---- floating hearts ------------------------------------------------ */
  const layer = document.querySelector(".hearts");
  if (layer && !reduce) {
    const rand = (a, b) => a + Math.random() * (b - a);

    const spawn = () => {
      const h = document.createElement("span");
      h.className = "heart-float";
      h.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      const size = rand(14, 34);
      h.style.left = rand(0, 100) + "vw";
      h.style.fontSize = size + "px";
      h.style.setProperty("--drift", rand(-60, 60) + "px");
      h.style.setProperty("--spin", rand(-50, 50) + "deg");
      h.style.setProperty("--peak", rand(0.45, 0.9).toFixed(2));
      h.style.animationDuration = rand(7, 13) + "s";
      layer.appendChild(h);
      h.addEventListener("animationend", () => h.remove());
    };

    // a gentle, steady drift — not a swarm
    for (let i = 0; i < 6; i++) setTimeout(spawn, i * 600);
    setInterval(spawn, 1100);
  }

  /* ---- smooth page transitions ---------------------------------------- */
  // ensure a curtain exists on every page
  let curtain = document.querySelector(".curtain");
  if (!curtain) {
    curtain = document.createElement("div");
    curtain.className = "curtain";
    curtain.innerHTML = '<span class="curtain__heart" aria-hidden="true">💗</span>';
    document.body.appendChild(curtain);
  }

  window.navigateTo = (url) => {
    if (reduce) { window.location.href = url; return; }
    document.body.classList.add("is-leaving");
    setTimeout(() => { window.location.href = url; }, 560);
  };

  // any element with data-go="page.html" becomes a transitioning link
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-go]");
    if (!el) return;
    e.preventDefault();
    window.navigateTo(el.getAttribute("data-go"));
  });

  // clear the curtain when arriving via back/forward cache
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.body.classList.remove("is-leaving");
  });
})();
