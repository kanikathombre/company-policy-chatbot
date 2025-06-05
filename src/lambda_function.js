// lambda_function.js
const axios = require("axios");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const userMessage = body.message;

  let responseMessage = "I'm here to assist you.";

  // Simple responses for greetings
  if (/hi|hello/i.test(userMessage)) {
    responseMessage = "How can I help you with our company policies?";
  } else if (/how are you/i.test(userMessage)) {
    responseMessage = "I'm doing great, how can I assist you?";
  } else if (/end/i.test(userMessage)) {
    responseMessage = "Thank you for chatting with us!";
  } else {
    responseMessage = "Let me check that information for you.";
  }

  // Return response to API Gateway
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ response: responseMessage }),
  };
};
