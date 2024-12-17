const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: "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", 
});

module.exports = groq;
