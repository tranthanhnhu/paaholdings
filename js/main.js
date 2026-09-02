(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.querySelector(".filter-bar");
    if (bar) {
      var cards = document.querySelectorAll(".portfolio-card");
      bar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;
        var f = btn.getAttribute("data-filter");
        bar.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        cards.forEach(function (c) {
          var path = c.getAttribute("data-path");
          c.classList.toggle("is-hidden", f !== "all" && path !== f);
        });
      });
    }

    document.querySelectorAll(".milestone").forEach(function (m) {
      m.addEventListener("click", function () {
        m.classList.toggle("is-open");
      });
    });
  });
})();
