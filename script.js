(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const service = document.getElementById("service");
  const detailsField = document.getElementById("details-field");
  const details = document.getElementById("details");

  function syncDetails() {
    if (!service || !detailsField || !details) return;
    const power = service.value === "Power Washing";
    detailsField.hidden = !power;
    details.required = power;
    if (!power) details.value = "";
  }

  if (service) {
    service.addEventListener("change", syncDetails);
    syncDetails();
  }

  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const value = link.getAttribute("data-service");
      if (!value || !service) return;
      const option = Array.from(service.options).find((o) => o.value === value);
      if (option) {
        service.value = value;
        syncDetails();
      }
    });
  });
})();
