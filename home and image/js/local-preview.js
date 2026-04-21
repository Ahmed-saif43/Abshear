(function () {
  const isLocalPreview = !/absher\.sa$/i.test(window.location.hostname);
  const absolutizeWpsPath = (value) => {
    if (!value || !value.startsWith("/wps/")) {
      return value;
    }

    return `https://www.absher.sa${value}`;
  };

  if (!isLocalPreview) {
    return;
  }

  document.querySelectorAll('a[href^="/wps/"]').forEach((link) => {
    link.href = absolutizeWpsPath(link.getAttribute("href"));
    link.target = link.target || "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll('img[src^="/wps/"]').forEach((image) => {
    image.src = absolutizeWpsPath(image.getAttribute("src"));
  });

  document.querySelectorAll('form[action^="/wps/"]').forEach((form) => {
    form.action = absolutizeWpsPath(form.getAttribute("action"));
  });

  const loginForm = document.getElementById("LoginForm");
  if (loginForm) {
    const submitButton = loginForm.querySelector('[type="submit"]');
    const notice = document.createElement("p");
    notice.className = "mt-3 mb-0 text-muted";
    notice.textContent = "Local preview mode: the interface is available, but authentication requires the original Absher backend.";
    loginForm.appendChild(notice);

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (submitButton) {
        submitButton.blur();
      }
    });
  }
})();
