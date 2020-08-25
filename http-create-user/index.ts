import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { httpCreateUser as schema } from "../lib/schemas";
import { getJsonResponse } from "../lib/response";

const main: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  var result = schema.validate({
    headers: req.headers,
    body: req.body,
  });

  if (result.error) {
    context.res = getJsonResponse(400, result.error.message);
    return;
  }

  context.bindings.user = req.body;
  context.res = getJsonResponse(201, "User Created.");
};

export default main;
