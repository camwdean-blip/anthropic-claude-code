import Link from "next/link";
import DownloadPdfButton from "./DownloadPdfButton";

const sections = [
  {
    id: "personal",
    title: "Personal Life",
    icon: "🏠",
    color: "bg-[#1e3a5f]",
    guides: [
      {
        title: "Meal Planning & Grocery Optimization",
        prompt:
          '"I need 5 healthy dinners for a family of 4 this week. Budget: $75. My kids are picky — they won\'t eat mushrooms or fish. Give me a grocery list organized by store section (produce, dairy, meat, pantry)."',
        tool: "ChatGPT or Claude",
        why: "AI knows thousands of recipes and can factor in your constraints instantly. The organized grocery list alone saves 20+ minutes at the store.",
        proTip:
          "Follow up with: \"Make Monday's recipe gluten-free\" or \"Swap Thursday for something I can make in a slow cooker.\" AI remembers the full plan and adjusts.",
      },
      {
        title: "AI-Powered Budgeting & Finance Tracking",
        prompt:
          '"Here are my expenses from last month: [paste bank statement or list]. Categorize them, find where I\'m overspending, and suggest a realistic budget for next month. I want to save $500/month."',
        tool: "ChatGPT or Claude",
        why: "AI can spot spending patterns you miss. It won't judge you, and it gives specific, actionable numbers — not generic advice like \"eat out less.\"",
        proTip:
          "For privacy, you can change the vendor names if you're uncomfortable sharing real ones. The categories and amounts are what matter.",
      },
      {
        title: "Home Organization & Decluttering Systems",
        prompt:
          '"I need to declutter my garage. It\'s about 400 sq ft, mostly filled with boxes from our move 2 years ago, holiday decorations, and kids\' old toys. Give me a weekend plan — what to do each hour, what to keep vs donate vs trash, and how to organize what remains."',
        tool: "ChatGPT or Claude",
        why: "The hardest part of decluttering is deciding what goes where. AI gives you a framework so you're not standing there paralyzed. The hour-by-hour plan keeps you moving.",
        proTip:
          "Take a photo of the space (if using ChatGPT with vision or Claude) and say \"Here's what I'm working with.\" It'll give even more specific advice.",
      },
      {
        title: "Health & Fitness Planning",
        prompt:
          '"Create a 4-week beginner workout plan. I can exercise 3 days a week for 30 minutes. I have dumbbells at home but no gym. I want to lose weight and build some muscle. Also give me a simple meal plan that supports this."',
        tool: "ChatGPT or Claude",
        why: "Personal trainers cost $50-100/hour. AI gives you a solid plan for free. It won't replace a doctor, but for getting started, it's better than random YouTube workouts.",
        proTip:
          "After week 1, tell AI how it went: \"Week 1 done. Squats were too easy, pushups were too hard.\" It'll adjust the plan for week 2.",
      },
      {
        title: "Smart Parenting: Homework Help & Activities",
        prompt:
          '"My 8-year-old is struggling with multiplication. Explain it in a way that a 2nd grader would understand, using examples they\'d think are fun (they like dinosaurs). Then give me 5 practice problems that gradually get harder."',
        tool: "ChatGPT or Claude",
        why: "AI is infinitely patient and can explain the same concept 50 different ways. It's not replacing you — it's giving you the right words when you're stuck.",
        proTip:
          "For activity ideas: \"It's a rainy Saturday. My kids are 5 and 8. Give me 10 indoor activities that don't require buying anything and will keep them busy for at least 30 minutes each.\"",
      },
      {
        title: "Gift Ideas, Event Planning & More",
        prompt:
          '"I need a birthday gift for my mother-in-law. She\'s 62, loves gardening and mystery novels, budget is $30-50. She already has a lot of gardening tools. Give me 10 creative ideas she wouldn\'t think to buy herself."',
        tool: "ChatGPT, Claude, or Perplexity",
        why: "AI has seen millions of gift guides and can cross-reference multiple interests. It's like having a really thoughtful friend who always knows what to get people.",
        proTip:
          "For event planning: \"Plan a backyard birthday party for a 7-year-old who likes superheroes. Budget: $200. 12 kids. Give me a timeline, food, activities, and a supply list.\"",
      },
    ],
  },
  {
    id: "work",
    title: "AI at Work",
    icon: "💼",
    color: "bg-[#1a7a6d]",
    guides: [
      {
        title: "Email Writing That Saves Hours",
        prompt:
          '"Here\'s an email I received: [paste email]. Write a professional reply that: 1) Thanks them for the update, 2) Asks to reschedule the meeting to next Tuesday, 3) Keeps it under 100 words. Match a friendly but professional tone."',
        tool: "ChatGPT or Claude",
        why: "The average professional spends 2.5 hours/day on email. AI cuts that in half. The key is giving it specific instructions — length, tone, and what points to hit.",
        proTip:
          "Create a \"tone template\": paste 2-3 emails you've written before and say \"Match this writing style for all future emails.\" AI will mimic how you actually write.",
      },
      {
        title: "Meeting Notes & Action Items on Autopilot",
        prompt:
          '"Here are my raw meeting notes: [paste notes]. Clean these up into: 1) A summary (3-4 sentences), 2) Key decisions made, 3) Action items with who\'s responsible and deadlines. Format it so I can paste it into an email."',
        tool: "ChatGPT or Claude",
        why: "Nobody reads messy meeting notes. AI turns your scribbles into something people actually look at. The action-item format means nothing falls through the cracks.",
        proTip:
          "If your meetings are on Zoom or Teams, copy the auto-generated transcript and paste it directly. AI handles messy transcripts well.",
      },
      {
        title: "Presentations & Reports in Minutes",
        prompt:
          '"I need to present our Q3 sales results to leadership. Here are the numbers: [paste data]. Create an outline for a 10-minute presentation that: highlights wins, acknowledges misses honestly, and ends with a clear plan for Q4. Suggest what to put on each slide."',
        tool: "ChatGPT or Claude",
        why: "AI structures your thinking. Instead of staring at a blank slide deck, you have a complete outline in 60 seconds. You just fill in the design.",
        proTip:
          "Follow up with: \"Write the speaker notes for slide 3\" or \"Make the Q4 plan section more specific with 3 concrete initiatives.\"",
      },
      {
        title: "Resume & LinkedIn Optimization",
        prompt:
          '"Here\'s my current resume: [paste resume]. I\'m applying for [job title] at [company]. Rewrite my bullet points to better match this job description: [paste job description]. Use strong action verbs and include metrics where possible."',
        tool: "ChatGPT or Claude",
        why: "Recruiters spend 6-7 seconds scanning a resume. AI helps you put the right keywords and metrics front and center — the ones that match what they're actually looking for.",
        proTip:
          "For LinkedIn: \"Rewrite my LinkedIn summary for a [your field] professional. Make it conversational but authoritative. I want to attract [type of opportunity].\"",
      },
      {
        title: "Side Hustle Ideas Powered by AI",
        prompt:
          '"I have 10 hours a week free. My skills are: [list skills]. I have $200 to start. Give me 5 realistic side hustle ideas that use AI tools to save time. For each, tell me: what I\'d do, how I\'d find clients, expected earnings, and which AI tools I\'d use."',
        tool: "ChatGPT or Claude",
        why: "AI doesn't just give you ideas — it gives you the execution plan. Combined with AI tools, many side hustles that used to take 20 hours now take 10.",
        proTip:
          "Some of the best AI-powered side hustles right now: social media management (use AI for content), resume writing services, small business marketing, and tutoring with AI-assisted lesson plans.",
      },
      {
        title: "Automating the Boring Parts of Your Job",
        prompt:
          '"I spend most of my time at work doing these repetitive tasks: [list tasks]. For each one, tell me: 1) Can AI help with this? 2) Which tool should I use? 3) Show me exactly how to set it up. Keep it simple — I\'m not technical."',
        tool: "ChatGPT or Claude",
        why: "Most people don't realize how much of their job is automatable. Even partial automation — where AI does 80% and you polish the last 20% — is a game changer.",
        proTip:
          "Common automatable tasks: data entry, report formatting, email responses, scheduling, document summarization, and template creation.",
      },
    ],
  },
  {
    id: "recreation",
    title: "AI for Fun",
    icon: "🎯",
    color: "bg-[#8b6914]",
    guides: [
      {
        title: "Trip Planning That Actually Works",
        prompt:
          '"Plan a 5-day trip for 2 people. Flying from [city]. Budget: $2,000 total. We like: hiking, local food, not tourist traps. We don\'t like: crowds, nightlife, long drives. Give us a day-by-day itinerary with hotel suggestions, restaurants, and activities. Include estimated costs."',
        tool: "ChatGPT, Claude, or Perplexity",
        why: "Travel blogs give you the same 10 tourist spots. AI plans around YOUR preferences, budget, and travel style. It's like having a travel agent who actually listens.",
        proTip:
          "Use Perplexity for trip planning — it searches the web in real-time and gives you links to book hotels and restaurants directly. It's the best AI tool for travel.",
      },
      {
        title: "Movie, Book & Music Recommendations",
        prompt:
          '"I just finished watching Severance and loved it. I also liked Black Mirror and Dark. I don\'t like anything too gory or supernatural. Recommend 5 shows I\'d love with a one-sentence pitch for each. Only suggest things I can watch on Netflix, Hulu, or Apple TV+."',
        tool: "ChatGPT or Claude",
        why: "Streaming algorithms show you what's popular. AI recommends based on WHY you liked something — the themes, pacing, and tone. Much more accurate.",
        proTip:
          "Works great for books too: \"I liked Atomic Habits and Thinking, Fast and Slow. Recommend 5 books. I don't want anything over 300 pages.\"",
      },
      {
        title: "Learning New Hobbies with AI Tutoring",
        prompt:
          '"I want to learn guitar. I\'m a complete beginner. Create a 30-day learning plan where I practice 20 minutes a day. Start with the absolute basics. Each day should build on the last. Include what to practice and links to free resources."',
        tool: "ChatGPT or Claude",
        why: "AI creates a structured learning path tailored to your schedule. It's the difference between randomly watching YouTube videos and actually making progress.",
        proTip:
          "After each practice session, tell AI what was hard and easy. It'll adjust the plan: \"Day 5 done. Chord changes between G and C are still rough.\" AI will add extra practice for that transition.",
      },
      {
        title: "Creative Writing & Storytelling",
        prompt:
          '"I want to write a short story for my kids. They\'re 6 and 9. The main character should be a brave girl named Luna who discovers a hidden library. Make it about 1,000 words, with a message about curiosity being a superpower. Include some humor."',
        tool: "ChatGPT or Claude",
        why: "Whether it's bedtime stories, journal prompts, or that novel you've been thinking about — AI gives you a first draft to work from. You edit and make it yours.",
        proTip:
          "For journaling: \"Give me 5 journal prompts about gratitude that aren't cheesy. I want prompts that actually make me think.\"",
      },
      {
        title: "AI Art & Photo Editing",
        prompt:
          "ChatGPT: \"Create an image of a cozy reading nook with warm lighting, bookshelves, a cat sleeping on a chair, and rain on the window. Style: watercolor illustration.\"\n\nFor photo editing with ChatGPT: Upload a photo and say: \"Remove the background\" or \"Make this look like a professional headshot.\"",
        tool: "ChatGPT (DALL-E), Midjourney, or Canva AI",
        why: "AI art tools have gotten incredible. You can create custom art for your home, social media posts, party invitations, or just for fun — no artistic skill needed.",
        proTip:
          "For the best results, be specific about style: \"watercolor\", \"minimalist\", \"vintage photograph\", \"Studio Ghibli style\". The more specific your description, the better the output.",
      },
      {
        title: "Party Planning & Social Events",
        prompt:
          '"I\'m hosting a dinner party for 8 adults. Theme: Italian night. Budget: $100 for food. I want it to feel special but not be stressful to cook. Give me: a menu (appetizer, main, dessert), a shopping list, a cooking timeline so everything is ready by 7pm, and a playlist suggestion."',
        tool: "ChatGPT or Claude",
        why: "AI handles the logistics so you can focus on being a good host. The cooking timeline alone is worth it — no more scrambling at 6:45pm with three things still in the oven.",
        proTip:
          "For kids' parties: \"Plan a Minecraft-themed birthday party for a 10-year-old. 15 kids. Budget: $150. Include games, food, decorations, and a party schedule.\"",
      },
    ],
  },
];

const bonusContent = [
  {
    id: "vibe-coding",
    title: "Vibe Coding: Build Apps Without Being a Programmer",
    icon: "💻",
    content: [
      {
        subtitle: "What Is Vibe Coding?",
        text: "Vibe coding is using AI to build real software by describing what you want in plain English. You don't need to know how to code. You tell AI what to build, it writes the code, you tell it what to fix, and it fixes it. People are building real websites, apps, and tools this way.",
      },
      {
        subtitle: "How to Get Started",
        text: "1. Go to claude.ai or chatgpt.com\n2. Describe what you want to build: \"Build me a simple website that tracks my daily water intake. It should have a button to add a glass, show my daily total, and reset each day.\"\n3. AI will write the complete code\n4. Copy it into a free tool like CodePen, Replit, or Vercel to see it work\n5. Tell AI what to change: \"Make the button bigger and add a progress bar\"",
      },
      {
        subtitle: "Real Things People Have Built",
        text: "- Personal budget trackers\n- Wedding planning websites\n- Small business landing pages\n- Habit tracking apps\n- Kids' chore charts with rewards\n- Recipe organizers\n- Inventory management for side businesses",
      },
      {
        subtitle: "Best Tools for Vibe Coding",
        text: "- Claude.ai — Best for complex projects and understanding what you want\n- ChatGPT — Great all-rounder, good with visual design\n- Replit — Write and run code in your browser\n- Vercel — Deploy your creation to the internet for free\n- Cursor / Claude Code — More advanced: AI-powered code editors",
      },
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Cheat Sheet",
    icon: "📋",
    content: [
      {
        subtitle: "The Golden Rule",
        text: "Be specific. \"Write me something about dogs\" → bad. \"Write a 200-word blog post about why golden retrievers are the best family dogs, aimed at first-time dog owners, in a warm and encouraging tone\" → great.",
      },
      {
        subtitle: "The 5-Part Prompt Formula",
        text: "1. ROLE: \"You are a [expert type]...\"\n2. TASK: \"I need you to [specific action]...\"\n3. CONTEXT: \"Here's the situation: [background]...\"\n4. FORMAT: \"Give me the answer as [list/email/table/etc.]...\"\n5. CONSTRAINTS: \"Keep it under [X words], don't include [Y], focus on [Z]...\"",
      },
      {
        subtitle: "Copy-Paste Templates",
        text: "EMAIL: \"Write a [tone] email to [person] about [topic]. Keep it under [X] words. Key points: [list points].\"\n\nSUMMARY: \"Summarize this in [X] bullet points. Focus on [what matters to you]: [paste text]\"\n\nBRAINSTORM: \"Give me [X] ideas for [topic]. I like [preferences]. I don't want [anti-preferences].\"\n\nEXPLAIN: \"Explain [topic] like I'm [age/level]. Use examples from [familiar domain].\"\n\nREVIEW: \"Review this [text/code/plan] for [what to check]. Be honest and specific about what to improve: [paste content]\"",
      },
      {
        subtitle: "Power Moves",
        text: "- \"Think step by step\" — Makes AI work through problems more carefully\n- \"What am I not thinking about?\" — Catches blind spots\n- \"Give me the pros and cons\" — Gets balanced analysis\n- \"Pretend you're [expert]\" — Gets specialized knowledge\n- \"Before answering, ask me clarifying questions\" — Gets AI to gather info first\n- \"Rate your confidence 1-10\" — Tells you when AI is guessing",
      },
    ],
  },
  {
    id: "top-tools",
    title: "Top 10 AI Tools Ranked & Compared",
    icon: "🏆",
    content: [
      {
        subtitle: "1. ChatGPT (OpenAI)",
        text: "Best for: Everything. The Swiss Army knife of AI.\nFree tier: Yes (GPT-3.5)\nPaid: $20/month (GPT-4, image generation, file analysis)\nVerdict: If you only use one AI tool, make it this one.",
      },
      {
        subtitle: "2. Claude (Anthropic)",
        text: "Best for: Long documents, nuanced writing, thoughtful analysis.\nFree tier: Yes\nPaid: $20/month (more usage, longer conversations)\nVerdict: Often gives more thoughtful, less generic answers than ChatGPT. Especially good for writing.",
      },
      {
        subtitle: "3. Perplexity",
        text: "Best for: Research and fact-finding. It's like Google but gives you actual answers with sources.\nFree tier: Yes\nPaid: $20/month\nVerdict: Use this instead of Google when you want a real answer, not a list of links.",
      },
      {
        subtitle: "4. Google Gemini",
        text: "Best for: Integration with Google services (Gmail, Docs, Calendar).\nFree tier: Yes\nPaid: Included with Google One AI Premium ($20/month)\nVerdict: If you live in the Google ecosystem, this is the most convenient option.",
      },
      {
        subtitle: "5. Midjourney",
        text: "Best for: Creating stunning AI art and images.\nFree tier: Limited trial\nPaid: $10/month\nVerdict: The best AI image generator. Creates art that actually looks professional.",
      },
      {
        subtitle: "6. Canva AI (Magic Studio)",
        text: "Best for: Graphic design, presentations, social media posts.\nFree tier: Yes (limited AI features)\nPaid: $13/month\nVerdict: If you need to make things look good (flyers, social posts, presentations), Canva + AI is unbeatable.",
      },
      {
        subtitle: "7. Notion AI",
        text: "Best for: Organization, note-taking, project management.\nFree tier: Yes (limited AI)\nPaid: $10/month add-on\nVerdict: If you use Notion, the AI add-on is a no-brainer for summarizing notes and drafting docs.",
      },
      {
        subtitle: "8. Grammarly",
        text: "Best for: Writing improvement, grammar, tone adjustment.\nFree tier: Yes (basic)\nPaid: $12/month\nVerdict: Works everywhere you type. The tone detector alone is worth it for professional emails.",
      },
      {
        subtitle: "9. ElevenLabs",
        text: "Best for: AI voice generation, text-to-speech.\nFree tier: Yes (limited)\nPaid: $5/month\nVerdict: Turn any text into natural-sounding speech. Great for content creators or accessibility.",
      },
      {
        subtitle: "10. Otter.ai",
        text: "Best for: Meeting transcription and notes.\nFree tier: Yes (limited minutes)\nPaid: $17/month\nVerdict: Joins your meetings, transcribes everything, and creates summaries. A must-have for meeting-heavy jobs.",
      },
    ],
  },
];

export default function PlaybookPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      {/* Header */}
      <header className="no-print border-b px-6 py-5" style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "white" }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">The AI Playbook</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="rounded-lg px-4 py-2 text-base font-medium" style={{ backgroundColor: "var(--teal-light)", color: "var(--teal)" }}>
              Full Access
            </span>
            <DownloadPdfButton />
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="no-print border-b px-6 py-8" style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "var(--warm-white)" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-5 text-base font-semibold tracking-wide uppercase" style={{ color: "var(--warm-gray-600)" }}>
            Jump to a section
          </h2>
          <div className="flex flex-wrap gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-lg border bg-white px-5 py-3 text-base font-medium transition-colors"
                style={{ borderColor: "var(--warm-gray-200)", color: "var(--warm-gray-700)" }}
              >
                {s.icon} {s.title}
              </a>
            ))}
            {bonusContent.map((b) => (
              <a
                key={b.id}
                href={`#${b.id}`}
                className="rounded-lg border bg-white px-5 py-3 text-base font-medium transition-colors"
                style={{ borderColor: "var(--warm-gray-200)", color: "var(--warm-gray-700)" }}
              >
                {b.icon} {b.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* PDF content wrapper */}
      <div id="playbook-content">
        {/* Welcome */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--warm-gray-900)" }}>
              Welcome to Your AI Playbook
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>
              Everything below is a step-by-step guide with real prompts you can
              copy and paste. Each guide tells you which tool to use, why it works,
              and pro tips to get even better results. Pick a section and dive in.
            </p>
          </div>
        </section>

        {/* Main Sections */}
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="border-t px-6 py-20"
            style={{ borderColor: "var(--warm-gray-200)" }}
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl text-white ${section.color}`}
                >
                  {section.icon}
                </span>
                <h2 className="text-3xl font-bold" style={{ color: "var(--warm-gray-900)" }}>
                  {section.title}
                </h2>
              </div>

              <div className="space-y-10">
                {section.guides.map((guide) => (
                  <article
                    key={guide.title}
                    className="rounded-xl bg-white p-8 shadow-sm sm:p-10"
                    style={{ border: "1px solid var(--warm-gray-200)" }}
                  >
                    <h3 className="mb-6 text-2xl font-bold" style={{ color: "var(--warm-gray-900)" }}>
                      {guide.title}
                    </h3>

                    <div className="mb-6">
                      <div className="mb-3 text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--teal)" }}>
                        Copy & paste this prompt
                      </div>
                      <div className="rounded-lg p-5 font-mono text-base leading-relaxed whitespace-pre-wrap" style={{ backgroundColor: "var(--warm-gray-50)", color: "var(--warm-gray-700)", border: "1px solid var(--warm-gray-200)" }}>
                        {guide.prompt}
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-3 text-base">
                      <span className="font-medium" style={{ color: "var(--warm-gray-600)" }}>
                        Best tool:
                      </span>
                      <span className="rounded-lg px-4 py-1.5 text-base font-medium" style={{ backgroundColor: "var(--teal-light)", color: "var(--teal)" }}>
                        {guide.tool}
                      </span>
                    </div>

                    <div className="mb-5">
                      <div className="mb-2 text-base font-semibold" style={{ color: "var(--warm-gray-700)" }}>
                        Why this works:
                      </div>
                      <p className="text-base leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>{guide.why}</p>
                    </div>

                    <div className="rounded-lg p-5" style={{ backgroundColor: "var(--gold-light)", border: "1px solid #e8d5a0" }}>
                      <div className="mb-2 text-base font-semibold" style={{ color: "#8b6914" }}>
                        Pro Tip
                      </div>
                      <p className="text-base leading-relaxed" style={{ color: "#7a5c12" }}>{guide.proTip}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Bonus Content */}
        {bonusContent.map((bonus) => (
          <section
            key={bonus.id}
            id={bonus.id}
            className="border-t px-6 py-20"
            style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "var(--warm-white)" }}
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 flex items-center gap-4">
                <span className="text-3xl">{bonus.icon}</span>
                <h2 className="text-3xl font-bold" style={{ color: "var(--warm-gray-900)" }}>
                  {bonus.title}
                </h2>
              </div>

              <div className="space-y-8">
                {bonus.content.map((block) => (
                  <div
                    key={block.subtitle}
                    className="rounded-xl bg-white p-8 shadow-sm sm:p-10"
                    style={{ border: "1px solid var(--warm-gray-200)" }}
                  >
                    <h3 className="mb-4 text-xl font-bold" style={{ color: "var(--warm-gray-900)" }}>
                      {block.subtitle}
                    </h3>
                    <div className="whitespace-pre-line text-base leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>
                      {block.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="no-print border-t px-6 py-16" style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "white" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-5 text-2xl font-bold" style={{ color: "var(--warm-gray-900)" }}>
            That&apos;s your AI Playbook.
          </h2>
          <p className="mb-4 text-lg leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>
            Bookmark this page and come back whenever you need a prompt or want to
            try something new. We update this playbook as AI evolves — so you
            always have the latest techniques.
          </p>
          <div className="mb-8">
            <DownloadPdfButton />
          </div>
          <p className="text-base" style={{ color: "var(--warm-gray-600)" }}>
            Questions or feedback?{" "}
            <a
              href="mailto:support@theaiplaybook.com"
              className="underline"
              style={{ color: "var(--teal)" }}
            >
              support@theaiplaybook.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
