import readlineSync from "readline-sync";
import colors from "colors";

import { openai } from "./config/open-ai.js";

async function main() {
  console.log("main called");
  try {
    console.log(colors.bold.green("Welcome to the Chatbot Program!"));
    console.log(colors.bold.green("You can start chatting with the bot"));

    const chatHistorty = [];

    while (true) {
      const userInput = readlineSync.question(colors.yellow("You: "));

      try {
        const messages = chatHistorty.map(([role, content]) => ({
          role,
          content,
        }));

        console.log(messages);
        messages.push({ role: "user", content: userInput });

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages,
        });

        const completionText = completion.data.choices[0].message.content;

        if (userInput.toLowerCase() === "exit") {
          console.log(colors.green("Bot: ") + completionText);
          return;
        }

        console.log(colors.green("Bot: ") + completionText);

        chatHistorty.push(["user", userInput]);
        chatHistorty.push(["assistant", completionText]);
      } catch (error) {
        console.error(colors.red(error));
      }
    }
  } catch (error) {
    console.log("err", error);
  }
}

main();
