
const secretDeckOrder = [
  "4♣️", "2♥️", "7♦️", "3♣️", "4♥️", "6♦️", "A♠️", "5♥️", "9♠️", "2♠️",
  "Q♥️", "3♦️", "Q♣️", "8♥️", "6♠️", "5♠️", "9♥️", "K♣️", "2♦️", "J♥️",
  "3♠️", "8♠️", "6♥️", "10♣️", "5♦️", "K♦️", "2♣️", "3♥️", "8♦️", "5♣️",
  "K♠️", "J♦️", "8♣️", "10♠️", "K♥️", "J♣️", "7♠️", "10♥️", "A♦️",
  "4♠️", "7♥️", "4♦️", "A♣️", "9♣️", "J♠️", "Q♦️", "7♣️", "Q♠️", "10♦️",
  "6♣️", "A♥️", "9♦️"
];

const mnemonicaStack = [
  1, 52, 26, 2, 50, 25, 12, 3, 35, 13, 42, 27, 8, 32, 18, 6, 48, 28, 20, 9,
  43, 17, 30, 14, 36, 4, 41, 10, 40, 7, 33, 24, 15, 37, 47, 16, 5, 19, 44, 31,
  22, 49, 11, 23, 34, 39, 46, 21, 38, 45, 29, 51
];

function calculateProbability(chosenCardPosition, chosenNumber) {
  const actualPosition = mnemonicaStack[chosenCardPosition - 1];

  // Calculate forward difference (only forward, circular)
  const forwardDifference = (chosenNumber - actualPosition + 52) % 52;

  let percentage;
  if (forwardDifference === 0) {
    percentage = `0.0${Math.floor(Math.random() * 900 + 100)}`;
  } else if (forwardDifference <= 3) {
    percentage = `0.1${forwardDifference}${Math.floor(Math.random() * 900 + 100)}`;
  } else if (forwardDifference <= 10) {
    percentage = `1.${String(forwardDifference).padStart(2, "0")}${Math.floor(Math.random() * 900 + 100)}`;
  } else {
    const firstDigit = Math.floor(Math.random() * 3) + 2;
    percentage = `${firstDigit}.${String(forwardDifference).padStart(2, "0")}${Math.floor(Math.random() * 900 + 100)}`;
  }

  return percentage;
}

document.getElementById("calculate-btn").addEventListener("click", function () {
  const cardDropdown = document.getElementById("card");
  const numberInput = document.getElementById("number");

  const chosenCard = cardDropdown.value;
  const chosenNumber = parseInt(numberInput.value, 10);

  if (!chosenNumber || chosenNumber < 1 || chosenNumber > 52) {
    alert("אנא הזינו מספר בין 1 ל-52.");
    return;
  }

  const cardPosition = secretDeckOrder.indexOf(chosenCard) + 1;
  if (cardPosition === 0) {
    alert("הקלף לא נמצא בחפיסה!");
    return;
  }

  const probability = calculateProbability(cardPosition, chosenNumber);

  document.getElementById("chosen-card").textContent = chosenCard;
  document.getElementById("chosen-number").textContent = chosenNumber;
  document.getElementById("calculated-probability").textContent = `${probability}%`;

  document.getElementById("input-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");
});

document.querySelector(".try-again-btn").addEventListener("click", function () {
  document.getElementById("input-section").classList.remove("hidden");
  document.getElementById("result-section").classList.add("hidden");
  document.getElementById("number").value = "";
});
}
