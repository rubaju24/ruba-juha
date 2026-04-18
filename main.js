let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

// القائمة المنسدلة
const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownOptions = document.getElementById("dropdownOptions");
const optionsList = document.querySelectorAll(".dropdown-options li");
//القائمة المنسدالة الإضافية
const extraDropdownBtn = document.getElementById("extraDropdownBtn");
const extraDropdownOptions = document.getElementById("extraDropdownOptions");
const extraOptionsList = document.querySelectorAll("#extraDropdownOptions li");
let currentExtraFunction = "rand";
const degModeBtn = document.getElementById("degMode");
const radModeBtn = document.getElementById("radMode");
const applyBtn = document.getElementById("applyFunc");
const secondBtn = document.getElementById("2^nd");

const toggleButtonsMap = {
  ln: { primary: "ln", alt: "eˣ" },
  log: { primary: "log", alt: "logᵧx" },
  tenPower: { primary: "10ˣ", alt: "2ˣ" },
  power: { primary: "xʸ", alt: "ʸ√x" },
  sqrt: { primary: "√", alt: "∛" },
  square: { primary: "x²", alt: "x³" },
};
if (secondBtn) {
  secondBtn.addEventListener("click", function () {
    isSecondMode = !isSecondMode;

    if (isSecondMode) {
      secondBtn.classList.add("active");
    } else {
      secondBtn.classList.remove("active");
    }

    // تحديث نصوص الأزرار
    for (let id in toggleButtonsMap) {
      const btn = document.getElementById(id);
      if (btn) {
        if (isSecondMode) {
          btn.textContent = toggleButtonsMap[id].alt;
          btn.classList.add("alt-mode");
        } else {
          btn.textContent = toggleButtonsMap[id].primary;
          btn.classList.remove("alt-mode");
        }
      }
    }
  });
}

// دالة تقييم التعبيرات الرياضية 
function evaluateExpression(expression) {
  if (expression.trim() === "") return 0;

  //  معالجة logᵧ 
  expression = expression.replace(
    /(\d+\.?\d*)logᵧ(\d+\.?\d*)/g,
    (match, base, val) => {
      return Math.log(parseFloat(val)) / Math.log(parseFloat(base));
    },
  );

  //  معالجة ʸ√ 
  expression = expression.replace(
    /(\d+\.?\d*)ʸ√(\d+\.?\d*)/g,
    (match, root, val) => {
      return Math.pow(parseFloat(val), 1 / parseFloat(root));
    },
  );
  //استبدال الرموز الرياضيه 
  expression = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    // .replace(/\^/g, "**")
    .replace(/√\(/g, "Math.sqrt(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/π/g, "Math.PI")
    .replace(/e(?![a-zA-Z])/g, "Math.E");

  // استخدام eval مع معالجة الأخطاء
  try {
    return eval(expression);
  } catch (error) {
    throw new Error("تعبير غير صالح");
  }
}

// متغيرات
let isDegreeMode = true;
let currentFunction = "sin";
let memory = 0;
let activeDropdown = "trig";
let isSecondMode = false;
// القائمة المنسدلة
dropdownBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  dropdownOptions.classList.toggle("hidden");
  extraDropdownOptions.classList.add("hidden"); // 🆕
  activeDropdown = "trig"; // 🆕
});
//القائمة المنسدلة الإضافية
extraDropdownBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  extraDropdownOptions.classList.toggle("hidden");
  dropdownOptions.classList.add("hidden");
  activeDropdown = "extra";
});

optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    currentFunction = option.getAttribute("data-value");
    dropdownBtn.textContent = option.textContent;
    dropdownOptions.classList.add("hidden");
    activeDropdown = "trig";
  });
});
extraOptionsList.forEach((option) => {
  option.addEventListener("click", () => {
    currentExtraFunction = option.getAttribute("data-value");
    extraDropdownBtn.textContent = option.textContent;
    extraDropdownOptions.classList.add("hidden");
    activeDropdown = "extra";
    if (currentExtraFunction === "rand") {
      display.value = Math.random();
    }
  });
});
document.addEventListener("click", () => {
  extraDropdownOptions.classList.add("hidden");
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

// الدوال مثلثية
function calculateTrigFunction(func, value) {
  let angle = isDegreeMode ? value * (Math.PI / 180) : value;

  switch (func) {
    case "sin":
      return Math.sin(angle);
    case "cos":
      res = Math.cos(angle);
      res = Math.abs(res) < 1e-15 ? 0 : res; // التعامل مع القيم الصغيرة جداً
      return res;
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
function decimalToDMS(decimal) {
  let degrees = Math.floor(Math.abs(decimal));
  let minutesFloat = (Math.abs(decimal) - degrees) * 60;
  let minutes = Math.floor(minutesFloat);
  let seconds = (minutesFloat - minutes) * 60;

  let sign = decimal < 0 ? "-" : "";
  return sign + degrees + "° " + minutes + "' " + seconds.toFixed(2) + '"';
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
    if (this.id === "2^nd") {
      return;
    }

    if (this.id === "equal") {
      try {
        
        display.value = evaluateExpression(display.value);
      } catch {
        display.value = "Error";
      }
      return;
    }
    if (this.id == "percent") {
      try {
        let value = evaluateExpression(display.value);
        display.value = value / 100;
      } catch {
        display.value = "Error";
        return;
      }
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
        let value = evaluateExpression(display.value);

        if (isSecondMode) {
          // وضع 2ⁿᵈ: ∛ (جذر تكعيبي)
          display.value = Math.cbrt(value);
        } else {
          // وضع عادي: √ (جذر تربيعي)
          if (value < 0) {
            display.value = "Error";
          } else {
            display.value = Math.sqrt(value);
          }
        }
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
        let value = evaluateExpression(display.value);

        if (isSecondMode) {
          // وضع 2ⁿᵈ: eˣ
          display.value = Math.exp(value);
        } else {
          // وضع عادي: ln
          if (value <= 0) {
            display.value = "Error";
          } else {
            display.value = Math.log(value);
          }
        }
      } catch {
        display.value = "Error";
      }
      return;
    }
    // log
    if (this.id === "log") {
      try {
        if (isSecondMode) {
      
          display.value += "logᵧ";
        } else {
          
          let value = evaluateExpression(display.value);
          if (value <= 0) {
            display.value = "Error";
          } else {
            display.value = Math.log10(value);
          }
        }
      } catch {
        display.value = "Error";
      }
      return;
    }

    // x^y
    if (this.id === "power") {
      if (isSecondMode) {
        
        display.value += "ʸ√";
      } else {
        
        display.value += "**";
      }
      return;
    }

    // 10^x
    if (this.id === "tenPower") {
      try {
        let value = evaluateExpression(display.value);

        if (isSecondMode) {
          
          display.value = Math.pow(2, value);
        } else {
          
          display.value = Math.pow(10, value);
        }
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
    if (this.id === "square") {
      try {
        let value = evaluateExpression(display.value);

        if (isSecondMode) {
           
          display.value = Math.pow(value, 3);
        } else {
          
          display.value = Math.pow(value, 2);
        }
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
document.addEventListener("keydown", function (e) {
  const key = e.key;

  // أرقام وعمليات
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    display.value += key;
  }

  // Enter = يساوي
  else if (key === "Enter") {
    e.preventDefault();
    try {
      let val = parseFloat(display.value);

      if (!isNaN(val)) {
        display.value = calculateTrigFunction(currentFunction, val);
      } else {
        display.value = eval(display.value);
      }
    } catch {
      display.value = "Error";
    }
  }

  // Backspace = حذف
  else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  // Escape = مسح
  else if (key === "Escape") {
    display.value = "";
  }

  // الأقواس
  else if (key === "(" || key === ")") {
    display.value += key;
  }
});

applyBtn.addEventListener("click", () => {
  try {
    if (activeDropdown === "trig") {
      // الدوال المثلثية
      if (display.value === "") {
        display.value = "Error";
        return;
      }
      let val = eval(display.value);
      let result = calculateTrigFunction(currentFunction, val);

      if (isNaN(result) || !isFinite(result)) {
        display.value = "Error";
      } else {
        display.value = result;
      }
    } else if (activeDropdown === "extra") {
      // الدوال الإضافية
      let val = display.value === "" ? 0 : eval(display.value);
      let result;

      switch (currentExtraFunction) {
        case "rand":
          result = Math.random();
          break;
        case "deg":
          result = val * (180 / Math.PI);
          break;
        case "dms":
          result = decimalToDMS(val);
          break;
        case "floor":
          result = Math.floor(val);
          break;
        case "ceil":
          result = Math.ceil(val);
          break;
        case "abs":
          result = Math.abs(val);
          break;
        default:
          result = val;
      }

      display.value = result;
    }
  } catch {
    display.value = "Error";
  }
});
