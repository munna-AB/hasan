const texts = [
    "Learning new skills requires patience, consistency, and a willingness to make mistakes along the way while trusting that small daily efforts will eventually compound into meaningful long term improvement.",
    "Typing practice becomes more effective when you focus on accuracy first, maintain a steady rhythm, and allow speed to increase naturally instead of forcing your fingers to move faster than your mind.",
    "Practice makes perfect when it comes to improving your typing speed and accuracy over time.Reading thoughtful sentences while typing helps train both muscle memory and comprehension, making the exercise more engaging and beneficial than repeating random words without any context.",
    "The sky was painted with brilliant colors as the sun set over the distant mountains beautifully.Discipline is built by showing up even on days when motivation feels low, because progress is often created quietly through routine rather than sudden bursts of inspiration.",
    "Learning to type without looking at the keyboard is an essential skill for everyone nowadays.Technology has transformed how we learn, work, and communicate, yet the fundamental value of persistence, curiosity, and clear thinking remains just as important as ever.",
    "Coffee and coding go hand in hand for many software developers around the globe every day.Every moment spent practicing a useful skill is an investment in your future self, creating opportunities that may not be visible now but will reveal themselves over time",
    "The journey of a thousand miles begins with a single step forward into the unknown future.Good habits are formed through repetition and intention, slowly shaping your abilities and confidence until what once felt difficult becomes natural and effortless.",
    "Creativity is intelligence having fun while solving problems in unique and novel ways always.Writing and typing clearly allows ideas to flow without interruption, turning thoughts into structured expressions that others can easily understand and appreciate.",
    "Success is not final and failure is not fatal it is the courage to continue that counts most.Success is rarely the result of one perfect decision, but rather the outcome of many small choices made consistently in the right direction.",
    "Every expert was once a beginner who never gave up on their dreams and aspirations in life.When learning something new, it is normal to feel uncomfortable at first, because growth often begins at the edge of familiarity and routine.",
    "The only way to do great work is to love what you do and pursue it with passion daily.Focused practice improves not only technical skill but also patience, attention, and the ability to stay present with a task until it is completed well.",
    "Innovation distinguishes between a leader and a follower in any field of endeavor we choose.A calm and steady approach to improvement helps reduce frustration and builds confidence, making long practice sessions more enjoyable and productive.",
    "Time flies when you are having fun and enjoying every moment of your life to the fullest.Clear goals provide direction, but steady effort is what actually moves you forward when distractions and doubts attempt to slow your progress.",
    "Knowledge is power but enthusiasm pulls the switch that lights up our potential within us.Each correct keystroke strengthens coordination between your hands and mind, reinforcing patterns that will support faster and more accurate typing over time.",
    "A good programmer is someone who always looks both ways before crossing a one way street.By practicing regularly and believing in gradual improvement, you create momentum that carries you forward toward mastery with confidence and clarity.",
    "This calculator is designed to deliver fast, accurate, and reliable results for basic mathematical operations. Users are required to enter numeric values in the provided input fields and select the desired operation such as addition, subtraction, multiplication, or division. All inputs should be checked carefully before proceeding, and division by zero should be avoided. Once the required information is entered correctly, clicking the calculate button will instantly display the result in a clear and user-friendly format. This tool is intended for general-purpose use and ensures a simple yet professional user experience."
];

let currentText = '';
let startTime = null;
let timerInterval = null;
let timeLeft = 60;
let isTestActive = false;
let correctChars = 0;
let totalChars = 0;

const textDisplay = document.getElementById('textDisplay');
const inputArea = document.getElementById('inputArea');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const cpmEl = document.getElementById('cpm');
const accuracyEl = document.getElementById('accuracy');
const resetBtn = document.getElementById('resetBtn');
const newTextBtn = document.getElementById('newTextBtn');
const resultModal = document.getElementById('resultModal');
const closeModal = document.getElementById('closeModal');

function getRandomText() {
    return texts[Math.floor(Math.random() * texts.length)];
}

function initTest() {
    currentText = getRandomText();
    displayText();
    resetStats();
    inputArea.value = '';
    inputArea.disabled = false;
    inputArea.focus();
}

function displayText() {
    const typedText = inputArea.value;
    let html = '';
    
    for (let i = 0; i < currentText.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === currentText[i]) {
                html += `<span class="correct">${currentText[i]}</span>`;
            } else {
                html += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else if (i === typedText.length) {
            html += `<span class="current">${currentText[i]}</span>`;
        } else {
            html += currentText[i];
        }
    }
    
    textDisplay.innerHTML = html;
}

function startTimer() {
    if (!isTestActive) {
        isTestActive = true;
        startTime = Date.now();
        timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest();
            }
        }, 1000);
    }
}

function calculateStats() {
    if (!startTime) return;
    
    const typedText = inputArea.value;
    const timeElapsed = (60 - timeLeft) / 60;
    
    correctChars = 0;
    totalChars = typedText.length;
    
    for (let i = 0; i < Math.min(typedText.length, currentText.length); i++) {
        if (typedText[i] === currentText[i]) {
            correctChars++;
        }
    }
    
    const words = correctChars / 5;
    const wpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0;
    const cpm = timeElapsed > 0 ? Math.round(correctChars / timeElapsed) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    
    wpmEl.textContent = wpm;
    cpmEl.textContent = cpm;
    accuracyEl.textContent = accuracy;
}

function endTest() {
    clearInterval(timerInterval);
    isTestActive = false;
    inputArea.disabled = true;
    calculateStats();
    showResults();
}

function showResults() {
    document.getElementById('finalWpm').textContent = wpmEl.textContent;
    document.getElementById('finalCpm').textContent = cpmEl.textContent;
    document.getElementById('finalAccuracy').textContent = accuracyEl.textContent + '%';
    resultModal.style.display = 'flex';
}

function resetStats() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerEl.textContent = timeLeft;
    wpmEl.textContent = '0';
    cpmEl.textContent = '0';
    accuracyEl.textContent = '0';
    isTestActive = false;
    startTime = null;
    correctChars = 0;
    totalChars = 0;
}

inputArea.addEventListener('input', () => {
    if (!isTestActive && inputArea.value.length === 1) {
        startTimer();
    }
    
    displayText();
    calculateStats();
    
    if (inputArea.value === currentText) {
        endTest();
    }
});

inputArea.addEventListener('paste', (e) => {
    e.preventDefault();
});

resetBtn.addEventListener('click', () => {
    initTest();
});

newTextBtn.addEventListener('click', () => {
    initTest();
});

closeModal.addEventListener('click', () => {
    resultModal.style.display = 'none';
    initTest();
});

initTest();
