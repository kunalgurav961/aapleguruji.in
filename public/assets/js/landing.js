(function () {
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector(".main-nav");
  var savedTheme = localStorage.getItem("aaple-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("aaple-theme", nextTheme);
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
  }

  document.querySelectorAll(".booking-tabs button").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document
        .querySelectorAll(".booking-tabs button")
        .forEach(function (item) {
          item.classList.remove("active");
        });
      tab.classList.add("active");
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(
      ".service-card, .steps > div, .testimonial-grid article, .festival-grid article, .feature-card",
    )
    .forEach(function (element) {
      observer.observe(element);
    });
})();
