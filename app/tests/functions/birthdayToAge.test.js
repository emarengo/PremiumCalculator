import { birthdayToAge } from "../../src/functions/birthdayToAge";

describe("given datetime (date)", () => {
  let date = "";

  test("should return 2 as age", () => {
    date = "2020-01-01";
    const age = birthdayToAge(date);
    expect(age).toBe(2);
  });

  test("should return 15 as age", () => {
    date = "2007-01-01";
    const age = birthdayToAge(date);
    expect(age).toBe(15);
  });
});
