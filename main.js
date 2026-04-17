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
  });
});
