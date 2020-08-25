import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import FileType from "file-type";
import { httpUploadUserIcon as schema } from "../lib/schemas";
import { getJsonResponse } from "../lib/response";

const main: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  user: any
): Promise<void> {
  var fileType = await FileType.fromBuffer(req.body);

  var result = schema.validate({
    headers: req.headers,
    content: fileType?.ext,
  });

  if (result.error) {
    context.res = getJsonResponse(400, result.error.message);
    return;
  }

  if (!user) {
    context.res = getJsonResponse(404, "User Not Found.");
    return;
  }

  context.bindings.icon = req.body;
  context.res = getJsonResponse(202, "Accepted.");
};

export default main;
