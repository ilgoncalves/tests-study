import Money from "dinero.js";

const getPercentage = (value, percentage) => {
  return (value * percentage) / 100;
};

const calculateEachCondition = (amount, item, condition) => {
  const productPrice = item.product.price;
  const { percentage, minimumItems, quantity } = condition;
  if (quantity) {
    const rest = item.quantity % quantity;
    return Money({
      amount: ((item.quantity - rest) / quantity) * productPrice,
    });
  }

  return Money({
    amount:
      item.quantity >= minimumItems ? getPercentage(amount, percentage) : 0,
  });
};

export const calculateDiscount = (amount, item) => {
  let discount = Money({ amount: 0 });
  if (item.condition) {
    const { condition } = item;
    debugger;
    const conditions = Array.isArray(condition) ? condition : [condition];
    discount = Money({
      amount: conditions
        .map((el) => calculateEachCondition(amount, item, el).getAmount())
        .sort((a, b) => b - a)[0],
    });
  }
  return discount;
};
