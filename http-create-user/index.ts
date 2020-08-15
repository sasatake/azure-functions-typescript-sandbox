import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import Joi from "joi";
import getJsonResponse from "../lib/getJsonResponse";

const schema = Joi.object({
  headers: Joi.object({
    "content-type": Joi.string().valid("application/json").required(),
  }).unknown(true),
  body: Joi.object({
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().email().required(),
    birthday: Joi.string().isoDate(),
  }),
});

const main: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  var result = schema.validate({ headers: req.headers, body: req.body });

  if (result.error) {
    context.res = getJsonResponse(400, result.error.message);
    return;
  }

  context.bindings.user = req.body;
  context.res = getJsonResponse(201, "User Created.");
};

export default main;
