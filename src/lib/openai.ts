
import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('Missing OpenAI API key. Please set VITE_OPENAI_API_KEY.');
}

const openai = new OpenAI({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

export const generateResumeSummary = async (personalInfo: {
  fullName: string;
  title: string;
  experience?: string;
}): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Create a concise, impactful professional summary in first person."
        },
        {
          role: "user",
          content: `Write a professional summary for ${personalInfo.fullName}, who works as a ${personalInfo.title}. 
          Additional context: ${personalInfo.experience || 'No additional context provided'}`
        }
      ],
      max_tokens: 150
    });

    return completion.choices[0].message.content || "Failed to generate summary";
  } catch (error) {
    console.error('Error generating summary with OpenAI:', error);
    return "Unable to generate summary at this time. Please try again later.";
  }
};

export const generateExperienceDescription = async (position: string, company: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Create accomplishment-focused bullet points for job descriptions."
        },
        {
          role: "user",
          content: `Write a professional job description in first person for someone who worked as a ${position} at ${company}.
          Focus on quantifiable achievements, skills utilized, and value added. Use strong action verbs.`
        }
      ],
      max_tokens: 200
    });

    return completion.choices[0].message.content || "Failed to generate description";
  } catch (error) {
    console.error('Error generating experience with OpenAI:', error);
    return "Unable to generate description at this time. Please try again later.";
  }
};
