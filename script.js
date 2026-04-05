let water = parseInt(localStorage.getItem('water')) || 0;
let calories = parseInt(localStorage.getItem('calories')) || 0;
let steps = parseInt(localStorage.getItem('steps')) || 0;
let sleep = parseInt(localStorage.getItem('sleep')) || 0;

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

function addWater() {
  let val = parseInt(document.getElementById('water-input').value);
  if (!val) return;
  water += val;
  localStorage.setItem('water', water);
  document.getElementById('water-input').value = '';
  updateDisplay();
}

function addCalories() {
  let val = parseInt(document.getElementById('calorie-input').value);
  if (!val) return;
  calories += val;
  localStorage.setItem('calories', calories);
  document.getElementById('calorie-input').value = '';
  updateDisplay();
}

function addSteps() {
  let val = parseInt(document.getElementById('steps-input').value);
  if (!val) return;
  steps += val;
  localStorage.setItem('steps', steps);
  document.getElementById('steps-input').value = '';
  updateDisplay();
}

function addSleep() {
  let val = parseInt(document.getElementById('sleep-input').value);
  if (!val) return;
  sleep += val;
  localStorage.setItem('sleep', sleep);
  document.getElementById('sleep-input').value = '';
  updateDisplay();
}

function resetAll() {
  water = 0; calories = 0; steps = 0; sleep = 0;
  localStorage.clear();
  updateDisplay();
}

updateDisplay();