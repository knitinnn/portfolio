let buttons = document.querySelectorAll(".button");
let winnerText = document.getElementById("winner");
let resetBtn = document.querySelector(".resetBtn");

let turn = "X";
let moveCount = 0;
const winPattern = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function updateStatus(msg) {
  winnerText.innerText = msg;
}

function checkWinner() {
  for (let pattern of winPattern) {
    let [a, b, c] = pattern;
    let val1 = buttons[a].innerText;
    let val2 = buttons[b].innerText;
    let val3 = buttons[c].innerText;
    if (val1 !== "" && val1 === val2 && val2 === val3) {
      [a, b, c].forEach(idx => {
        buttons[idx].style.backgroundColor = "#bcffc7";
      });
      updateStatus(`Winner is ${val1}`);
      resetBtn.innerText = "New Game";
      buttons.forEach(btn => btn.disabled = true);
      return true;
    }
  }
  return false;
}

buttons.forEach((btn, idx) => {
  btn.classList.add("redhover");
  btn.addEventListener('mouseover', () => {
    if (!btn.disabled && btn.innerText === "") {
      btn.style.backgroundColor = "#ffa3a3";
    }
  });

  btn.addEventListener('mouseout', () => {
    if (btn.innerText === "") {
      btn.style.backgroundColor = "#eaeaea";
      btn.classList.remove("X", "O");
    } else if (btn.innerText === "X") {
      btn.classList.add("X");
    } else {
      btn.classList.add("O");
    }
  });

  btn.addEventListener('click', () => {
    if (btn.innerText === "" && !btn.disabled) {
      btn.innerText = turn;
      btn.classList.add(turn);
      turn = turn === "X" ? "O" : "X";
      moveCount++;
      if (!checkWinner()) {
        if (moveCount === 9) {
          updateStatus("It's a tie!");
          resetBtn.innerText = "New Game";
        } else {
          updateStatus(`Turn: ${turn}`);
        }
      }
    }
  });
});

resetBtn.addEventListener("click", () => {
  buttons.forEach(btn => {
    btn.innerText = "";
    btn.style.backgroundColor = "#eaeaea";
    btn.classList.remove("X", "O");
    btn.disabled = false;
  });
  turn = "X";
  moveCount = 0;
  winnerText.innerText = "";
  resetBtn.innerText = "Reset";
});

