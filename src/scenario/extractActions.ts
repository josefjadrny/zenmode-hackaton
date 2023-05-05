import { openai } from "../openai";
import emails from "../emails.json";
import { time } from "console";

const exec = async (): Promise<string> => {
  let result = "";

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Any action needed mentioned in this email? Types of actions we are looking for is: meeting, call, demo sheduling, follow-up set up, to-do point",
        },
        {
          role: "assistant",
          content: "Sure, please provide me with the email.",
        },
        {
          role: "user",
          content: getInput(),
        },
        {
          role: "user",
          content:
            "If yes, extract actions details in json format with specifying action 'type', 'date' (in format MM/DD/YYYY), 'time' and'timezone' if applicable. Provide only json result in reply",
        },
      ],
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
  return emails[10].body + " email was send " + emails[10].time;
};

export const extractActions = {
  exec,
  getInput,
};
