const i18n = {
  "en": {
    title: "Dynamic Reports Parameters Power BI",
    subtitle: "Interactive demo - parameters by category and by value",
    categoryTitle: "Parameters by Category",
    valueTitle: "Parameters by Value",
    narrativeTitle: "Presentation Narrative",
    narrative: "This interactive view lets you switch the dimension used to slice the data and the metric used to measure performance. Use the Category parameter to view profit by country, month, product, or semester. Use the Value parameter to toggle between Profit, Sales, and Quantity. The charts update instantly to support quick exploration and storytelling during client presentations.",
    tip: "Tip: Start with the category that best matches the client's question, then switch metrics to validate hypotheses.",
    chartPrefix: "Sum of",
    metrics: { profit: "Profit", sales: "Sales", quantity: "Quantity" },
    categories: { country: "Country", month: "Month Name", product: "Product", semester: "Semesters" }
  },
  "pt-BR": {
    title: "Parâmetros de Relatórios Dinâmicos Power BI",
    subtitle: "Demonstração interativa - parâmetros por categoria e por valor",
    categoryTitle: "Parâmetros por Categoria",
    valueTitle: "Parâmetros por Valor",
    narrativeTitle: "Narrativa de Apresentação",
    narrative: "Esta visão interativa permite alternar a dimensão usada para fatiar os dados e a métrica usada para medir o desempenho. Use o parâmetro Categoria para ver lucro por país, mês, produto ou semestre. Use o parâmetro Valor para alternar entre Lucro, Vendas e Quantidade. Os gráficos atualizam instantaneamente para apoiar a exploração rápida e a narrativa durante apresentações ao cliente.",
    tip: "Dica: Comece pela categoria que melhor responde à pergunta do cliente e depois altere as métricas para validar hipóteses.",
    chartPrefix: "Soma de",
    metrics: { profit: "Lucro", sales: "Vendas", quantity: "Quantidade" },
    categories: { country: "País", month: "Nome do Mês", product: "Produto", semester: "Semestres" }
  },
  "es": {
    title: "Parámetros de Informes Dinámicos Power BI",
    subtitle: "Demostración interactiva - parámetros por categoría y por valor",
    categoryTitle: "Parámetros por Categoría",
    valueTitle: "Parámetros por Valor",
    narrativeTitle: "Narrativa de Presentación",
    narrative: "Esta vista interactiva le permite cambiar la dimensión utilizada para segmentar los datos y la métrica utilizada para medir el rendimiento. Use el parámetro Categoría para ver beneficio por país, mes, producto o semestre. Use el parámetro Valor para alternar entre Beneficio, Ventas y Cantidad. Los gráficos se actualizan al instante para apoyar la exploración rápida y la narración durante presentaciones al cliente.",
    tip: "Consejo: Comience con la categoría que mejor responda a la pregunta del cliente y luego cambie las métricas para validar hipótesis.",
    chartPrefix: "Suma de",
    metrics: { profit: "Beneficio", sales: "Ventas", quantity: "Cantidad" },
    categories: { country: "País", month: "Nombre del Mes", product: "Producto", semester: "Semestres" }
  }
};

/* Sample dataset */
const sampleData = {
  country: [
    { key: "France", profit: 3.8, sales: 12.4, quantity: 420 },
    { key: "Germany", profit: 3.2, sales: 11.1, quantity: 380 },
    { key: "Canada", profit: 2.6, sales: 9.0, quantity: 310 },
    { key: "United States of America", profit: 2.2, sales: 10.5, quantity: 350 },
    { key: "Mexico", profit: 1.1, sales: 4.2, quantity: 150 }
  ],
  month: [
    { key: "October", profit: 2.9, sales: 9.8, quantity: 320 },
    { key: "December", profit: 2.6, sales: 8.9, quantity: 300 },
    { key: "September", profit: 2.3, sales: 8.1, quantity: 280 },
    { key: "June", profit: 2.0, sales: 7.5, quantity: 260 },
    { key: "March", profit: 0.6, sales: 2.1, quantity: 80 }
  ],
  product: [
    { key: "Razo", profit: 4.6, sales: 15.2, quantity: 520 },
    { key: "VTT", profit: 3.9, sales: 13.0, quantity: 460 },
    { key: "Amarilla", profit: 3.1, sales: 10.2, quantity: 380 },
    { key: "Vieje", profit: 2.4, sales: 8.0, quantity: 300 },
    { key: "Montana", profit: 1.9, sales: 6.5, quantity: 240 },
    { key: "Camtara", profit: 0.8, sales: 2.9, quantity: 90 }
  ],
  semester: [
    { key: "Segundo Semestre", profit: 6.2, sales: 20.1, quantity: 760 },
    { key: "Primeiro Semestre", profit: 3.4, sales: 11.5, quantity: 420 }
  ]
};

/* DOM references */
const body = document.body;
const langSelect = document.getElementById('lang');
const themeToggle = document.getElementById('theme-toggle');
const iconMoon = document.getElementById('icon-moon');
const iconSun = document.getElementById('icon-sun');

const categoryForm = document.getElementById('category-form');
const valueSelect = document.getElementById('value-select');

const chart = document.getElementById('chart');
const chartTitle = document.getElementById('chart-title');
const chart2 = document.getElementById('chart2');
const chart2Title = document.getElementById('chart2-title');

const appTitle = document.getElementById('app-title');
const appSubtitle = document.getElementById('app-subtitle');
const paramCatTitle = document.getElementById('param-cat-title');
const paramValTitle = document.getElementById('param-val-title');
const narrativeTitle = document.getElementById('narrative-title');
const narrativeText = document.getElementById('narrative-text');
const presentationTips = document.getElementById('presentation-tips');

/* Initialize UI */
function setLanguage(lang){
  const L = i18n[lang] || i18n.en;
  document.documentElement.lang = lang;
  body.setAttribute('data-lang', lang);
  appTitle.textContent = L.title;
  appSubtitle.textContent = L.subtitle;
  paramCatTitle.textContent = L.categoryTitle;
  paramValTitle.textContent = L.valueTitle;
  narrativeTitle.textContent = L.narrativeTitle;
  narrativeText.textContent = L.narrative;
  presentationTips.innerHTML = `<strong>Tip:</strong> ${L.tip}`;
  // update chart titles
  const metric = valueSelect.value;
  const metricLabel = L.metrics[metric] || metric;
  const cat = getSelectedCategory();
  const catLabel = L.categories[cat] || cat;
  chartTitle.textContent = `${L.chartPrefix} ${metricLabel} by ${catLabel}`;
  chart2Title.textContent = `${L.chartPrefix} ${metricLabel} by ${catLabel}`;
}

/* Theme toggle */
function setTheme(isDark){
  if(isDark){
    body.classList.add('theme-dark');
    body.classList.remove('theme-light');
    themeToggle.setAttribute('aria-pressed','true');
    iconMoon.classList.remove('hidden');
    iconSun.classList.add('hidden');
  } else {
    body.classList.add('theme-light');
    body.classList.remove('theme-dark');
    themeToggle.setAttribute('aria-pressed','false');
    iconMoon.classList.add('hidden');
    iconSun.classList.remove('hidden');
  }
}

/* Helpers */
function getSelectedCategory(){
  const formData = new FormData(categoryForm);
  return formData.get('category') || 'country';
}

function getMetric(){
  return valueSelect.value || 'profit';
}

/* Render simple horizontal bar chart */
function renderChart(container, data, metric, options = {}){
  container.innerHTML = '';
  if(!Array.isArray(data) || data.length === 0){
    const empty = document.createElement('div');
    empty.textContent = 'No data';
    container.appendChild(empty);
    return;
  }

  // compute max for scale
  const max = Math.max(...data.map(d => d[metric]));
  const scale = max > 0 ? (100 / max) : 0;

  data.forEach(item => {
    const row = document.createElement('div');
    row.className = 'bar-row';
    row.setAttribute('role','group');
    row.setAttribute('aria-label', `${item.key} ${metric} ${item[metric]}`);

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = item.key;

    const barWrap = document.createElement('div');
    barWrap.style.flex = '1';
    barWrap.style.display = 'flex';
    barWrap.style.alignItems = 'center';
    barWrap.style.gap = '8px';

    const bar = document.createElement('div');
    bar.className = 'bar';
    const widthPct = Math.round(item[metric] * scale);
    bar.style.width = `${Math.max(6, widthPct)}%`;
    bar.textContent = `${item[metric]} M`;

    barWrap.appendChild(bar);

    row.appendChild(label);
    row.appendChild(barWrap);

    container.appendChild(row);
  });
}

/* Update both charts based on selections */
function updateCharts(){
  const cat = getSelectedCategory();
  const metric = getMetric();
  const lang = body.getAttribute('data-lang') || 'en';
  const L = i18n[lang];

  // Title update
  const metricLabel = L.metrics[metric] || metric;
  const catLabel = L.categories[cat] || cat;
  chartTitle.textContent = `${L.chartPrefix} ${metricLabel} by ${catLabel}`;
  chart2Title.textContent = `${L.chartPrefix} ${metricLabel} by ${catLabel}`;

  // Prepare data (sort descending)
  const data = (sampleData[cat] || []).slice().sort((a,b) => b[metric] - a[metric]);

  // Render charts
  renderChart(chart, data, metric);
  renderChart(chart2, data, metric);
}

/* Event listeners */
categoryForm.addEventListener('change', () => {
  updateCharts();
});

valueSelect.addEventListener('change', () => {
  updateCharts();
});

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('theme-dark');
  setTheme(!isDark);
});

/* Language switch */
langSelect.addEventListener('change', (e) => {
  setLanguage(e.target.value);
  updateCharts();
});

/* Keyboard accessibility: allow radio group navigation */
document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio => {
  radio.addEventListener('keydown', (e) => {
    const radios = Array.from(document.querySelectorAll('.radio-group input[type="radio"]'));
    const idx = radios.indexOf(e.target);
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
      e.preventDefault();
      const next = radios[(idx + 1) % radios.length];
      next.focus();
      next.checked = true;
      updateCharts();
    } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
      e.preventDefault();
      const prev = radios[(idx - 1 + radios.length) % radios.length];
      prev.focus();
      prev.checked = true;
      updateCharts();
    }
  });
});

/* Initial setup */
(function init(){
  // default language english
  const defaultLang = 'en';
  langSelect.value = defaultLang;
  setLanguage(defaultLang);

  // default theme dark
  setTheme(true);

  // populate value select labels from i18n
  const lang = defaultLang;
  const L = i18n[lang];
  // update metric labels
  Array.from(valueSelect.options).forEach(opt => {
    opt.textContent = L.metrics[opt.value] || opt.value;
  });

  updateCharts();
})();
