import Lenis from "@studio-freight/lenis";

initScripts();

function initSmoothScroll(params) {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function initScripts() {
  initSmoothScroll();
}
