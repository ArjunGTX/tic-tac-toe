const cells = document.querySelectorAll(".cell");

const TURNS = {
  X: "x",
  O: "o",
};

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [0, 3, 6],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentTurn = TURNS.X;

startGame();

function startGame() {
  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleClick, {
      once: true,
    });
  });
}

function handleClick(e) {
  updateCells(e.target);
  if (isWinner(TURNS.X)) {
    showResult("X Wins!");
    endGame();
  } else if (isWinner(TURNS.O)) {
    showResult("O Wins!");
    endGame();
  } else if (isDraw()) {
    showResult("Draw!");
    endGame();
  }
}

function updateCells(cell) {
  if (currentTurn === TURNS.X) {
    cell.classList.add(TURNS.X);
    currentTurn = TURNS.O;
  } else if (currentTurn === TURNS.O) {
    cell.classList.add(TURNS.O);
    currentTurn = TURNS.X;
  }
}

function isWinner(turn) {
  return WIN_COMBINATIONS.find((combination) =>
    combination.every((index) => cells[index].classList.contains(turn))
  );
}

function isDraw() {
  return Array.from(cells).every(
    (cell) =>
      cell.classList.contains(TURNS.X) || cell.classList.contains(TURNS.O)
  );
}

function showResult(result) {
  const outputElement = document.querySelector("output");
  outputElement.innerText = result;
}

function endGame() {
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
}
