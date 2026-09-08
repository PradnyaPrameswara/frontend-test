(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  function initAnalyticsTracking() {
    var trackedAnchors = document.querySelectorAll(".tracked-anchor");

    Array.prototype.forEach.call(trackedAnchors, function (anchor) {
      anchor.addEventListener("click", function () {
        window.dataLayer.push({
          event: "navigation_click",
          navigation_label: anchor.getAttribute("data-analytics-label"),
          navigation_target: anchor.getAttribute("href")
        });
      });
    });
  }

  function initTabs() {
    var tabRoot = document.querySelector("[data-tabs]");

    if (!tabRoot) {
      return;
    }

    var tabButtons = tabRoot.querySelectorAll("[data-tab]");
    var tabPanels = tabRoot.querySelectorAll("[data-panel]");

    function activateTab(tabName) {
      Array.prototype.forEach.call(tabButtons, function (button) {
        var isActive = button.getAttribute("data-tab") === tabName;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      Array.prototype.forEach.call(tabPanels, function (panel) {
        var isActive = panel.getAttribute("data-panel") === tabName;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    }

    Array.prototype.forEach.call(tabButtons, function (button, index) {
      button.addEventListener("click", function () {
        activateTab(button.getAttribute("data-tab"));
      });

      button.addEventListener("keydown", function (event) {
        var targetIndex = index;

        if (event.key === "ArrowRight") {
          targetIndex = (index + 1) % tabButtons.length;
        } else if (event.key === "ArrowLeft") {
          targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else {
          return;
        }

        event.preventDefault();
        tabButtons[targetIndex].focus();
        activateTab(tabButtons[targetIndex].getAttribute("data-tab"));
      });
    });
  }

  function initSlider() {
    var slider = document.querySelector("[data-slider]");

    if (!slider) {
      return;
    }

    var slides = slider.querySelectorAll("[data-slide]");
    var dots = slider.querySelectorAll("[data-slide-to]");
    var previousButton = slider.querySelector(".slider-prev");
    var nextButton = slider.querySelector(".slider-next");
    var currentSlide = 0;

    function showSlide(index) {
      currentSlide = (index + slides.length) % slides.length;

      Array.prototype.forEach.call(slides, function (slide, slideIndex) {
        var isActive = slideIndex === currentSlide;
        slide.classList.toggle("is-active", isActive);
        slide.hidden = !isActive;
      });

      Array.prototype.forEach.call(dots, function (dot, dotIndex) {
        var isActive = dotIndex === currentSlide;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    previousButton.addEventListener("click", function () {
      showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", function () {
      showSlide(currentSlide + 1);
    });

    Array.prototype.forEach.call(dots, function (dot) {
      dot.addEventListener("click", function () {
        showSlide(parseInt(dot.getAttribute("data-slide-to"), 10));
      });
    });

    showSlide(0);
  }

  initAnalyticsTracking();
  initTabs();
  initSlider();
}());
