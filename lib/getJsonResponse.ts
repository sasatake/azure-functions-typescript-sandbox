const getJsonResponse = (status: Number, message: string) => {
  return {
    status,
    headers: { "Content-Type": "applicaion/json" },
    body: {
      message,
    },
  };
};

export default getJsonResponse;
