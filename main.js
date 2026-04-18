let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
// ============   إضافة متغيرات وأكواد القائمة المنسدلة ============
const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownOptions = document.getElementById("dropdownOptions");
const optionsList = document.querySelectorAll(".dropdown-options li");
const degModeBtn = document.getElementById("degMode");
const radModeBtn = document.getElementById("radMode");

// متغيرات الحالة
let isDegreeMode = true;
let currentFunction = "sin";

// إعدادات القائمة المنسدلة
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

// إغلاق القائمة عند الضغط خارجها
document.addEventListener("click", () => {
  dropdownOptions.classList.add("hidden");
});

// تبديل وضع الزاوية
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

// دالة مساعدة لحساب الدوال المثلثية
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
      let asinResult = Math.asin(value);
      return isDegreeMode ? asinResult * (180 / Math.PI) : asinResult;
    case "acos":
      let acosResult = Math.acos(value);
      return isDegreeMode ? acosResult * (180 / Math.PI) : acosResult;
    case "atan":
      let atanResult = Math.atan(value);
      return isDegreeMode ? atanResult * (180 / Math.PI) : atanResult;
    case "sinh":
      return Math.sinh(value);
    case "cosh":
      return Math.cosh(value);
    case "tanh":
      return Math.tanh(value);
    default:
      return Math.sin(angle);
  }
}
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // 🆕 زر القيمة المطلقة |x|
    if (this.id === "absolute") {
      try {
        let value = evaluateExpression(display.value);
        display.value = Math.abs(value);
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

    // =
    if (this.id === "equal") {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
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
        let value = eval(display.value);
        if (value === 0) {
          display.value = "Error";
          return;
        }
        display.value = 1 / value;
      } catch {
        display.value = "Error";
      }
      return;
    }
    // ضع هذا الكود مع مجموعة أزرار الدوال (مثل sqrt و inverse)
    if (this.id === "ln") {
      try {
        let value = eval(display.value);

        // اللوغاريتم الطبيعي معرف فقط للأعداد الموجبة
        if (value <= 0) {
          display.value = "Error";
        } else {
          display.value = Math.log(value); // Math.log هي دالة ln في JavaScript
        }
      } catch {
        display.value = "Error";
      }
      return;
    }
    // 🆕 زر اللوغاريتم للأساس 10
    if (this.id === "log") {
      try {
        let value = eval(display.value);

        // log(x) معرف فقط للأعداد الموجبة أيضاً
        if (value <= 0) {
          display.value = "Error";
        } else {
          display.value = Math.log10(value); // دالة log10 في JavaScript
        }
      } catch {
        display.value = "Error";
      }
      return;
    }
    // زر 10 قوة x (10^x)
    if (this.id === "tenPower") {
      try {
        let value = eval(display.value);
        display.value = Math.pow(10, value);
      } catch {
        display.value = "Error";
      }
      return;
    }
    // زر x قوة y (x^y)
    if (this.id === "power") {
      display.value += "**"; // عامل الأس في JavaScript
      return;
    }
    // باقي الأزرار
    let value = this.getAttribute("data-value");
    if (value) {
      display.value += value;
    }

    // زر العاملي
    if (this.id === "factorial") {
      let num = parseInt(display.value);

      if (isNaN(num) || num < 0) {
        display.value = "Error";
        return;
      }

      let result = 1;
      for (let i = 1; i <= num; i++) {
        result *= i;
      }

      display.value = result;
      return;
    }
    // زر الباي
    if (this.id === "pi") {
      display.value += Math.PI;
      return;
    }

    // زر e
    if (this.id === "e") {
      display.value += Math.E;
      return;
    }
    // زر (
    if (this.id === "open") {
      display.value += "(";
      return;
    }

    if (this.id === "close") {
      display.value += ")";
      return;
    }

    // زر exp
    if (this.id === "exp") {
      display.value = Math.exp(display.value);
      return;
    }
    // زر mod
    if (this.id === "mod") {
      display.value += "%";
      return;
    }

    if (this.id === "toggleSign") {
      try {
        let value = eval(display.value);
        display.value = -value;
      } catch {
        display.value = "Error";
      }
      return;
    }
    // 🆕 زر تطبيق الدالة المثلثية
    if (this.id === "applyFunc") {
      try {
        // حساب قيمة التعبير الموجود في الشاشة
        let value = Function('"use strict"; return (' + display.value + ")")();

        // استدعاء دالة حساب المثلثات مع الدالة المختارة
        let result = calculateTrigFunction(currentFunction, value);

        // التحقق من صحة النتيجة
        if (isNaN(result) || !isFinite(result)) {
          display.value = "Error";
        } else {
          display.value = result;
        }
      } catch {
        display.value = "Error";
      }
      return; // مهم: نوقف تنفيذ باقي الكود
    }
  });
});
