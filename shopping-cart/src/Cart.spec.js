import Cart from "./Cart";

describe("test Cart class", () => {
  let cart;

  let product = {
    name: "sunglass",
    price: 1050, // R$10,50
  };

  let product2 = {
    name: "cellphone",
    price: 100150, // R$1001,50
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe("tests on getTotal", () => {
    it("Should receive 0 when call getTotal after instantiate a new Cart", () => {
      expect(cart.getTotal()).toEqual(0);
    });

    it("Should add a item to the cart and then get the total", () => {
      const item = {
        product,
        quantity: 3,
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(product.price * item.quantity);
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

      expect(cart.getTotal()).toEqual(product.price);
    });

    it("Should ensure to keep the last add if pass the same product adding 3 times", () => {
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

      expect(cart.getTotal()).toEqual(product.price * 4);
    });

    it("should ensure that the value will be updated when add and then remove a item to cart", () => {
      cart.add({
        product,
        quantity: 3,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal()).toEqual(product2.price);
    });
  });

  describe("tests on checkout", () => {
    it("should bring the total and the items when call summary", () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.summary()).toMatchSnapshot();
    });

    it("should checkout and then ensure the getTotal is equal 0", () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.checkout();

      expect(cart.getTotal()).toEqual(0);
    });
  });
});
