var challenges = [
  {
    challengeText: "Dance como um pinguim por 10 segundos!",
    duration: 10
  },
  {
    challengeText: "Cante sua música favorita como se fosse um pato!",
    duration: 15
  },
  {
    challengeText: "Faça uma imitação engraçada de um famoso!",
    duration: 20
  },
  {
    challengeText: "Ande pela sala como um caranguejo por 15 segundos!",
    duration: 15
  }
];

var currentChallengeIndex;
var countdownInterval;

function getRandomChallenge() {
  var randomIndex = Math.floor(Math.random() * challenges.length);
  return challenges[randomIndex];
}

function startCountdown(duration) {
  var countdownElement = document.getElementById("countdown");
  var timeLeft = duration;

  countdownElement.textContent = "Tempo restante: " + timeLeft + " segundos";

  countdownInterval = setInterval(function() {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("result").textContent = "Tempo esgotado! Tente novamente.";
      document.getElementById("challenge").textContent = "";
      document.addEventListener("keyup", handleKeyUp);
    } else {
      countdownElement.textContent = "Tempo restante: " + timeLeft + " segundos";
    }
  }, 1000);
}

function guessNumber() {
  var guess = parseInt(document.getElementById("guess-input").value);
  var randomNumber = Math.floor(Math.random() * 10) + 1;

  if (isNaN(guess)) {
    document.getElementById("result").textContent = "Por favor, digite um número válido!";
  } else if (guess === randomNumber) {
    if (currentChallengeIndex >= challenges.length - 1) {
      clearInterval(countdownInterval);
      document.getElementById("result").textContent = "Parabéns! Você concluiu todos os desafios!";
      document.getElementById("challenge").textContent = "";
      document.getElementById("countdown").textContent = "";
      document.removeEventListener("keyup", handleKeyUp);
    } else {
      clearInterval(countdownInterval);
      currentChallengeIndex++;
      var challenge = challenges[currentChallengeIndex];
      document.getElementById("result").textContent = "Parabéns! Você acertou!";
      document.getElementById("challenge").textContent = "Desafio: " + challenge.challengeText;
      startCountdown(challenge.duration);
    }
  } else {
    clearInterval(countdownInterval);
    currentChallengeIndex++;
    var challenge = challenges[currentChallengeIndex];
    document.getElementById("result").textContent = "Que pena! O número correto era " + randomNumber + ". Tente novamente!";
    document.getElementById("challenge").textContent = "Desafio: " + challenge.challengeText;
    startCountdown(challenge.duration);
  }
}

function restartGame() {
  clearInterval(countdownInterval);
  document.getElementById("guess-input").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("challenge").textContent = "";
  document.getElementById("countdown").textContent = "";
  currentChallengeIndex = 0;
  document.addEventListener("keyup", handleKeyUp);
}

function handleKeyUp(event) {
  if (event.key === "Enter") {
    guessNumber();
  } else if (event.key === "Escape") {
    restartGame();
  }
}

document.addEventListener("keyup", handleKeyUp);

// Iniciar o jogo
currentChallengeIndex = -1;
document.getElementById("challenge").textContent = "";
document.getElementById("countdown").textContent = "";