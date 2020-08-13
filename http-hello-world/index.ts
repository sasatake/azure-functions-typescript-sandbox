import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name;
  const response = name
    ? {
        status: 200,
        headers: { "Content-Type": "applicaion/json" },
        body: {
          message: `Hello, ${name}. This HTTP triggered function executed successfully.`,
        },
      }
    : {
        status: 400,
        headers: { "Content-Type": "applicaion/json" },
        body: {
          message: "name paramer is required.",
        },
      };
  context.res = response;
};

export default httpTrigger;
