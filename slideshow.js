"use strict";

(() => {
  const SLIDE_DURATION = 10_000;
  const CONTROL_HIDE_DELAY = 3_000;
  const slides = Array.from(document.querySelectorAll(".slide"));
  const segments = Array.from(document.querySelectorAll(".segment"));
  const stage = document.getElementById("stage");
  const controls = document.getElementById("controls");
  const playPause = document.getElementById("play-pause");
  const fullscreen = document.getElementById("fullscreen");
  const announcement = document.getElementById("announcement");
  const notice = document.getElementById("notice");
  let current = 0;
  let ready = false;
  let playing = true;
  let remaining = SLIDE_DURATION;
  let deadline = 0;
  let timer = null;
  let controlTimer = null;

  function announce(message) {
    announcement.textContent = message;
  }

  function updatePlayback() {
    document.body.dataset.playing = String(playing);
    stage.dataset.paused = String(!ready || !playing || document.hidden);
    playPause.setAttribute("aria-label", playing ? "Mettre en pause" : "Reprendre le défilement");
    playPause.title = playing ? "Pause (espace)" : "Reprendre (espace)";
  }

  function stopTimer() {
    if (timer !== null) {
      remaining = Math.max(0, deadline - performance.now());
      window.clearTimeout(timer);
      timer = null;
    }
  }

  function schedule() {
    updatePlayback();
    if (!ready || !playing || document.hidden || timer !== null) return;
    deadline = performance.now() + remaining;
    timer = window.setTimeout(() => {
      timer = null;
      show(current + 1);
    }, remaining);
  }

  function show(index, manual = false) {
    const next = (index + slides.length) % slides.length;
    stopTimer();
    current = next;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
    });
    segments.forEach((segment, i) => {
      segment.classList.toggle("is-current", i === current);
      segment.classList.toggle("is-past", i < current);
    });
    stage.dataset.theme = slides[current].classList.contains("slide--night") ? "night" : "light";
    document.getElementById("current-number").textContent = String(current + 1).padStart(2, "0");
    remaining = SLIDE_DURATION;
    if (manual) announce(slides[current].getAttribute("aria-label"));
    schedule();
  }

  function togglePlayback() {
    if (playing) stopTimer();
    playing = !playing;
    schedule();
    announce(playing ? "Défilement repris." : "Diaporama en pause.");
  }

  function revealControls() {
    document.body.dataset.controls = "visible";
    window.clearTimeout(controlTimer);
    controlTimer = window.setTimeout(() => {
      // Keyboard users retain visible controls while a button has focus.
      if (!controls.contains(document.activeElement)) {
        document.body.dataset.controls = "hidden";
      }
    }, CONTROL_HIDE_DELAY);
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        announce("Utilisez la commande plein écran de votre navigateur.");
        notice.textContent = "Utilisez la commande plein écran de votre navigateur (F11 sur la plupart des ordinateurs).";
        notice.hidden = false;
      }
    } catch {
      notice.textContent = "Le plein écran n’a pas pu être activé. Utilisez la commande plein écran du navigateur.";
      notice.hidden = false;
    }
    revealControls();
  }

  document.getElementById("previous").addEventListener("click", () => show(current - 1, true));
  document.getElementById("next").addEventListener("click", () => show(current + 1, true));
  playPause.addEventListener("click", togglePlayback);
  fullscreen.addEventListener("click", toggleFullscreen);

  document.addEventListener("fullscreenchange", () => {
    const active = Boolean(document.fullscreenElement);
    const label = active ? "Quitter le plein écran" : "Passer en plein écran";
    fullscreen.setAttribute("aria-label", label);
    fullscreen.title = active ? "Quitter le plein écran (F ou Échap)" : "Plein écran (F)";
    document.getElementById("fullscreen-label").textContent = active ? "Quitter" : "Plein écran";
    revealControls();
  });

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.isContentEditable) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
    revealControls();
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1, true);
    } else if (event.code === "Space" && event.target.tagName !== "BUTTON") {
      event.preventDefault();
      if (!event.repeat) togglePlayback();
    } else if (event.key.toLowerCase() === "f" && !event.repeat) {
      event.preventDefault();
      toggleFullscreen();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTimer();
    schedule();
  });
  document.addEventListener("pointermove", revealControls, { passive: true });
  document.addEventListener("pointerdown", revealControls, { passive: true });
  document.addEventListener("focusin", revealControls);
  controls.addEventListener("focusout", revealControls);
  // Pointer clicks should not keep the toolbar visible indefinitely.
  controls.addEventListener("click", (event) => {
    if (event.detail > 0) event.target.closest("button")?.blur();
    revealControls();
  });

  async function prepareImages() {
    const images = Array.from(document.querySelectorAll(".artwork"));
    const results = await Promise.allSettled(images.map((image) => image.decode()));
    const failed = results.some((result) => result.status === "rejected");
    if (failed) {
      playing = false;
      notice.textContent = "Une illustration manque. Gardez le dossier « images » à côté du fichier index.html, puis rechargez la page.";
      notice.hidden = false;
    }
    ready = true;
    schedule();
  }

  updatePlayback();
  revealControls();
  prepareImages();
})();
