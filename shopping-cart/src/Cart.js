export default class Cart {
  items = [];
  add(item) {
    this.items.push(item);
  }
  getTotal() {
    return this.items.reduce(
      (acc, element) => (acc += element.product.price * element.quantity),
      0
    );
  }
}
