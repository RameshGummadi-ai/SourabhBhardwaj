import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
You are the Virtual Assistant of Sourabh Bhardwaj, who is an Assistant Professor, Data Analyst, and AI Researcher.
Your job is to answer questions about Sourabh's qualifications, research, teaching, and courses, or explain data science, machine learning, and mathematics concepts.

Profile Details of Sourabh Bhardwaj:
- Roles: Assistant Professor at CollegeDekho (deputed at Dev Bhoomi Uttarakhand University since Sept 2023). Formerly at ABES Engineering College (2022-2023), Lovely Professional University (2022), Sunrise Public School (2019-2022).
- Key Credentials: JRF (Junior Research Fellow) Qualified 2022, UGC-NET Qualified 2022, GATE CSIT Qualified 2021 & 2026, GATE DSAI (Data Science & AI) Qualified 2026.
- Education: MCA (Honours) from Bundelkhand University (2017-2020), B.Sc (Honours) Mathematics from University of Delhi (2014-2017).
- Publications: Published 10 papers in the "International Journal of Science, Technology and Management" covering groundwater crises in Uttarakhand, heart attack risk predictions, statistical crime analysis in India, Western UP sugar belt groundwater, renewable energy CO2 emissions, employment pre/post pandemic, Rishikesh tourism traffic, mental health trends, etc.
- Courses: Teaches Python, Machine Learning, Data Analytics, Discrete Structures, Group Theory, Graph Theory, Computer Networks.
- Guest Lectures: "Industry 4.0: An Overview" (ABES) and "How to Build Resume" (Adarsh Mahila Mahavidyalaya).
- Tone: Helpful, professional, scholarly, and supportive.

If a user asks about his CV, tell them they can download it directly from the Hero Section. If they ask about his publications, list the relevant ones and suggest they scroll to the Research Publications section. If they ask academic questions (like "What is a neural network?"), explain clearly in a teacher-like tone. Keep answers concise.
`;

// Simple keyword fallback responses if Gemini API Key is not set
function generateFallbackResponse(message: string): string {
  const query = message.toLowerCase();
  
  if (query.includes("research") || query.includes("publication") || query.includes("paper")) {
    return "Sourabh has co-authored 10 research papers in the International Journal of Science, Technology and Management. His key research focuses on Groundwater Crises, Heart Attack Risk predictions, Crime Analysis in India, and Remote Sensing for forest covers. You can browse all 10 papers with their DOIs in the 'Research Publications' section of the homepage.";
  }
  
  if (query.includes("experience") || query.includes("work") || query.includes("job") || query.includes("teach")) {
    return "Sourabh is currently an Assistant Professor at CollegeDekho (deputed at Dev Bhoomi Uttarakhand University). Previously, he taught at ABES Engineering College (2022-2023) and Lovely Professional University (2022), after starting his teaching career at Sunrise Public School. He specializes in Python, Machine Learning, and Statistics.";
  }

  if (query.includes("qualification") || query.includes("gate") || query.includes("net") || query.includes("education")) {
    return "Sourabh holds a B.Sc. (Honours) in Mathematics from Delhi University and an MCA (Honours) from Bundelkhand University. He is JRF and NET qualified (2022) and has qualified GATE in CSIT (2021 & 2026) as well as GATE in Data Science & AI (2026).";
  }

  if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
    return "You can reach Sourabh via email at Sourabh7796@gmail.com or call him at +91 9891605943. You can also submit the Contact Form at the bottom of the home page, which will save your message in the dashboard.";
  }

  if (query.includes("machine learning") || query.includes("data science") || query.includes("ai")) {
    return "Data Science integrates statistics, programming (Python/R), and domain knowledge to extract insights. Machine Learning is a subset where algorithms learn patterns from data to make predictions. Sourabh teaches these subjects and incorporates active student project groups. Ask him about the 'Groundwater Depletion Predictor' project!";
  }

  return "Hello! I am Sourabh's Virtual AI assistant. (Running in local mode). You can ask me about his research publications, teaching timeline, UGC-NET/GATE qualifications, or data science topics like Machine Learning and Mathematics!";
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful fallback for local development or Vercel preview without keys
      const reply = generateFallbackResponse(message);
      return NextResponse.json({ reply });
    }

    // Call real Gemini API
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    const result = await model.generateContent(message);
    const reply = result.response.text() || "I apologize, I could not formulate a response.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini API error", error);
    return NextResponse.json({ reply: "I'm experiencing connectivity issues. Please try again shortly." });
  }
}
