(function () {
  const renderKioskList = () => {
    const list = document.getElementById("kiosks-list");
    const title = document.getElementById("provinceTitle");
    const kiosks = window.absherKioskLocations || [];

    if (!list) {
      return;
    }

    if (!kiosks.length) {
      list.innerHTML = '<li class="border rounded-4 p-3 bg-white">Kiosk data is not available in local preview mode.</li>';
      return;
    }

    list.innerHTML = kiosks
      .map(
        (kiosk, index) => `
          <li class="mb-3">
            <button
              type="button"
              class="w-100 border rounded-4 bg-white text-start p-3"
              data-kiosk-region="${kiosk.region}"
              aria-pressed="${index === 0 ? "true" : "false"}"
            >
              <div class="d-flex flex-column gap-1">
                <strong>${kiosk.title}</strong>
                <span>${kiosk.subtitle}</span>
                <span>${kiosk.location}</span>
                <small>${kiosk.hours}</small>
              </div>
            </button>
          </li>
        `
      )
      .join("");

    if (title) {
      title.textContent = "Choose Region";
    }

    const buttons = list.querySelectorAll("[data-kiosk-region]");
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
      });

      if (index === 0) {
        button.click();
      }
    });
  };

  window.initializeSection = renderKioskList;
})();
