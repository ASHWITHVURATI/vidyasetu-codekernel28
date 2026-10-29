/**
 * VidyaSetu - Adaptive Learning Platform for Classes 6-10
 * Built for Code Kernel '26 Hackathon (In collaboration with Canvas Classes)
 * GRIET Hyderabad · X-Kernel
 */

// Application State
const state = {
  currentTab: 'home',
  studentGrade: '8',
  subject: 'math',
  language: 'en', // 'en', 'hinglish', 'te'
  lowDataMode: false,
  activeLearnStep: 'learn',
  // Simulator State
  simulatedStudent: 'studentB',
  // Equation Balance Interactive
  equation: {
    leftX: 2,
    leftConst: 3,
    rightConst: 11,
    solvedX: 4
  },
  // Solve State
  solveLevel: 2, // 1: Foundational, 2: Standard, 3: Challenge
  revealedHints: 0,
  // Diagnostic Test State
  diagnosticIndex: 0,
  diagnosticScore: 0,
  diagnosticAnswers: []
};

// Content Translations & Vernacular Support
const i18n = {
  en: {
    heroTitle: "Adaptive Learning Built for Every Indian Classroom",
    heroDesc: "No two students learn at the same pace. VidyaSetu adapts across Learn, Solve, and Test — closing quiet conceptual gaps for Classes 6 to 10 while keeping teachers at the center.",
    conceptTitle: "Linear Equations in One Variable (Class 8 NCERT)",
    conceptExplanation: "An equation is like a balanced grocery weighing scale (Taraazu). Whatever operation you perform on one side, you must perform exactly the same on the other side to keep it balanced.",
    audioText: "An equation is like a balanced grocery weighing scale. To find x, subtract 3 from both sides, then divide by 2.",
    ruleTip: "Golden Rule: Treat both sides equally. If you remove 3 from the left side, also remove 3 from the right side."
  },
  hinglish: {
    heroTitle: "Har Bachhe Ki Speed Alag Hai: Seekhein Apni Pace Par",
    heroDesc: "Class 6 se 10 ke liye adaptive learning. Agar koi purana Class 6/7 ka concept miss ho gaya hai, to VidyaSetu use pehle theek karta hai, bina teacher ko replace kiye.",
    conceptTitle: "Linear Equations - Ek Chari Wale Samikaran (Class 8 NCERT)",
    conceptExplanation: "Samikaran (Equation) bilkul ek dukaan ke taraazu (weighing scale) jaisa hai. Agar aap left side se 3 kg hatate hain, to right side se bhi exactly 3 kg hatana padega taaki balance bana rahe.",
    audioText: "Equation bilkul ek taraazu jaisa hai. X nikalne ke liye dono taraf se 3 ghatayein, phir 2 se divide karein.",
    ruleTip: "Golden Niyam: Jo operation left me karein, wahi right me karein. Balance kabhi tootna nahi chahiye!"
  },
  te: {
    heroTitle: "భారతీయ తరగతులకు ప్రత్యేకించిన అనుకూల అభ్యాస వేదిక",
    heroDesc: "ప్రతి విద్యార్థి గ్రహణ వేగం వేరు. విద్యాసేతు 6 నుండి 10వ తరగతి విద్యార్థులకు గణితం, సైన్స్ భావనలను సులభంగా అర్థమయ్యేలా వివరిస్తుంది.",
    conceptTitle: "సరళ సమీకరణాలు - ఏక చరరాశి (Class 8)",
    conceptExplanation: "సమీకరణం అంటే ఒక సరితూగే త్రాసు లాంటిది. ఒక వైపు మీరు 3 తీసివేస్తే, రెండవ వైపు కూడా ఖచ్చితంగా 3 తీసివేయాలి, అప్పుడే సమతుల్యత దెబ్బతినదు.",
    audioText: "సమీకరణం అంటే ఒక త్రాసు లాంటిది. X కనుగొనడానికి రెండు వైపులా 3 తీసివేసి, 2 తో భాగించండి.",
    ruleTip: "బంగారు సూత్రం: ఎడమ వైపు చేసిన మార్పునే కుడి వైపు కూడా చేయాలి. త్రాసు ఎప్పుడూ సమతుల్యంగా ఉండాలి."
  }
};

// Class 8-B Sample Cohort for Teacher Heatmap (42 students simulated)
const cohortStudents = [
  { id: 1, name: "Priya Sharma", roll: "8B-01", status: "fast", intOps: "mastered", balance: "mastered", wordProb: "mastered", negCoeff: "mastered", gapRisk: "Low" },
  { id: 2, name: "Rahul Verma", roll: "8B-02", status: "standard", intOps: "mastered", balance: "mastered", wordProb: "progress", negCoeff: "progress", gapRisk: "Low" },
  { id: 3, name: "Aarav Patel", roll: "8B-03", status: "struggling", intOps: "gap", balance: "progress", wordProb: "gap", negCoeff: "gap", gapRisk: "High (Class 7 Integers Gap)" },
  { id: 4, name: "Sneha Reddy", roll: "8B-04", status: "standard", intOps: "mastered", balance: "mastered", wordProb: "progress", negCoeff: "mastered", gapRisk: "Low" },
  { id: 5, name: "Vikram Malhotra", roll: "8B-05", status: "fast", intOps: "mastered", balance: "mastered", wordProb: "mastered", negCoeff: "mastered", gapRisk: "Low" },
  { id: 6, name: "Ananya Iyer", roll: "8B-06", status: "struggling", intOps: "gap", balance: "gap", wordProb: "gap", negCoeff: "gap", gapRisk: "High (Equations Foundation)" },
  { id: 7, name: "Mohammed Zeeshan", roll: "8B-07", status: "standard", intOps: "mastered", balance: "progress", wordProb: "progress", negCoeff: "progress", gapRisk: "Medium" },
  { id: 8, name: "Divya Nambiar", roll: "8B-08", status: "standard", intOps: "mastered", balance: "mastered", wordProb: "mastered", negCoeff: "progress", gapRisk: "Low" }
];

// Adaptive Question Bank for "Solve" Stage
const adaptiveQuestions = {
  1: {
    level: "Foundational (Bridging)",
    equation: "x + 5 = 12",
    prompt: "Solve for x. Think of undoing addition with subtraction.",
    answer: 7,
    options: [
      { text: "x = 7", correct: true, feedback: "Excellent! You subtracted 5 from both sides (12 - 5 = 7)." },
      { text: "x = 17", correct: false, feedback: "Misconception: You added 5 instead of subtracting. Remember, inverse of +5 is -5." },
      { text: "x = 60", correct: false, feedback: "Misconception: You multiplied 12 × 5. To isolate x, subtract 5 from 12." },
      { text: "x = 2.4", correct: false, feedback: "Misconception: You divided 12 by 5. Here, 5 is added to x, not multiplied." }
    ],
    hints: [
      "Hint 1: Look at + 5 on the left side. What is the opposite of adding 5?",
      "Hint 2: Subtract 5 from both sides of the equation: x + 5 - 5 = 12 - 5.",
      "Hint 3: 12 minus 5 leaves exactly 7. So x = 7."
    ]
  },
  2: {
    level: "Standard Grade Level (Class 8 NCERT)",
    equation: "3x - 4 = 11",
    prompt: "Solve for x. Remember: First undo subtraction, then undo multiplication.",
    answer: 5,
    options: [
      { text: "x = 5", correct: true, feedback: "Spot on! Step 1: 3x = 11 + 4 = 15. Step 2: x = 15 / 3 = 5." },
      { text: "x = 2.33", correct: false, feedback: "Misconception: You subtracted 4 instead of adding 4 (11 - 4 = 7, 7/3). Inverse of -4 is +4!" },
      { text: "x = 7", correct: false, feedback: "Misconception: You added 4 to get 15, but then subtracted 3 instead of dividing by 3." },
      { text: "x = 18", correct: false, feedback: "Misconception: You added 4 and then multiplied by 3. 3 is multiplied with x, so divide by 3." }
    ],
    hints: [
      "Hint 1: First isolate the 3x term. What is the inverse operation of - 4?",
      "Hint 2: Add 4 to both sides: 3x = 11 + 4 = 15.",
      "Hint 3: Now 3 is multiplied by x. Divide both sides by 3 to get x = 15 / 3 = 5."
    ]
  },
  3: {
    level: "HOTS / Olympiad Challenge",
    equation: "5(x - 2) = 2(x + 7)",
    prompt: "Solve for x. Challenge problem: Distribute first, then group variables on one side.",
    answer: 8,
    options: [
      { text: "x = 8", correct: true, feedback: "Outstanding! 5x - 10 = 2x + 14 ⇒ 3x = 24 ⇒ x = 8. You are ready for Olympiad math!" },
      { text: "x = 4", correct: false, feedback: "Misconception: Check your distributive multiplication: did you multiply 5 × (-2) and 2 × 7 correctly?" },
      { text: "x = 12", correct: false, feedback: "Misconception: When moving 2x to the left side, subtract it (5x - 2x = 3x). Check your signs." },
      { text: "x = 6", correct: false, feedback: "Misconception: When moving -10 to the right side, add 10 to 14 (14 + 10 = 24)." }
    ],
    hints: [
      "Hint 1: Expand both brackets: 5 × x - 5 × 2 = 2 × x + 2 × 7.",
      "Hint 2: You get 5x - 10 = 2x + 14. Now subtract 2x from both sides.",
      "Hint 3: You have 3x - 10 = 14. Add 10 to both sides: 3x = 24, so x = 8."
    ]
  }
};

// Diagnostic 3-Question Test Pool
const diagnosticQuestions = [
  {
    id: 1,
    grade: 8,
    concept: "Inverse Operations",
    q: "If 4y = 28, which operation should you perform to isolate y?",
    opts: ["Add 4 to both sides", "Subtract 4 from both sides", "Divide both sides by 4", "Multiply both sides by 4"],
    correctIdx: 2,
    explain: "Since 4 is multiplied with y, the inverse operation is dividing both sides by 4."
  },
  {
    id: 2,
    grade: 8,
    concept: "Integer Signs (Class 7 Prerequisite Check)",
    q: "What is the value of -7 + 15 - (-3)?",
    opts: ["5", "11", "-19", "8"],
    correctIdx: 1,
    explain: "-7 + 15 = 8. Then 8 - (-3) = 8 + 3 = 11. Crucial for equation transpositions!"
  },
  {
    id: 3,
    grade: 8,
    concept: "Word Problem Formulation",
    q: "Rahul has ₹10 more than twice what Sneha has. If Sneha has ₹x, how much does Rahul have?",
    opts: ["2x + 10", "10x + 2", "2(x + 10)", "x / 2 + 10"],
    correctIdx: 0,
    explain: "Twice Sneha's money is 2x. ₹10 more than that is 2x + 10."
  }
];

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupLanguageSwitcher();
  setupLowDataMode();
  setupStudentWorkspace();
  setupTeacherDashboard();
  setupSimulator();
  setupAccordion();
  drawProgressChart();
  drawMasteryRadar();
});

// Navigation between major tabs
function setupNavigation() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      state.currentTab = targetTab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }

      // Re-render canvases if tab becomes visible
      if (targetTab === 'simulator' || targetTab === 'home') {
        setTimeout(drawProgressChart, 50);
      }
      if (targetTab === 'teacher') {
        setTimeout(drawCohortChart, 50);
      }
      if (targetTab === 'student') {
        setTimeout(drawMasteryRadar, 50);
      }
    });
  });
}

// Language Switcher
function setupLanguageSwitcher() {
  const langSelect = document.getElementById('lang-select');
  if (!langSelect) return;

  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    state.language = lang;
    updateLanguageContent();
  });
}

function updateLanguageContent() {
  const content = i18n[state.language] || i18n.en;
  
  const heroTitle = document.getElementById('hero-title-text');
  const heroDesc = document.getElementById('hero-desc-text');
  const conceptText = document.getElementById('learn-explanation-text');
  const ruleText = document.getElementById('learn-rule-text');

  if (heroTitle) heroTitle.innerHTML = content.heroTitle;
  if (heroDesc) heroDesc.textContent = content.heroDesc;
  if (conceptText) conceptText.textContent = content.conceptExplanation;
  if (ruleText) ruleText.textContent = content.ruleTip;
}

// Low Data Mode Toggle (For rural / low bandwidth connectivity)
function setupLowDataMode() {
  const btn = document.getElementById('toggle-low-data');
  if (!btn) return;

  btn.addEventListener('click', () => {
    state.lowDataMode = !state.lowDataMode;
    document.body.classList.toggle('low-data-mode', state.lowDataMode);
    btn.classList.toggle('active', state.lowDataMode);
    btn.innerHTML = state.lowDataMode 
      ? '<span>📶 2G/Low Data: ON</span>' 
      : '<span>⚡ Standard Data</span>';
  });
}

// Student Workspace Setup (Learn, Solve, Test)
function setupStudentWorkspace() {
  // Sub-stage stepper
  const stepBtns = document.querySelectorAll('.step-btn');
  const stepSections = document.querySelectorAll('.step-section');

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');
      state.activeLearnStep = step;

      stepBtns.forEach(b => b.classList.remove('active'));
      stepSections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const activeSec = document.getElementById(`step-section-${step}`);
      if (activeSec) activeSec.classList.add('active');
    });
  });

  // Balance scale buttons
  setupInteractiveScale();

  // Audio Pronunciation Readout
  const speakBtn = document.getElementById('btn-speak-concept');
  if (speakBtn) {
    speakBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        const text = i18n[state.language]?.audioText || i18n.en.audioText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.lang = state.language === 'te' ? 'te-IN' : (state.language === 'hinglish' ? 'hi-IN' : 'en-IN');
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Audio playback not supported in this browser.");
      }
    });
  }

  // Prerequisite Bridge Toggle
  const bridgeBtn = document.getElementById('btn-prereq-bridge');
  const bridgeBox = document.getElementById('prereq-bridge-content');
  if (bridgeBtn && bridgeBox) {
    bridgeBtn.addEventListener('click', () => {
      const isVisible = bridgeBox.style.display === 'block';
      bridgeBox.style.display = isVisible ? 'none' : 'block';
      bridgeBtn.textContent = isVisible ? "🔍 Need a Class 6/7 Concept Bridge?" : "✕ Hide Prerequisite Bridge";
    });
  }

  // Solve Stage Question Loader
  loadSolveQuestion(state.solveLevel);

  // Hint ladder reveal
  const hintBtn = document.getElementById('btn-reveal-hint');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      if (state.revealedHints < 3) {
        state.revealedHints++;
        const hintEl = document.getElementById(`hint-${state.revealedHints}`);
        if (hintEl) {
          hintEl.classList.add('revealed');
        }
        if (state.revealedHints === 3) {
          hintBtn.disabled = true;
          hintBtn.textContent = "All 3 hints revealed";
        } else {
          hintBtn.textContent = `Get Next Hint (${3 - state.revealedHints} left)`;
        }
      }
    });
  }

  // Diagnostic Test Setup
  setupDiagnosticTest();
}

// Interactive Weighing Scale
function setupInteractiveScale() {
  const panLeft = document.getElementById('scale-pan-left');
  const panRight = document.getElementById('scale-pan-right');
  const beam = document.getElementById('scale-beam-bar');
  const statusMsg = document.getElementById('scale-status-message');

  const btnSub3 = document.getElementById('scale-sub-3');
  const btnDiv2 = document.getElementById('scale-div-2');
  const btnReset = document.getElementById('scale-reset');

  function renderScale() {
    if (!panLeft || !panRight) return;

    // Render left pan
    panLeft.innerHTML = `
      <div style="font-size:0.75rem; color:#64748b; font-weight:700;">LEFT PAN</div>
      <div style="display:flex; gap:4px; flex-wrap:wrap; justify-content:center;">
        ${Array(state.equation.leftX).fill('<span class="pan-item x-box">x</span>').join('')}
        ${state.equation.leftConst > 0 ? `<span class="pan-item weight-box">+${state.equation.leftConst}</span>` : ''}
      </div>
    `;

    // Render right pan
    panRight.innerHTML = `
      <div style="font-size:0.75rem; color:#64748b; font-weight:700;">RIGHT PAN</div>
      <div style="display:flex; gap:4px; flex-wrap:wrap; justify-content:center;">
        <span class="pan-item weight-box" style="font-size:1.1rem; padding:6px 12px;">⚖ ${state.equation.rightConst}</span>
      </div>
    `;

    // Check balance
    const leftVal = state.equation.leftX * state.equation.solvedX + state.equation.leftConst;
    const rightVal = state.equation.rightConst;

    if (leftVal === rightVal) {
      beam.style.transform = "rotate(0deg)";
      if (state.equation.leftX === 1 && state.equation.leftConst === 0) {
        statusMsg.innerHTML = `<span style="color:#10b981; font-weight:800;">🎉 Perfect! x is completely isolated: x = ${state.equation.rightConst}!</span>`;
      } else {
        statusMsg.innerHTML = `<span style="color:#4f46e5; font-weight:700;">⚖ Scale is balanced! Current: ${state.equation.leftX}x + ${state.equation.leftConst} = ${state.equation.rightConst}</span>`;
      }
    } else {
      const angle = leftVal > rightVal ? -8 : 8;
      beam.style.transform = `rotate(${angle}deg)`;
      statusMsg.innerHTML = `<span style="color:#ef4444; font-weight:700;">⚠ Scale tilted! Left and right must stay equal.</span>`;
    }
  }

  if (btnSub3) {
    btnSub3.addEventListener('click', () => {
      if (state.equation.leftConst === 3) {
        state.equation.leftConst = 0;
        state.equation.rightConst -= 3;
        btnSub3.disabled = true;
        btnDiv2.disabled = false;
        renderScale();
      }
    });
  }

  if (btnDiv2) {
    btnDiv2.addEventListener('click', () => {
      if (state.equation.leftX === 2) {
        state.equation.leftX = 1;
        state.equation.rightConst /= 2;
        btnDiv2.disabled = true;
        renderScale();
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      state.equation.leftX = 2;
      state.equation.leftConst = 3;
      state.equation.rightConst = 11;
      btnSub3.disabled = false;
      btnDiv2.disabled = true;
      renderScale();
    });
  }

  renderScale();
}

// Solve Stage: Load Questions & Misconception Analysis
function loadSolveQuestion(level) {
  state.solveLevel = level;
  state.revealedHints = 0;

  const q = adaptiveQuestions[level];
  if (!q) return;

  const levelBadge = document.getElementById('solve-level-badge');
  const eqDisplay = document.getElementById('solve-equation-display');
  const promptText = document.getElementById('solve-prompt-text');
  const optionsContainer = document.getElementById('solve-options-container');
  const feedbackBox = document.getElementById('solve-feedback-box');
  const hintBtn = document.getElementById('btn-reveal-hint');

  if (levelBadge) {
    levelBadge.textContent = q.level;
    levelBadge.className = `badge ${level === 1 ? 'badge-primary' : (level === 2 ? 'badge-warning' : 'badge-danger')}`;
  }
  if (eqDisplay) eqDisplay.textContent = q.equation;
  if (promptText) promptText.textContent = q.prompt;

  // Reset hints
  for (let i = 1; i <= 3; i++) {
    const hintEl = document.getElementById(`hint-${i}`);
    if (hintEl) {
      hintEl.classList.remove('revealed');
      hintEl.textContent = q.hints[i - 1];
    }
  }
  if (hintBtn) {
    hintBtn.disabled = false;
    hintBtn.textContent = "Get Next Hint (3 left)";
  }
  if (feedbackBox) {
    feedbackBox.style.display = 'none';
    feedbackBox.innerHTML = '';
  }

  // Render Options
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span style="font-weight:700;">🔘</span> <span>${opt.text}</span>`;
      btn.addEventListener('click', () => {
        handleSolveAnswer(opt, btn, optionsContainer, feedbackBox);
      });
      optionsContainer.appendChild(btn);
    });
  }
}

function handleSolveAnswer(option, selectedBtn, container, feedbackBox) {
  const allBtns = container.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (option.correct) {
    selectedBtn.classList.add('correct');
    feedbackBox.style.display = 'block';
    feedbackBox.className = 'card';
    feedbackBox.style.borderLeft = '5px solid #10b981';
    feedbackBox.style.background = '#ecfdf5';
    feedbackBox.innerHTML = `
      <div style="color:#065f46; font-weight:800; font-size:1.05rem;">✔ Correct Solution!</div>
      <p style="color:#047857; margin-top:4px;">${option.feedback}</p>
      <div style="margin-top:12px; display:flex; gap:10px;">
        ${state.solveLevel < 3 ? `<button class="btn btn-primary btn-sm" id="btn-next-tier">Advance to Tier ${state.solveLevel + 1} ➔</button>` : `<span style="font-weight:700; color:#10b981;">🏆 You've conquered all tiers!</span>`}
      </div>
    `;

    const nextBtn = document.getElementById('btn-next-tier');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        loadSolveQuestion(state.solveLevel + 1);
      });
    }
  } else {
    selectedBtn.classList.add('incorrect');
    feedbackBox.style.display = 'block';
    feedbackBox.className = 'card';
    feedbackBox.style.borderLeft = '5px solid #ef4444';
    feedbackBox.style.background = '#fef2f2';
    feedbackBox.innerHTML = `
      <div style="color:#991b1b; font-weight:800; font-size:1.05rem;">🔍 Diagnostic Misconception Detected:</div>
      <p style="color:#b91c1c; margin-top:4px;">${option.feedback}</p>
      <div style="margin-top:12px; display:flex; gap:10px;">
        <button class="btn btn-secondary btn-sm" id="btn-retry-tier">Try Again</button>
        ${state.solveLevel > 1 ? `<button class="btn btn-primary btn-sm" id="btn-step-down">Step down to Foundation Tier 1</button>` : ''}
      </div>
    `;

    const retryBtn = document.getElementById('btn-retry-tier');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => loadSolveQuestion(state.solveLevel));
    }
    const stepDownBtn = document.getElementById('btn-step-down');
    if (stepDownBtn) {
      stepDownBtn.addEventListener('click', () => loadSolveQuestion(1));
    }
  }
}

// Diagnostic Test Setup
function setupDiagnosticTest() {
  renderDiagnosticQuestion();
}

function renderDiagnosticQuestion() {
  const container = document.getElementById('diagnostic-container');
  if (!container) return;

  if (state.diagnosticIndex >= diagnosticQuestions.length) {
    // Show summary & Mastery Radar
    container.innerHTML = `
      <div style="text-align:center; padding:30px;">
        <div style="font-size:2.5rem; margin-bottom:10px;">🎯</div>
        <h3 style="font-size:1.4rem; font-weight:800; color:#1e1b4b;">Diagnostic Assessment Completed!</h3>
        <p style="color:#64748b; margin-top:6px;">Your Adaptive Mastery Profile has been updated in real-time.</p>
        <div style="display:inline-block; background:#eef2ff; padding:12px 24px; border-radius:12px; margin:16px 0; font-weight:800; font-size:1.2rem; color:#4f46e5;">
          Mastery Score: ${Math.round((state.diagnosticScore / diagnosticQuestions.length) * 100)}%
        </div>
        <div>
          <button class="btn btn-primary" id="btn-restart-diag">Retake Diagnostic Pulse</button>
        </div>
      </div>
    `;
    const restartBtn = document.getElementById('btn-restart-diag');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        state.diagnosticIndex = 0;
        state.diagnosticScore = 0;
        state.diagnosticAnswers = [];
        renderDiagnosticQuestion();
        drawMasteryRadar();
      });
    }
    drawMasteryRadar();
    return;
  }

  const q = diagnosticQuestions[state.diagnosticIndex];
  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
      <span class="badge badge-primary">Question ${state.diagnosticIndex + 1} of ${diagnosticQuestions.length}</span>
      <span style="font-size:0.85rem; font-weight:700; color:#6366f1;">Concept: ${q.concept}</span>
    </div>
    <div style="font-size:1.1rem; font-weight:700; color:#1e293b; margin-bottom:16px;">
      ${q.q}
    </div>
    <div class="options-grid" id="diag-options-grid"></div>
    <div id="diag-feedback" style="display:none; margin-top:14px;"></div>
  `;

  const grid = document.getElementById('diag-options-grid');
  const feedback = document.getElementById('diag-feedback');

  q.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span style="font-weight:700;">${String.fromCharCode(65 + idx)}.</span> <span>${opt}</span>`;
    btn.addEventListener('click', () => {
      const isCorrect = idx === q.correctIdx;
      if (isCorrect) state.diagnosticScore++;
      state.diagnosticAnswers.push(isCorrect);

      grid.querySelectorAll('.option-btn').forEach((b, i) => {
        b.disabled = true;
        if (i === q.correctIdx) b.classList.add('correct');
        else if (i === idx) b.classList.add('incorrect');
      });

      feedback.style.display = 'block';
      feedback.innerHTML = `
        <div style="padding:12px; background:${isCorrect ? '#ecfdf5' : '#fef2f2'}; border-radius:8px; border-left:4px solid ${isCorrect ? '#10b981' : '#ef4444'}; font-size:0.9rem; color:${isCorrect ? '#065f46' : '#991b1b'};">
          <strong>${isCorrect ? '✔ Correct!' : '✖ Key Concept Note:'}</strong> ${q.explain}
        </div>
        <button class="btn btn-primary btn-sm" id="btn-next-diag" style="margin-top:12px;">Next Question ➔</button>
      `;

      const nextBtn = document.getElementById('btn-next-diag');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          state.diagnosticIndex++;
          renderDiagnosticQuestion();
        });
      }
    });
    grid.appendChild(btn);
  });
}

// Teacher Command Hub Setup
function setupTeacherDashboard() {
  renderCohortHeatmap();

  // Differentiated Grouping Action
  const btnGroup = document.getElementById('btn-auto-group');
  if (btnGroup) {
    btnGroup.addEventListener('click', () => {
      const modal = document.getElementById('grouping-modal');
      if (modal) modal.style.display = 'block';
    });
  }

  const closeGroupModal = document.getElementById('btn-close-grouping-modal');
  if (closeGroupModal) {
    closeGroupModal.addEventListener('click', () => {
      const modal = document.getElementById('grouping-modal');
      if (modal) modal.style.display = 'none';
    });
  }

  // Printable Worksheet Generator
  const btnPrintWorksheet = document.getElementById('btn-generate-worksheet');
  if (btnPrintWorksheet) {
    btnPrintWorksheet.addEventListener('click', () => {
      window.print();
    });
  }

  // Parent WhatsApp Nudge Copy
  const copyWhatsappBtn = document.getElementById('btn-copy-whatsapp');
  if (copyWhatsappBtn) {
    copyWhatsappBtn.addEventListener('click', () => {
      const text = `Namaste Parents! In Class 8-B this week, we are mastering Linear Equations. 6 students have a small gap in Class 7 integer signs. Please encourage your child to do today's 5-minute VidyaSetu offline/online worksheet. - Maths Teacher`;
      navigator.clipboard.writeText(text).then(() => {
        copyWhatsappBtn.textContent = "✔ Copied to Clipboard!";
        setTimeout(() => { copyWhatsappBtn.textContent = "📱 Copy WhatsApp Broadcast"; }, 2500);
      });
    });
  }
}

function renderCohortHeatmap() {
  const tbody = document.getElementById('cohort-heatmap-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  cohortStudents.forEach(st => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:700; color:#1e293b;">
        ${st.name} <span style="font-size:0.75rem; color:#94a3b8;">(${st.roll})</span>
      </td>
      <td class="cell-${st.intOps}">${st.intOps.toUpperCase()}</td>
      <td class="cell-${st.balance}">${st.balance.toUpperCase()}</td>
      <td class="cell-${st.wordProb}">${st.wordProb.toUpperCase()}</td>
      <td class="cell-${st.negCoeff}">${st.negCoeff.toUpperCase()}</td>
      <td style="font-size:0.8rem; font-weight:700; color:${st.gapRisk.startsWith('High') ? '#ef4444' : (st.gapRisk.startsWith('Med') ? '#f59e0b' : '#10b981')}">
        ${st.gapRisk}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Interactive Live Simulator for Judges / Evaluators
function setupSimulator() {
  const simBtns = document.querySelectorAll('.sim-student-btn');
  const simDesc = document.getElementById('sim-student-desc');
  const simPath = document.getElementById('sim-adaptive-path');

  const studentProfiles = {
    studentA: {
      title: "Student A (Priya) - Fast Learner",
      badge: "Fast Track",
      desc: "Already mastered Class 6 & 7 prerequisites. Solves basic equations in seconds.",
      systemReaction: "⚡ System Action: Skips remedial videos, boosts problem difficulty to Tier 3 (Olympiad brackets & fractions), introduces word problems early.",
      steps: ["Diagnostic: 100%", "Bypasses Foundational Drill", "Accelerates to Multi-variable Applications", "Zero Boredom"]
    },
    studentB: {
      title: "Student B (Rahul) - On Grade-Level",
      badge: "Standard Pace",
      desc: "Understands standard operations, needs gentle practice to build confidence.",
      systemReaction: "🎯 System Action: Presents standard NCERT exercises with Tier 2 Hint Ladder. Provides immediate reinforcement after minor errors.",
      steps: ["Diagnostic: 70%", "Practices 2-step equations", "Uses Hint 1 for sign check", "Masters NCERT Chapter 2 on time"]
    },
    studentC: {
      title: "Student C (Aarav) - Struggling / Latent Prerequisite Gap",
      badge: "Prerequisite Bridge Activated",
      desc: "Gets stuck on 3x - 4 = 11 not because of algebra, but because of a missed Class 7 concept: Negative Integer Subtraction.",
      systemReaction: "🛡 System Action: 'Quiet Gap' flagged. Without demotivating Aarav, the engine quietly serves a 3-minute visual balance scale review and integer number line refresher before returning to the main lesson.",
      steps: ["Detects Class 7 Integer Error", "Auto-triggers Visual Scale Scaffolding", "Closes Prerequisite Gap Silently", "Safeguards against Board Exam failure"]
    }
  };

  simBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sKey = btn.getAttribute('data-sim');
      state.simulatedStudent = sKey;

      simBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const p = studentProfiles[sKey];
      if (simDesc) {
        simDesc.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h4 style="font-weight:800; color:#1e1b4b; font-size:1.15rem;">${p.title}</h4>
            <span class="badge badge-primary">${p.badge}</span>
          </div>
          <p style="color:#475569; font-size:0.95rem;">${p.desc}</p>
          <div style="margin-top:14px; padding:12px; background:#eef2ff; border-radius:8px; border-left:4px solid #4f46e5; font-size:0.92rem; color:#312e81; font-weight:600;">
            ${p.systemReaction}
          </div>
        `;
      }

      if (simPath) {
        simPath.innerHTML = p.steps.map((st, i) => `
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px; font-size:0.88rem; font-weight:600;">
            <span style="width:22px; height:22px; border-radius:50%; background:#4f46e5; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.75rem;">${i+1}</span>
            <span>${st}</span>
          </div>
        `).join('');
      }

      drawProgressChart();
    });
  });

  // Initial trigger for default student
  const initialBtn = document.querySelector('.sim-student-btn.active');
  if (initialBtn) {
    initialBtn.click();
  }
}

// Canvas Visualizations
function drawProgressChart() {
  const canvas = document.getElementById('progress-chart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.parentElement.clientWidth || 600;
  const h = canvas.height = 240;

  ctx.clearRect(0, 0, w, h);

  // Background Grid
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  for (let y = 30; y < h - 30; y += 45) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();
  }

  // Draw Axes
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 20);
  ctx.lineTo(40, h - 30);
  ctx.lineTo(w - 20, h - 30);
  ctx.stroke();

  // X Labels (Weeks)
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px sans-serif';
  ctx.fillText('Week 1', 60, h - 10);
  ctx.fillText('Week 4 (Mid-Term)', w / 2 - 40, h - 10);
  ctx.fillText('Week 8 (Chapter End)', w - 120, h - 10);

  // Y Label (Understanding)
  ctx.save();
  ctx.translate(15, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Mastery %', -30, 0);
  ctx.restore();

  // Curve 1: Traditional One-Pace Curve (Lagging behind)
  ctx.strokeStyle = '#ef4444';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(40, h - 45);
  ctx.bezierCurveTo(w * 0.3, h - 60, w * 0.6, h - 75, w - 30, h - 85);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#ef4444';
  ctx.fillText('Traditional One-Pace (Quiet Gap Grows)', w - 240, h - 95);

  // Curve 2: VidyaSetu Adaptive Curve
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(40, h - 45);
  ctx.bezierCurveTo(w * 0.25, h - 90, w * 0.5, h - 160, w - 30, 35);
  ctx.stroke();

  // Highlight points
  ctx.fillStyle = '#10b981';
  [[40, h - 45], [w * 0.35, h - 110], [w * 0.7, h - 170], [w - 30, 35]].forEach(([px, py]) => {
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('VidyaSetu Adaptive Mastery (94%)', w - 220, 28);
}

function drawMasteryRadar() {
  const canvas = document.getElementById('mastery-radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = 280;
  const h = canvas.height = 240;
  const cx = w / 2;
  const cy = h / 2;
  const radius = 75;

  ctx.clearRect(0, 0, w, h);

  const categories = ["Prereq Ops", "Balancing", "Word Prob", "Equations", "Signs"];
  const values = [0.92, 0.85, 0.70, 0.88, 0.78];
  const total = categories.length;

  // Background Polygon rings
  for (let r = 0.25; r <= 1.0; r += 0.25) {
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0';
    for (let i = 0; i < total; i++) {
      const angle = (i * 2 * Math.PI) / total - Math.PI / 2;
      const x = cx + Math.cos(angle) * (radius * r);
      const y = cy + Math.sin(angle) * (radius * r);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Draw Data Shape
  ctx.beginPath();
  ctx.fillStyle = 'rgba(79, 70, 229, 0.25)';
  ctx.strokeStyle = '#4f46e5';
  ctx.lineWidth = 2;
  for (let i = 0; i < total; i++) {
    const angle = (i * 2 * Math.PI) / total - Math.PI / 2;
    const x = cx + Math.cos(angle) * (radius * values[i]);
    const y = cy + Math.sin(angle) * (radius * values[i]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Labels
  ctx.fillStyle = '#475569';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  for (let i = 0; i < total; i++) {
    const angle = (i * 2 * Math.PI) / total - Math.PI / 2;
    const x = cx + Math.cos(angle) * (radius + 20);
    const y = cy + Math.sin(angle) * (radius + 15);
    ctx.fillText(categories[i], x, y);
  }
}

function drawCohortChart() {
  const canvas = document.getElementById('cohort-bar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.parentElement.clientWidth || 500;
  const h = canvas.height = 180;

  ctx.clearRect(0, 0, w, h);

  const stats = [
    { label: "Class 7 Prereq Gaps", count: 7, color: "#ef4444" },
    { label: "Balancing Basics", count: 12, color: "#f59e0b" },
    { label: "Core NCERT Ready", count: 18, color: "#3b82f6" },
    { label: "Olympiad / Fast", count: 5, color: "#10b981" }
  ];

  const barWidth = 45;
  const gap = (w - (stats.length * barWidth)) / (stats.length + 1);

  stats.forEach((st, idx) => {
    const x = gap + idx * (barWidth + gap);
    const barHeight = (st.count / 20) * (h - 50);
    const y = h - 30 - barHeight;

    // Draw Bar
    ctx.fillStyle = st.color;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, [6, 6, 0, 0]);
    ctx.fill();

    // Value on top
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${st.count}`, x + barWidth / 2, y - 6);

    // Label below
    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.fillText(st.label, x + barWidth / 2, h - 10);
  });
}

// Accordion for Hackathon Submission Deck
function setupAccordion() {
  const deckHeaders = document.querySelectorAll('.deck-header');
  deckHeaders.forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body = hdr.nextElementSibling;
      const isOpen = body.classList.contains('active');

      deckHeaders.forEach(h => {
        h.classList.remove('active');
        if (h.nextElementSibling) h.nextElementSibling.classList.remove('active');
      });

      if (!isOpen) {
        hdr.classList.add('active');
        body.classList.add('active');
      }
    });
  });
}
