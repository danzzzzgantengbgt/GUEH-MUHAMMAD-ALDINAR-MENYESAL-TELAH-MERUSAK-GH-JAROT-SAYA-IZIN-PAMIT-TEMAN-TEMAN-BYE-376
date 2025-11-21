import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST")
        return res.status(405).json({ error: "Only POST allowed" });

    const { message } = req.body;

    try {
        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are Danz AI." },
                { role: "user", content: message }
            ],
            temperature: 0.7
        });

        res.status(200).json({
            reply: completion.choices[0].message.content
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
