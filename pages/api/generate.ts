// import {Configuration, OpenAIApi} from 'openai'
// const configuration = new Configuration({
//   organization: 'org-efNEZnQrGBssudzJ8WeEDIFv',
//   apiKey: process.env.OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration)
// console.log(process.env.OPENAI_API_KEY)
require('dotenv').config()
import {NextApiRequest, NextApiResponse} from 'next/types'
import {Configuration, OpenAIApi} from 'openai'
import {type} from 'os'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

type Messages = {
    role: string
    content: string
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message:
                    'OpenAI API key not configured, please follow instructions in README.md',
            },
        })
        return
    }

    const message = req.body.message || ''
    const character = req.body.character || ''
    if (message.trim().length === 0) {
        res.status(400).json({
            error: {
                message: 'Please enter a valid message',
            },
        })
        return
    }
    if (character.trim().length === 0) {
        res.status(400).json({
            error: {
                message: 'Please enter a valid character',
            },
        })
        return
    }

    try {
        const prompt = generatePrompt(message, character)
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: prompt,
            temperature: 0.6,
        })
        console.log(completion.data.choices[0].message)

        res.status(200).json({result: completion.data.choices[0].message})
    } catch (error: any) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data)
            res.status(error.response.status).json(error.response.data)
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`)
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                },
            })
        }
    }
}

function generatePrompt(message: String, character: String) {
    return [
        {role: 'system', content: `You are ${character}`},
        {role: 'user', content: 'Hi what is your name?'},
        {role: 'assistant', content: "D'oh, my name is Homer Simpson!"},
        {role: 'user', content: `${message}`},
    ]
}
