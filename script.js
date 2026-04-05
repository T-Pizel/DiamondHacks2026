document.addEventListener("DOMContentLoaded", () => {
  const zipInput = document.getElementById("userZip");
  const button = document.getElementById("userButton");

  zipInput.addEventListener("input", () => {
    zipInput.value = zipInput.value.replace(/\D/g, "");

    button.disabled = zipInput.value.length === 0;
  });

  button.addEventListener("click", () => {
    const value = zipInput.value.trim();

    const isFiveDigits = /^\d{5}$/.test(value);
    const zip = parseInt(value, 10);

    const isValidCA =
      isFiveDigits && zip >= 90001 && zip <= 96199;

    if (!isValidCA) {

      zipInput.value = "";

      zipInput.placeholder = "Enter a valid California ZIP code";

      button.disabled = true;

      return;
    }

    window.location.href = "page.html";
  });

  const carousel = document.querySelector(".uclinks-carousel");
  if (carousel) {
    const slides = [...carousel.querySelectorAll(".uclinks-slide")];
    const dots = [...carousel.querySelectorAll(".uclinks-carousel-dot")];
    const intervalMs = Math.max(
      2000,
      parseInt(carousel.dataset.intervalMs, 10) || 5000
    );
    let index = 0;
    let timer = null;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((slide, j) =>
        slide.classList.toggle("is-active", j === index)
      );
      dots.forEach((dot, j) => {
        const on = j === index;
        dot.classList.toggle("is-active", on);
        dot.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    function next() {
      goTo(index + 1);
    }

    function start() {
      if (motionQuery.matches || slides.length < 2) return;
      stop();
      timer = window.setInterval(next, intervalMs);
    }

    function stop() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach((dot, j) => {
      dot.addEventListener("click", () => {
        goTo(j);
        stop();
        start();
      });
    });

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", (e) => {
      const next = e.relatedTarget;
      if (next instanceof Node && carousel.contains(next)) return;
      start();
    });

    motionQuery.addEventListener("change", () => {
      stop();
      goTo(0);
      start();
    });

    start();
  }

  const uclinksList = document.getElementById("uclinksList");
  const showMoreBtn = document.getElementById("uclinksShowMore");
  const extraItems = document.querySelectorAll(".uclinks-item--extra");
  if (showMoreBtn && uclinksList && extraItems.length) {
    const setExpanded = (nextExpanded) => {
      showMoreBtn.setAttribute(
        "aria-expanded",
        nextExpanded ? "true" : "false"
      );
      uclinksList.classList.toggle("is-expanded", nextExpanded);
      extraItems.forEach((li) => {
        if (nextExpanded) li.removeAttribute("hidden");
        else li.setAttribute("hidden", "");
      });
      showMoreBtn.textContent = nextExpanded ? "Show less" : "Show more";
    };

    showMoreBtn.addEventListener("click", () => {
      const expanded = showMoreBtn.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
    });
  }
});