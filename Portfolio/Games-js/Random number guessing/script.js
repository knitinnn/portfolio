document.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const hintBtn = document.getElementById("hintBtn");
  const restartBtn = document.getElementById("restartBtn");
  const message = document.getElementById("message");

  let secretNumber;
  let hintUsed;

  function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    hintUsed = false;

    message.textContent = "Think and Guess a Number!!!";
    message.style.color = "#333";
    guessInput.value = "";
    guessInput.disabled = false;

    guessBtn.classList.remove("hidden");
    hintBtn.classList.remove("hidden");
    hintBtn.disabled = false;
    restartBtn.classList.add("hidden");
  }

  function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage("Please enter a valid number between 1 and 100.", "red");
      return;
    }

    const diff = Math.abs(userGuess - secretNumber);
    const direction = userGuess > secretNumber ? "high" : "low";

    if (userGuess === secretNumber) {
      setMessage(
        `Congrats You got it! The number was ${secretNumber}.`,
        "green"
      );
      endGame();
    } else {
      if (diff <= 5) {
        setMessage(`Very close! (Too ${direction})`, "#e67e22");
      } else if (diff <= 10) {
        setMessage(`Getting closer (too ${direction})`, "#f39c12");
      } else if (diff <= 25) {
        setMessage(`A bit far (too ${direction})`, "#3498db");
      } else {
        setMessage(`Too far (too ${direction})`, "#1abc9c");
      }
    }

    guessInput.value = "";
    guessInput.focus();
  }

  function giveHint() {
    if (hintUsed) return; 

    let hint;
    if (secretNumber % 2 === 0) {
      hint = "The number is **even**.";
    } else {
      hint = "The number is **odd**.";
    }

    setMessage(`Hint: ${hint}`, "#2c3e50");
    hintUsed = true;
    hintBtn.disabled = true;
  }

  function endGame() {
    guessInput.disabled = true;
    guessBtn.classList.add("hidden");
    hintBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
  }

  function setMessage(text, color) {
    message.innerHTML = text; 
    message.style.color = color;
  }

  guessBtn.addEventListener("click", checkGuess);
  guessInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  });

  hintBtn.addEventListener("click", giveHint);
  restartBtn.addEventListener("click", startGame);
  startGame();
});
