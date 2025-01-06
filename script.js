
function calculateProbability(chosenCardPositio
// Script for calculating card probability with corrected Mnemonica stack logic

// Corrected Mnemonica stack mapping
const mnemonicaStack = {
  "4♣️": 1, "2♥️": 2, "7♦️": 3, "3♣️": 4, "4♥️": 5, "6♦️": 6, "A♠️": 7,
  "5♥️": 8, "9♠️": 9, "2♠️": 10, "Q♥️": 11, "3♦️": 12, "Q♣️": 13, "8♥️": 14,
  "6♠️": 15, "5♠️": 16, "9♥️": 17, "K♣️": 18, "2♦️": 19, "J♥️": 20,
  "3♠️": 21, "8♠️": 22, "6♥️": 23, "10♣️": 24, "5♦️": 25, "K♦️": 26,
  "2♣️": 27, "3♥️": 28, "8♦️": 29, "5♣️": 30, "K♠️": 31, "J♦️": 32,
  "8♣️": 33, "10♠️": 34, "K♥️": 35, "J♣️": 36, "7♠️": 37, "10♥️": 38,
  "A♦️": 39, "4♠️": 40, "7♥️": 41, "4♦️": 42, "A♣️": 43, "9♣️": 44,
  "J♠️": 45, "Q♦️": 46, "7♣️": 47, "Q♠️": 48, "10♦️": 49, "6♣️": 50,
  "A♥️": 51, "9♦️": 52
};

function calculateProbability(chosenCard, chosenNumber) {
  const actualPosition = mnemonicaStack[chosenCard];

  // Calculate forward and backward differences
  const forwardDifference = (chosenNumber - actualPosition + 52) % 52;
  const backwardDifference = (actualPosition - chosenNumber + 52) % 52;

  // Choose the shortest path
  let difference, direction;
  if (forwardDifference < backwardDifference) {
    difference = forwardDifference;
    direction = "forward";
  } else {
    difference = backwardDifference;
    direction = "backward";
  }

  // Map the difference to the required probability format
  let percentage;
  if (difference === 0) {
    percentage = `0.0${Math.floor(Math.random() * 900 + 100)}`;
  } else if (1 <= difference && difference <= 3) {
    percentage = `0.1${difference}${Math.floor(Math.random() * 900 + 100)}`;
  } else if (4 <= difference && difference <= 10) {
    percentage = `1.${String(difference).padStart(2, "0")}${Math.floor(Math.random() * 900 + 100)}`;
  } else {
    const firstDigit = Math.floor(Math.random() * 3) + 2; // Large difference (2-4)
    percentage = `${firstDigit}.${String(difference).padStart(2, "0")}${Math.floor(Math.random() * 900 + 100)}`;
  }

  return { actualPosition, difference, direction, percentage };
}

// Event listener for calculate button
document.getElementById("calculate-btn").addEventListener("click", function () {
  const cardDropdown = document.getElementById("card");
  const numberInput = document.getElementById("number");

  const chosenCard = cardDropdown.value;
  const chosenNumber = parseInt(numberInput.value, 10);

  // Validate input
  if (!chosenNumber || chosenNumber < 1 || chosenNumber > 52) {
    alert("אנא הזינו מספר בין 1 ל-52.");
    return;
  }

  // Calculate probability
  const result = calculateProbability(chosenCard, chosenNumber);

  // Update the result section
  document.getElementById("chosen-card").textContent = chosenCard;
  document.getElementById("chosen-number").textContent = chosenNumber;
  document.getElementById("calculated-probability").textContent = `${result.percentage}%`;

  // Show result and hide input section
  document.getElementById("input-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");
});

// Event listener for try-again button
document.querySelector(".try-again-btn").addEventListener("click", function () {
  // Reset the input section
  document.getElementById("input-section").classList.remove("hidden");
  document.getElementById("result-section").classList.add("hidden");
  document.getElementById("number").value = "";
});
n, chosenNumber) {
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
