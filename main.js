let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

function factorial(n) {
  let r = 1;
  for (let i = 1; i <= n; i++) r *= i;
  return r;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let val = this.dataset.value;
    let func = this.dataset.func;

    if (this.id === "pi") {
      display.value += Math.PI;
      return;
    }

    if (val) display.value += val;

    if (this.id === "clear") display.value = "";

    if (this.id === "delete") display.value = display.value.slice(0, -1);

    if (this.id === "equal") {
      try {
        display.value = parseFloat(eval(display.value).toFixed(6));
      } catch {
        display.value = "Error";
      }
    }

    let x = parseFloat(display.value);

    if (func === "sqrt") display.value = Math.sqrt(x);
    if (func === "square") display.value = x * x;
    if (func === "inverse") display.value = 1 / x;
    if (func === "abs") display.value = Math.abs(x);
    if (func === "exp") display.value = Math.exp(x);
    if (func === "fact") display.value = factorial(x);
    if (func === "pow") display.value += "**";
    if (func === "tenpow") display.value = Math.pow(10, x);
    if (func === "log") display.value = Math.log10(x);
    if (func === "ln") display.value = Math.log(x);
    if (func === "sin") display.value = Math.sin((x * Math.PI) / 180);
    if (func === "cos") display.value = Math.cos((x * Math.PI) / 180);
    if (func === "tan") display.value = Math.tan((x * Math.PI) / 180);
  });
});

// keyboard
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || "+-*/.".includes(e.key)) display.value += e.key;

  if (e.key === "Enter") display.value = eval(display.value);

  if (e.key === "Backspace") display.value = display.value.slice(0, -1);

  if (e.key === "Escape") display.value = "";
});
