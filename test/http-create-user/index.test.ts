import createUser from "#/http-create-user";
import createContext from "#/test/lib/context";

const validUser = {
  name: "Bill",
  email: "test@test.com",
  birthday: "1990-01-01",
};

describe("when create-user http trigger function with valid body.", () => {
  const request = {
    headers: {
      "content-type": "application/json",
    },
    body: validUser,
  };
  const context = createContext();
  createUser(context, request);

  test("should response 201 http status.", () => {
    expect(context.res.status).toEqual(201);
  });

  test("should response valid message.", () => {
    expect(context.res.body.message).toEqual("User Created.");
  });

  test("should response application/json content-type header.", () => {
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });

  test("should set context bind user data.", () => {
    expect(context.bindings.user).toEqual(validUser);
  });
});

describe("when create-user http trigger function with invalid content type.", () => {
  const request = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: validUser,
  };
  const context = createContext();
  createUser(context, request);

  test("should response 400 http status.", () => {
    expect(context.res.status).toEqual(400);
  });

  test("should response invalid message.", () => {
    expect(context.res.body.message).toEqual(
      '"headers.content-type" must be [application/json]'
    );
  });

  test("should response application/json content-type header.", () => {
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });

  test("should not set context bind user data.", () => {
    expect(context.bindings.user).toBeUndefined();
  });
});

describe.each([
  ["", '"body" must be of type object'],
  [{}, '"body.name" is required'],
  [{ name: "" }, '"body.name" is not allowed to be empty'],
  [{ name: "test" }, '"body.email" is required'],
  [{ name: "test", email: "test" }, '"body.email" must be a valid email'],
  [
    { name: "test", email: "test@test.com", birthday: "1990/01/01" },
    '"body.birthday" must be in iso format',
  ],
])(
  "when create-user http trigger function with invalid request body %#.",
  (body, expected) => {
    const request = {
      headers: {
        "content-type": "application/json",
      },
      body,
    };
    const context = createContext();
    createUser(context, request);

    test("should response 400 http status.", () => {
      expect(context.res.status).toEqual(400);
    });

    test("should response invalid message.", () => {
      expect(context.res.body.message).toEqual(expected);
    });

    test("should response application/json content-type header.", () => {
      expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
    });

    test("should not set context bind user data.", () => {
      expect(context.bindings.user).toBeUndefined();
    });
  }
);
