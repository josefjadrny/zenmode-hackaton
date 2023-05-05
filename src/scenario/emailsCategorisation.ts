import { openai } from "../openai";
import emails from "../emails.json";

const exec = async (): Promise<string> => {
  let result = "";

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Classify emails based on pre-defined categories for classifying emails based on their relation to the sales process: lead, prospect, new request, ongoing customer, advertisment, spam, fraud, transactional, internal, deal, sales potential. Can you answer me with the category only, please?",
        },
        {
          role: "assistant",
          content: "Sure, please provide me with the email conversation.",
        },
        { role: "user", content: getInput() },
      ],
    });

    result = completion.data.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else {
      console.log(error.message);
    }
    result = error.message;
  }

  return result;
};

const getInput = (): string => {
  return emails[9].body;
};

export const emailListCategorisation = {
  exec,
  getInput,
};
