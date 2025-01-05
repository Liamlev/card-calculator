
const secretDeckOrder = [
  "4♣️", "2♥️", "7♦️", "3♣️", "4♥️", "6♦️", "A♠️", "5♥️", "9♠️", "2♠️",
  "Q♥️", "3♦️", "Q♣️", "8♥️", "6♠️", "5♠️", "9♥️", "K♣️", "2♦️", "J♥️",
  "3♠️", "8♠️", "6♥️", "10♣️", "5♦️", "K♦️", "2♣️", "3♥️", "8♦️", "5♣️",
  "K♠️", "J♦️", "8♣️", "10♠️", "K♥️", "J♣️", "7♠️", "10♥️", "A♦️", "4♠️",
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
