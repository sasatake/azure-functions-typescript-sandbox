import helloWorld from "#/hello-world/index";
import createContext from "#/test/lib/context";

describe("test hello-world http trigger function with valid name.", () => {
  const request = {
    query: { name: "Bill" },
  };
  const context = createContext();
  helloWorld(context, request);

  test("should response 200 http status.", () => {
    expect(context.res.status).toEqual(200);
  });

  test("should response valid message.", () => {
    expect(context.res.body.message).toEqual(
      "Hello, Bill. This HTTP triggered function executed successfully."
    );
  });

  test("should response application/json content-type header.", () => {
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });
});

describe("test hello-world http trigger function with blank name.", () => {
  const request = {
    query: { name: "" },
  };
  const context = createContext();
  helloWorld(context, request);

  test("should response 400 http status.", () => {
    expect(context.res.status).toEqual(400);
  });

  test("should response invalid message.", () => {
    expect(context.res.body.message).toEqual("name paramer is required.");
  });

  test("should response application/json content-type header.", () => {
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });
});

describe("test hello-world http trigger function with blank parameter.", () => {
  const request = {
    query: {},
  };
  const context = createContext();
  helloWorld(context, request);

  test("should response 400 http status.", () => {
    expect(context.res.status).toEqual(400);
  });

  test("should response invalid message.", () => {
    expect(context.res.body.message).toEqual("name paramer is required.");
  });

  test("should response application/json content-type header.", () => {
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });
});
