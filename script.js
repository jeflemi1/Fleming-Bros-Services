const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const serviceSelect = document.getElementById('service');
const detailsField = document.getElementById('details');
const detailsHint = document.getElementById('details-hint');

function selectedServiceText() {
  if (!serviceSelect || serviceSelect.selectedIndex < 0) return '';
  return serviceSelect.options[serviceSelect.selectedIndex].text;
}

function isPowerWashing() {
  return selectedServiceText() === 'Power Washing';
}

function syncDetailsRequirement() {
  if (!detailsField) return;
  const required = isPowerWashing();
  detailsField.required = required;
  detailsField.setAttribute('aria-required', required ? 'true' : 'false');
  if (detailsHint) {
    detailsHint.textContent = required ? '(required for power washing)' : '(optional)';
  }
}

function selectService(serviceName) {
  if (!serviceSelect || !serviceName) return false;
  const needle = serviceName.trim().toLowerCase();
  const options = Array.from(serviceSelect.options);
  const match =
    options.find((option) => option.text.toLowerCase() === needle) ||
    options.find((option) => option.value.toLowerCase() === needle) ||
    options.find((option) => option.text.toLowerCase().startsWith(needle));
  if (!match || !match.value) return false;
  serviceSelect.value = match.value;
  syncDetailsRequirement();
  return true;
}

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    selectService(link.getAttribute('data-service'));
  });
});

if (serviceSelect) {
  serviceSelect.addEventListener('change', syncDetailsRequirement);
}

const params = new URLSearchParams(window.location.search);
selectService(params.get('service'));
syncDetailsRequirement();
