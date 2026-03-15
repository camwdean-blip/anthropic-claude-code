import Link from "next/link";
import { Icons } from "../icons";
import DownloadPdfButton from "./DownloadPdfButton";
import LogoutButton from "./LogoutButton";

/* ───────────────────────────────────────────
   PART 1 — FOUNDATIONS: Origin & History of AI
   ─────────────────────────────────────────── */
const foundationSections: {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  blocks: { subtitle: string; text: string }[];
}[] = [];

/* ───────────────────────────────────────────
   PART 2 — MASTERING PROMPTS: How to Speak to AI
   ─────────────────────────────────────────── */
const promptMasterySections = [
  {
    id: "talking-to-computers",
    title: "How to Talk to a Computer (It's Not What You Think)",
    icon: Icons.messageSquare,
    color: "bg-[#2d6a4f]",
    blocks: [
      {
        subtitle: "Forget Everything You Learned About Being Polite",
        text: `Here's the secret nobody tells you: AI doesn't care about pleasantries, grammar, or complete sentences. It's not a person. It's a pattern-matching engine that's trying to figure out what you need.

You don't need to say: "Hello, I was wondering if you could possibly help me write an email to my boss about requesting time off next Friday? I'd really appreciate it if you could make it sound professional but friendly. Thank you so much!"

You can just say: "Write email to boss. Need Friday off. Professional but friendly."

Same result. A fraction of the effort. The computer doesn't have feelings to hurt — it just needs the core information.`,
      },
      {
        subtitle: "Think Instructions, Not Conversation",
        text: `When you talk to a person, you use context, tone, and social cues. With AI, think of it more like writing a search query or filling out a form — just with plain language.

The most efficient AI input has three things:
• WHAT you want (the task)
• WHO it's for or HOW it should sound (the context)
• Any CONSTRAINTS (length, format, things to include or avoid)

That's it. No "please" required. No backstory. No throat-clearing.

Inefficient: "So I've been thinking about starting a vegetable garden and I live in zone 7b. I've never really gardened before but my neighbor has a great one. Could you maybe suggest some easy vegetables I could start with this spring?"

Efficient: "Easy spring vegetables for zone 7b beginner. Top 5, with planting dates."

Both work. The second one gets you a more focused answer, faster.`,
      },
      {
        subtitle: "You Can Always Add More — Start Lean",
        text: `A lot of people over-explain on the first message because they're afraid of getting a bad answer. But AI is iterative — you can always follow up.

Start with the simplest version of your ask. If the answer isn't quite right, add one more detail. Then another. You'll zero in on exactly what you want in 2-3 short messages instead of one long paragraph.

Think of it like GPS: you type in the destination, not the life story of why you're going there.

First message: "Workout plan, 3 days a week, dumbbells only"
Follow-up: "Make it 30 minutes max per session"
Follow-up: "Add a warm-up and cool-down"

Three short lines gave you a better result than a single wall of text would have.`,
      },
      {
        subtitle: "The Shorthand Cheat Sheet",
        text: `Here are patterns that work every time — no fluff needed:

LISTS: "10 ideas for [topic]" — just say the number and topic
REWRITES: "Rewrite this: [paste text]. Make it [shorter/funnier/formal]."
COMPARISONS: "[Thing A] vs [Thing B]. Pros and cons. Table format."
EXPLANATIONS: "Explain [concept] like I'm [audience]. 3 sentences."
BRAINSTORMING: "[Topic]. Give me 5 angles I haven't considered."
FORMATS: "As a bullet list" / "As a table" / "In 100 words or less"

Notice the pattern: short, direct, specific. The computer cuts through all the noise and grabs exactly what it needs. Your job is to give it signal, not sentences.`,
      },
      {
        subtitle: "When to Use More Words (Yes, Sometimes You Should)",
        text: `Being concise is the default. But there are times when more detail genuinely helps:

• CREATIVE WORK — If you want a specific tone, style, or voice, give an example: "Write like a sarcastic sports commentator"
• COMPLEX TASKS — Multi-step projects benefit from numbering your requirements: "1. Research phase 2. Outline 3. First draft"
• PERSONAL CONTEXT — Things AI can't guess: your budget, your skill level, dietary restrictions, your audience

The rule of thumb: if the detail changes what the AI would produce, include it. If it's just filler or context you'd give a human out of politeness, skip it.

You're not being rude. You're being efficient. And the AI actually performs better when you are.`,
      },
    ],
  },
  {
    id: "prompt-fundamentals",
    title: "Level 1: Prompt Fundamentals",
    icon: Icons.target,
    color: "bg-[#8b6914]",
    blocks: [
      {
        subtitle: "Why Your Prompts Determine Your Results",
        text: `The #1 mistake people make with AI: they type vague requests and get vague answers. Then they think AI isn't useful.

Bad prompt: "Help me with my resume"
Good prompt: "I'm a marketing manager with 8 years of experience applying for a Senior Director role at a SaaS company. Rewrite my resume summary to emphasize leadership, data-driven decision making, and team scaling. Keep it to 3 sentences."

The difference? Specificity. AI can't read your mind. The more context you give, the better the output. Think of it like briefing a new employee — the more detail you provide, the better work they produce.`,
      },
      {
        subtitle: "The 5-Part Prompt Formula (Your New Best Friend)",
        text: `Use this framework for any prompt and you'll immediately get better results:

1. ROLE — Tell AI who to be
   "You are a senior financial advisor..."
   "Act as an experienced elementary school teacher..."

2. TASK — What specifically you need done
   "Create a 30-day meal plan..."
   "Write a cold email to..."
   "Analyze this data and find trends..."

3. CONTEXT — Background information
   "I run a small bakery in Portland with 3 employees..."
   "This is for a college application to MIT..."

4. FORMAT — How you want the output
   "Give me a numbered list..."
   "Present this as a table with columns for..."
   "Write this as a professional email under 150 words..."

5. CONSTRAINTS — Boundaries and rules
   "Don't use jargon..."
   "Budget is under $500..."
   "Keep it appropriate for a 10-year-old audience..."

You don't need all five every time, but the more you include, the better your results will be.`,
      },
      {
        subtitle: "Copy-Paste Starter Templates",
        text: `Here are battle-tested templates you can customize immediately:

EMAIL TEMPLATE:
"Write a [tone: friendly/formal/urgent] email to [recipient] about [topic]. Key points to include: [list]. Keep it under [X] words. End with [specific call to action]."

SUMMARY TEMPLATE:
"Summarize the following in [X] bullet points. Focus on [what matters to you]. Audience is [who will read this]. Here's the text: [paste]"

BRAINSTORM TEMPLATE:
"Give me [X] ideas for [topic]. Requirements: [constraints]. I like [preferences]. I don't want [anti-preferences]. For each idea, include a one-sentence explanation of why it would work."

ANALYSIS TEMPLATE:
"Analyze [this data/situation/text]. Look specifically for [what you want to find]. Present your findings as [format]. Include [specific elements like recommendations, risks, next steps]."

LEARNING TEMPLATE:
"Explain [topic] as if I'm a [beginner/intermediate/expert]. Use analogies from [something I'm familiar with]. After explaining, give me 3 practice questions to test my understanding."`,
      },
    ],
  },
  {
    id: "prompt-intermediate",
    title: "Level 2: Intermediate Prompt Techniques",
    icon: Icons.wrench,
    color: "bg-[#1e3a5f]",
    blocks: [
      {
        subtitle: "Chain-of-Thought: Make AI Show Its Work",
        text: `One of the most powerful techniques in prompting is asking AI to think step by step. This dramatically improves accuracy on complex problems.

Instead of: "What's the best marketing strategy for my business?"

Try: "I run a local dog grooming business in Austin, TX. Walk me through step by step how to build a marketing strategy. For each step, explain your reasoning, consider alternatives, and tell me which option you'd recommend and why."

Why it works: When AI has to explain its reasoning, it catches its own errors. It's the difference between asking someone to blurt out an answer vs. asking them to show their work on a math test.

Other phrases that trigger better reasoning:
• "Think through this carefully before answering"
• "Consider the pros and cons of each option"
• "What assumptions are you making? Are they valid?"
• "Break this into steps and solve each one"`,
      },
      {
        subtitle: "Few-Shot Prompting: Teach AI by Example",
        text: `Instead of describing what you want, SHOW IT. Give AI 2-3 examples of your desired output, and it will match the pattern perfectly.

Example — Turning meeting notes into action items:

"I'm going to give you meeting notes. Turn them into action items in this format:

Meeting note: 'Sarah mentioned we need to update the homepage by Friday'
Action item: [Sarah] Update homepage copy — Due: Friday 1/17

Meeting note: 'Team agreed to postpone the product launch to March'
Action item: [Team] Reschedule product launch timeline — Due: March (exact date TBD)

Now do the same for these notes:
[paste your actual meeting notes]"

This technique works for:
• Writing in your company's specific format
• Generating content in a particular style
• Converting data from one format to another
• Creating consistent outputs across multiple requests`,
      },
      {
        subtitle: "The Conversation Technique: Iterate, Don't Restart",
        text: `Most people treat AI like a search engine: type query, get answer, start over. Power users treat it like a conversation. The magic is in the follow-up.

Start broad → Get specific → Refine

Turn 1: "I want to start a YouTube channel about personal finance for millennials. Give me 10 video topic ideas."
Turn 2: "I like ideas 3, 7, and 9. Expand each into a full video outline with timestamps."
Turn 3: "For idea #7, write me a script for the first 2 minutes — the hook and introduction."
Turn 4: "Make the tone more conversational. Add a personal anecdote about paying off student loans."
Turn 5: "Now write the thumbnail text and a YouTube description optimized for search."

In 5 turns, you went from a vague idea to a production-ready video plan. Each turn builds on the last. This is how professionals use AI — as an iterative collaborator, not a one-shot tool.

Pro tip: If the conversation goes off track, say "Let's step back. Here's what I actually need..." and redirect.`,
      },
      {
        subtitle: "Role Stacking: Get Expert-Level Advice",
        text: `Don't just assign one role — stack them for richer perspectives.

"You are a financial advisor with 20 years of experience who also has a background in behavioral psychology. I want you to help me create a savings plan, but I also want you to address the emotional and psychological barriers that might prevent me from sticking to it."

Or get multiple perspectives:

"Analyze my business plan from three perspectives:
1. As a venture capitalist — would you invest? What concerns you?
2. As a potential customer — would you buy this? What's missing?
3. As a competitor — what would you do to beat this business?

Give each perspective its own section."

This technique produces dramatically richer analysis than a single-perspective prompt.`,
      },
    ],
  },
  {
    id: "prompt-advanced",
    title: "Level 3: Advanced Prompt Mastery",
    icon: Icons.trophy,
    color: "bg-[#6b1d1d]",
    blocks: [
      {
        subtitle: "System Prompts & Custom Instructions",
        text: `Both ChatGPT and Claude let you set "Custom Instructions" — persistent rules that apply to every conversation. This is like training a permanent assistant.

Go to Settings → Custom Instructions (ChatGPT) or Project settings (Claude) and set things like:

"About me:
- I'm a small business owner running an e-commerce store selling handmade candles
- I have a team of 4 people
- I'm based in the US, primarily sell domestically
- My budget for most projects is under $1,000
- I prefer practical, actionable advice over theory

How I want responses:
- Keep answers concise — bullet points over paragraphs
- Always include specific next steps I can take this week
- If you're not sure about something, say so rather than guessing
- When suggesting tools or services, include approximate costs
- Use simple language — no marketing buzzwords"

Now EVERY conversation starts with this context automatically. No more repeating yourself.`,
      },
      {
        subtitle: "Mega-Prompts: Complex Tasks in One Shot",
        text: `For large, complex tasks, write a detailed mega-prompt that covers everything. This saves hours of back-and-forth.

Example — Complete Content Marketing Strategy:

"You are a content marketing strategist. Create a complete 90-day content plan for my business.

ABOUT MY BUSINESS:
- B2B SaaS tool for project management
- Target audience: team leads at companies with 50-200 employees
- Main competitors: Asana, Monday.com, ClickUp
- Our differentiator: built-in time tracking and client billing
- Current marketing: blog posts 1x/week, LinkedIn, email newsletter (2,000 subscribers)

WHAT I NEED:
1. Content pillars (3-4 main themes we should focus on)
2. A 90-day editorial calendar with specific topics, formats, and channels
3. For each piece of content, specify: target keyword, content type (blog/video/social), estimated time to create, and distribution channels
4. A lead magnet idea that would attract our ideal customer
5. KPIs to track and realistic benchmarks for each

FORMAT:
- Present the editorial calendar as a table
- Keep topic descriptions to one sentence each
- Group content by month
- Include a 'Quick Wins' section at the top — things I can do THIS WEEK

CONSTRAINTS:
- I have one part-time content writer (10 hours/week)
- Budget for tools/ads: $200/month
- No video production capability yet (just written and image content)
- Focus on SEO and LinkedIn as primary channels"

This single prompt replaces a $5,000 marketing consultant engagement.`,
      },
      {
        subtitle: "AI as a Thought Partner: The Socratic Method",
        text: `The most advanced use of AI isn't getting answers — it's getting better questions. Use AI to challenge your own thinking.

"I'm planning to quit my job and start a freelance consulting business. Instead of just encouraging me, I want you to:

1. Ask me the 10 hardest questions I need to answer before making this decision
2. For each question, explain why it matters
3. After I answer them, tell me honestly — based on my answers — whether you think I'm ready or if there are gaps I should address first"

Other Socratic prompts:
• "What are the strongest arguments AGAINST my plan?"
• "What am I not thinking about that could cause this to fail?"
• "If you were betting against me, what would be your strategy?"
• "Steelman the opposing view — make the best possible case for the other side"
• "Rate my plan 1-10 and be brutally honest. Then tell me what would make it a 10."

This approach is especially powerful for:
- Major life decisions (career changes, big purchases, moves)
- Business strategy and planning
- Investment decisions
- Conflict resolution (understanding the other person's perspective)`,
      },
      {
        subtitle: "Prompt Chaining: Multi-Step Workflows",
        text: `For complex projects, chain multiple prompts together where each output feeds into the next. This is how you build complete systems.

Example — Building a Complete Course:

Step 1: "List the 8 most important topics someone needs to learn to master personal finance. Order them from foundational to advanced."

Step 2: "For topic #1 [from the list], create a complete lesson outline: learning objectives, key concepts, 3 real-world examples, and 5 quiz questions."

Step 3: "Write the full lesson content for the outline above. Aim for 1,500 words. Use a conversational tone. Include analogies a 25-year-old would relate to."

Step 4: "Create a visual summary of this lesson — describe what a one-page infographic should contain, including layout, key stats, and pull quotes."

Step 5: "Write 5 social media posts promoting this lesson — 2 for LinkedIn, 2 for Twitter/X, 1 for Instagram. Each should have a different hook."

Repeat steps 2-5 for each topic, and you have a complete course with marketing materials. What would take weeks takes a day.`,
      },
    ],
  },
];

/* ───────────────────────────────────────────
   PART 2.5 — BEST PRACTICES: Getting the Most from AI
   ─────────────────────────────────────────── */
const bestPracticesSections = [
  {
    id: "chat-management",
    title: "Managing Your Chats (The Basics Nobody Teaches You)",
    icon: Icons.layers,
    color: "bg-[#5b4a8a]",
    blocks: [
      {
        subtitle: "Your Chats Are Already Saved — You Just Didn't Know",
        text: `Here's something that surprises a lot of new users: every conversation you have with ChatGPT, Claude, Gemini, or most other AI tools is automatically saved. You don't need to hit "Save." There is no Save button.

Look at the left side panel of your screen (or the menu icon on mobile). That's your chat history. Every conversation you've ever had is right there, listed by title. You can scroll back days, weeks, or months and pick up right where you left off.

This is fundamentally different from a Google search, where you type something and the results disappear when you close the tab. AI chats are persistent — think of them more like text message threads. The conversation lives there until you delete it.

Why this matters:
• You can return to an old chat and say "continue where we left off" — the AI remembers the full context
• You can reference work the AI did for you weeks ago without starting over
• You don't need to copy-paste everything into a document "just in case" — it's already saved`,
      },
      {
        subtitle: "Rename Your Chats (Your Future Self Will Thank You)",
        text: `By default, AI tools auto-generate chat titles based on your first message. So your sidebar ends up looking like this:

"Help me with an email"
"Can you write something"
"I have a question"
"Untitled chat"

Good luck finding anything.

Here's the fix — rename your chats:
• ChatGPT: Click the chat title in the sidebar → click the pencil icon → type a new name
• Claude: Click the chat title in the sidebar → rename it
• Gemini: Click the three dots next to a chat → Rename

Use descriptive names like:
✓ "Q2 Marketing Plan — Draft"
✓ "Kid's Birthday Party Ideas"
✓ "Resume — Software Engineer v3"
✓ "Weekly Meal Plans — March"
✓ "Tax Questions 2025"

Think of it like naming files on your computer. "Document1.docx" is useless. "2025-Tax-Return-Notes.docx" is findable. Same principle.`,
      },
      {
        subtitle: "Finding Old Chats",
        text: `Most AI tools have a search function in the sidebar — use it. In ChatGPT, there's a search bar at the top of the left panel. Claude has one too. Type a keyword from your conversation and it'll pull it up.

If you can't find something:
• Try different keywords — search for a specific phrase you remember using, not the general topic
• Scroll through your history — chats are listed by date, most recent first
• Check if you were logged in — if you used AI without an account, those chats may not have been saved

Pro tip: If you're working on an ongoing project, use ONE chat for the whole thing instead of starting new ones each time. The AI builds context over the conversation, so chat #15 about your business plan will give much better answers than a brand new chat where you have to re-explain everything.`,
      },
      {
        subtitle: "Think Threads, Not Documents",
        text: `People coming from Microsoft Word or Google Docs have a "save my work" instinct. They want to copy-paste AI responses into a document immediately. You can do that — but you don't have to.

Instead, think of each chat as a living thread:
• One thread for your business plan — keep refining it over time
• One thread for recipe ideas — add to it whenever you need meal inspiration
• One thread for a work project — keep all the brainstorming, drafts, and revisions in one place
• One thread per class or subject if you're a student

When you DO want to save something outside of the AI:
• Copy the final version (not every draft) into your document
• Use "Give me the final version with all my revisions incorporated" before copying
• Some tools (Claude, ChatGPT) let you download or share conversations directly

The chat IS your workspace. The document is just where the finished product goes.`,
      },
    ],
  },
  {
    id: "workflow-habits",
    title: "Workflow Habits That 10x Your Results",
    icon: Icons.compass,
    color: "bg-[#2d6a4f]",
    blocks: [
      {
        subtitle: "One Chat Per Project, New Chat for New Topics",
        text: `The most common mistake: using one endless chat for everything. Monday it's a resume, Tuesday it's recipe ideas, Wednesday it's a work email. The AI gets confused, and so do you.

The rule is simple:
• Same project? Same chat. Keep the context building.
• New topic? New chat. Give the AI a fresh start.

Why: AI uses the entire conversation as context for its next response. If your chat is about 15 different topics, it's juggling all of them. If your chat is focused on one thing, every response gets better because the AI understands the full picture.

Think of it like meetings — you wouldn't discuss your marketing strategy, your tax return, and your vacation plans in the same meeting. Give each topic its own space.`,
      },
      {
        subtitle: "Always Review, Never Blindly Trust",
        text: `AI is confident. It will give you an answer that sounds authoritative even when it's wrong. This isn't a bug — it's how the technology works. It generates the most likely response, not the most accurate one.

The review checklist:
• FACTS — Did it get the numbers, dates, and names right? Verify anything important.
• TONE — Does it sound like you, or like a robot? Edit to match your voice.
• COMPLETENESS — Did it miss anything you care about? Ask it to add what's missing.
• COMMON SENSE — Does the answer actually make sense for your situation?

For low-stakes tasks (brainstorming, first drafts, casual messages), a quick skim is fine. For high-stakes tasks (legal, medical, financial, anything going to a client), verify every claim independently.

AI is your first draft machine, not your fact-checker.`,
      },
      {
        subtitle: "Iterate, Don't Start Over",
        text: `You got an AI response and it's not quite right. What most people do: delete the chat and try again from scratch with a "better" prompt.

What you should do: tell the AI what to fix.

• "Make it shorter — half this length."
• "Too formal. Make it conversational, like I'm texting a friend."
• "Good structure, but replace the first example with something about healthcare."
• "I like points 2 and 4. Expand those and drop the rest."

Every follow-up makes the output better because the AI now understands what you want AND what you don't want. Starting over throws away all that context.

Think of it like working with a human assistant. You wouldn't fire them and hire someone new every time they didn't nail the first draft. You'd give feedback. Same with AI.`,
      },
      {
        subtitle: "Use AI to Check AI",
        text: `This is a power-user move that most people never think of: use a second AI to review the first one's work.

Examples:
• Write an email in ChatGPT → paste it into Claude and say "Review this email. What could be improved? Is anything unclear or awkward?"
• Get a business plan from one AI → ask another "Poke holes in this plan. What am I missing? What are the biggest risks?"
• Have AI write code → paste it into another AI and say "Review this for bugs, security issues, and edge cases"

Different AI models have different strengths and blind spots. Using two gives you a built-in peer review system. It takes 30 seconds and catches issues you'd miss.`,
      },
      {
        subtitle: "Set Up Your Context Once, Reuse It Forever",
        text: `Most AI tools now have a "custom instructions" or "memory" feature. Use it. This is where you tell the AI about yourself once, and it remembers for every future conversation.

What to include in your custom instructions:
• Your job title and industry
• How you prefer responses (concise vs. detailed, formal vs. casual)
• Things AI should always or never do ("never use bullet points" or "always include sources")
• Your skill level ("I'm a beginner at coding" or "I'm a senior developer — skip the basics")

Where to find it:
• ChatGPT: Settings → Personalization → Custom Instructions
• Claude: Your profile → set your communication preferences
• Gemini: Settings → Extensions and preferences

This is like training a new assistant on your preferences on Day 1 so you don't have to repeat yourself in every email. Set it once, benefit forever.`,
      },
      {
        subtitle: "Know When to Start Fresh",
        text: `Sometimes a conversation goes off the rails. The AI is stuck in a pattern, giving you the same type of answer no matter how you rephrase. Or the chat has gotten so long that the AI is losing track of earlier context.

Signs you need a new chat:
• You've asked the same question 3+ different ways and keep getting similar unhelpful answers
• The AI is contradicting something it said earlier in the conversation
• The chat is extremely long (50+ messages) and responses are getting less coherent
• You've changed direction so many times the AI doesn't know what you actually want

Starting fresh isn't failure — it's strategy. Take what you learned from the first conversation and write a better opening prompt for the new one. You'll get to a better answer faster than trying to salvage a confused thread.`,
      },
    ],
  },
];

/* ───────────────────────────────────────────
   PART 3 — APPLICATIONS: Personal, Work, Fun
   ─────────────────────────────────────────── */
const applicationSections = [
  {
    id: "personal",
    title: "Personal Life",
    icon: Icons.home,
    color: "bg-[#1e3a5f]",
    guides: [
      {
        title: "Meal Planning & Grocery Optimization",
        prompt:
          '"I need 5 healthy dinners for a family of 4 this week. Budget: $75. My kids are picky — they won\'t eat mushrooms or fish. Give me a grocery list organized by store section (produce, dairy, meat, pantry)."',
        tool: "ChatGPT or Claude",
        why: "AI knows thousands of recipes and can factor in your constraints instantly. The organized grocery list alone saves 20+ minutes at the store.",
        proTip:
          'Follow up with: "Make Monday\'s recipe gluten-free" or "Swap Thursday for something I can make in a slow cooker." AI remembers the full plan and adjusts.',
      },
      {
        title: "AI-Powered Budgeting & Finance Tracking",
        prompt:
          '"Here are my expenses from last month: [paste bank statement or list]. Categorize them, find where I\'m overspending, and suggest a realistic budget for next month. I want to save $500/month."',
        tool: "ChatGPT or Claude",
        why: 'AI can spot spending patterns you miss. It won\'t judge you, and it gives specific, actionable numbers — not generic advice like "eat out less."',
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
          'Take a photo of the space (if using ChatGPT with vision or Claude) and say "Here\'s what I\'m working with." It\'ll give even more specific advice.',
      },
      {
        title: "Health & Fitness Planning",
        prompt:
          '"Create a 4-week beginner workout plan. I can exercise 3 days a week for 30 minutes. I have dumbbells at home but no gym. I want to lose weight and build some muscle. Also give me a simple meal plan that supports this."',
        tool: "ChatGPT or Claude",
        why: "Personal trainers cost $50-100/hour. AI gives you a solid plan for free. It won't replace a doctor, but for getting started, it's better than random YouTube workouts.",
        proTip:
          'After week 1, tell AI how it went: "Week 1 done. Squats were too easy, pushups were too hard." It\'ll adjust the plan for week 2.',
      },
      {
        title: "Smart Parenting: Homework Help & Activities",
        prompt:
          '"My 8-year-old is struggling with multiplication. Explain it in a way that a 2nd grader would understand, using examples they\'d think are fun (they like dinosaurs). Then give me 5 practice problems that gradually get harder."',
        tool: "ChatGPT or Claude",
        why: "AI is infinitely patient and can explain the same concept 50 different ways. It's not replacing you — it's giving you the right words when you're stuck.",
        proTip:
          '"It\'s a rainy Saturday. My kids are 5 and 8. Give me 10 indoor activities that don\'t require buying anything and will keep them busy for at least 30 minutes each."',
      },
      {
        title: "Gift Ideas, Event Planning & More",
        prompt:
          '"I need a birthday gift for my mother-in-law. She\'s 62, loves gardening and mystery novels, budget is $30-50. She already has a lot of gardening tools. Give me 10 creative ideas she wouldn\'t think to buy herself."',
        tool: "ChatGPT, Claude, or Perplexity",
        why: "AI has seen millions of gift guides and can cross-reference multiple interests. It's like having a really thoughtful friend who always knows what to get people.",
        proTip:
          '"Plan a backyard birthday party for a 7-year-old who likes superheroes. Budget: $200. 12 kids. Give me a timeline, food, activities, and a supply list."',
      },
    ],
  },
  {
    id: "work",
    title: "AI at Work",
    icon: Icons.briefcase,
    color: "bg-[#1a7a6d]",
    guides: [
      {
        title: "Email Writing That Saves Hours",
        prompt:
          '"Here\'s an email I received: [paste email]. Write a professional reply that: 1) Thanks them for the update, 2) Asks to reschedule the meeting to next Tuesday, 3) Keeps it under 100 words. Match a friendly but professional tone."',
        tool: "ChatGPT or Claude",
        why: "The average professional spends 2.5 hours/day on email. AI cuts that in half. The key is giving it specific instructions — length, tone, and what points to hit.",
        proTip:
          'Create a "tone template": paste 2-3 emails you\'ve written before and say "Match this writing style for all future emails." AI will mimic how you actually write.',
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
          'Follow up with: "Write the speaker notes for slide 3" or "Make the Q4 plan section more specific with 3 concrete initiatives."',
      },
      {
        title: "Resume & LinkedIn Optimization",
        prompt:
          '"Here\'s my current resume: [paste resume]. I\'m applying for [job title] at [company]. Rewrite my bullet points to better match this job description: [paste job description]. Use strong action verbs and include metrics where possible."',
        tool: "ChatGPT or Claude",
        why: "Recruiters spend 6-7 seconds scanning a resume. AI helps you put the right keywords and metrics front and center — the ones that match what they're actually looking for.",
        proTip:
          '"Rewrite my LinkedIn summary for a [your field] professional. Make it conversational but authoritative. I want to attract [type of opportunity]."',
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
    icon: Icons.gamepad,
    color: "bg-[#8b6914]",
    guides: [
      {
        title: "Trip Planning That Actually Works",
        prompt:
          '"Plan a 5-day trip for 2 people. Flying from [city]. Budget: $2,000 total. We like: hiking, local food, not tourist traps. We don\'t like: crowds, nightlife, long drives. Give us a day-by-day itinerary with hotel suggestions, restaurants, and activities. Include estimated costs."',
        tool: "ChatGPT, Claude, or Perplexity",
        why: "Travel blogs give you the same 10 tourist spots. AI plans around YOUR preferences, budget, and travel style. It's like having a travel agent who actually listens.",
        proTip:
          "Use Perplexity for trip planning — it searches the web in real-time and gives you links to book hotels and restaurants directly.",
      },
      {
        title: "Movie, Book & Music Recommendations",
        prompt:
          '"I just finished watching Severance and loved it. I also liked Black Mirror and Dark. I don\'t like anything too gory or supernatural. Recommend 5 shows I\'d love with a one-sentence pitch for each. Only suggest things I can watch on Netflix, Hulu, or Apple TV+."',
        tool: "ChatGPT or Claude",
        why: "Streaming algorithms show you what's popular. AI recommends based on WHY you liked something — the themes, pacing, and tone. Much more accurate.",
        proTip:
          '"I liked Atomic Habits and Thinking, Fast and Slow. Recommend 5 books. I don\'t want anything over 300 pages."',
      },
      {
        title: "Learning New Hobbies with AI Tutoring",
        prompt:
          '"I want to learn guitar. I\'m a complete beginner. Create a 30-day learning plan where I practice 20 minutes a day. Start with the absolute basics. Each day should build on the last. Include what to practice and links to free resources."',
        tool: "ChatGPT or Claude",
        why: "AI creates a structured learning path tailored to your schedule. It's the difference between randomly watching YouTube videos and actually making progress.",
        proTip:
          'After each practice session, tell AI what was hard and easy. It\'ll adjust the plan: "Day 5 done. Chord changes between G and C are still rough."',
      },
      {
        title: "Creative Writing & Storytelling",
        prompt:
          '"I want to write a short story for my kids. They\'re 6 and 9. The main character should be a brave girl named Luna who discovers a hidden library. Make it about 1,000 words, with a message about curiosity being a superpower. Include some humor."',
        tool: "ChatGPT or Claude",
        why: "Whether it's bedtime stories, journal prompts, or that novel you've been thinking about — AI gives you a first draft to work from. You edit and make it yours.",
        proTip:
          '"Give me 5 journal prompts about gratitude that aren\'t cheesy. I want prompts that actually make me think."',
      },
      {
        title: "AI Art & Photo Editing",
        prompt:
          "ChatGPT: \"Create an image of a cozy reading nook with warm lighting, bookshelves, a cat sleeping on a chair, and rain on the window. Style: watercolor illustration.\"\n\nFor photo editing with ChatGPT: Upload a photo and say: \"Remove the background\" or \"Make this look like a professional headshot.\"",
        tool: "ChatGPT (DALL-E), Midjourney, or Canva AI",
        why: "AI art tools have gotten incredible. You can create custom art for your home, social media posts, party invitations, or just for fun — no artistic skill needed.",
        proTip:
          'For the best results, be specific about style: "watercolor", "minimalist", "vintage photograph", "Studio Ghibli style". The more specific your description, the better the output.',
      },
      {
        title: "Party Planning & Social Events",
        prompt:
          '"I\'m hosting a dinner party for 8 adults. Theme: Italian night. Budget: $100 for food. I want it to feel special but not be stressful to cook. Give me: a menu (appetizer, main, dessert), a shopping list, a cooking timeline so everything is ready by 7pm, and a playlist suggestion."',
        tool: "ChatGPT or Claude",
        why: "AI handles the logistics so you can focus on being a good host. The cooking timeline alone is worth it — no more scrambling at 6:45pm.",
        proTip:
          '"Plan a Minecraft-themed birthday party for a 10-year-old. 15 kids. Budget: $150. Include games, food, decorations, and a party schedule."',
      },
    ],
  },
];

/* ───────────────────────────────────────────
   PART 4 — BONUS: Vibe Coding, Tools, Personal Bot
   ─────────────────────────────────────────── */
const bonusContent = [
  {
    id: "vibe-coding",
    title: "Vibe Coding: Build Apps Without Being a Programmer",
    icon: Icons.terminal,
    content: [
      {
        subtitle: "What Is Vibe Coding?",
        text: "Vibe coding is using AI to build real software by describing what you want in plain English. You don't need to know how to code. You tell AI what to build, it writes the code, you tell it what to fix, and it fixes it. People are building real websites, apps, and tools this way.",
      },
      {
        subtitle: "How to Get Started",
        text: '1. Go to claude.ai or chatgpt.com\n2. Describe what you want to build: "Build me a simple website that tracks my daily water intake. It should have a button to add a glass, show my daily total, and reset each day."\n3. AI will write the complete code\n4. Copy it into a free tool like CodePen, Replit, or Vercel to see it work\n5. Tell AI what to change: "Make the button bigger and add a progress bar"',
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
    id: "top-tools",
    title: "Top 10 AI Tools Ranked & Compared",
    icon: Icons.trophy,
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
  {
    id: "personal-assistant",
    title: "Build Your Personal AI Assistant (Step-by-Step)",
    icon: Icons.bot,
    content: [
      {
        subtitle: "What You're Building",
        text: `By the end of this section, you'll have a personalized AI assistant that knows your preferences, your work context, your communication style, and your goals. It will feel like talking to someone who genuinely knows you — not a generic chatbot.

This works on both ChatGPT (Custom GPTs) and Claude (Projects). We'll walk through both.`,
      },
      {
        subtitle: "Step 1: Define Your Assistant's Purpose",
        text: `Before building anything, answer these questions (write your answers down):

1. What will you use this assistant for MOST? Pick 1-3 areas:
   □ Work emails and communication
   □ Content creation (social media, blog, marketing)
   □ Business strategy and decision-making
   □ Personal productivity and organization
   □ Learning and research
   □ Health and fitness planning
   □ Financial planning and budgeting

2. What's your communication style?
   □ Direct and concise
   □ Warm and conversational
   □ Formal and professional
   □ Casual and friendly

3. What should the assistant ALWAYS do?
   (Example: "Always give me action items," "Always consider my budget constraints," "Always push back if my idea has flaws")

4. What should the assistant NEVER do?
   (Example: "Never use corporate jargon," "Never give me generic advice," "Never sugarcoat bad news")`,
      },
      {
        subtitle: "Step 2: Write Your System Prompt (The Brain)",
        text: `Here's a template. Fill in the brackets with your actual information:

---

"You are my personal AI assistant. Here's everything you need to know about me:

ABOUT ME:
- Name: [Your name]
- Role: [Your job title/role]
- Company/Industry: [What you do]
- Key responsibilities: [Top 3-5 things you do at work]
- Goals this quarter: [What you're trying to achieve]
- Communication style: [How you write — direct, casual, formal, etc.]

MY PREFERENCES:
- I prefer [bullet points / paragraphs / tables] for information
- When I ask for advice, always include [specific next steps / pros and cons / timeline]
- Keep responses [concise / detailed / somewhere in between]
- I like when you [push back on bad ideas / ask clarifying questions / give multiple options]

MY CONSTRAINTS:
- Budget: [typical budget for projects]
- Time: [how much time you typically have]
- Team: [team size and capabilities]
- Tools I already use: [list your main tools]

RULES:
- Always end responses with a suggested next step
- If I'm making a decision, give me a clear recommendation (not just options)
- When writing for me, match this tone: [paste an example of your writing]
- Be honest. I'd rather hear hard truths than comfortable lies.
- If you don't know something, say so. Don't make things up."

---

This is your assistant's "personality file." The more specific you are, the better it works.`,
      },
      {
        subtitle: "Step 3A: Set Up on ChatGPT (Custom GPT)",
        text: `1. Go to chatgpt.com and log in (requires Plus subscription, $20/month)

2. Click your profile icon → "My GPTs" → "Create a GPT"

3. In the "Configure" tab:
   - Name: Give it a name (e.g., "My Work Assistant" or "Strategy Buddy")
   - Description: One sentence about what it does
   - Instructions: Paste your system prompt from Step 2

4. Under "Conversation Starters," add useful quick-prompts:
   - "Help me draft a response to this email"
   - "Review my plan and poke holes in it"
   - "Give me my priorities for today based on [context]"
   - "Summarize this document and give me action items"

5. Under "Knowledge," you can upload files:
   - Your company's brand guidelines
   - Your writing samples (so it matches your voice)
   - Product documentation
   - SOPs or process documents

6. Click "Save" → Choose "Only me" for privacy

7. Access it anytime from the GPT sidebar in ChatGPT`,
      },
      {
        subtitle: "Step 3B: Set Up on Claude (Projects)",
        text: `1. Go to claude.ai and log in (free tier works, Pro is better)

2. Click "Projects" in the sidebar → "Create Project"

3. Name your project (e.g., "Personal Assistant" or "Work Brain")

4. In the project description / custom instructions, paste your system prompt from Step 2

5. Add knowledge to the project:
   - Click "Add Content" to upload files
   - You can add PDFs, documents, spreadsheets, code files
   - Claude can reference these in every conversation within the project
   - Upload things like: your resume, company docs, meeting notes, strategy docs

6. Start a conversation within the project — Claude will automatically use your custom instructions and uploaded knowledge

Pro tip: Create multiple projects for different purposes:
   - "Work Assistant" — for professional tasks
   - "Content Creator" — for writing and social media
   - "Life Admin" — for personal planning and organization`,
      },
      {
        subtitle: "Step 4: Train It Over Time",
        text: `Your assistant gets better the more you use it. Here's how to actively improve it:

WEEK 1: Foundation
- Use it for 3-5 tasks per day
- When the output isn't quite right, tell it specifically what to change:
  "This is too formal. I write more casually. Here's an example of how I'd actually say this: [example]"
- Add these corrections to your system prompt so they stick

WEEK 2: Calibration
- Start using it for more complex tasks
- When it nails something, tell it: "This is perfect. Remember this format/style for future [type of task]."
- Upload more reference documents as you find them useful

WEEK 3: Expansion
- Try it in new areas you hadn't considered
- Ask it: "Based on what you know about me, what other tasks could you help me with that I haven't tried yet?"
- Add new "rules" to your system prompt based on patterns you've noticed

WEEK 4+: Mastery
- Your assistant now knows your preferences, style, and context
- You'll find yourself spending 60-90 seconds on tasks that used to take 15-30 minutes
- Keep refining: your system prompt should be a living document that grows with you`,
      },
      {
        subtitle: "Step 5: Power User Workflows",
        text: `Once your assistant is set up, here are workflows that will 10x your productivity:

MORNING BRIEFING:
"Here are my meetings today: [paste calendar]. For each meeting, remind me of the context and suggest 2 things I should prepare."

EMAIL TRIAGE:
"Here are 15 emails I received this morning: [paste]. Categorize them as: urgent (respond today), important (respond this week), FYI (no response needed). Draft responses for the urgent ones."

WEEKLY REVIEW:
"Here's what I accomplished this week: [list]. Here's what I planned but didn't finish: [list]. Help me: 1) Identify patterns in what's getting blocked, 2) Prioritize next week, 3) Draft a status update for my manager."

DECISION FRAMEWORK:
"I need to decide between [Option A] and [Option B]. Here's the context: [situation]. Analyze this using: 1) Short-term impact (next 30 days), 2) Long-term impact (next 12 months), 3) Risk assessment, 4) Your recommendation and why."

CONTENT PIPELINE:
"Based on my content strategy, suggest 5 pieces of content I should create this week. For each, give me: the topic, the angle that makes it unique, the target audience, and a one-paragraph draft of the opening."

The key insight: your AI assistant isn't replacing your thinking — it's removing the friction between having an idea and executing on it. You still make the decisions. AI just makes sure you have the information, analysis, and first drafts you need to make them well.`,
      },
      {
        subtitle: "Troubleshooting & Common Mistakes",
        text: `PROBLEM: "My assistant gives generic responses"
FIX: Your system prompt isn't specific enough. Add more details about your context, preferences, and examples of what "good" looks like.

PROBLEM: "It keeps forgetting my preferences"
FIX: Make sure your preferences are in the system prompt/custom instructions, not just mentioned in past conversations. System-level instructions persist; conversation details may not.

PROBLEM: "The tone doesn't match how I communicate"
FIX: Paste 3-5 examples of your actual writing (emails, messages, posts) into the instructions and say "Match this voice exactly."

PROBLEM: "It's too agreeable — it never pushes back"
FIX: Add explicit rules: "If you think my idea has flaws, say so directly. I value honest feedback over agreement. Rate my ideas on a scale of 1-10."

PROBLEM: "I set it up but barely use it"
FIX: Start with ONE daily habit. Every morning, paste your calendar and ask for a briefing. Once that's automatic, add more workflows. Don't try to use it for everything on day one.`,
      },
    ],
  },
];

/* ────────── PAGE COMPONENT ────────── */

export default function PlaybookPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      {/* Header */}
      <header
        className="no-print border-b px-6 py-5"
        style={{
          borderColor: "var(--warm-gray-200)",
          backgroundColor: "white",
        }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">The AI Playbook</span>
          </Link>
          <div className="flex items-center gap-4">
            <span
              className="rounded-lg px-4 py-2 text-base font-medium"
              style={{
                backgroundColor: "var(--teal-light)",
                color: "var(--teal)",
              }}
            >
              Full Access
            </span>
            <DownloadPdfButton />
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <nav
        className="no-print border-b px-6 py-8"
        style={{
          borderColor: "var(--warm-gray-200)",
          backgroundColor: "var(--warm-white)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-5 text-base font-semibold tracking-wide uppercase"
            style={{ color: "var(--warm-gray-600)" }}
          >
            Jump to a section
          </h2>
          <div className="flex flex-wrap gap-3">
            {/* Foundations */}
            <span
              className="rounded-lg px-3 py-2 text-xs font-bold tracking-wider uppercase"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Foundations
            </span>
            <a
              href="#foundations"
              className="rounded-lg border bg-white px-5 py-3 text-base font-medium transition-colors hover:shadow-sm"
              style={{
                borderColor: "var(--warm-gray-200)",
                color: "var(--warm-gray-700)",
              }}
            >
              {Icons.brain} The History &amp; Science of AI
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: "var(--warm-gray-100)",
                  color: "var(--warm-gray-400)",
                }}
              >
                Coming soon
              </span>
            </a>

            {/* Prompt Mastery */}
            <span
              className="mt-2 w-full rounded-lg px-3 py-2 text-xs font-bold tracking-wider uppercase"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Prompt Mastery
            </span>
            {promptMasterySections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-lg border bg-white px-5 py-3 text-base font-medium transition-colors hover:shadow-sm"
                style={{
                  borderColor: "var(--warm-gray-200)",
                  color: "var(--warm-gray-700)",
                }}
              >
                {s.icon} {s.title}
              </a>
            ))}

            {/* Best Practices */}
            <span
              className="mt-2 w-full rounded-lg px-3 py-2 text-xs font-bold tracking-wider uppercase"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Best Practices
            </span>
            {bestPracticesSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-lg border bg-white px-5 py-3 text-base font-medium transition-colors hover:shadow-sm"
                style={{
                  borderColor: "var(--warm-gray-200)",
                  color: "var(--warm-gray-700)",
                }}
              >
                {s.icon} {s.title}
              </a>
            ))}

            {/* Applications */}
            <span
              className="mt-2 w-full rounded-lg px-3 py-2 text-xs font-bold tracking-wider uppercase"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Applications
            </span>
            {applicationSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-lg border bg-white px-5 py-3 text-base font-medium transition-colors hover:shadow-sm"
                style={{
                  borderColor: "var(--warm-gray-200)",
                  color: "var(--warm-gray-700)",
                }}
              >
                {s.icon} {s.title}
              </a>
            ))}

            {/* Bonus */}
            <span
              className="mt-2 w-full rounded-lg px-3 py-2 text-xs font-bold tracking-wider uppercase"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Bonus
            </span>
            {bonusContent.map((b) => (
              <a
                key={b.id}
                href={`#${b.id}`}
                className="rounded-lg border bg-white px-5 py-3 text-base font-medium transition-colors hover:shadow-sm"
                style={{
                  borderColor: "var(--warm-gray-200)",
                  color: "var(--warm-gray-700)",
                }}
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
            <h1
              className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--warm-gray-900)" }}
            >
              The Complete AI Playbook: Novice to Master
            </h1>
            <p
              className="mb-4 text-xl leading-relaxed"
              style={{ color: "var(--warm-gray-600)" }}
            >
              This isn&apos;t a surface-level overview. This is the comprehensive
              guide that takes you from &quot;I&apos;ve heard of ChatGPT&quot; to
              &quot;I have a personal AI assistant that saves me 10+ hours a
              week.&quot;
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Start from the beginning or jump to any section. Every guide
              includes real prompts you can copy and paste, the best tool for the
              job, and pro tips from power users.
            </p>
          </div>
        </section>

        {/* ─── PART 1: FOUNDATIONS ─── */}
        <div
          id="foundations"
          className="border-t px-6 py-10"
          style={{
            borderColor: "var(--warm-gray-200)",
            backgroundColor: "var(--warm-white)",
          }}
        >
          <div className="mx-auto max-w-4xl">
            <p
              className="text-center text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--teal)" }}
            >
              Part 1
            </p>
            <h2
              className="mt-2 text-center text-3xl font-bold"
              style={{ color: "var(--warm-gray-900)" }}
            >
              Foundations: Understanding AI
            </h2>
            <p
              className="mt-3 text-center text-lg"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Curious about how AI actually works and how we got here?
            </p>
            <div
              className="mx-auto mt-8 max-w-xl rounded-xl bg-white p-8 text-center shadow-sm"
              style={{ border: "1px solid var(--warm-gray-200)" }}
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#4a2c6e] text-2xl text-white">
                {Icons.brain}
              </span>
              <h3
                className="mt-4 text-xl font-bold"
                style={{ color: "var(--warm-gray-900)" }}
              >
                The History &amp; Science of AI
              </h3>
              <p
                className="mt-2 text-base leading-relaxed"
                style={{ color: "var(--warm-gray-500)" }}
              >
                From the 1950s dream of thinking machines, through AI winters
                and deep learning breakthroughs, to the ChatGPT moment — learn
                how we got here and how modern AI actually works under the hood.
              </p>
              <p
                className="mt-6 inline-block cursor-default rounded-lg px-6 py-3 text-sm font-semibold"
                style={{
                  backgroundColor: "var(--warm-gray-100)",
                  color: "var(--warm-gray-400)",
                }}
              >
                Coming soon
              </p>
            </div>
          </div>
        </div>

        {/* ─── PART 2: PROMPT MASTERY ─── */}
        <div
          className="border-t px-6 py-10"
          style={{
            borderColor: "var(--warm-gray-200)",
            backgroundColor: "var(--warm-white)",
          }}
        >
          <div className="mx-auto max-w-4xl">
            <p
              className="text-center text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--teal)" }}
            >
              Part 2
            </p>
            <h2
              className="mt-2 text-center text-3xl font-bold"
              style={{ color: "var(--warm-gray-900)" }}
            >
              Prompt Mastery: How to Speak to AI
            </h2>
            <p
              className="mt-3 text-center text-lg"
              style={{ color: "var(--warm-gray-500)" }}
            >
              The difference between a beginner and an expert isn&apos;t the tool
              — it&apos;s how they communicate with it.
            </p>
          </div>
        </div>

        {promptMasterySections.map((section) => (
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
                <h2
                  className="text-3xl font-bold"
                  style={{ color: "var(--warm-gray-900)" }}
                >
                  {section.title}
                </h2>
              </div>

              <div className="space-y-8">
                {section.blocks.map((block) => (
                  <div
                    key={block.subtitle}
                    className="rounded-xl bg-white p-8 shadow-sm sm:p-10"
                    style={{ border: "1px solid var(--warm-gray-200)" }}
                  >
                    <h3
                      className="mb-4 text-xl font-bold"
                      style={{ color: "var(--warm-gray-900)" }}
                    >
                      {block.subtitle}
                    </h3>
                    <div
                      className="whitespace-pre-line text-base leading-relaxed"
                      style={{ color: "var(--warm-gray-600)" }}
                    >
                      {block.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ─── BEST PRACTICES ─── */}
        <div
          className="border-t px-6 py-10"
          style={{
            borderColor: "var(--warm-gray-200)",
            backgroundColor: "var(--warm-white)",
          }}
        >
          <div className="mx-auto max-w-4xl">
            <p
              className="text-center text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--teal)" }}
            >
              Best Practices
            </p>
            <h2
              className="mt-2 text-center text-3xl font-bold"
              style={{ color: "var(--warm-gray-900)" }}
            >
              Getting the Most from AI
            </h2>
            <p
              className="mt-3 text-center text-lg"
              style={{ color: "var(--warm-gray-500)" }}
            >
              The habits, workflows, and tricks that separate casual users from
              power users.
            </p>
          </div>
        </div>

        {bestPracticesSections.map((section) => (
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
                <h2
                  className="text-3xl font-bold"
                  style={{ color: "var(--warm-gray-900)" }}
                >
                  {section.title}
                </h2>
              </div>

              <div className="space-y-8">
                {section.blocks.map((block) => (
                  <div
                    key={block.subtitle}
                    className="rounded-xl bg-white p-8 shadow-sm sm:p-10"
                    style={{ border: "1px solid var(--warm-gray-200)" }}
                  >
                    <h3
                      className="mb-4 text-xl font-bold"
                      style={{ color: "var(--warm-gray-900)" }}
                    >
                      {block.subtitle}
                    </h3>
                    <div
                      className="whitespace-pre-line text-base leading-relaxed"
                      style={{ color: "var(--warm-gray-600)" }}
                    >
                      {block.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ─── PART 3: APPLICATIONS ─── */}
        <div
          className="border-t px-6 py-10"
          style={{
            borderColor: "var(--warm-gray-200)",
            backgroundColor: "var(--warm-white)",
          }}
        >
          <div className="mx-auto max-w-4xl">
            <p
              className="text-center text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--teal)" }}
            >
              Part 3
            </p>
            <h2
              className="mt-2 text-center text-3xl font-bold"
              style={{ color: "var(--warm-gray-900)" }}
            >
              Real-World Applications
            </h2>
            <p
              className="mt-3 text-center text-lg"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Copy-paste prompts for every area of your life — personal, work,
              and fun.
            </p>
          </div>
        </div>

        {applicationSections.map((section) => (
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
                <h2
                  className="text-3xl font-bold"
                  style={{ color: "var(--warm-gray-900)" }}
                >
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
                    <h3
                      className="mb-6 text-2xl font-bold"
                      style={{ color: "var(--warm-gray-900)" }}
                    >
                      {guide.title}
                    </h3>

                    <div className="mb-6">
                      <div
                        className="mb-3 text-sm font-semibold tracking-wide uppercase"
                        style={{ color: "var(--teal)" }}
                      >
                        Copy &amp; paste this prompt
                      </div>
                      <div
                        className="rounded-lg p-5 font-mono text-base leading-relaxed whitespace-pre-wrap"
                        style={{
                          backgroundColor: "var(--warm-gray-50)",
                          color: "var(--warm-gray-700)",
                          border: "1px solid var(--warm-gray-200)",
                        }}
                      >
                        {guide.prompt}
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-3 text-base">
                      <span
                        className="font-medium"
                        style={{ color: "var(--warm-gray-600)" }}
                      >
                        Best tool:
                      </span>
                      <span
                        className="rounded-lg px-4 py-1.5 text-base font-medium"
                        style={{
                          backgroundColor: "var(--teal-light)",
                          color: "var(--teal)",
                        }}
                      >
                        {guide.tool}
                      </span>
                    </div>

                    <div className="mb-5">
                      <div
                        className="mb-2 text-base font-semibold"
                        style={{ color: "var(--warm-gray-700)" }}
                      >
                        Why this works:
                      </div>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--warm-gray-600)" }}
                      >
                        {guide.why}
                      </p>
                    </div>

                    <div
                      className="rounded-lg p-5"
                      style={{
                        backgroundColor: "var(--gold-light)",
                        border: "1px solid #e8d5a0",
                      }}
                    >
                      <div
                        className="mb-2 text-base font-semibold"
                        style={{ color: "#8b6914" }}
                      >
                        Pro Tip
                      </div>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "#7a5c12" }}
                      >
                        {guide.proTip}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ─── PART 4: BONUS ─── */}
        <div
          className="border-t px-6 py-10"
          style={{
            borderColor: "var(--warm-gray-200)",
            backgroundColor: "var(--warm-white)",
          }}
        >
          <div className="mx-auto max-w-4xl">
            <p
              className="text-center text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--teal)" }}
            >
              Part 4
            </p>
            <h2
              className="mt-2 text-center text-3xl font-bold"
              style={{ color: "var(--warm-gray-900)" }}
            >
              Bonus: Level Up
            </h2>
            <p
              className="mt-3 text-center text-lg"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Build apps without code, compare the top AI tools, and set up your
              own personal AI assistant.
            </p>
          </div>
        </div>

        {bonusContent.map((bonus) => (
          <section
            key={bonus.id}
            id={bonus.id}
            className="border-t px-6 py-20"
            style={{
              borderColor: "var(--warm-gray-200)",
              backgroundColor: "var(--warm-white)",
            }}
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 flex items-center gap-4">
                <span className="text-3xl">{bonus.icon}</span>
                <h2
                  className="text-3xl font-bold"
                  style={{ color: "var(--warm-gray-900)" }}
                >
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
                    <h3
                      className="mb-4 text-xl font-bold"
                      style={{ color: "var(--warm-gray-900)" }}
                    >
                      {block.subtitle}
                    </h3>
                    <div
                      className="whitespace-pre-line text-base leading-relaxed"
                      style={{ color: "var(--warm-gray-600)" }}
                    >
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
      <footer
        className="no-print border-t px-6 py-16"
        style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "white" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="mb-5 text-2xl font-bold"
            style={{ color: "var(--warm-gray-900)" }}
          >
            You&apos;ve completed the AI Playbook.
          </h2>
          <p
            className="mb-4 text-lg leading-relaxed"
            style={{ color: "var(--warm-gray-600)" }}
          >
            You went from understanding what AI is, to mastering how to
            communicate with it, to building your own personal assistant. Bookmark
            this page and come back whenever you need a prompt or want to try
            something new. We update this playbook as AI evolves.
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
