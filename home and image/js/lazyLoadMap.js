
const svgContainer = document.getElementById("saudi-arabia-map-svg");
const kiosksContainer = document.querySelector(".kiosks-list");

if (svgContainer && kiosksContainer) {
  if (svgContainer.children.length === 0) {
    kiosksContainer.style.transform = "translateY(0px)";
  } else {
    kiosksContainer.style.transform = "translateY(-90px)";
  }

  const svgPath = svgContainer.dataset.svgSrc;

  if (!("IntersectionObserver" in window)) {
    loadSVG(svgContainer, svgPath);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadSVG(svgContainer, svgPath);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(svgContainer);
  }
}

function loadSVG(container, path) {
  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.text();
    })
    .then((svgContent) => {
      container.innerHTML = svgContent;
      const svgElement = container.querySelector("svg");

      if (!svgElement) {
        throw new Error("No SVG element found in the loaded content");
      }

      container.dispatchEvent(new CustomEvent("svgLoaded", {
        detail: { container, svgElement },
      }));

      kiosksContainer.removeAttribute("style");
      return loadScript("assets/scripts/map.js");
    })
    .catch((error) => {
      console.error("Failed to load SVG:", error);
      container.innerHTML = '<div class="border rounded-4 p-4 bg-white">Map preview is unavailable right now.</div>';
      kiosksContainer.removeAttribute("style");
    });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    script.onload = () => {
      svgContainer.dispatchEvent(new CustomEvent("scriptLoaded", {
        detail: { container: svgContainer },
      }));
      resolve();
    };

    script.onerror = (error) => {
      reject(error);
    };

    document.body.appendChild(script);
  });
}
  
 
 
