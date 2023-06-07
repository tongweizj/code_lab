var a;
var b = null;

console.log("a 是 :", a);
if (!a && typeof a !== "undefined" && a != 0) {
  console.log("a 不是 undefined");
} else {
  console.log("a 是 undefined");
}

console.log("b 是 :", b);
if (typeof b === "undefined" && b === 0) {
  console.log("b 是 null");
} else {
  console.log("b bu是 null");
}
