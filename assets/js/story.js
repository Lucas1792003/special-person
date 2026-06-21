/* story.js — page-turning storybook */
(() => {
  const book = document.getElementById("book");
  if (!book) return;
  const pages = [...book.querySelectorAll("[data-page]")];
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const dotsWrap = document.getElementById("dots");

  let current = 0;
  const last = pages.length - 1;

  // build heart dots
  pages.forEach((_, i) => {
    const d = document.createElement("span");
    d.className = "dot";
    d.textContent = "💗";
    dotsWrap.appendChild(d);
  });
  const dots = [...dotsWrap.children];

  const render = () => {
    pages.forEach((page, i) => {
      page.classList.remove("is-active", "is-turned", "is-upcoming", "is-deep");
      if (i < current) {
        page.classList.add("is-turned");
        page.style.zIndex = i;                    // turned pages settle on the left
      } else if (i === current) {
        page.classList.add("is-active");
        page.style.zIndex = 100;                  // the page you're reading, on top
      } else {
        page.classList.add("is-upcoming");
        if (i > current + 1) page.classList.add("is-deep");
        page.style.zIndex = 100 - (i - current);  // upcoming pages stacked behind
      }
      page.setAttribute("aria-hidden", i === current ? "false" : "true");
    });
    dots.forEach((d, i) => d.classList.toggle("on", i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === last;
  };

  const go = (n) => {
    current = Math.max(0, Math.min(last, n));
    render();
  };

  nextBtn.addEventListener("click", () => go(current + 1));
  prevBtn.addEventListener("click", () => go(current - 1));

  // turn by tapping the right/left half of the active page
  book.addEventListener("click", (e) => {
    if (e.target.closest(".btn") || e.target.closest("a")) return;
    const rect = book.getBoundingClientRect();
    if (e.clientX > rect.left + rect.width / 2) go(current + 1);
    else go(current - 1);
  });

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(current + 1);
    if (e.key === "ArrowLeft") go(current - 1);
  });

  // touch swipe
  let sx = 0;
  book.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  book.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 45) go(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  render();
})();
