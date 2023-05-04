import { openai } from "../openai"
import emails from "../emails.json"

export const makeItShorter = async (): Promise<string> => {
    let result = ''

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "user", "content": "I need to shorten an email." },
                { "role": "assistant", "content": "Sure, please provide me with the email." },
                { "role": "user", "content": emails[0].body },
            ]
        })

        result = completion.data.choices[0].message.content
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        result = error.message
    }

    return result
} 