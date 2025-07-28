/**
 * Site mode switcher
 */
document.addEventListener("DOMContentLoaded", function() {
  var modeSwitcher = document.getElementById("mode-switcher");
  var templateBodyClass = document.body;

  function setSiteMode(mode) {
      localStorage.setItem("site-mode", mode);
  }

  function getSiteMode() {
      return localStorage.getItem("site-mode");
  }

  // Check if a site mode is stored in local storage and set the mode accordingly
  var modeStored = getSiteMode();
  if (modeStored) {
      if (modeStored === "dark-mode") {
          // Set dark mode
          modeSwitcher.classList.remove("light-mode");
          modeSwitcher.classList.add("dark-mode");
          modeSwitcher.setAttribute("data-site-mode", "dark-mode");
          templateBodyClass.classList.remove('site-mode--light');
          templateBodyClass.classList.add('site-mode--dark');
      } else {
          // Set light mode (or default)
          modeSwitcher.classList.remove("dark-mode");
          modeSwitcher.classList.add("light-mode");
          modeSwitcher.setAttribute("data-site-mode", "light-mode");
          templateBodyClass.classList.remove('site-mode--dark');
          templateBodyClass.classList.add('site-mode--light');
      }
  }

  // Add click event listener to mode switcher
  modeSwitcher.addEventListener("click", function(e) {
      e.preventDefault();
      var currentMode = modeSwitcher.getAttribute("data-site-mode");

      if (currentMode === "light-mode") {
          // Switch to dark mode
          setSiteMode("dark-mode");
          modeSwitcher.classList.remove("light-mode");
          modeSwitcher.classList.add("dark-mode");
          modeSwitcher.setAttribute("data-site-mode", "dark-mode");
          templateBodyClass.classList.remove('site-mode--light');
          templateBodyClass.classList.add('site-mode--dark');
      } else {
          // Switch to light mode
          setSiteMode("light-mode");
          modeSwitcher.classList.remove("dark-mode");
          modeSwitcher.classList.add("light-mode");
          modeSwitcher.setAttribute("data-site-mode", "light-mode");
          templateBodyClass.classList.remove('site-mode--dark');
          templateBodyClass.classList.add('site-mode--light');
      }
  });
});

jQuery(document).ready(function($) {
    /**
     * Sticky Sidebar
     */
     $('#secondary').theiaStickySidebar({
        additionalMarginTop: 30
    });
    
    $('#primary').theiaStickySidebar({
        additionalMarginTop: 30
    });
});