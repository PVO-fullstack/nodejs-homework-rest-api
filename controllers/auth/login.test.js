// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
const { describe, expect, test } = require("@jest/globals");

const login = require("./login");
const { User } = require("../../models/user");

jest.mock("../../models/user");

const req = {
  body: { email: "qwerty@mail.com", password: "123456" },
};

const res = {
  status: 200,
  json: {..."token"},
};

describe("Login", () => {
  test("status = 200", async () => {
    User.findOne.mockImplementationOnce(() => ({
      email: "email", password: "password"
    }));
    await login(req, res);
    expect(res.status).toBe(200);
  });

    test("res include token", async () => {
      await login(req, res);
      expect(res.json).toBe("token");
    });
});
