const mains = ["welcome", "players", "game", "scores"];

let state = {
  page: "welcome",
  players: [],
  rounds: 3,
  currentPlayer: 0,
};

// helpers

const qsa = document.querySelectorAll;
const gebi = document.getElementById;

// view functions

const hideMains = () =>
  document
    .querySelectorAll("main")
    .forEach((el) => (el.style.display = "none"));

const displayPlayers = (s) => {
  s.players.forEach((p) =>
    document.getElementById("players").appendChild(displayPlayerForm(p))
  );
};

const displayPlayerForm = (p) => {
  const span = document.createElement("span");
  span.innerHTML = "Player #" + (Number(p.id) + 1);
  const input = document.createElement("input");
  const sec = document.createElement("section");
  sec.append(span);
  sec.append(input);
  return sec;
};

function render(s) {
  hideMains();
  document.getElementById(s.page).style.display = "flex";
  if (s.page == "players") {
    displayPlayers(s);
  }
}

// actions

function startNewGame(s) {
  //   const newState = { ...s }; //shallow copy
  //   newState.page = "players";
  //   return newState;
  return { ...s, page: "players" };
}

function createPlayers(s, amount = 2) {
  const player = {
    id: 0,
    wins: 0,
    points: 0,
  };
  for (let index = 0; index < amount; index++) {
    let newPlayer = { ...player };
    newPlayer.id = index;
    s.players.push(newPlayer);
  }
  return s;
}

// attach events

const start = document.getElementById("start");
start.addEventListener("click", () => {
  state = startNewGame(state);
  state = createPlayers(state);
  render(state);
  console.log(state);
});

document.addEventListener("DOMContentLoaded", () => render(state));
