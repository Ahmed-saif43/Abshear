(function () {
  const container = document.getElementById("saudi-arabia-map-svg");
  let didBindClicks = false;

  if (!container) {
    return;
  }

  const syncActiveRegion = (region) => {
    const regions = container.querySelectorAll("[data-region]");
    regions.forEach((shape) => {
      const isActive = shape.getAttribute("data-region") === region;
      shape.setAttribute("opacity", isActive ? "1" : "0.55");
      shape.setAttribute("stroke-width", isActive ? "6" : "4");
    });
  };

  const bindRegionButtons = () => {
    if (didBindClicks) {
      return;
    }

    didBindClicks = true;
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-kiosk-region]");
      if (!button) {
        return;
      }

      syncActiveRegion(button.getAttribute("data-kiosk-region"));
    });
  };

  if (container.querySelector("svg")) {
    bindRegionButtons();
    syncActiveRegion("central");
  }

  container.addEventListener("svgLoaded", () => {
    bindRegionButtons();
    syncActiveRegion("central");
  });
})();
