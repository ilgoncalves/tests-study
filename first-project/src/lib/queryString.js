module.exports.queryString = (obj) => {
  let string = "";
  let count = 1;
  for (key in obj) {
    if (obj[key]) {
      if (
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        throw new Error("Um parâmetro não pode ser um objeto");
      }
      string += `${count == 1 ? "" : "&"}${key}=${obj[key]}`;
      count++;
    }
  }

  return string;
};

module.exports.parseQuery = (queryString) =>
  Object.fromEntries(
    queryString.split("&").map((el) => {
      let [key, value] = el.split("=");
      if (value.includes(",")) {
        value = value.split(",");
      }
      return [key, value];
    })
  );
