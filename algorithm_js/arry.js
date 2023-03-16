// 数组反转
let array = [1, 2, 3, 4, 5];
for (let i = 0; i < array.length / 2; i++) {
  [array[i], array[array.length - i - 1]] = [
    array[array.length - i - 1],
    array[i],
  ];
}
console.log(array); // [5, 4, 3, 2, 1]
