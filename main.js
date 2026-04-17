let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
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
  });
});
