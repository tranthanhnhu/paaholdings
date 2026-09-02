(function () {
  "use strict";
  var PAGES = {
    home: "",
    "who-we-are": "who-we-are",
    "investment-approach": "investment-approach",
    "our-business": "our-business",
    "paa-agro": "paa-agro",
    contact: "contact"
  };

  function page() {
    var f = window.location.pathname.split("/").pop() || "";
    if (f === "" || f === "index.html" || f === "index") return "home";
    return f.replace(/\.html$/, "");
  }

  function b() { return window.PAA_I18N ? window.PAA_I18N.base() : "./"; }
  function href(p) {
    var path = PAGES[p];
    if (p === "home") return b();
    return b() + path;
  }

  function langs() {
    return (
      '<div class="lang-switcher" role="group" aria-label="Language">' +
      '<button type="button" class="lang-btn" data-lang="vi" data-i18n="lang.vi">VI</button>' +
      '<span class="lang-sep">·</span>' +
      '<button type="button" class="lang-btn" data-lang="en" data-i18n="lang.en">EN</button>' +
      '<span class="lang-sep">·</span>' +
      '<button type="button" class="lang-btn" data-lang="zh" data-i18n="lang.zh">中文</button>' +
      '<span class="lang-sep">·</span>' +
      '<button type="button" class="lang-btn" data-lang="lo" data-i18n="lang.lo">ລາວ</button>' +
      "</div>"
    );
  }

  function nav(cur) {
    return [
      ["who-we-are", "nav.whoWeAre"],
      ["investment-approach", "nav.investmentApproach"],
      ["our-business", "nav.ourBusiness"],
      ["contact", "nav.contact"]
    ].map(function (item) {
      var cls = cur === item[0] ? " nav-link is-active" : " nav-link";
      return '<a class="' + cls.trim() + '" href="' + href(item[0]) + '" data-i18n="' + item[1] + '"></a>';
    }).join("");
  }

  function mobileNav(cur) {
    return [
      ["who-we-are", "nav.whoWeAre"],
      ["investment-approach", "nav.investmentApproach"],
      ["our-business", "nav.ourBusiness"],
      ["contact", "nav.contact"]
    ].map(function (item) {
      var cls = cur === item[0] ? "is-active" : "";
      return '<a class="' + cls + '" href="' + href(item[0]) + '" data-i18n="' + item[1] + '"></a>';
    }).join("");
  }

  function header() {
    var cur = page();
    var hero = ["home", "who-we-are", "investment-approach", "our-business", "paa-agro", "contact"].indexOf(cur) !== -1;
    var el = document.getElementById("site-header");
    if (!el) return;
    el.className = "site-header" + (hero ? "" : " is-solid");
    var logo = hero ? b() + "assets/images/logo/mark-white.png" : b() + "assets/images/logo/mark.png";
    el.innerHTML =
      '<div class="header-inner">' +
      '<a class="logo-link" href="' + href("home") + '"><img class="logo-mark" src="' + logo + '" alt="PAA" width="42" height="38" /></a>' +
      '<nav class="nav-desktop" aria-label="Main">' + nav(cur) + "</nav>" +
      '<div class="header-actions">' + langs() +
      '<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false"><span></span></button>' +
      "</div></div>";

    var menu = document.getElementById("mobile-menu");
    if (menu) {
      menu.innerHTML =
        '<div class="mobile-menu-top">' +
        '<a href="' + href("home") + '"><img class="logo-mark" src="' + b() + 'assets/images/logo/mark-white.png" alt="PAA" width="42" height="38" /></a>' +
        '<button type="button" class="mobile-menu-close" aria-label="Close">&times;</button></div>' +
        '<nav class="mobile-nav">' + mobileNav(cur) + "</nav>" +
        '<div class="mobile-langs">' +
        '<button class="lang-btn" data-lang="vi" data-i18n="lang.vi">VI</button>' +
        '<button class="lang-btn" data-lang="en" data-i18n="lang.en">EN</button>' +
        '<button class="lang-btn" data-lang="zh" data-i18n="lang.zh">中文</button>' +
        '<button class="lang-btn" data-lang="lo" data-i18n="lang.lo">ລາວ</button></div>';
    }
  }

  function footer() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    el.innerHTML =
      '<div class="site-footer"><div class="footer-inner">' +
      '<a href="' + href("home") + '"><img class="footer-logo" src="' + b() + 'assets/images/logo/mark-white.png" alt="PAA" width="48" height="43" /></a>' +
      '<div class="footer-hq"><p class="footer-hq__label" data-i18n="footer.hqLabel"></p>' +
      '<p><span data-i18n="footer.company"></span><br><span data-i18n="footer.location"></span></p></div>' +
      '<nav class="footer-nav">' +
      '<a href="' + href("who-we-are") + '" data-i18n="nav.whoWeAre"></a>' +
      '<a href="' + href("investment-approach") + '" data-i18n="nav.investmentApproach"></a>' +
      '<a href="' + href("our-business") + '" data-i18n="nav.ourBusiness"></a>' +
      '<a href="' + href("contact") + '" data-i18n="nav.contact"></a></nav>' +
      '<p class="footer-copy" data-i18n="common.copyright"></p></div></div>';
  }

  function bind() {
    var menu = document.getElementById("mobile-menu");
    document.addEventListener("click", function (e) {
      if (e.target.closest(".menu-toggle")) {
        menu.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
      if (e.target.closest(".mobile-menu-close") || e.target.closest(".mobile-nav a")) {
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
    var hdr = document.getElementById("site-header");
    if (hdr && document.querySelector(".hero")) {
      var logoColor = b() + "assets/images/logo/mark.png";
      var logoWhite = b() + "assets/images/logo/mark-white.png";
      var logoImg = hdr.querySelector(".logo-mark");
      function updateHeader() {
        var solid = window.scrollY > 60;
        hdr.classList.toggle("is-solid", solid);
        if (logoImg) logoImg.src = solid ? logoColor : logoWhite;
      }
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }
  }

  function refreshI18n() {
    if (!window.PAA_I18N) return;
    document.querySelectorAll("#site-header [data-i18n], #site-footer [data-i18n], #mobile-menu [data-i18n]").forEach(function (el) {
      el.textContent = window.PAA_I18N.t(el.getAttribute("data-i18n"));
    });
  }

  function init() {
    header();
    footer();
    bind();
    document.addEventListener("paa:locale", refreshI18n);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
