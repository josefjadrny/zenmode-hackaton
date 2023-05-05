import { openai } from "../openai"
import emails from "../emails.json"

export const urgencyType = async (): Promise<string> => {
    let result = ''

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "user", "content": "if this email need immediate recipience reaction. Please classify it as: 'urgent' - it user requests some actions shortly, like set up a call or demo or when client is not happy, 'can wait' - user just ask something , 'not urgent' - looks like ordinary conversation. Please response with the urgency type only. without addtional explanation" },
                { "role": "assistant", "content": "Sure, please provide me with the email." },
                { "role": "user", "content": emails[10].body + 'email was send' + emails[10].time },
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
