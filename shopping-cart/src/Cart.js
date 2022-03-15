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
    return this.items.reduce(
      (acc, element) => (acc += element.product.price * element.quantity),
      0
    );
  }
}
