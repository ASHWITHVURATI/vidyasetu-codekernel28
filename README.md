# VidyaSetu (विद्यासेतु) - Adaptive Learning for Classes 6 to 10
**Developed for Code Kernel '26 (Decode Round · 21 to 24 October 2026)**  
*In collaboration with Canvas Classes · Supported by MyStartupWave & Unstop · Organized by X-Kernel, GRIET Hyderabad*

---

## 🌟 Overview
**VidyaSetu** is an adaptive learning web platform engineered specifically for the challenges of Indian secondary education (Classes 6 to 10, ages 11–16). 

In typical Indian classrooms with 40 to 60 students, the whole class moves through the curriculum at a single median pace. Fast learners get bored, while struggling students fall behind due to missed foundational concepts from earlier grades. Tests typically arrive at the end of a chapter—by then, the quiet gap has grown and the class has already moved on.

VidyaSetu solves this by:
1. **Adapting across all three stages of studying**: **Learn**, **Solve**, and **Test**.
2. **Putting school teachers at the center (GuruSetu)** with real-time class heatmaps and early "quiet gap" alerts before tests happen.
3. **Designing for Indian ground realities**: Multilingual code-switching (English, Hinglish, Telugu), low-bandwidth/2G mode for shared family phones, and 1-click printable offline worksheets with QR codes.

---

## 🚀 How to Run the Website

No dependencies, runtimes, or installations are required!

1. Navigate to the project directory:
   ```
   C:\Users\shrey\.gemini\antigravity\scratch\vidyasetu-adaptive-learning
   ```
2. Double-click **`index.html`** or open it in any modern browser (Chrome, Edge, Firefox, Brave, Safari).
3. (Optional) You can also serve it with any static server or Python/Node/LiveServer:
   ```powershell
   # If Python is installed:
   python -m http.server 8080
   # Or directly open file:///C:/Users/shrey/.gemini/antigravity/scratch/vidyasetu-adaptive-learning/index.html
   ```

---

## 🎯 Key Features Mapped to Hackathon Requirements

### 1. The 3 Parts of Studying (Page 3 of Brief)
- **Part 1: LEARN (Conceptual Breakdown)**:
  - Visual Real-world Indian Analogy: The **Taraazu** (balanced weighing scale).
  - Interactive Equation Scale simulator ($2x + 3 = 11 \rightarrow x = 4$) with dynamic tilt feedback.
  - Bilingual Audio Readout (Web Speech Synthesis in English, Hindi, and Telugu).
  - Prerequisite Micro-Bridge: Auto-unfolds foundational concepts (e.g. Class 6 variables and scales) without shame.
- **Part 2: SOLVE (Adaptive Problem Solving)**:
  - 3 Tiers: Foundational, Standard NCERT Grade-Level, and HOTS / Olympiad Challenge.
  - 3-Stage Scaffolded Hint Ladder: Conceptual nudge $\rightarrow$ Visual structural hint $\rightarrow$ Step-by-step resolution.
  - Misconception Diagnostic Engine: Distinguishes whether the student made an integer sign error, an inverted operation, or arithmetic blunder.
- **Part 3: TEST (Continuous Diagnostic Pulse)**:
  - Low-stakes, 5-minute diagnostic checks.
  - Live **Bayesian Knowledge Tracing (BKT)** mastery profile rendered on Canvas radar charts.

### 2. Empowering the School Teacher (GuruSetu Cockpit)
- **Class 8-B Cohort Heatmap (42 Students)**: Real-time sub-concept mastery matrix.
- **Quiet Gap Early Warning Radar**: Alerts teacher 2 weeks before exams that students have latent Class 7 integer sign gaps.
- **1-Click Auto-Differentiated Groups**: Groups the classroom into Remedial Bridge, Core NCERT, and Olympiad Acceleration.
- **Printable Offline Worksheets**: Auto-formats a print-ready worksheet with QR keys for low-tech/no-device classrooms.
- **Parent WhatsApp Dispatcher**: Multilingual notification templates for evening family updates.

### 3. Interactive Adaptation Simulator
- Test the platform as **Student A (Priya - Fast Learner)**, **Student B (Rahul - Grade Level)**, or **Student C (Aarav - Latent Prerequisite Gap)**.
- Live Canvas rendering of the **Adaptive Progress Curve vs Traditional One-Pace Curve** (matching Page 2 of the PDF).

### 4. Code Kernel '26 Submission Deck
- Complete, structured Decode Round submission answering:
  - 01. The Problem
  - 02. The Solution (Learn, Solve, Test)
  - 03. Indian Classroom Reality & Teacher Empowerment
  - 04. Algorithmic Architecture (BKT & Decision Trees)
  - 05. The Journey Roadmap (Decode $\rightarrow$ Build $\rightarrow$ Prove)

---

## 🛠 Tech Stack
- **HTML5 & Semantic Markup**: Accessibility-focused, mobile-responsive layout.
- **Pure CSS3 & Modern Design System**: Responsive grid, glassmorphism, print media styles.
- **Modular Vanilla JavaScript**: Zero external dependencies; self-contained interactive state machines, canvas charting, and Web Audio API.
- **Offline / Low-Data Resilient**: Under 100 KB total payload, instantaneous loading even on 2G connections.
