// ---------- menú móvil ----------
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ---------- simulador de tiempo de vida (hero) ----------
// Convierte horas de uso diario en días por mes y semanas por año.
const simRange = document.getElementById('simRange');
const simHoursValue = document.getElementById('simHoursValue');
const simDays = document.getElementById('simDays');
const simWeeks = document.getElementById('simWeeks');

function pulse(el) {
  if (!el) return;
  el.classList.remove('pulse');
  void el.offsetWidth; // fuerza reflow para poder reiniciar la animación
  el.classList.add('pulse');
}

function updateSliderFill(input) {
  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const value = parseFloat(input.value);
  const percent = ((value - min) / (max - min)) * 100;
  input.style.background =
    `linear-gradient(to right, var(--celeste) ${percent}%, var(--border) ${percent}%)`;
}

function updateSimulator(hoursPerDay) {
  const daysPerMonth = (hoursPerDay * 30) / 24;
  const weeksPerYear = (hoursPerDay * 365) / 168;

  if (simHoursValue) simHoursValue.textContent = hoursPerDay.toFixed(1);
  if (simDays) simDays.textContent = daysPerMonth.toFixed(1);
  if (simWeeks) simWeeks.textContent = weeksPerYear.toFixed(1);
  pulse(simHoursValue);
}

if (simRange) {
  updateSimulator(parseFloat(simRange.value));
  updateSliderFill(simRange);
  simRange.addEventListener('input', (event) => {
    const value = parseFloat(event.target.value);
    updateSimulator(value);
    updateSliderFill(event.target);
  });
}
