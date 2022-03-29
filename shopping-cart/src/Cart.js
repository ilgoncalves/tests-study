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

  if (item.quantity >= minimumItems) {
    return Money({
      amount: getPercentage(amount, percentage),
    });
  }
};

const calculateDiscount = (amount, item) => {
  let discount = Money({ amount: 0 });
  if (item.condition) {
    const { condition } = item;

    const hasTwoConditions = Array.isArray(condition);

    if (hasTwoConditions) {
      const eachDiscountsConditions = condition
        .map((el) => calculateEachCondition(amount, item, el).getAmount())
        .sort((a, b) => b - a);
      discount = Money({ amount: eachDiscountsConditions[0] });
    } else {
      discount = calculateEachCondition(amount, item, condition);
    }
  }
  return discount;
};

Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;
export default class Cart {
  items = [];

  add(item) {
    const indexToRemove = this.items.findIndex(
      (el) => el.product.name === item.product.name
    );
    if (indexToRemove > -1) {
      this.items.splice(indexToRemove, 1);
    }
    this.items.push(item);
  }

  remove(product) {
    this.items.splice(
      this.items.findIndex((el) => el.product.name == product.name),
      1
    );
  }

  getTotal() {
    return this.items
      .reduce((acc, element) => {
        const amount = element.product.price * element.quantity;

        let discount = calculateDiscount(amount, element);

        return acc.add(Money({ amount }).subtract(discount));
      }, Money({ amount: 0 }))
      .getAmount();
  }

  summary() {
    const total = this.getTotal();
    const items = this.items;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();
    this.items = [];
    return {
      total,
      items,
    };
  }
}
