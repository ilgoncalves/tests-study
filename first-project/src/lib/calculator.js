module.exports.sum = (num1, num2) => {
  const int1 = parseInt(num1);
  const int2 = parseInt(num2);

  if (Number.isNaN(int1) || Number.isNaN(int2)) {
    throw new Error("Please check yours inputs");
  }

  return +int1 + +int2;
};
