import Joi from "joi";

export const httpCreateUser = Joi.object({
  headers: Joi.object({
    "content-type": Joi.string().valid("application/json").required(),
  }).unknown(true),
  body: Joi.object({
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().email().required(),
    birthday: Joi.string().isoDate(),
  }),
});

export const httpUploadUserIcon = Joi.object({
  headers: Joi.object({
    "content-type": Joi.string().valid("application/octet-stream").required(),
  }).unknown(true),
});
