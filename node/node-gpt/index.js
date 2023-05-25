const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "请帮我用中文给这个网页内容做一个摘要:\n https://platform.openai.com/docs/introduction \n",
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  console.log(response.data.choices[0].text);
}

runCompletion();
