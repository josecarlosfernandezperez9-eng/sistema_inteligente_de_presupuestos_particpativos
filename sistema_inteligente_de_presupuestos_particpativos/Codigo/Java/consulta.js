// Configuración
const TARGET_TOTAL = 520000000; // $520,000,000 MXN
const sliders = Array.from(document.querySelectorAll('.slider'));
const valueEls = [
  document.getElementById('value1'),
  document.getElementById('value2'),
  document.getElementById('value3'),
  document.getElementById('value4')
];
const totalEl = document.getElementById('total');
const totalContainer = document.getElementById('total-container');
const btnContinue = document.getElementById('btn-continuar');

// Inicial values (equally split)
const initialValues = sliders.map(() => Math.floor(TARGET_TOTAL / 4));

// Init sliders values if HTML differs
sliders.forEach((s, i) => {
  s.max = TARGET_TOTAL;
  // if input has a value already, keep it; otherwise set initial
  if (!s.value || parseInt(s.value) === 0) {
    s.value = initialValues[i];
  }
});

// Chart.js init
const ctx = document.getElementById('budgetChart').getContext('2d');
const chartColors = ['#e91e63','#2196f3','#ffc107','#00bcd4'];
const chartLabels = ['Gasto Corriente','Inversión','Servicios Públicos','Desarrollo Social'];

const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: chartLabels,
    datasets: [{
      data: sliders.map(s => parseInt(s.value)),
      backgroundColor: chartColors,
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: $${value.toLocaleString('es-MX')}`;
          }
        }
      }
    }
  }
});

// Helper: set CSS percent variable for slider fill (0-100%)
function setSliderFillPercent(slider) {
  const val = parseInt(slider.value);
  const max = parseInt(slider.max);
  const pct = (val / max) * 100;
  slider.style.setProperty('--percent', `${pct}%`);
}

// Update UI (values, total, chart) — common function
function updateUI() {
  const vals = sliders.map(s => parseInt(s.value));
  // Update value labels with formatted numbers
  vals.forEach((v, i) => {
    valueEls[i].textContent = v.toLocaleString('es-MX');
    setSliderFillPercent(sliders[i]);
  });

  const total = vals.reduce((a,b) => a + b, 0);
  totalEl.textContent = total.toLocaleString('es-MX');

  // Update chart
  chart.data.datasets[0].data = vals;
  chart.update();

  // Update total UI state
  if (total === TARGET_TOTAL) {
    totalContainer.classList.remove('total-error');
    totalContainer.style.background = '';
    totalContainer.style.color = '';
    btnContinue.classList.add('enabled');
    btnContinue.disabled = false;
  } else {
    totalContainer.classList.add('total-error');
    btnContinue.classList.remove('enabled');
    btnContinue.disabled = true;
  }
}

// Prevent exceeding TARGET_TOTAL dynamically
function handleInput(e) {
  const slider = e.target;
  const index = parseInt(slider.dataset.index);

  // Sum of others
  let sumOthers = 0;
  sliders.forEach((s, i) => {
    if (i !== index) sumOthers += parseInt(s.value);
  });

  const available = TARGET_TOTAL - sumOthers;
  let newVal = parseInt(slider.value);

  if (newVal > available) {
    newVal = available;
    slider.value = newVal;
  }

  // Update the UI
  updateUI();
}

// Attach events
sliders.forEach((s, i) => {
  // Set data-index attribute
  s.dataset.index = i;
  
  // ensure CSS fill percent initialized
  setSliderFillPercent(s);

  // Set each slider's thumb border color from inline --slider-color style (keeps category tint)
  const sliderColor = getComputedStyle(s).getPropertyValue('--slider-color').trim();
  if (sliderColor) {
    s.style.setProperty('--slider-color', sliderColor);
  }

  s.addEventListener('input', handleInput);
  s.addEventListener('change', handleInput);
});

// Continue button behavior
btnContinue.addEventListener('click', () => {
  const total = parseInt(totalEl.textContent.replace(/[,\.]/g,''));
  if (total === TARGET_TOTAL) {
    alert(`¡Perfecto! Has distribuido correctamente $${TARGET_TOTAL.toLocaleString('es-MX')}.`);
    // Aquí puedes enviar datos al servidor o guardar en localStorage
  } else {
    alert(`La suma debe ser exactamente $${TARGET_TOTAL.toLocaleString('es-MX')}. Actualmente es $${total.toLocaleString('es-MX')}.`);
  }
});

// Initialize UI
updateUI();