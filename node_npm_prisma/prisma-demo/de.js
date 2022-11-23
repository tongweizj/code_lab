const replacer = (key, value) => key === "create_at" ? Number(value) : value;



const data2 = {
  number: 1,
  big: 18014398509481982n,
};

// const stringified2 = JSON.stringify(data2, replacer);
// console.log(stringified2);
// // {"number":1,"big":"18014398509481982"}

const data = {
  id: 1,
  create_at: 18014398509481982n,
};
const stringified = JSON.stringify(data, replacer);
console.log(stringified);