import Money from "dinero.js";
Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;

import { calculateDiscount } from "./discounts.utils";

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
    const formatted = Money({ amount: total }).toFormat("$0,0.00");
    const items = this.items;

    return {
      total,
      formatted,
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
