import Cart from "./Cart";

describe("Test Cart class", () => {
  let cart;

  let product = {
    name: "sunglass",
    price: 1050, // R$10,50
  };

  beforeEach(() => {
    cart = new Cart();
  });

  it("Should receive 0 when call getTotal after instanciate a new Cart", () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it("Should add a item to the cart and then get the total", () => {
    const item = {
      product,
      quantity: 3,
    };

    cart.add(item);

    expect(cart.getTotal()).toEqual(3150);
  });

  it("Should unsure to keep the last add if pass the same product", () => {
    cart.add({
      product,
      quantity: 3,
    });
    cart.add({
      product,
      quantity: 1,
    });

    expect(cart.getTotal()).toEqual(1050);
  });

  it("Should unsure to keep the last add if pass the same product adding 3 times", () => {
    cart.add({
      product,
      quantity: 3,
    });
    cart.add({
      product,
      quantity: 1,
    });
    cart.add({
      product,
      quantity: 4,
    });

    expect(cart.getTotal()).toEqual(1050 * 4);
  });
});
