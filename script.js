const characterAmountRange = document.getElementById("CharacterAmountRange");
const CharacterAmountNumber = document.getElementById("CharacterAmountNumber");
const form = document.getElementById("passwordGeneratorForm");
const includeUpperCase = document.getElementById("includeUpperCase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const passwordDis = document.getElementById("passwordDis");
const textarea = document.createElement("textarea");

const upperCaseChar = arrayFromLowToHigh(65, 90);
const lowerCaseChar = arrayFromLowToHigh(97, 122);
const NumberChar = arrayFromLowToHigh(48, 57);
const SymbolChar = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

CharacterAmountNumber.addEventListener("input", syncCharacterAmount);
CharacterAmountRange.addEventListener("input", syncCharacterAmount);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const Amount = CharacterAmountNumber.value;
  const upperCase = includeUpperCase.checked;
  const Numbers = includeNumbers.checked;
  const Symbols = includeSymbols.checked;
  const password = generatePassword(Amount, upperCase, Numbers, Symbols);
  passwordDis.innerHTML = password;

  let c = document.createElement("button");
  c.dataset.content = "Copy";
  c.setAttribute("id", "clip");
  passwordDis.appendChild(c);
});

function generatePassword(Amount, upperCase, Numbers, Symbols) {
  let allChar = lowerCaseChar;
  if (upperCase) allChar = allChar.concat(upperCaseChar);
  if (Numbers) allChar = allChar.concat(NumberChar);
  if (Symbols) allChar = allChar.concat(SymbolChar);
  const password = [];
  for (let i = 0; i < Amount; i++) {
    const character = allChar[Math.floor(Math.random() * allChar.length)];
    password.push(character);
  }
  return password.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(String.fromCharCode(i));
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountRange.value = CharacterAmountNumber.value = value;
}

document.body.addEventListener("click", (e) => {
  if (e.target.id == "clip") {
    const password = passwordDis.innerText;
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    let btn = document.getElementById('clip');
    btn.style.backgroundColor = "grey";
    btn.dataset.content = "Copied";
  }
});