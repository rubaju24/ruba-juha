let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

// القائمة المنسدلة
const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownOptions = document.getElementById("dropdownOptions");
const optionsList = document.querySelectorAll(".dropdown-options li");

const degModeBtn = document.getElementById("degMode");
const radModeBtn = document.getElementById("radMode");

// الحالة
let isDegreeMode = true;
let currentFunction = "sin";
let memory = 0;

// القائمة المنسدلة
dropdownBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  dropdownOptions.classList.toggle("hidden");
});

optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    currentFunction = option.getAttribute("data-value");
    dropdownBtn.textContent = option.textContent;
    dropdownOptions.classList.add("hidden");
  });
});

document.addEventListener("click", () => {
  dropdownOptions.classList.add("hidden");
});

// DEG / RAD
degModeBtn.addEventListener("click", () => {
  isDegreeMode = true;
  degModeBtn.classList.add("active");
  radModeBtn.classList.remove("active");
});

radModeBtn.addEventListener("click", () => {
  isDegreeMode = false;
  radModeBtn.classList.add("active");
  degModeBtn.classList.remove("active");
});

// دوال مثلثية
function calculateTrigFunction(func, value) {
  let angle = isDegreeMode ? value * (Math.PI / 180) : value;

  switch (func) {
    case "sin":
      return Math.sin(angle);
    case "cos":
      return Math.cos(angle);
    case "tan":
      return Math.tan(angle);

    case "asin":
      let asin = Math.asin(value);
      return isDegreeMode ? asin * (180 / Math.PI) : asin;

    case "acos":
      let acos = Math.acos(value);
      return isDegreeMode ? acos * (180 / Math.PI) : acos;

    case "atan":
      let atan = Math.atan(value);
      return isDegreeMode ? atan * (180 / Math.PI) : atan;

    case "sinh":
      return Math.sinh(value);
    case "cosh":
      return Math.cosh(value);
    case "tanh":
      return Math.tanh(value);

    default:
      return value;
  }
}

// الأزرار
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // أرقام وعمليات
    let value = this.getAttribute("data-value");
    if (value) {
      display.value += value;
      return;
    }

    // =
    if (this.id === "equal") {
      try {
        let val = parseFloat(display.value);

        // إذا في دالة مختارة
        if (!isNaN(val)) {
          display.value = calculateTrigFunction(currentFunction, val);
        } else {
          display.value = eval(display.value);
        }
      } catch {
        display.value = "Error";
      }
      return;
    }

    // C
    if (this.id === "clear") {
      display.value = "";
      return;
    }

    // ⌫
    if (this.id === "delete") {
      display.value = display.value.slice(0, -1);
      return;
    }

    // √
    if (this.id === "sqrt") {
      try {
        display.value = Math.sqrt(eval(display.value));
      } catch {
        display.value = "Error";
      }
      return;
    }

    // 1/x
    if (this.id === "inverse") {
      try {
        let val = eval(display.value);
        display.value = val === 0 ? "Error" : 1 / val;
      } catch {
        display.value = "Error";
      }
      return;
    }

    // ln
    if (this.id === "ln") {
      try {
        let val = eval(display.value);
        display.value = val <= 0 ? "Error" : Math.log(val);
      } catch {
        display.value = "Error";
      }
      return;
    }

    // log
    if (this.id === "log") {
      try {
        let val = eval(display.value);
        display.value = val <= 0 ? "Error" : Math.log10(val);
      } catch {
        display.value = "Error";
      }
      return;
    }

    // x^y
    if (this.id === "power") {
      display.value += "**";
      return;
    }

    // 10^x
    if (this.id === "tenPower") {
      try {
        display.value = Math.pow(10, eval(display.value));
      } catch {
        display.value = "Error";
      }
      return;
    }

    // factorial
    if (this.id === "factorial") {
      let num = parseInt(display.value);
      if (isNaN(num) || num < 0) {
        display.value = "Error";
        return;
      }
      let res = 1;
      for (let i = 1; i <= num; i++) res *= i;
      display.value = res;
      return;
    }

    // π
    if (this.id === "pi") {
      display.value += Math.PI;
      return;
    }

    // e
    if (this.id === "e") {
      display.value += Math.E;
      return;
    }

    // ()
    if (this.id === "open") {
      display.value += "(";
      return;
    }

    if (this.id === "close") {
      display.value += ")";
      return;
    }

    // exp
    if (this.id === "exp") {
      display.value = Math.exp(eval(display.value));
      return;
    }

    // mod
    if (this.id === "mod") {
      display.value += "%";
      return;
    }

    // ±
    if (this.id === "toggleSign") {
      try {
        display.value = -eval(display.value);
      } catch {
        display.value = "Error";
      }
      return;
    }

    // |x|
    if (this.id === "absolute") {
      try {
        display.value = Math.abs(eval(display.value));
      } catch {
        display.value = "Error";
      }
      return;
    }

    // الذاكرة
    if (this.id === "ms") memory = parseFloat(display.value) || 0;
    if (this.id === "mr") display.value += memory;
    if (this.id === "mc") memory = 0;
    if (this.id === "mplus") memory += parseFloat(display.value) || 0;
    if (this.id === "mminus") memory -= parseFloat(display.value) || 0;
  });
});
