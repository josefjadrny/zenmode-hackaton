import { openai } from "../openai";
import emails from "../emails.json";
import { ChatCompletionRequestMessage } from "openai";

const exec = async (): Promise<string> => {
  let result = "";

  try {
    const messages = [
      {
        role: "user",
        content:
          "I am a salesperson and I need to summarize all information connected to helena.jason@carsmotors.com.",
      },
      {
        role: "assistant",
        content:
          "Sure, please provide me all the emails related to your account.",
      },
    ] as ChatCompletionRequestMessage[];

    emails.forEach((email) => {
      messages.push({
        role: "user",
        content: `Message sent from ${
          email.from === "ted.dillan@mcg.com" ? "me" : email.from
        } to ${email.to === "ted.dillan@mcg.com" ? "me" : email.to}: ${
          email.body
        } Please take as an additional input for summary that I've sent Helena 3 emails already and planned to send 1 follow up tomorrow. And there is also my colleague Dillan Real has called her yesterday. Mention that Estimated value of the deal with Helena's comapny is $120000. Please provide summary for email conversations with Helena and additional information in a compact form with bullet points `,
      });
    });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    result = completion.data.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    result = error.message;
  }

  return result;
};
const getInput = (): string => {
  return "All emails (check above)";
};

export const summaryFromAccount = {
  exec,
  getInput,
};
