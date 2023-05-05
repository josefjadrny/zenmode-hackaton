import { openai } from "../openai";
import emails from "../emails.json";
import templates from "../templates.json";
import { ChatCompletionRequestMessage } from "openai";

const exec = async (): Promise<string> => {
  let result = "";

  try {
    const messages = [
      {
        role: "user",
        content:
          "I am a salesperson Ted Dillan in a company called MCG that specializes in selling spare parts for motors and I have I just received this email: " +
          getInput(),
      },
      { role: "user", content: "I have this templates:" },
    ] as ChatCompletionRequestMessage[];

    templates.forEach((template) => {
      messages.push({
        role: "user",
        content: `Template called ${template.subject}: ${template.body}`,
      });
    });

    messages.push({
      role: "user",
      content:
        "Can you suggest for me the most suitable template I will use to respond to this email from the list I sent you? Can you respons with the template name only please.",
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
  return emails[2].body;
};

export const suggestTemplateFromTemplates = {
  exec,
  getInput,
};
