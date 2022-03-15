import Cart from "./Cart";

describe("Test Cart class", () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("Should receive 0 when call getTotal after instanciate a new Cart", () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it("Should add a item to the cart and then get the total", () => {
    const item = {
      product: {
        name: "sunglass",
        price: 1050, //R$ 10,50
      },
      quantity: 3,
    };

    cart.add(item);

    expect(cart.getTotal()).toEqual(3150);
  });
});
