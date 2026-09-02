(function () {
  "use strict";
  var LOCALES = ["vi", "en", "zh", "lo"];
  var DEFAULT = "en";
  var dict = {};
  var locale = DEFAULT;

  var PAGE_SLUGS = ["who-we-are", "investment-approach", "our-business", "paa-agro", "contact"];

  function base() {
    var path = window.location.pathname;
    var parts = path.split("/").filter(Boolean);
    if (parts.length) {
      var last = parts[parts.length - 1];
      if (last.indexOf(".html") !== -1 || last === "index" || PAGE_SLUGS.indexOf(last) !== -1) {
        parts.pop();
      }
    }
    var depth = parts.length;
    return depth ? "../".repeat(depth) : "./";
  }

  function get(obj, key) {
    return key.split(".").reduce(function (acc, part) {
      if (acc == null) return undefined;
      if (Array.isArray(acc) && /^\d+$/.test(part)) return acc[+part];
      return acc[part];
    }, obj);
  }

  function t(key) {
    var v = get(dict, key);
    return v !== undefined ? v : key;
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr").split(":");
      var v = t(spec[1]);
      if (v !== undefined) el.setAttribute(spec[0], v);
    });
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === locale;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function load(next) {
    return fetch(base() + "i18n/" + next + ".json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        dict = data;
        locale = next;
        localStorage.setItem("paa-locale", next);
        document.documentElement.lang = next === "zh" ? "zh-Hans" : next;
        apply();
        document.dispatchEvent(new CustomEvent("paa:locale"));
      })
      .catch(function () {
        if (next !== DEFAULT) return load(DEFAULT);
      });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-lang]");
    if (!btn) return;
    e.preventDefault();
    var next = btn.getAttribute("data-lang");
    if (LOCALES.indexOf(next) !== -1 && next !== locale) load(next);
  });

  function init() {
    var saved = localStorage.getItem("paa-locale");
    load(LOCALES.indexOf(saved) !== -1 ? saved : DEFAULT);
  }

  window.PAA_I18N = { t: t, locale: function () { return locale; }, base: base };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
