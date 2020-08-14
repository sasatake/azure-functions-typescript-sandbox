import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import getJsonResponse from "../lib/getJsonResponse";

const main: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contentType: string = req.headers["content-type"];

  if (contentType !== "application/json") {
    context.res = getJsonResponse(400, "Content Type Header is invalid.");
    return;
  }

  context.bindings.user = req.body;

  context.res = getJsonResponse(201, "User Created.");
};

export default main;
