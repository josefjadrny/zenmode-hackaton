import { openai } from "../openai";
import emails from "../emails.json";
import { ChatCompletionRequestMessage } from "openai";

export const suggestLabelFromThread = async (): Promise<string> => {
  let result = "";

  try {
    const messages = [
      {
        role: "user",
        content:
          "I am a salesperson and I am looking for a one-word label that would describe the email conversation I will provide to you. And can you answer me with the label only, please?",
      },
      {
        role: "assistant",
        content:
          "Sure! Please provide the email conversation, and I'll provide you with a one-word label.",
      },
    ] as ChatCompletionRequestMessage[];

    // Beacuse we have all emails in one file, we need to filter all emails from one conversation manually
    emails
      .filter(
        (email) =>
          email.from === "helena.jason@carsmotors.com" ||
          email.to === "helena.jason@carsmotors.com"
      )
      .forEach((email) => {
        messages.push({
          role: "user",
          content: `Message sent from ${
            email.from === "ted.dillan@mcg.com" ? "me" : email.from
          } to ${email.to === "ted.dillan@mcg.com" ? "me" : email.to}: ${
            email.body
          }`,
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
