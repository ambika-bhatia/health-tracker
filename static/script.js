let water = 0;
let calories = 0;
let steps = 0;
let sleep = 0;

const goals = {
  water: 8,
  calories: 2000,
  steps: 10000,
  sleep: 8
};

const messages = {
  water: { low: "💧 Drink more water! Stay hydrated!", good: "✅ Great! Water goal achieved!" },
  calories: { low: "🔥 You need more calories today!", good: "✅ Calorie goal achieved!" },
  steps: { low: "👟 Walk more! Keep moving!", good: "✅ Steps goal achieved!" },
  sleep: { low: "😴 Sleep more! Rest is important!", good: "✅ Sleep goal achieved!" }
};

function loadData() {
  fetch('/get-data')
    .then(response => response.json())
    .then(data => {
      water = data.water;
      calories = data.calories;
      steps = data.steps;
      sleep = data.sleep;
      updateDisplay();
    });
}

function updateDisplay() {
  document.getElementById('water-count').innerText = water;
  document.getElementById('calorie-count').innerText = calories;
  document.getElementById('steps-count').innerText = steps;
  document.getElementById('sleep-count').innerText = sleep;

  showMessage('water-msg', water, goals.water, messages.water);
  showMessage('calorie-msg', calories, goals.calories, messages.calories);
  showMessage('steps-msg', steps, goals.steps, messages.steps);
  showMessage('sleep-msg', sleep, goals.sleep, messages.sleep);
}

function showMessage(id, current, goal, msg) {
  const el = document.getElementById(id);
  if (current < goal) {
    el.innerText = msg.low;
    el.className = 'message low';
  } else {
    el.innerText = msg.good;
    el.className = 'message good';
  }
}

function addValue(field, inputId) {
  let val = parseInt(document.getElementById(inputId).value);
  if (!val) return;

  fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ field: field, value: val })
  })
  .then(response => response.json())
  .then(() => {
    document.getElementById(inputId).value = '';
    loadData();  
  });
}

function addWater() {
  addValue('water', 'water-input');
}

function addCalories() {
  addValue('calories', 'calorie-input');
}

function addSteps() {
  addValue('steps', 'steps-input');
}

function addSleep() {
  addValue('sleep', 'sleep-input');
}

function resetAll() {
  fetch('/reset', { method: 'POST' })
    .then(response => response.json())
    .then(() => loadData());
}

loadData();