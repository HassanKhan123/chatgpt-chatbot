import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-cK3l57Wbius7xzaIhnQccla1",
});

export const openai = new OpenAIApi(config);
