function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    let result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch {
    alert("Error");
  }
}
function calculate() {
  try {
    let result = eval(display.value);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}
document.addEventListener("keydown", function (event) {
  let key = event.key;

  if (!isNaN(key) || "+-*/().".includes(key)) {
    display.value += key;
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
});
