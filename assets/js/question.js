/* question.js — runaway "No", joyful "Yes" + confetti + EmailJS notify */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const taunt = document.getElementById("taunt");
  const celebrate = document.getElementById("celebrate");
  const statusEl = document.getElementById("status");
  if (!yes || !no) return;

  /* ---- EmailJS config (reused from the original project) -------------- */
  const EMAIL = {
    publicKey: "qp3JNk163rLmQtNnz",
    serviceID: "service_kogjucd",
    templateID: "template_vovadfm",
  };
  try { if (window.emailjs) emailjs.init(EMAIL.publicKey); } catch (_) { }

  const emailParams = () => ({
    answer: "Yes",
    question: document.querySelector(".ask__title")?.innerText.trim() || "She clicked Yes",
    clicked_at: new Date().toLocaleString(),
    page_url: window.location.href,
  });

  /* ---- the runaway No ------------------------------------------------- */
  const taunts = [
    "are you sure? 🥺",
    "the button is shy, try again 😅",
    "hmm, that one keeps slipping…",
    "okay it's basically running now 🏃",
    "Yes is RIGHT there, look 👉",
    "my heart can't take the suspense 💓",
    "you can't catch it, it's in love too 💘",
  ];
  let dodges = 0;
  let yesScale = 1;
  let pinned = false;

  const flee = () => {
    const pad = 14;
    const rect = no.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // First dodge: switch to fixed but ANCHOR at the current spot, then force a
    // reflow. This gives the top/left transition a real starting value so the
    // button visibly SLIDES to its next spot instead of snapping/teleporting.
    if (!pinned) {
      no.classList.add("loose");
      // Move to <body> so position:fixed is relative to the VIEWPORT. (An ancestor
      // like .ask keeps a transform after its entrance animation, which would
      // otherwise make "fixed" relative to that small box and let it run off-page.)
      document.body.appendChild(no);
      no.style.left = Math.round(rect.left) + "px";
      no.style.top = Math.round(rect.top) + "px";
      void no.offsetWidth; // commit the start position
      pinned = true;
    }

    const maxX = Math.max(pad, window.innerWidth - w - pad);
    const maxY = Math.max(pad, window.innerHeight - h - pad);
    const minHop = Math.min(240, window.innerWidth * 0.45);

    // pick a new on-screen spot that's a decent distance away, so it clearly runs
    let x, y, tries = 0;
    do {
      x = pad + Math.random() * (maxX - pad);
      y = pad + Math.random() * (maxY - pad);
      tries++;
    } while (Math.hypot(x - rect.left, y - rect.top) < minHop && tries < 25);

    no.style.left = Math.round(x) + "px";
    no.style.top = Math.round(y) + "px";
    // stay full-size and visible — just a playful tilt as it scurries
    no.style.transform = `rotate(${(Math.random() * 16 - 8).toFixed(1)}deg)`;

    yesScale = Math.min(1.6, yesScale + 0.06);
    yes.style.setProperty("--yes-scale", yesScale.toFixed(2));
    if (taunt) taunt.textContent = taunts[Math.min(dodges, taunts.length - 1)];
    dodges++;
  };

  // desktop: flees when the cursor gets near. touch: flees on tap (never counts as No)
  no.addEventListener("mouseenter", flee);
  no.addEventListener("mouseover", flee);
  no.addEventListener("focus", flee);
  no.addEventListener("click", (e) => { e.preventDefault(); flee(); });

  let shootConfetti;
  const getConfettiShooter = () => {
    const canvas = document.getElementById("confetti");
    if (!canvas) return null;

    const sizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    sizeCanvas();
    if (!canvas.dataset.sized) {
      window.addEventListener("resize", sizeCanvas);
      canvas.dataset.sized = "true";
    }

    shootConfetti ||= confetti.create(canvas, { resize: true, useWorker: true });
    return shootConfetti;
  };

  /* ---- confetti + heart burst ---------------------------------------- */
  const burst = () => {
    if (reduce || typeof confetti !== "function") return;
    const shoot = getConfettiShooter();
    if (!shoot) return;
    const colors = ["#ff6f9c", "#ffb3c9", "#c8a2ff", "#ffd6a5", "#fff0f5"];
    const end = Date.now() + 1400;
    (function frame() {
      shoot({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors, scalar: 1.1 });
      shoot({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors, scalar: 1.1 });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    // a heart pop from the middle
    shoot({
      particleCount: 60, spread: 100, origin: { y: 0.5 }, scalar: 1.4, colors,
      shapes: ["circle"], startVelocity: 38,
    });
  };

  /* ---- the Yes -------------------------------------------------------- */
  let said = false;
  const sayYes = () => {
    if (said) return;
    said = true;
    celebrate.classList.add("show");
    burst();

    // notify via EmailJS (best-effort; never blocks the celebration)
    if (!window.emailjs) {
      statusEl.textContent = "email notify could not load";
      return;
    }

    statusEl.textContent = "sending the good news...";
    emailjs.send(EMAIL.serviceID, EMAIL.templateID, emailParams()).then(
      () => { statusEl.textContent = "he's been told 💌 (yes, really)"; },
      (err) => {
        window.__lastEmailError = err;
        console.error("EmailJS send failed:", err);
        statusEl.textContent = "email notify failed";
      }
    );
  };

  yes.addEventListener("click", sayYes);
})();
