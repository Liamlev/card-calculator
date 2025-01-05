
const secretDeckOrder = [
  "4♣️", "2♥️", "7♦️", "3♣️", "4♥️", "6♦️", "A♠️", "5♥️", "9♠️", "2♠️",
  "Q♥️", "3♦️", "Q♣️", "8♥️", "6♠️", "5♠️", "9♥️", "K♣️", "2♦️", "J♥️",
  "3♠️", "8♠️", "6♥️", "10♣️", "5♦️", "K♦️", "2♣️", "3♥️", "8♦️", "5♣️",
  "K♠️", "J♦️", "8♣️", "10♠️", "K♥️", "J♣️", "7♠️", "10♥️", "A♦️",
function calculateProbability(chosenCardPosition, chosenNumber) {
  // Mnemonica stack positions
  const mnemonicaStack = [
    1, 52, 26, 2, 50, 25, 12, 3, 35, 13, 42, 27, 8, 32, 18, 6, 48, 28, 20, 9,
    43, 17, 30, 14, 36, 4, 41, 10, 40, 7, 33, 24, 15, 37, 47, 16, 5, 19, 44, 31,
    22, 49, 11, 23, 34, 39, 46, 21, 38, 45, 29, 51,
  ];

  // Get actual position of the chosen card
  const actualPosition = mnemonicaStack[chosenCardPosition - 1];

  // Calculate forward difference (only forward, circular)
  const forwardDifference = (chosenNumber - actualPosition + 52) % 52;

  let percentage;
  if (forwardDifference === 0) {
    // Exact match
    percentage = `0.0${Math.floor(Math.random() * 900 + 100)}`; // Random 3 digits
  } else if (forwardDifference <= 3) {
    // Small differences (1-3 cards)
    percentage = `0.1${forwardDifference}${Math.floor(Math.random() * 900 + 100)}`;
  } else if (forwardDifference <= 10) {
    // Medium differences (4-10 cards)
    percentage = `1.${String(forwardDifference).padStart(2, "0")}${Math.floor(Math.random() * 900 + 100)}`;
  } else {
    // Larger differences (greater than 10 cards)
    const firstDigit = Math.floor(Math.random() * 3) + 2; // Random between 2 and 4
    percentage = `${firstDigit}.${String(forwardDifference).padStart(2, "0")}${Math.floor(Math.random() * 900 + 100)}`;
  }

  return percentage;
}

// Event listener for calculate button
document.getElementById("calculate-btn").addEventListener("click", function () {
  const cardDropdown = document.getElementById("card");
  const numberInput = document.getElementById("number");

  const chosenCard = cardDropdown.value;
  const chosenNumber = parseInt(numberInput.value, 10);

  // Convert card to position in Mnemonica stack
  const cardPosition = cardDropdown.selectedIndex + 1;

  if (!chosenNumber || chosenNumber < 1 || chosenNumber > 52) {
    alert("אנא הזינו מספר בין 1 ל-52.");
    return;
  }

  const probability = calculateProbability(cardPosition, chosenNumber);

  // Display the result
  document.getElementById("chosen-card").textContent = chosenCard;
  document.getElementById("chosen-number").textContent = chosenNumber;
  document.getElementById("calculated-probability").textContent = `${probability}%`;

  // Show the result section and hide the input section
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
 "4♠️",
  "7♥️", "4♦️", "A♣️", "9♣️", "J♠️", "Q♦️", "7♣️", "Q♠️", "10♦️", "6♣️",
  "A♥️", "9♦️"
];

function calculateProbability() {
  const card = document.getElementById("card").value;
  const number = parseInt(document.getElementById("number").value);
  const resultSection = document.getElementById("result-section");
  const inputSection = document.getElementById("input-section");

  if (!number || number < 1 || number > 52) {
    alert("אנא הזינו מספר בין 1 ל-52.");
    return;
  }

  const cardPosition = secretDeckOrder.indexOf(card) + 1;

  if (cardPosition === 0) {
    alert("הקלף לא נמצא בחפיסה!");
    return;
  }

  const difference = cardPosition - number; // Difference can be negative
  const absDifference = Math.abs(difference);
  const randomDigits = Math.random().toString().slice(2, 6); // Generate random digits
  let probability = "";

  if (absDifference === 0) {
    probability = `0.0${randomDigits}%`; // Exact match
  } else if (absDifference === 1) {
    probability = `0.11${difference > 0 ? 1 : 2}${randomDigits}%`; // One card difference
  } else if (absDifference === 2) {
    probability = `0.21${difference > 0 ? 1 : 2}${randomDigits}%`; // Two cards difference
  } else if (absDifference === 3) {
    probability = `0.31${difference > 0 ? 1 : 2}${randomDigits}%`; // Three cards difference
  } else {
    probability = (Math.random() * 5 + 5).toFixed(6) + "%"; // Random probability for larger differences
  }

  document.getElementById("chosen-card").innerText = card;
  document.getElementById("chosen-number").innerText = number;
  document.getElementById("calculated-probability").innerText = probability;

  // Hide input section and show result section
  inputSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
}

function tryAgain() {
  const inputSection = document.getElementById("input-section");
  const resultSection = document.getElementById("result-section");

  // Show input section and hide result section
  inputSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
}
