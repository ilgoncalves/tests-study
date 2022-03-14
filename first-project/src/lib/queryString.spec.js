const { queryString, parseQuery } = require("./queryString");

describe("Tests on queryString", () => {
  it("should return a query string when pass obj", () => {
    const obj = {
      name: "igor",
      id: 7,
    };

    expect(queryString(obj)).toBe("name=igor&id=7");
  });

  it("should return a successful query string when pass only one key in the obj", () => {
    const obj = {
      name: "igor",
    };
    expect(queryString(obj)).toBe("name=igor");
  });

  it("should return only value that aren't undefined", () => {
    const obj = {
      name: undefined,
      id: 7,
    };
    expect(queryString(obj)).toBe("id=7");
  });

  it("should return a successful query string when pass array as value of a object key", () => {
    const obj = {
      name: "igor",
      softSkills: ["focus", "empathy"],
    };
    expect(queryString(obj)).toBe("name=igor&softSkills=focus,empathy");
  });

  it("should return throw error when pass a deep nested array", () => {
    const obj = {
      name: "igor",
      softSkills: {
        ping: "pong",
        foo: "bar",
      },
    };
    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe("Tests on parseQuery", () => {
  it("should return a object when pass a query string", () => {
    const queryString = "name=igor&id=8";

    expect(parseQuery(queryString)).toEqual({
      name: "igor",
      id: "8",
    });
  });

  it("should return a array when pass item in a param separating by comma", () => {
    const queryString = "name=igor&techs=javascript,typescript";

    expect(parseQuery(queryString)).toEqual({
      name: "igor",
      techs: ["javascript", "typescript"],
    });
  });
});
