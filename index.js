// Variables

const elements = {
  homeScore: document.getElementById("home-score"),
  guestScore: document.getElementById("guest-score"),
  pointsBtns: document.querySelectorAll(".match-points .btn"),
  gameTimer: document.getElementById("game-timer"),
};

const score = {
  home: 0,
  guest: 0,
};

let timeIntervalId;

// Add points

function addPoints(team, points) {
  score[team] += points;
  elements[`${team}Score`].textContent = score[team];

  highlightLeader();
}

// Start game timer

function startGameTimer() {
  let startTime = Date.now();

  timeIntervalId = setInterval(() => {
    let miliseconds = Date.now() - startTime;

    let hours = Math.floor(miliseconds / 3600000);
    hours <= 9 ? (hours = `0${hours}`) : hours;

    miliseconds = miliseconds - hours * 3600000;

    let minutes = Math.floor(miliseconds / 60000);
    minutes <= 9 ? (minutes = `0${minutes}`) : minutes;

    miliseconds = miliseconds - minutes * 60000;

    let seconds = Math.floor(miliseconds / 1000);
    seconds <= 9 ? (seconds = `0${seconds}`) : seconds;

    elements.gameTimer.textContent = `${hours} : ${minutes} : ${seconds}`;
  }, 1000);
}

// Highlight leader

function highlightLeader() {
  elements.homeScore.classList.remove("current-leader");
  elements.guestScore.classList.remove("current-leader");

  if (score["home"] > score["guest"]) {
    elements.homeScore.classList.add("current-leader");
  } else if (score["home"] < score["guest"]) {
    elements.guestScore.classList.add("current-leader");
  } else {
    elements.homeScore.classList.remove("current-leader");
    elements.guestScore.classList.remove("current-leader");
  }
}

// Start new game

function startNewGame() {
  clearInterval(timeIntervalId);
  elements.gameTimer.textContent = "00 : 00 : 00";

  startGameTimer();

  score["home"] = 0;
  elements.homeScore.textContent = 0;

  score["guest"] = 0;
  elements.guestScore.textContent = 0;

  elements.homeScore.classList.remove("current-leader");
  elements.guestScore.classList.remove("current-leader");

  startTime = Date.now();
}

// Events

startGameTimer();

elements.pointsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const team = btn.parentElement.dataset.team;
    const points = Number(btn.textContent.slice(1));
    addPoints(team, points);
  });
});
