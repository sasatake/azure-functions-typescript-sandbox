import createUser from "#/http-create-user";
import createContext from "#/test/lib/context";

describe("test create-user http trigger function with valid body.", () => {
  const request = {
    headers: {
      "content-type": "application/json",
    },
    body: { name: "Bill" },
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
});

describe("test create-user http trigger function with invalid content type.", () => {
  const request = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: { name: "Bill" },
  };
  const context = createContext();
  createUser(context, request);

  test("should response 400 http status.", () => {
    expect(context.res.status).toEqual(400);
  });

  test("should response invalid message.", () => {
    expect(context.res.body.message).toEqual("Content Type Header is invalid.");
  });

  test("should response application/json content-type header.", () => {
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });
});
