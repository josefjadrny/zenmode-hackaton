import { openai } from "../openai"
import emails from "../emails.json"
import { time } from "console"

export const suggestTemplate = async (): Promise<string> => {
    let result = ''

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "user", "content": "I am a salesperson Ted Dillan in a company called MCG that specializes in selling spare parts for motors. Can you generate a good email template for me, please?"},
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
