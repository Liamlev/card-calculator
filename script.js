
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

function calculateTargetAndPercentage(actualPosition, chosenNumber) {
  let target;
  if (actualPosition === chosenNumber) {
    target = 0;
  } else if (actualPosition > chosenNumber) {
    target = actualPosition - chosenNumber;
  } else {
    target = 52 - (chosenNumber - actualPosition);
  }

  let percentage;
  if (target === 0) {
    percentage = `0.0${Math.floor(Math.random() * 900) + 100}`;
  } else if (target < 5 || target > 47) {
    percentage = `0.${String(target).padStart(2)}${Math.floor(Math.random() * 900) + 100}`;
  } else {
    const firstDigit = Math.floor(Math.random() * 4) + 1;
    percentage = `${firstDigit}.${String(target).padStart(2, "0")}${Math.floor(Math.random() * 900) + 100}`;
  }

  return { target, percentage };
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

  const actualPosition = mnemonicaStack[chosenCard];
  const { target, percentage } = calculateTargetAndPercentage(actualPosition, chosenNumber);

  document.getElementById("chosen-card").textContent = chosenCard;
  document.getElementById("chosen-number").textContent = chosenNumber;
  document.getElementById("calculated-probability").textContent = `${percentage}%`;

  document.getElementById("input-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");
});

document.querySelector(".try-again-btn").addEventListener("click", function () {
  document.getElementById("input-section").classList.remove("hidden");
  document.getElementById("result-section").classList.add("hidden");
  document.getElementById("number").value = "";
});
