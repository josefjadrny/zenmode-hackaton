import { openai } from "../openai";
import emails from "../emails.json";

export const summaryFromLastEmail = async (): Promise<string> => {
  let result = "";

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "I am a salesperson and I need to summarize an email into one sentence.",
        },
        {
          role: "assistant",
          content:
            "Sure, please provide the content of the email that you would like me to summarize.",
        },
        {
          role: "user",
          content:
            'The email was sent to me, please do not speak about me in the third person. For example instead of "Helena thanks Ted" you can say "Helena thanks you".',
        },
        {
          role: "assistant",
          content:
            "Apologies for any confusion. Please provide the content of the email, and I will summarize it for you.",
        },
        { role: "user", content: getInput() },
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

export const getInput = (): string => {
  return emails[6].body;
};
