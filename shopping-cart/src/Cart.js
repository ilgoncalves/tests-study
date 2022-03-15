export default class Cart {
  items = [];

  add(item) {
    const indexToRemove = this.items.findIndex((el) => el.name === item.name);
    if (indexToRemove > -1) {
      this.items.splice(indexToRemove, 1);
    }
    this.items.push(item);
  }

  getTotal() {
    return this.items.reduce(
      (acc, element) => (acc += element.product.price * element.quantity),
      0
    );
  }
}
