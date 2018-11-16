function count() {
  var exp = "";
  var stack = [];
  var example = document.getElementById("input").value;
  for (var x = 0; x < example.length; x++) {
    if (!isNaN(example[x])) {
      exp += example[x];
    }
    if (
      example[x] === "+" ||
      example[x] === "-" ||
      example[x] === "/" ||
      example[x] === "*"
    ) {
      exp += " ";
      if (priority(stack[stack.length - 1]) == 2) {
        exp += stack.pop() + " ";
      }
      if (stack.length == 1 && priority(example[x]) == 1) {
        exp += stack.pop() + " ";
        stack.push(example[x]);
      }
      if (priority(example[x]) == 2) {
        stack.push(example[x]);
      }
      if (stack.length == 0 && priority(example[x]) == 1) {
        stack.push(example[x]);
      }
    }
  }
  while (stack.length != 1) {
    exp += stack.pop() + " ";
  }
  return (exp += " " + stack.pop());
}
function priority(str) {
  switch (str) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}
function Postfix(exp) {
  var finalStack = [];
  exp = exp.split(" ");
  for (var i = 0; i < exp.length; i++) {
    if (!isNaN(exp[i])) {
      finalStack.push(exp[i]);
    } else {
      var a = finalStack.pop();
      var b = finalStack.pop();
      if (exp[i] === "+") {
        finalStack.push(parseInt(a) + parseInt(b));
      } else if (exp[i] === "-") {
        finalStack.push(parseInt(b) - parseInt(a));
      } else if (exp[i] === "*") {
        finalStack.push(parseInt(a) * parseInt(b));
      } else if (exp[i] === "/") {
        finalStack.push(parseInt(b) / parseInt(a));
      }
    }
  }
  if (finalStack.length > 1) {
    return "error";
  } else {
    return finalStack.pop();
  }
}
var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    var result = Postfix(count());
    document.getElementById("output").innerHTML =
      "Your result is " + result + " (to je anglicky).";
  }
});
