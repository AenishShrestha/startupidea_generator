import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {
  try {
    const { categories } = await req.json()

    const prompt = `Generate 5 unique startup ideas based on the following categories: ${categories.join(', ')}. For each idea, provide a title, a brief description, and rate the market demand and market supply on a scale of 1-10. Format the response as a JSON array of objects, where each object has the properties: title, description, marketDemand, and marketSupply. Do not use any quotes in the title or description.`

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    const content = chatCompletion.choices[0]?.message?.content || ''

    console.log('Raw Groq response:', content);

    // Ensure the content is valid JSON
    try {
      // Remove any potential line breaks and extra spaces
      const cleanContent = content.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
      
      // Use a regular expression to extract the JSON array
      const jsonMatch = cleanContent.match(/\[.*\]/);
      
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        // Parse the extracted JSON
        const ideas = JSON.parse(jsonString);
        return NextResponse.json(ideas);
      } else {
        throw new Error('No valid JSON array found in the response');
      }
    } catch (parseError) {
      console.error('Error parsing Groq response:', parseError)
      console.error('Raw content:', content)
      return NextResponse.json({ error: 'Invalid response format from AI' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in generate-ideas route:', error)
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 })
  }
}