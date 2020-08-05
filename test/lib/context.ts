import { Context } from "@azure/functions";

const logger = (() => {
  let main = <any>jest.fn((message) => message);

  let info = jest.fn((message) => message);
  main.info = info;

  let error = jest.fn((message) => message);
  main.error = error;

  let verbose = jest.fn((message) => message);
  main.verbose = verbose;

  let warn = jest.fn((message) => message);
  main.warn = warn;

  return main;
})();

const createContext = () => {
  const context: Context = {
    invocationId: "",
    executionContext: {
      invocationId: "",
      functionName: "",
      functionDirectory: "",
    },
    bindingData: {},
    bindings: {},
    traceContext: { traceparent: "", tracestate: "", attributes: {} },
    bindingDefinitions: [],
    log: logger,
    done: jest.fn(),
  };
  return context;
};

export default createContext;
