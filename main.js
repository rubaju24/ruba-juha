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
