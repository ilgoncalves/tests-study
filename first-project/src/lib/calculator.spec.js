const { sum } = require("./calculator");

it("should sum 2 and 2 and then return 4 as result", () => {
  expect(sum(2, 2)).toBe(4);
});

it("should sum 2 and 2 even if the params is strings and then the result should be 4 ", () => {
  expect(sum("2", "2")).toBe(4);
});

it("should throw an error if whats is provided cannot be summed", () => {
  expect(() => {
    sum("", 2);
  }).toThrowError();
  expect(() => {
    sum([2, 2]);
  }).toThrowError();
  expect(() => {
    sum({});
  }).toThrowError();
  expect(() => {
    sum();
  }).toThrowError();
});
