/* envelope.js — open the letter on tap/click/keyboard */
(() => {
  const scene = document.querySelector(".envelope-scene");
  const env = document.getElementById("envelope");
  const letter = scene?.querySelector(".letter");
  if (!env || !scene) return;

  let opened = false;
  const open = () => {
    if (opened) return;
    opened = true;
    scene.classList.add("is-open");
    if (letter) {
      // Move the letter to <body> so it centres on the VIEWPORT. The envelope has
      // `perspective`, which would otherwise trap this fixed element inside it and
      // let it slide off the top of the screen.
      document.body.appendChild(letter);
      letter.setAttribute("aria-hidden", "false");
      // commit the start styles at the new location, then transition up to centre
      void letter.offsetWidth;
      letter.classList.add("is-out");
      // move focus to the call-to-action once the letter has risen
      const cta = letter.querySelector(".btn");
      if (cta) setTimeout(() => cta.focus({ preventScroll: true }), 1000);
    }
  };

  env.addEventListener("click", (e) => {
    // don't re-trigger when clicking the CTA inside the open letter
    if (e.target.closest(".btn")) return;
    open();
  });
  env.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });
})();
