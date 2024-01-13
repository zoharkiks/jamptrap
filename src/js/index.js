import Lenis from "@studio-freight/lenis";
import barba from "@barba/core";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);

const links = gsap.utils.toArray(".row-start-3 a");

// Initial setup on page load
initScripts();

function initSmoothScroll() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function toggleMenu() {
  const overlay = document.getElementById("menu-overlay");
  const tl = gsap.timeline();

  tl.paused(true);

  tl.fromTo(
    "#menu-button",
    { opacity: 1 },
    { opacity: 0, duration: 0.25, ease: "power1.inOut" }
  );

  tl.fromTo(
    overlay,
    { y: -932 },
    {
      y: 0,
      duration: 0.5,
      ease: CustomEase.create("custom", "1, 0, 0.24, 1"),
      display: "grid",
    }
  );

  tl.fromTo(
    "#close-menu-button",
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: "power1.inOut" }
  );

  tl.fromTo(
    links,
    { y: -20, opacity: 0 }, // From values
    {
      y: 0,
      opacity: 1,
      delay: 0.25,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
    },
    "<"
  );

  tl.fromTo(
    ".showReel",
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: "power1.inOut" }
  );

  // Animate Menu In
  function animateMenuIn() {
    if (overlay.classList.contains("hidden")) {
      document.body.classList.add("fixed", "inset-0");
      overlay.classList.remove("hidden"); // Remove the hidden class before animation
      tl.play();
    }
  }
  document.getElementById("menu-button").addEventListener("click", function () {
    animateMenuIn();
  });

  // Animate Menu Out
  function animateMenuOut() {
    document.body.classList.remove("fixed", "inset-0");

    gsap.to(overlay, {
      duration: 0.5,
      y: -932,
      ease: CustomEase.create("custom", "0.76, 0, 0.24, 1"),
      onComplete: () => {
        overlay.classList.add("hidden"), tl.pause(0);
      }, // Hide the overlay after the animation
    });
    gsap.to("#menu-button", { opacity: 1 });
  }
  document
    .getElementById("close-menu-button")
    .addEventListener("click", function () {
      animateMenuOut();
    });

  // function linkClickHandler(e) {
  //   let href = e.currentTarget.getAttribute("href");
  //   barba.go(href);
  // }

  // document.querySelectorAll(".transition-link").forEach((link) => {
  //   link.addEventListener("click", linkClickHandler);
  // });

  barba.init({
    transitions: [
      {
        name: "opacity-transition",
        async leave(data) {
          gsap.fromTo(
            data.current.container,
            { opacity: 1 },
            {
              opacity: 0,
              duration: 1,
              ease: "power1.inOut",
            }
          );
        },
        enter(data) {

          gsap.fromTo(
            data.next.container,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              ease: "power1.inOut",

              onComplete: () => {
              animateMenuOut(), initScripts();
              },
            }
          );
        },
      },
    ],
  });
}

function animateUnderline() {
  links.forEach((link) => {
    const underline = link.querySelector("div"); // Get the underline div for this link

    link.addEventListener("mouseenter", () => {
      gsap.set(link, {
        direction: "ltr", // Start scaling from the right
      });
      gsap.to(underline, {
        width: "100%", // Scale the underline a bit larger than full width
        duration: 0.3, // Duration of the animation
        ease: CustomEase.create("custom", "1, 0, 0.24, 1"),
        // Easing function
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.set(link, {
        direction: "rtl", // Start scaling from the right
      });

      gsap.to(underline, {
        width: 0, // Return to full width
        duration: 0.3, // Duration of the animation
        ease: CustomEase.create("custom", "1, 0, 0.24, 1"),
      });
    });
  });
}

function playVideos() {
  const videoContainers = document.querySelectorAll(".video-container");

  videoContainers.forEach((videoContainer) => {
    const video = videoContainer.querySelector("video");
    videoContainer.addEventListener("mouseenter", () => {
      video.play();
    });

    videoContainer.addEventListener("mouseleave", () => {
      video.pause();
    });
  });
}

function initScripts() {
  initSmoothScroll();
  toggleMenu();
  animateUnderline();
  playVideos();
}
