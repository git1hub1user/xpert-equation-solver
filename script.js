const equationInput = document.getElementById('equationInput');
const solveButton = document.getElementById('solve_button');
const loadingBar = document.getElementById('loading_bar');
const loadingProgress = document.getElementById('loading_progress');
const errorMessage = document.getElementById('error_message');
const solutionResult = document.getElementById('solution_result');

const themeToggle1 = document.getElementById('theme_toggle1');
const themeToggle2 = document.getElementById('theme_toggle2');
const body = document.body;

function resetUI() {
  errorMessage.textContent = '';
  solutionResult.textContent = '';
  loadingProgress.style.width = '0%';
  loadingBar.style.display = 'none';
}

function showLoading() {
  loadingBar.style.display = 'block';
  let progress = 0;
  const interval = setInterval(() => {
    progress += 5;
    if (progress > 100) {
      clearInterval(interval);
    } else {
      loadingProgress.style.width = progress + '%';
    }
  }, 100);
}

function validateEquation(eq) {
  // Simple check: equation should only contain numbers, operators, parentheses, and spaces
  const validPattern = /^[0-9+\-*/().\s]+$/;
  return validPattern.test(eq);
}

function solveEquation(eq) {
  try {
    // Using eval carefully (since input is validated)
    return eval(eq);
  } catch {
    return null;
  }
}

solveButton.addEventListener('click', () => {
  resetUI();
  const equation = equationInput.value.trim();

  if (!equation) {
    errorMessage.textContent = 'Please enter an equation.';
    return;
  }

  if (!validateEquation(equation)) {
    errorMessage.textContent = 'Invalid equation format.';
    return;
  }

  showLoading();

  // Simulate solving time
  setTimeout(() => {
    const result = solveEquation(equation);
    loadingBar.style.display = 'none';

    if (result === null || result === undefined || isNaN(result)) {
      errorMessage.textContent = 'Error solving equation.';
      solutionResult.textContent = '';
    } else {
      solutionResult.textContent = `Result: ${result}`;
    }
  }, 2100); // 2.1 seconds for loading bar to finish
});

// Theme switching logic
themeToggle1.addEventListener('click', () => {
  body.classList.remove('dark-theme');
  body.classList.add('light-theme');
  themeToggle1.classList.add('active');
  themeToggle2.classList.remove('active');
});

themeToggle2.addEventListener('click', () => {
  body.classList.remove('light-theme');
  body.classList.add('dark-theme');
  themeToggle2.classList.add('active');
  themeToggle1.classList.remove('active');
});



