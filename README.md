# special-person-deluxe 💌

A dreamy, blush-and-pastel three-act love note for **Kg Ma Lyy** — a cuter,
smoother, animated take on the original `special-person` project.

## The three acts
1. **`index.html`** — a sealed envelope with a pulsing heart wax-seal. Tap it
   and the flap opens, the letter rises out, and a *Yes, tell me* button leads on.
2. **`story.html`** — a storybook you turn page by page (click the right/left
   half, use the arrows, swipe, or arrow keys). Each chapter has a polaroid
   **placeholder** photo slot.
3. **`question.html`** — the actual ask. The **No** button gently runs away
   (and the **Yes** grows). Tapping **Yes** triggers a confetti + heart burst,
   a celebration screen, and an EmailJS notification.

## Open it
Just open `index.html` in a browser. (For the fonts, confetti, and EmailJS you
need an internet connection — they load from CDNs.)

For the page-to-page transitions to work smoothly, serve the folder rather than
opening files directly is optional but nicer:

```bash
# from this folder
python -m http.server 8000   # then visit http://localhost:8000
```

## Make it yours
- **Photos:** replace the `.polaroid__frame` placeholders in `story.html` with
  your own `<img>` tags (drop images into `assets/img/`).
- **Words:** all the copy lives in the three `.html` files.
- **Email notify:** keys live in `assets/js/question.js` (`EMAIL` object),
  reused from the original project. Swap in your own EmailJS service/template/
  public key if you'd like, or delete that block to turn it off.

## Built with
Pure HTML/CSS/JS. Fonts: **Caveat** (handwritten) + **Quicksand** (rounded
sans). Confetti via `canvas-confetti`. Email via `@emailjs/browser`. Full
`prefers-reduced-motion` fallbacks throughout.
