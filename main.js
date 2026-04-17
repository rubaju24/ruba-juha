let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // مسح
    if (this.id === "clear") {
      display.value = "";
      return;
    }

    // يساوي
    if (this.id === "equal") {
      try {
        display.value = eval(display.value);
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
// زر حذف رقم
if (this.id === "delete") {
  display.value = display.value.slice(0, -1);
  return;
}
if (this.id === "sqrt") {
  try {
    display.value = Math.sqrt(display.value);
  } catch {
    display.value = "Error";
  }
  return;
}
if (this.id === "percent") {
  try {
    display.value = display.value / 100;
  } catch {
    display.value = "Error";
  }
  return;
}
if (this.id === "ce") {
  let parts = display.value.split(/[\+\-\*\/]/);
  parts.pop(); // حذف آخر رقم

  let operators = display.value.match(/[\+\-\*\/]/g) || [];

  let newValue = "";
  for (let i = 0; i < parts.length; i++) {
    newValue += parts[i];
    if (operators[i]) {
      newValue += operators[i];
    }
  }

  display.value = newValue;
  return;
}
if (this.id === "square") {
  try {
    display.value = Math.pow(display.value, 2);
  } catch {
    display.value = "Error";
  }
  return;
}
