import { Router } from "express";

const router = Router();

const SYSTEM_KNOWLEDGE = `
You are the official AI Assistant for ZahidCodes (https://zahidcodes.tech), representing Iftikhar Zahid.
Your mission is to politely, accurately, and professionally answer visitor questions about Iftikhar Zahid, his software engineering portfolio, his technical skills, projects, and how to hire or contact him.

### Profile of Iftikhar Zahid:
- **Title**: Independent Software Developer, Computer Science Educator & Digital Product Builder.
- **Tagline**: Turning ideas into digital experiences. Decoding the future.
- **Mission**: Building useful software, mobile applications, and web platforms that solve real-world problems.
- **Availability**: Currently available for select projects, freelance contracts, consulting, and system development.

### Core Disciplines & Services:
1. **Web Development**: Custom responsive websites, SaaS platforms, administration dashboards, and REST APIs using React.js, Node.js, Express, and MongoDB.
2. **Mobile Applications**: Cross-platform Android & iOS apps with clean UX using React Native and Expo.
3. **AI & Automation**: Practical workflow automation, intelligent tools, and AI integrations using Python and modern AI APIs.
4. **Education Technology (EdTech)**: End-to-end institution management ecosystems (admin suites, student portals, teacher apps).

### Notable Projects:
1. **The Seeks Academy Management Suite**: A connected educational ecosystem including an admin dashboard, teacher app, and student app (attendance, results, diaries, e-learning). Built with React, React Native, Expo, and Firebase.
2. **Teacher Mobile Application**: Specialized app for educators to manage student attendance, timetables, class diaries, and exam records.
3. **Student Learning Application**: Learning portal with video lectures, timetable, e-Library, and exam progress.
4. **Business Analytics Dashboard**: Modern analytics application for operational reporting and data visualization.
5. **Cloud-Based Service Platform**: Microservices and REST APIs using Node.js, Express, and MongoDB.
6. **AI Workflow Assistant**: Productivity and automated task tool powered by Python and AI.

### Technical Skills:
- Frontend: React.js, Vite, JavaScript (ES6+), HTML5, CSS3, Responsive Design.
- Mobile: React Native, Expo.
- Backend: Node.js, Express.js, REST APIs, JWT Auth, Multer.
- Database: MongoDB, Cloud Firestore / Firebase.
- Scripting & AI: Python, Automation, AI Integration.

### Contact Information:
- Email: hello@zahidcodes.tech
- WhatsApp: Direct instant messaging via the site
- Facebook: https://facebook.com/zahidcodes
- Instagram: https://instagram.com/zahidcodes
- GitHub: https://github.com/IftikharZahid
- Website: https://zahidcodes.tech

### Tone & Style Guidelines:
- Professional, welcoming, concise, and helpful.
- When asked how to contact or hire him, encourage them to reach out via WhatsApp or Email (hello@zahidcodes.tech).
- Provide clear answers with bullet points when explaining skills or project lists.
- If asked about topics completely unrelated to Iftikhar Zahid, programming, web/mobile development, or tech, politely redirect back to how Iftikhar can assist with their software needs.
`;

// Built-in intelligent rule-based responder (zero-dependency fallback)
function getLocalAgentResponse(inputMessage) {
  const query = (inputMessage || "").toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|salam|assalam|greetings|good\s*(morning|afternoon|evening))/i.test(query)) {
    return `Hello! 👋 Welcome to **ZahidCodes**. I'm Iftikhar Zahid's AI assistant. 

I can answer questions about:
- **About Iftikhar**: His background as a developer and CS educator
- **Services**: Web development, React Native mobile apps, and AI automation
- **Projects**: The Seeks Academy suite, dashboards, and apps
- **Contact & Hiring**: How to collaborate or get in touch

What would you like to know?`;
  }

  // Who is Iftikhar / About
  if (query.includes("who is") || query.includes("about you") || query.includes("about iftikhar") || query.includes("background") || query.includes("experience")) {
    return `**Iftikhar Zahid** is a software developer and computer science educator focused on building practical, real-world digital products.

- **Founder of ZahidCodes**: Independent hub for web, mobile, and educational software.
- **Core Philosophy**: "Technology should make things simpler." He blends clean engineering with intuitive user experiences.
- **Focus Areas**: Full-stack web systems, Android/iOS mobile apps, and EdTech platforms.`;
  }

  // Skills / Tech stack
  if (query.includes("skill") || query.includes("stack") || query.includes("technolog") || query.includes("language") || query.includes("react") || query.includes("node") || query.includes("python")) {
    return `Here is Iftikhar Zahid's core technology stack:

- **Frontend**: React.js, Vite, JavaScript (ES6+), HTML5, CSS3 / Modern CSS
- **Mobile Development**: React Native, Expo (Android & iOS)
- **Backend & APIs**: Node.js, Express.js, RESTful APIs, JWT Authentication
- **Databases**: MongoDB, Cloud Firestore / Firebase
- **AI & Automation**: Python, AI APIs, workflow automation scripts

He specializes in building scalable, maintainable architectures with clean code.`;
  }

  // Services / What do you do
  if (query.includes("service") || query.includes("what do you do") || query.includes("capabilities") || query.includes("offer") || query.includes("hire you for")) {
    return `Iftikhar offers three main service capabilities:

1. 🌐 **Web Development**:
   - Modern, responsive websites and web applications
   - Admin dashboards, CMS portals, and database-backed platforms
   - High-performance REST APIs

2. 📱 **Mobile Applications**:
   - Cross-platform Android and iOS apps using React Native & Expo
   - Clean UI/UX, offline support, and cloud backends

3. ⚡ **AI & Automation**:
   - Intelligent workflow automation to save hours of manual work
   - Custom AI integrations and productivity tools

Would you like to discuss a project in one of these areas?`;
  }

  // Projects / Portfolio work
  if (query.includes("project") || query.includes("portfolio") || query.includes("seeks") || query.includes("work") || query.includes("app")) {
    return `Here are some of Iftikhar's notable showcase projects:

1. **The Seeks Academy Management Suite**:
   - A complete digital ecosystem for academic institutions including a central Web Admin Dashboard, Teacher Mobile App, and Student Portal.
   - Built with React, React Native, Expo, and Firebase.

2. **Teacher Mobile Application**:
   - A dedicated mobile toolkit for attendance, diaries, timetables, and grading.

3. **Student Learning Portal**:
   - Features video lectures, e-Library, examination reports, and schedules.

4. **Business Analytics Dashboard**:
   - Data visualization and KPI tracking system.

5. **Cloud-Based Service Platform**:
   - API-driven backend architecture with Node.js and MongoDB.

You can browse all live project cards in the **Selected Work** section above!`;
  }

  // Contact / Hire / Pricing / Email / WhatsApp / Phone
  if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("whatsapp") || query.includes("reach") || query.includes("price") || query.includes("quote") || query.includes("call")) {
    return `You can connect directly with Iftikhar Zahid through:

- 💬 **WhatsApp**: [Chat directly on WhatsApp](https://wa.me/) for instant replies.
- ✉️ **Email**: [hello@zahidcodes.tech](mailto:hello@zahidcodes.tech)
- 🌐 **Facebook**: [facebook.com/zahidcodes](https://facebook.com/zahidcodes)
- 📸 **Instagram**: [instagram.com/zahidcodes](https://instagram.com/zahidcodes)
- 💻 **GitHub**: [github.com/IftikharZahid](https://github.com/IftikharZahid)

He is currently **available for select projects** and eager to discuss custom software development or collaborations!`;
  }

  // Education / Teaching
  if (query.includes("educat") || query.includes("teach") || query.includes("academic") || query.includes("school") || query.includes("college") || query.includes("university")) {
    return `In addition to being a software developer, Iftikhar is an experienced **Computer Science educator**. 

His background in teaching is what inspired **The Seeks Academy Management Suite** and drives his user-first philosophy: software should be clear, intuitive, and accessible to non-technical users.`;
  }

  // Fallback intelligent answer
  return `Thank you for your question! 

Iftikhar Zahid is an independent developer & educator specializing in **Web Platforms (React & Node.js)**, **Mobile Apps (React Native & Expo)**, and **AI & Automation**.

Could you clarify if you'd like to learn more about:
1. His **past projects** (such as The Seeks Academy)
2. His **technical skillset** and services
3. Getting in touch for a **project or freelance collaboration**?

You can also reach him directly anytime on **WhatsApp** or via **hello@zahidcodes.tech**.`;
}

// Call Google Gemini API if GEMINI_API_KEY is available
async function callGemini(message, history = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const contents = [];
    contents.push({
      role: "user",
      parts: [{ text: `${SYSTEM_KNOWLEDGE}\n\nVisitor question: ${message}` }]
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      console.warn("Gemini API call failed with status:", response.status);
      return null;
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return replyText || null;
  } catch (err) {
    console.error("Gemini call error:", err.message);
    return null;
  }
}

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A message string is required." });
    }

    // Try Gemini if API key is configured
    let reply = await callGemini(message, history);

    // Fall back to intelligent local domain knowledge agent
    if (!reply) {
      reply = getLocalAgentResponse(message);
    }

    res.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    res.status(500).json({ error: "Internal assistant error. Please try again." });
  }
});

export default router;
