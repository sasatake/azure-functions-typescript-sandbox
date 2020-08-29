import uploadUserIcon from "#/http-upload-user-icon";
import createContext from "#/test/lib/context";
import fs from "fs";

const RESOURCE_PATH = "test/http-upload-user-icon/resource/";

describe("when upload-user-icon http trigger function with valid binary.", () => {
  const png = fs.readFileSync(`${RESOURCE_PATH}test.png`);
  const jpg = fs.readFileSync(`${RESOURCE_PATH}test.jpg`);

  const user = { id: "047e5fa4-be33-4f16-b8a3-9c0d021a2910" };
  const context = createContext();

  describe.each([png, jpg])("", (body) => {
    const request = {
      headers: {
        "content-type": "application/octet-stream",
      },
      body,
    };

    test("should response 202 http status.", async () => {
      await uploadUserIcon(context, request, user);
      expect(context.res.status).toEqual(202);
      expect(context.res.body.message).toEqual("Accepted.");
      expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
    });

    test("should set context bind binary.", async () => {
      await uploadUserIcon(context, request, user);
      expect(context.bindings.icon).toEqual(body);
    });
  });
});

describe("when upload-user-icon http trigger function with invalid request header.", () => {
  const body = fs.readFileSync(`${RESOURCE_PATH}test.png`);
  const user = { id: "047e5fa4-be33-4f16-b8a3-9c0d021a2910" };

  const request = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  };
  const context = createContext();
  uploadUserIcon(context, request);

  test("should response 400 http status.", async () => {
    await uploadUserIcon(context, request, user);
    expect(context.res.status).toEqual(400);
    expect(context.res.body.message).toEqual(
      '"headers.content-type" must be [application/octet-stream]'
    );
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });

  test("should set context bind binary.", async () => {
    await uploadUserIcon(context, request, user);
    expect(context.bindings.icon).toBeUndefined();
  });
});

describe("when upload-user-icon http trigger function with invalid request body.", () => {
  const body = fs.readFileSync(`${RESOURCE_PATH}test.xml`);
  const user = { id: "047e5fa4-be33-4f16-b8a3-9c0d021a2910" };

  const request = {
    headers: {
      "content-type": "application/octet-stream",
    },
    body,
  };
  const context = createContext();
  uploadUserIcon(context, request);

  test("should response 400 http status.", async () => {
    await uploadUserIcon(context, request, user);
    expect(context.res.status).toEqual(400);
    expect(context.res.body.message).toEqual(
      '"fileType" must be one of [jpg, png]'
    );
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });

  test("should set context bind binary.", async () => {
    await uploadUserIcon(context, request, user);
    expect(context.bindings.icon).toBeUndefined();
  });
});

describe("when upload-user-icon http trigger function with invalid request body.", () => {
  const body = fs.readFileSync(`${RESOURCE_PATH}test.png`);

  const request = {
    headers: {
      "content-type": "application/octet-stream",
    },
    body,
  };
  const context = createContext();
  uploadUserIcon(context, request);

  test("should response 404 http status.", async () => {
    await uploadUserIcon(context, request);
    expect(context.res.status).toEqual(404);
    expect(context.res.body.message).toEqual("User Not Found.");
    expect(context.res.headers["Content-Type"]).toEqual("applicaion/json");
  });

  test("should set context bind binary.", async () => {
    await uploadUserIcon(context, request);
    expect(context.bindings.icon).toBeUndefined();
  });
});
