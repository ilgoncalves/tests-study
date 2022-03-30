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

    it("should pass a discount obj with percentage and condition, and then return the total with the discount applied", () => {
      const condition = {
        percentage: 30,
        minimumItems: 2,
      };

      const item = {
        product: product2,
        condition,
        quantity: 2,
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(140210);
    });

    it("should not apply the discount when the minimum items is greater than quantity ", () => {
      const condition = {
        percentage: 30,
        minimumItems: 3,
      };

      const item = {
        product: product2,
        condition,
        quantity: 2,
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(200300);
    });

    it("should return a 50% discount if the quantity of items is greater than condition", () => {
      const condition = {
        quantity: 2,
      };

      const item = {
        product: product2,
        condition,
        quantity: 4,
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(200300);
    });

    it("should return the double of the condition quantity plus the rest", () => {
      const condition = {
        quantity: 2,
      };
      const item = {
        product: product2,
        condition,
        quantity: 5,
      };

      cart.add(item);

      console.log(cart.getTotal());
      expect(cart.getTotal()).toEqual(300450);
    });

    it("should return the bigger discount of both if the two condition will be passed", () => {
      const condition1 = {
        percentage: 30,
        minimumItems: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      const item = {
        product: product2,
        condition: [condition1, condition2],
        quantity: 4,
      };

      cart.add(item);

      expect(cart.getTotal()).toEqual(200300);
    });
  });
});
