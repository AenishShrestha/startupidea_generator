import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {
  try {
    const { cvData } = await req.json()

    const prompt = `
    Format the following CV information into a professional, ATS-friendly markdown format:

    Job Title/Industry: ${cvData.jobTitle}
    Name: ${cvData.name}
    Email: ${cvData.email}
    Phone: ${cvData.phone}
    Location: ${cvData.location}
    Professional Summary: ${cvData.summary}
    Work Experience: ${cvData.experience}
    Skills: ${cvData.skills}
    Education: ${cvData.education}
    Certifications: ${cvData.certifications}

    Please format the CV in markdown as follows:

    # [Job Title/Industry] CV

    ## Contact Information
    - Name: [Name]
    - Email: [Email]
    - Phone: [Phone]
    - Location: [Location]

    ## Professional Summary
    [Enhanced professional summary]

    ## Work Experience
    [Enhanced work experience, maintaining the structure provided]

    ## Skills
    [Enhanced list of skills]

    ## Education
    [Enhanced education information]

    ## Certifications
    [Enhanced certifications information]

    Enhance the content to be more professional and ATS-friendly, but maintain the overall structure and information provided. Use proper markdown syntax.
    `

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    const enhancedCV = chatCompletion.choices[0]?.message?.content || ''

    console.log('Enhanced CV:', enhancedCV);

    return NextResponse.json({ enhancedCV });
  } catch (error) {
    console.error('Error in enhance-cv route:', error)
    return NextResponse.json({ error: 'Failed to enhance CV' }, { status: 500 })
  }
}