/* Lógica principal do Quiz — Claude Code para Analytics Engineers. */

const TIME_PER_QUESTION = 20; // segundos
const LEVEL_LABELS = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
  todos: "Todos os níveis"
};

const state = {
  playerName: "",
  playerEmail: "",
  level: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  totalTimeSeconds: 0,
  timerId: null,
  timeLeft: TIME_PER_QUESTION,
  answered: false
};

// ---------- Utilitários ----------

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestionSet(level) {
  if (level === "todos") {
    return [
      ...shuffle(QUESTIONS.filter((q) => q.nivel === "iniciante")),
      ...shuffle(QUESTIONS.filter((q) => q.nivel === "intermediario")),
      ...shuffle(QUESTIONS.filter((q) => q.nivel === "avancado"))
    ];
  }
  return shuffle(QUESTIONS.filter((q) => q.nivel === level));
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ---------- Home ----------

const nameInput = document.getElementById("player-name");
const emailInput = document.getElementById("player-email");
const startBtn = document.getElementById("start-btn");
const levelButtons = document.querySelectorAll(".level-btn");
const viewLeaderboardBtn = document.getElementById("view-leaderboard-btn");

let selectedLevel = null;

levelButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    levelButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedLevel = btn.dataset.level;
    updateStartButtonState();
  });
});

nameInput.addEventListener("input", updateStartButtonState);

function updateStartButtonState() {
  startBtn.disabled = !(nameInput.value.trim().length > 0 && selectedLevel);
}

startBtn.addEventListener("click", () => {
  state.playerName = nameInput.value.trim();
  state.playerEmail = emailInput.value.trim() || null;
  state.level = selectedLevel;
  startQuiz();
});

viewLeaderboardBtn.addEventListener("click", () => {
  showScreen("screen-leaderboard");
  loadLeaderboard();
});

// ---------- Quiz ----------

const questionCounterEl = document.getElementById("question-counter");
const questionLevelEl = document.getElementById("question-level");
const questionTextEl = document.getElementById("question-text");
const trueBtn = document.getElementById("true-btn");
const falseBtn = document.getElementById("false-btn");
const timerBarEl = document.getElementById("timer-bar");
const timerNumberEl = document.getElementById("timer-number");
const feedbackBox = document.getElementById("feedback-box");
const feedbackTitleEl = document.getElementById("feedback-title");
const feedbackExplanationEl = document.getElementById("feedback-explanation");
const nextBtn = document.getElementById("next-btn");

function startQuiz() {
  state.questions = buildQuestionSet(state.level);
  state.currentIndex = 0;
  state.score = 0;
  state.totalTimeSeconds = 0;
  showScreen("screen-question");
  loadQuestion();
}

function loadQuestion() {
  state.answered = false;
  feedbackBox.classList.add("hidden");
  trueBtn.disabled = false;
  falseBtn.disabled = false;
  trueBtn.classList.remove("correct", "incorrect");
  falseBtn.classList.remove("correct", "incorrect");

  const question = state.questions[state.currentIndex];
  questionCounterEl.textContent = `Pergunta ${state.currentIndex + 1} de ${state.questions.length}`;
  questionLevelEl.textContent = LEVEL_LABELS[question.nivel];
  questionTextEl.textContent = question.enunciado;

  startTimer();
}

function startTimer() {
  clearInterval(state.timerId);
  state.timeLeft = TIME_PER_QUESTION;
  updateTimerUI();

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    state.totalTimeSeconds += 1;
    updateTimerUI();

    if (state.timeLeft <= 0) {
      clearInterval(state.timerId);
      handleAnswer(null); // tempo esgotado
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerId);
}

function updateTimerUI() {
  const pct = Math.max(0, (state.timeLeft / TIME_PER_QUESTION) * 100);
  timerBarEl.style.width = `${pct}%`;
  timerNumberEl.textContent = Math.max(0, state.timeLeft);
  timerBarEl.classList.toggle("timer-low", state.timeLeft <= 5);
}

function handleAnswer(answerGiven) {
  if (state.answered) return;
  state.answered = true;
  stopTimer();

  const question = state.questions[state.currentIndex];
  const isCorrect = answerGiven === question.resposta;

  // state.totalTimeSeconds já é incrementado a cada segundo pelo próprio timer (startTimer),
  // então nada precisa ser somado aqui além de contabilizar o acerto.
  if (isCorrect) state.score += 1;

  trueBtn.disabled = true;
  falseBtn.disabled = true;

  const correctBtn = question.resposta ? trueBtn : falseBtn;
  correctBtn.classList.add("correct");
  if (answerGiven !== null && !isCorrect) {
    const wrongBtn = answerGiven ? trueBtn : falseBtn;
    wrongBtn.classList.add("incorrect");
  }

  feedbackTitleEl.textContent =
    answerGiven === null ? "⏱ Tempo esgotado!" : isCorrect ? "✅ Certo!" : "❌ Errado!";
  feedbackTitleEl.className = "feedback-title " + (isCorrect ? "text-success" : "text-error");
  feedbackExplanationEl.textContent = question.explicacao;
  feedbackBox.classList.remove("hidden");

  nextBtn.textContent =
    state.currentIndex === state.questions.length - 1 ? "Ver resultado" : "Próxima pergunta";
}

trueBtn.addEventListener("click", () => handleAnswer(true));
falseBtn.addEventListener("click", () => handleAnswer(false));

nextBtn.addEventListener("click", () => {
  state.currentIndex += 1;
  if (state.currentIndex < state.questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
});

// ---------- Resultado ----------

const resultScoreEl = document.getElementById("result-score");
const resultMessageEl = document.getElementById("result-message");
const resultRankEl = document.getElementById("result-rank");
const playAgainBtn = document.getElementById("play-again-btn");
const resultLeaderboardBtn = document.getElementById("result-leaderboard-btn");

function finishQuiz() {
  showScreen("screen-result");
  const total = state.questions.length;
  resultScoreEl.textContent = `${state.score} / ${total}`;
  resultMessageEl.textContent = getResultMessage(state.score, total);
  resultRankEl.textContent = "";
  submitScoreToSupabase();
}

function getResultMessage(score, total) {
  const pct = score / total;
  if (pct === 1) return "Perfeito! Você manja mesmo de Claude Code. 🎉";
  if (pct >= 0.7) return "Muito bom! Você já entende bem o Claude Code.";
  if (pct >= 0.4) return "Bom começo — vale revisar alguns conceitos.";
  return "Hora de explorar mais o Claude Code. Continue estudando!";
}

async function submitScoreToSupabase() {
  const entry = {
    player_name: state.playerName,
    player_email: state.playerEmail,
    score: state.score,
    total_questions: state.questions.length,
    level_played: state.level,
    total_time_seconds: state.totalTimeSeconds
  };

  const { error } = await saveResultToLeaderboard(entry);
  if (error) {
    resultRankEl.textContent = "Não foi possível salvar seu resultado no ranking agora.";
    resultRankEl.classList.add("text-muted");
    return;
  }

  const { data, error: fetchError } = await fetchLeaderboard(1000);
  if (fetchError || !data) return;

  const position = data.findIndex(
    (row) =>
      row.player_name === entry.player_name &&
      row.score === entry.score &&
      row.total_time_seconds === entry.total_time_seconds
  );
  if (position >= 0) {
    resultRankEl.textContent = `Você ficou em #${position + 1}º lugar no ranking geral!`;
    resultRankEl.classList.remove("text-muted");
  }
}

playAgainBtn.addEventListener("click", () => {
  selectedLevel = null;
  levelButtons.forEach((b) => b.classList.remove("selected"));
  updateStartButtonState();
  showScreen("screen-home");
});

resultLeaderboardBtn.addEventListener("click", () => {
  showScreen("screen-leaderboard");
  loadLeaderboard();
});

// ---------- Leaderboard ----------

const leaderboardBody = document.getElementById("leaderboard-body");
const leaderboardStatus = document.getElementById("leaderboard-status");
const leaderboardBackBtn = document.getElementById("leaderboard-back-btn");

async function loadLeaderboard() {
  leaderboardBody.innerHTML = "";
  leaderboardStatus.textContent = "Carregando ranking...";
  leaderboardStatus.classList.remove("hidden");

  const { data, error } = await fetchLeaderboard(20);

  if (error) {
    leaderboardStatus.textContent = "Não foi possível carregar o ranking agora.";
    return;
  }

  if (!data.length) {
    leaderboardStatus.textContent = "Ainda não há resultados no ranking. Seja o primeiro!";
    return;
  }

  leaderboardStatus.classList.add("hidden");
  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    const levelDisplay = LEVEL_LABELS[row.level_played] || "Desconhecido";
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(row.player_name)}</td>
      <td>${row.score}/${row.total_questions}</td>
      <td>${escapeHtml(levelDisplay)}</td>
      <td>${row.total_time_seconds}s</td>
    `;
    leaderboardBody.appendChild(tr);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

leaderboardBackBtn.addEventListener("click", () => {
  showScreen("screen-home");
});
