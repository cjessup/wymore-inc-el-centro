(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var btn = document.querySelector(".menu-btn");
  var panel = document.querySelector(".nav-panel");
  if (btn && panel) {
    btn.addEventListener("click", function () {
      var open = panel.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 719px)").matches) {
          panel.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
          btn.textContent = "Menu";
        }
      });
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nodes = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach(function (el, i) {
      el.style.transitionDelay = (i % 5) * 70 + "ms";
      io.observe(el);
    });
  }

  var box = document.querySelector(".lightbox");
  if (box) {
    var pic = box.querySelector("img");
    var cap = box.querySelector(".lightbox-cap");
    var closer = box.querySelector(".lightbox-close");
    function closeBox() {
      box.classList.remove("is-on");
      window.setTimeout(function () {
        box.hidden = true;
        pic.removeAttribute("src");
      }, reduce ? 0 : 280);
    }
    document.querySelectorAll(".shot").forEach(function (shot) {
      shot.addEventListener("click", function () {
        var img = shot.querySelector("img");
        pic.alt = img ? img.alt : "";
        cap.textContent = shot.getAttribute("data-cap") || "";
        box.hidden = false;
        pic.src = shot.getAttribute("data-full");
        window.requestAnimationFrame(function () { box.classList.add("is-on"); });
      });
    });
    closer.addEventListener("click", closeBox);
    box.addEventListener("click", function (e) {
      if (e.target === box) closeBox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !box.hidden) closeBox();
    });
  }

  var form = document.querySelector(".demo-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var thanks = form.querySelector(".form-thanks");
      if (thanks) thanks.hidden = false;
      form.querySelectorAll("input, textarea, button").forEach(function (field) {
        if (field.type !== "button") field.disabled = true;
      });
    });
  }
})();
