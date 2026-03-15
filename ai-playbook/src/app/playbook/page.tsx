import Link from "next/link";
import { Icons } from "../icons";
import DownloadPdfButton from "./DownloadPdfButton";
import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/auth";

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
        subtitle: "Pick One Chatbot and Stick With It",
        text: `Once you've tried a few AI chatbots — ChatGPT, Claude, Gemini, Perplexity — pick one as your primary and commit to it. Here's why: every conversation you have teaches the AI more about you. Your preferences, your writing style, your job, your recurring projects, your pet peeves — it all builds up over time.

If you bounce between three different chatbots every week, none of them ever really get to know you. You're starting from scratch every time, re-explaining your context, your preferences, and your goals. It's like rotating between three different assistants who each only work one day a week — none of them ever learn your rhythm.

When you stick with one:
• Your custom instructions compound — the AI remembers how you like things
• Your conversation history becomes a searchable knowledge base of YOUR projects and ideas
• The AI gets better at anticipating what you need (especially tools with memory features like ChatGPT and Claude)
• You stop wasting time re-explaining your situation in every new tool

This doesn't mean you should NEVER use other tools. Perplexity is great for research even if Claude is your daily driver. Midjourney is the best for images regardless of which chatbot you prefer. But for your core, day-to-day AI conversations — the ones where you brainstorm, draft, plan, and think — pick one and build that relationship.

Think of it like choosing a bank. Sure, you could spread your money across five banks, but having everything in one place is simpler, builds better rewards, and the bank actually understands your financial picture. Same logic applies to your AI chatbot.`,
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
   PART 2.75 — ESSENTIAL KNOWLEDGE
   ─────────────────────────────────────────── */
const essentialKnowledgeSections: {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  blocks: { subtitle: string; text: string }[];
}[] = [
  {
    id: "privacy-safety",
    title: "Privacy & Data Safety When Using AI",
    icon: Icons.shield,
    color: "bg-[#6b1d1d]",
    blocks: [
      {
        subtitle: "What Happens to the Stuff You Type?",
        text: `This is the question most people never think to ask — and it's the most important one. When you type something into ChatGPT, Claude, Gemini, or any AI tool, where does that text go?

Here's the honest answer:

FREE TIERS — Most free AI tools use your conversations to improve their models. That means your text may be read by human reviewers or used as training data. OpenAI's ChatGPT (free tier), Google Gemini, and others have this in their terms of service.

PAID TIERS — Most paid plans offer better privacy. OpenAI's ChatGPT Plus and Claude Pro both state they don't use your conversations for training by default. But read the fine print — policies change.

ENTERPRISE TIERS — If your company uses an enterprise AI plan, your data is typically isolated and never used for training. This is the gold standard for privacy.

The rule of thumb: treat any AI tool like a public bulletin board unless you've verified otherwise. Don't paste anything you wouldn't want a stranger to see.`,
      },
      {
        subtitle: "What You Should NEVER Put Into AI",
        text: `This list is non-negotiable. Never paste or type these into any AI chatbot:

• Social Security numbers, government IDs, or passport numbers
• Full credit card or bank account numbers
• Passwords, PINs, or security codes
• Medical records with your name attached
• Legal documents with sensitive case details
• Trade secrets or proprietary source code (unless using an enterprise plan)
• Private photos of other people (especially children)
• Confidential client information

If you need AI help with something sensitive, anonymize it first:
• Replace real names with "Person A" and "Person B"
• Change specific dollar amounts to ranges ("around $50K" instead of "$52,347")
• Remove identifying details (company names, addresses, case numbers)
• Describe the situation generically: "I received a medical diagnosis" vs. pasting the full report

The AI doesn't need your real data to help you. It needs the pattern and context.`,
      },
      {
        subtitle: "How to Check a Tool's Privacy Policy (Without Being a Lawyer)",
        text: `You don't need to read 40 pages of legalese. Here's what to look for:

SEARCH FOR THESE PHRASES:
• "training data" — Does the company use your inputs to train models?
• "data retention" — How long do they keep your conversations?
• "third parties" — Do they share your data with anyone else?
• "opt out" — Can you prevent your data from being used for training?

WHERE TO FIND IT:
• ChatGPT: Settings → Data Controls → toggle off "Improve the model for everyone"
• Claude: By default, Anthropic doesn't train on your conversations (Pro plan)
• Gemini: Google AI settings in your Google account
• Perplexity: Check their privacy page — search queries may be stored

QUICK PRIVACY RANKING (as of 2025):
• Most private: Claude (Pro/Enterprise), ChatGPT (Enterprise)
• Good privacy: ChatGPT Plus (with training toggle off)
• Less private: Free tiers of most tools, Google Gemini (connected to your Google account)

When in doubt: use the paid version with training disabled, and never paste anything that could identify a real person.`,
      },
      {
        subtitle: "Protecting Yourself on Shared Devices",
        text: `If you use AI on a shared computer, a work laptop, or a family device:

• Always log out when you're done — your chat history is visible to anyone who opens the app
• Use incognito/private browsing if you don't want chats saved to the account
• Don't save your AI tool passwords in the shared browser
• Remember that IT departments can often see what websites you visit, including AI tools
• If you use AI at work, assume your employer can see your conversations (especially on work devices or networks)

For extra security:
• Enable two-factor authentication on your AI accounts
• Use a unique, strong password (not the same one as your email)
• Periodically review and delete old conversations that contain sensitive topics
• Check if your AI tool offers "temporary chats" that auto-delete (ChatGPT has this feature)`,
      },
    ],
  },
  {
    id: "ai-limitations",
    title: "AI Limitations, Hallucinations & Knowledge Cutoffs",
    icon: Icons.alertTriangle,
    color: "bg-[#8b6914]",
    blocks: [
      {
        subtitle: "AI Is Confidently Wrong — A Lot",
        text: `Here's the most important thing to understand about AI: it doesn't know what it knows. It generates text based on patterns, not understanding. This means it will state something completely false with the same confidence as something completely true.

This is called a "hallucination" — the AI invents facts, cites sources that don't exist, or gives you outdated information as if it's current.

REAL EXAMPLES OF AI HALLUCINATIONS:
• Citing court cases that never happened (lawyers have been fined for this)
• Inventing statistics and attributing them to real organizations
• Generating fake book titles and authors that sound plausible
• Providing medical dosages that are dangerously incorrect
• Listing features of products that don't exist

The danger isn't that AI lies — it's that it doesn't know it's lying. There's no "I'm not sure" flag built in. Every answer comes out sounding authoritative.`,
      },
      {
        subtitle: "Knowledge Cutoffs: AI Doesn't Know What Happened Yesterday",
        text: `Every AI model has a "knowledge cutoff" — a date beyond which it has no information. It's like talking to someone who was frozen in time.

CURRENT CUTOFFS (approximate, as of 2025):
• ChatGPT (GPT-4): Training data up to late 2024 (but can browse the web with Bing)
• Claude: Training data up to early 2025
• Gemini: Has real-time Google Search integration
• Perplexity: Always searches the web in real-time

What this means in practice:
• Ask ChatGPT about an event from last week and it may not know
• Ask about a new law, product, or person and it might hallucinate an answer instead of saying "I don't know"
• Prices, statistics, and "current" data may be years out of date

THE FIX: For anything time-sensitive, use Perplexity (built for real-time research) or ask ChatGPT/Gemini to search the web. Always verify dates and numbers independently.`,
      },
      {
        subtitle: "The Verification Checklist",
        text: `Use this checklist before trusting any AI output for important decisions:

FACTS & NUMBERS:
• Did I verify statistics with the original source?
• Are the dates and timelines accurate?
• Do the names of people, places, and organizations check out?
• If AI cited a source, does that source actually exist?

ADVICE & RECOMMENDATIONS:
• Does this make common sense for my specific situation?
• Would I get similar advice from a qualified human professional?
• Am I relying on AI for something that requires professional certification (legal, medical, financial)?

CONTENT & WRITING:
• Are the claims in this content verifiable?
• Is the tone appropriate for my audience?
• Did I fact-check any quotes or attributions?

QUICK RULE: The higher the stakes, the more you verify. AI brainstorming ideas for a birthday party? Trust away. AI advising on a legal contract? Verify every word.`,
      },
    ],
  },
  {
    id: "when-not-to-use",
    title: "When NOT to Use AI",
    icon: Icons.slashCircle,
    color: "bg-[#5b4a8a]",
    blocks: [
      {
        subtitle: "The Hard Lines: Where AI Should Never Be Your Primary Source",
        text: `AI is an incredible tool. But there are areas where relying on it can be genuinely dangerous:

MEDICAL DECISIONS:
• Never use AI to diagnose a medical condition
• Don't change medications, dosages, or treatments based on AI advice
• AI can help you understand medical terms or prepare questions for your doctor — but it is NOT a doctor
• "ChatGPT said I might have..." is not a diagnosis. See a professional.

LEGAL MATTERS:
• AI-generated legal advice is not legal advice. It's pattern matching.
• Don't draft contracts, wills, or legal filings using AI alone — lawyers have been sanctioned for submitting AI-generated briefs with fake case citations
• AI can help you understand legal concepts, but a lawyer must review anything with real consequences

FINANCIAL DECISIONS:
• Don't make investment decisions based on AI recommendations
• AI doesn't know your complete financial picture, risk tolerance, or tax situation
• It can help you budget, organize, and brainstorm — but a financial advisor should guide major decisions
• Be especially careful with tax advice — tax law is complex and jurisdiction-specific`,
      },
      {
        subtitle: "Situations Where AI Falls Short",
        text: `Beyond the big three (medical, legal, financial), here are other scenarios where AI isn't the right tool:

EMOTIONAL SUPPORT:
• AI can simulate empathy, but it doesn't feel anything. If you're in crisis, contact a real person.
• National Suicide Prevention Lifeline: 988 (call or text)
• Crisis Text Line: Text HOME to 741741
• AI is fine for journaling prompts or processing thoughts — but it's not therapy.

RELATIONSHIP DECISIONS:
• "Should I break up with my partner?" — AI doesn't know your partner, your history, or the nuances
• It can help you organize your thoughts, but the decision must be yours

PARENTING CRITICAL MOMENTS:
• AI can suggest activities and help with homework — but for behavioral concerns, developmental questions, or discipline strategies, talk to a pediatrician or child psychologist

BREAKING NEWS & EMERGENCIES:
• AI models may not have real-time information
• For emergencies, call 911 or your local emergency services
• For breaking news, use established news outlets — not AI`,
      },
      {
        subtitle: "The 'AI-Assisted' Sweet Spot",
        text: `The best approach isn't "never use AI" or "always use AI" — it's knowing where AI adds value and where humans must lead.

AI LEADS (you review):
• First drafts of emails, content, and documents
• Brainstorming and idea generation
• Data organization and formatting
• Research starting points
• Routine scheduling and planning

AI ASSISTS (human leads):
• Medical research (you + your doctor decide)
• Legal document review (you + your lawyer decide)
• Financial planning (you + your advisor decide)
• Job interviews and negotiations (AI helps you prepare, you perform)
• Important relationship communication (AI helps you draft, you personalize)

HUMAN ONLY:
• Final decision-making on life-changing choices
• Emergency situations
• Anything requiring professional licensure or certification
• Situations involving vulnerable people (children, elderly, people in crisis)
• Creative work where authenticity and originality are essential`,
      },
    ],
  },
  {
    id: "ai-ethics",
    title: "AI Ethics, Bias & Copyright",
    icon: Icons.scale,
    color: "bg-[#1e3a5f]",
    blocks: [
      {
        subtitle: "AI Has Biases — And So Does Its Training Data",
        text: `AI models learn from the internet. And the internet has biases — lots of them. This means AI can:

• Reflect stereotypes about gender, race, age, and culture
• Default to Western (often American) perspectives
• Generate content that favors certain viewpoints over others
• Underrepresent minority perspectives and experiences
• Associate certain professions with certain demographics

EXAMPLES YOU MIGHT NOTICE:
• Ask AI to "write about a CEO" and it may default to male pronouns
• Ask for "a family dinner recipe" and you'll likely get Western cuisine
• Ask about history and it may center European/American narratives
• Image generators may default to lighter skin tones

WHAT YOU CAN DO:
• Be specific about representation in your prompts: "Include diverse perspectives"
• Question AI outputs that seem to make assumptions about demographics
• Use AI outputs as starting points, then add your own perspective and knowledge
• If something feels off or stereotypical, push back: "Revise this without gender assumptions"`,
      },
      {
        subtitle: "Copyright: Who Owns What AI Creates?",
        text: `This is one of the most debated topics in AI right now, and the law is still catching up:

AI-GENERATED TEXT:
• In most jurisdictions, purely AI-generated content cannot be copyrighted (you can't own it exclusively)
• However, if you substantially edit and transform AI output, your version may be copyrightable
• The US Copyright Office has ruled that AI-generated works without human authorship are not copyrightable

AI-GENERATED IMAGES:
• Similar rules apply — pure AI art is generally not copyrightable
• Midjourney, DALL-E, and other tools have their own terms about commercial use
• Some artists have sued AI companies for training on their work without permission

PRACTICAL GUIDELINES:
• Don't claim AI-generated work as entirely your own in professional or academic contexts
• Always disclose AI assistance when required (job applications, academic papers, professional work)
• Edit and personalize AI outputs — don't just copy-paste
• Check your industry's rules: journalism, academia, and legal professions have specific AI disclosure requirements
• If you're using AI for commercial content, add your own creative elements to strengthen your ownership claim`,
      },
      {
        subtitle: "Academic Integrity & AI in Schools",
        text: `If you're a student (or the parent of one), this section is critical:

THE CURRENT LANDSCAPE:
• Most schools and universities now have AI use policies — check yours
• Using AI to complete assignments without disclosure is generally considered academic dishonesty
• Penalties range from failing grades to expulsion
• AI detection tools exist (Turnitin, GPTZero) but are not perfectly reliable

HOW TO USE AI ETHICALLY IN SCHOOL:
• Use AI as a tutor: "Explain this concept to me" (learning from AI = good)
• Use AI for brainstorming: "Help me think of essay topics" (getting started = good)
• Don't use AI to write your assignments for you (bypassing learning = bad)
• If you use AI to help edit or improve your work, disclose it
• When in doubt, ask your teacher or professor about their AI policy

FOR PARENTS:
• Talk to your kids about AI use — they're almost certainly using it
• Frame it as a tool (like a calculator) with rules about when it's appropriate
• Help them understand the difference between learning WITH AI and having AI do the work FOR them`,
      },
      {
        subtitle: "Responsible AI Use: A Personal Code of Ethics",
        text: `You don't need to be a philosopher to use AI ethically. Here's a simple framework:

THE 5-QUESTION TEST — before using AI for something, ask yourself:
1. Am I being honest about how this was created? (Transparency)
2. Could this output hurt someone if it's wrong? (Harm prevention)
3. Am I using this to learn or to bypass learning? (Integrity)
4. Would I be comfortable if people knew I used AI for this? (Accountability)
5. Am I reviewing the output before sharing it? (Responsibility)

If you can answer "yes" to all five, you're using AI responsibly.

GOOD AI USE:
✓ Using AI to learn faster and understand complex topics
✓ Using AI to draft content you then review and personalize
✓ Using AI to automate tedious tasks so you can focus on meaningful work
✓ Disclosing AI use when transparency is expected

QUESTIONABLE AI USE:
✗ Submitting AI work as entirely your own in professional or academic settings
✗ Using AI to generate fake reviews, testimonials, or credentials
✗ Relying on AI for decisions that require human expertise and judgment
✗ Blindly trusting AI output without verification`,
      },
    ],
  },
  {
    id: "mobile-desktop",
    title: "Mobile vs. Desktop: Getting the Best Experience",
    icon: Icons.smartphone,
    color: "bg-[#2d6a4f]",
    blocks: [
      {
        subtitle: "Desktop: Your Power Workstation",
        text: `Desktop is where AI shines brightest for serious work:

WHY DESKTOP IS BETTER FOR SERIOUS WORK:
• Larger screen = easier to read, compare, and edit long outputs
• Full keyboard = faster, more detailed prompts
• Easy copy-paste between AI and other apps (docs, spreadsheets, email)
• Multiple tabs open = reference materials alongside your AI conversation
• File upload is smoother (drag and drop documents, images, spreadsheets)

DESKTOP TIPS:
• Use split-screen: AI chat on one side, your document on the other
• Keep commonly used prompts in a text file for quick copy-paste
• Use browser extensions like "ChatGPT Writer" for Gmail integration
• Bookmark your most-used AI tools for one-click access
• If you use multiple AI tools, keep them in separate browser tabs

KEYBOARD SHORTCUTS WORTH KNOWING:
• Shift + Enter = new line without sending (in most AI chat tools)
• Ctrl/Cmd + A = select all text in the input box
• Ctrl/Cmd + C / V = copy and paste (obvious but essential)
• Up arrow = recall your last message (works in ChatGPT)`,
      },
      {
        subtitle: "Mobile: Your AI in Your Pocket",
        text: `Mobile AI isn't just a smaller version of desktop — it has unique advantages:

WHEN MOBILE AI WINS:
• Voice input — talk to AI instead of typing (especially useful while walking, driving, or cooking)
• Quick questions on the go — "What's a good restaurant near me that's quiet for a business lunch?"
• Photo + AI — snap a photo and ask AI about it (ChatGPT and Claude support this)
• Commute time — use dead time to brainstorm, plan, or learn
• Grocery store — "I have chicken, broccoli, and rice. What can I make?"

MOBILE APP TIPS:
• Download the official apps: ChatGPT (iOS/Android), Claude (iOS/Android), Gemini (Android, or via Google app on iOS)
• Enable voice input — it's faster than typing on a phone and most AI apps support it natively
• Use the share sheet — many AI apps let you share text or images directly from other apps
• Widget support — ChatGPT and Gemini offer home screen widgets for instant access

VOICE INPUT IS A GAME CHANGER:
Instead of typing a long prompt, just say it:
"Hey, I need five dinner ideas for tonight. I have salmon in the fridge, we don't eat dairy, and I want something ready in 30 minutes."

Voice input captures natural language beautifully, and AI handles conversational prompts just as well as typed ones. This is especially powerful for people who find typing difficult.`,
      },
      {
        subtitle: "Syncing Across Devices",
        text: `Your AI conversations follow you — if you set it up right:

CHATGPT: Log in with the same account on desktop and mobile. All conversations sync automatically. Custom GPTs and custom instructions carry over.

CLAUDE: Same — log into claude.ai on desktop and use the Claude app on mobile. Projects and conversations are synced.

GEMINI: Tied to your Google account. Access on any device where you're logged into Google.

PERPLEXITY: Log in on any device. Your search history and collections sync.

TIPS FOR SEAMLESS SWITCHING:
• Start a complex project on desktop (where you can type detailed prompts)
• Continue the conversation on mobile when you're away from your desk
• Use the "rename chat" trick: give conversations clear names so you can find them on any device
• Custom instructions set on one device apply everywhere — set them up once on desktop`,
      },
    ],
  },
  {
    id: "cost-comparison",
    title: "AI Tools: Free vs. Paid (Is It Worth It?)",
    icon: Icons.dollarSign,
    color: "bg-[#8b6914]",
    blocks: [
      {
        subtitle: "The Honest Free vs. Paid Breakdown",
        text: `Every major AI tool has a free tier. But free comes with trade-offs:

CHATGPT:
• Free: GPT-3.5 (older, less capable model), limited GPT-4 access, basic features
• Plus ($20/month): GPT-4 (smarter), image generation (DALL-E), file uploads, web browsing, Custom GPTs, voice mode
• Worth it? YES if you use AI daily. The jump from GPT-3.5 to GPT-4 is massive.

CLAUDE:
• Free: Claude Sonnet (capable model), limited daily messages
• Pro ($20/month): More messages, Claude Opus (most capable), Projects, longer conversations, priority access
• Worth it? YES if you do a lot of writing or work with long documents.

GOOGLE GEMINI:
• Free: Basic Gemini model, integration with Google services
• Advanced ($20/month, bundled with Google One AI Premium): Gemini Ultra, 2TB Google storage, deep Gmail/Docs/Sheets integration
• Worth it? YES if you're deep in the Google ecosystem.

PERPLEXITY:
• Free: Limited searches per day, basic model
• Pro ($20/month): Unlimited searches, better models, file uploads, dedicated research features
• Worth it? YES if you do a lot of research. It replaces hours of Googling.`,
      },
      {
        subtitle: "The Real ROI: What $20/Month Actually Saves You",
        text: `People hesitate to pay for AI because it feels like paying for a search engine. But the math tells a different story:

TIME SAVED PER WEEK (CONSERVATIVE):
• Email writing and editing: 2-3 hours saved
• Research and fact-finding: 1-2 hours saved
• Content creation and brainstorming: 2-4 hours saved
• Document summarization and analysis: 1-2 hours saved
• Planning and organization: 1 hour saved

TOTAL: 7-12 hours saved per week

If your time is worth $25/hour, that's $175-300/week in value for $20/month. Even if AI only saves you 2 hours per week, that's $200/month in time value for a $20 investment.

SERVICES AI REPLACES OR REDUCES:
• Grammar checker (Grammarly Premium: $12/month) — AI does this built-in
• Research assistant — used to cost $20-50/hour
• First-draft copywriter — $50-150/article
• Personal tutor — $30-100/hour
• Travel planning service — $100-500 per trip
• Resume writer — $100-500 one-time

You don't need to pay for every tool. Pick ONE primary chatbot, pay for it, and use free tiers of specialized tools for supplementary tasks.`,
      },
      {
        subtitle: "The Smart Spending Strategy",
        text: `You don't need to spend $100/month on AI tools. Here's the optimal setup for different budgets:

$0/MONTH (FREE TIER ONLY):
• ChatGPT Free for general tasks
• Perplexity Free for research
• Canva Free for design
• Limitation: Slower models, usage caps, less privacy

$20/MONTH (SWEET SPOT):
• ChatGPT Plus OR Claude Pro as your primary tool (pick one and stick with it)
• Everything else on free tiers
• This covers 90% of what most people need

$40/MONTH (POWER USER):
• ChatGPT Plus ($20) for general tasks + image generation
• Claude Pro ($20) for writing and long documents
• Free tiers for Perplexity, Canva, etc.

$60+/MONTH (PROFESSIONAL):
• Primary chatbot ($20)
• Perplexity Pro ($20) for research-heavy work
• Midjourney ($10) if you need AI images regularly
• Canva Pro ($13) for design work
• Only if these tools directly support your income

MONEY-SAVING TIP: Most paid AI tools offer monthly subscriptions with no contracts. Subscribe when you need it, cancel when you don't. Use it heavily for a month-long project, then cancel until the next one.`,
      },
    ],
  },
  {
    id: "audience-advice",
    title: "AI for Every Audience",
    icon: Icons.users,
    color: "bg-[#1a7a6d]",
    blocks: [
      {
        subtitle: "AI for Seniors & Late Adopters",
        text: `If you didn't grow up with computers, AI might feel intimidating. But here's the good news: AI is actually EASIER to use than most technology because you just talk to it in plain English.

GETTING STARTED — THE SIMPLEST PATH:
1. Go to chatgpt.com on your computer or phone
2. Create a free account (just needs an email)
3. Type a question like you'd ask a friend: "What's a good recipe for chicken soup?"
4. Read the answer. If you want more detail, just say "Tell me more about step 3"

THAT'S IT. You're now using AI.

GREAT FIRST USES FOR SENIORS:
• "Explain [medical term] in simple language" — understand what your doctor said
• "Help me write an email to [person] about [topic]" — AI writes, you review and send
• "What does this error message on my computer mean?" — tech support in plain English
• "Tell me about [destination] for someone who walks with a cane" — accessible travel planning
• "I'm turning 70. What are the best exercises for balance and joint health?"

TIPS:
• You don't need perfect spelling or grammar — AI understands imperfect input
• You can't break it — there's no wrong button to press
• If the answer is confusing, say "Explain that more simply"
• Try the voice feature — just talk to your phone like you're calling a friend`,
      },
      {
        subtitle: "AI for Students (K-12 through College)",
        text: `AI is the best study tool ever invented — if you use it correctly.

THE GOLDEN RULE: Use AI to LEARN, not to CHEAT.

GOOD USES:
• "Explain photosynthesis like I'm in 8th grade" — personalized tutoring
• "I got this math problem wrong. Here's my work: [paste]. Where did I make a mistake?" — instant tutor
• "Quiz me on Chapter 5 of US History. Ask 10 questions, then grade my answers." — study tool
• "I'm writing an essay about climate change. Help me brainstorm three thesis statements." — starting point
• "I don't understand this passage: [paste]. Break it down for me." — reading comprehension

BAD USES (DON'T DO THESE):
• Having AI write your essay and submitting it as your own
• Copying AI-generated answers on homework without understanding them
• Using AI during exams (unless explicitly allowed)
• Hiding your AI use when your school requires disclosure

STUDY TECHNIQUES THAT WORK:
• The Feynman Method: Explain a concept to AI, then ask it to point out what you got wrong
• Spaced Repetition: Ask AI to create flashcards, then quiz yourself over several days
• Practice Problems: "Give me 5 problems similar to this one but slightly harder each time"
• Essay Prep: Use AI to debate your thesis — it'll help you find weaknesses before your teacher does`,
      },
      {
        subtitle: "AI for Small Business Owners",
        text: `If you run a small business, AI is like hiring a part-time assistant who works 24/7 and costs $20/month:

MARKETING (SAVE 5-10 HOURS/WEEK):
• Social media content: "Write 5 Instagram captions for my bakery. Tone: warm, community-focused. Include a call to action."
• Email newsletters: "Draft this month's newsletter. Highlight: new seasonal menu, upcoming event, and a customer spotlight."
• Ad copy: "Write 3 Facebook ad variations for my plumbing business targeting homeowners in [city]."
• SEO: "What are the top 10 keywords my local bakery should target?"

OPERATIONS (SAVE 3-5 HOURS/WEEK):
• Customer email responses: Paste the customer's message and say "Write a professional, empathetic response"
• Job postings: "Write a job listing for a part-time barista. We value personality over experience."
• SOPs: "Create a step-by-step procedure for closing the shop at night. Include a checklist."
• Inventory: "Here are my sales from last month: [paste]. What items should I restock first?"

STRATEGY (SAVE THOUSANDS IN CONSULTING FEES):
• "I run a [type] business in [location] with [X] employees. Revenue is [Y]. What are 3 things I should focus on this quarter to grow?"
• "Analyze my pricing: [list your prices]. How do I compare to competitors?"
• "I'm thinking about [expansion idea]. Walk me through the risks, costs, and a realistic timeline."

START HERE: Pick the ONE task that takes the most time each week. Try doing it with AI. If it saves you even 30 minutes, the $20/month subscription pays for itself on day one.`,
      },
    ],
  },
  {
    id: "voice-multimodal",
    title: "Voice Assistants & Multimodal AI",
    icon: Icons.mic,
    color: "bg-[#5b4a8a]",
    blocks: [
      {
        subtitle: "Beyond Text: AI That Sees, Hears, and Speaks",
        text: `AI isn't just text boxes anymore. Modern AI tools can process images, audio, and even video. This is called "multimodal AI."

WHAT'S AVAILABLE NOW:

VISION (AI that sees):
• ChatGPT: Upload a photo and ask "What's in this image?" or "How do I fix this?"
• Claude: Upload screenshots, documents, diagrams — it can read and analyze them
• Google Lens + Gemini: Point your phone camera at anything and get information
• Use cases: identifying plants, reading foreign text, getting recipe ideas from a photo of your fridge, debugging error messages from screenshots

VOICE (AI that listens and speaks):
• ChatGPT Voice Mode: Have a real-time conversation with AI — it speaks back naturally
• Claude: Voice input available on mobile
• Gemini Live: Real-time voice conversations with Google's AI
• Use cases: hands-free cooking help, brainstorming while walking, accessibility for people who can't type

DOCUMENT PROCESSING:
• Upload PDFs, spreadsheets, presentations — AI reads and summarizes them
• "Summarize this 50-page report in 5 bullet points"
• "Find every mention of budget in this document and list the amounts"
• Works on ChatGPT, Claude, and Gemini`,
      },
      {
        subtitle: "Siri, Alexa, and Google Assistant vs. AI Chatbots",
        text: `You might be wondering: "I already have Siri/Alexa/Google Assistant. How is this different?"

The difference is massive:

TRADITIONAL VOICE ASSISTANTS (Siri, Alexa, Google Assistant):
• Good at: Setting timers, playing music, checking weather, smart home control
• Bad at: Nuanced questions, creative tasks, multi-step reasoning
• They find information. They don't think.

AI CHATBOTS (ChatGPT, Claude, Gemini):
• Good at: Complex questions, writing, analysis, brainstorming, learning
• Bad at: Real-time device control, playing music, making phone calls
• They reason and create. They don't just search.

THE CONVERGENCE (happening now):
• Apple is integrating AI into Siri (Apple Intelligence)
• Google Assistant is merging with Gemini
• Amazon is upgrading Alexa with more AI capabilities
• Soon, your voice assistant and your AI chatbot will be the same thing

WHAT TO DO NOW:
• Use traditional voice assistants for quick device tasks (timers, reminders, music)
• Use AI chatbots for anything requiring thought (writing, planning, learning)
• Try ChatGPT's voice mode for the best preview of where everything is heading`,
      },
      {
        subtitle: "Practical Voice AI Workflows",
        text: `Voice AI isn't a gimmick — it's genuinely useful in specific situations:

WHILE DRIVING:
• "I just had an idea for my presentation tomorrow. The main point is... [speak freely]. Save this as organized bullet points."
• "I have a meeting at 3 PM with Sarah about the Q2 numbers. Give me 3 good questions to ask."
• Note: Use hands-free mode and prioritize safety.

WHILE COOKING:
• "I'm making the chicken recipe from earlier. What temperature does the oven need to be?"
• "I added too much salt. How do I fix it?"
• "Convert 2 cups to milliliters"

WHILE EXERCISING:
• "Give me a motivational pep talk to finish this run"
• "Plan tomorrow's workout — upper body, 30 minutes, dumbbells only"

FOR BRAINSTORMING:
• Voice is faster than typing for unstructured thoughts
• "I'm thinking through my business plan. Let me talk it out and then you organize my thoughts."
• "I need to make a decision about X. Let me list the pros and cons out loud, then you analyze them."

ACCESSIBILITY:
• Voice AI makes the full power of AI available to people with mobility limitations, visual impairments, or anyone who finds typing difficult
• Combined with screen readers and text-to-speech, AI becomes significantly more accessible than traditional software`,
      },
    ],
  },
  {
    id: "future-trends",
    title: "Where AI Is Heading (2025 and Beyond)",
    icon: Icons.zap,
    color: "bg-[#6b1d1d]",
    blocks: [
      {
        subtitle: "What's Coming in the Next 1-2 Years",
        text: `AI is evolving faster than any technology in history. Here's what's already in development:

AI AGENTS — AI THAT DOES THINGS FOR YOU:
• Today: You ask AI a question and it gives you an answer
• Soon: You'll tell AI a goal and it will complete multi-step tasks automatically
• Example: "Book me a flight to Denver next Friday, find a hotel near downtown under $200, and add both to my calendar" — AI does all of it
• Companies working on this: OpenAI, Anthropic, Google, Microsoft

PERSONALIZED AI THAT TRULY KNOWS YOU:
• AI will remember every conversation you've ever had (with your permission)
• It will understand your preferences, habits, writing style, and goals without you repeating yourself
• Think of it as a personal assistant that actually gets better every day

AI IN EVERY APP:
• Email will auto-draft responses in your voice
• Spreadsheets will analyze themselves
• Presentations will generate from a single paragraph description
• Photo editing will be as simple as describing what you want changed
• This is already starting with Microsoft Copilot, Google Workspace AI, and Apple Intelligence`,
      },
      {
        subtitle: "What's Coming in 3-5 Years",
        text: `These predictions are more speculative but grounded in current research:

AI TUTORS FOR EVERYONE:
• Personalized education that adapts to each student's pace and style
• Every child could have a private tutor available 24/7
• This could fundamentally change how schools work

AI HEALTHCARE ASSISTANTS:
• AI that monitors your health data and flags concerns before you notice symptoms
• AI that helps doctors diagnose faster and more accurately
• Personalized treatment plans based on your specific genetics and health history
• Note: AI will assist doctors, not replace them

AI-POWERED WORK:
• Many routine knowledge-work tasks will be heavily automated
• New jobs will emerge around managing and directing AI
• The skills that matter most: creativity, judgment, emotional intelligence, and knowing how to work WITH AI

THE PHYSICAL WORLD:
• Self-driving vehicles will become more common
• Robots with AI will handle more household and industrial tasks
• AI will optimize energy grids, supply chains, and city infrastructure`,
      },
      {
        subtitle: "How to Stay Ahead (Without Being Overwhelmed)",
        text: `The pace of AI change can feel overwhelming. Here's how to stay informed without making it a full-time job:

THE 15-MINUTE WEEKLY ROUTINE:
1. Follow 2-3 AI news sources (The Verge, Ars Technica, or Ben's Bites newsletter)
2. Spend 15 minutes each Monday skimming headlines
3. If something seems relevant to YOUR life or work, dig deeper. If not, skip it.

THE MONTHLY EXPERIMENT:
• Once a month, try ONE new AI feature or tool you haven't used before
• It could be voice mode, image generation, a new tool like Perplexity, or a feature you overlooked
• Small, consistent experiments compound into expertise over time

WHAT NOT TO WORRY ABOUT:
• You don't need to learn to code
• You don't need to understand how neural networks work
• You don't need to try every new AI tool that launches
• You don't need to read research papers
• You DO need to: use AI regularly, stay curious, and adapt when something clearly better comes along

THE SINGLE BEST STRATEGY: Just keep using AI. The people who will thrive in an AI-powered world aren't the ones with the most technical knowledge — they're the ones who've built the habit of using AI effectively in their daily life. And that's exactly what this playbook taught you to do.`,
      },
    ],
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation: Connecting AI to Everything",
    icon: Icons.link,
    color: "bg-[#1e3a5f]",
    blocks: [
      {
        subtitle: "What Is Workflow Automation (And Why Should You Care)?",
        text: `Workflow automation means connecting different apps and services so they work together automatically — without you doing anything manually.

SIMPLE EXAMPLE:
• Trigger: You receive an email with an attachment
• Automation: AI summarizes the attachment and saves the summary to your notes app
• Result: By the time you check your notes, the summary is already there

This isn't science fiction. It's available right now, and you don't need to know how to code.

THE BIG THREE AUTOMATION PLATFORMS:
1. Zapier (zapier.com) — The most popular. Connects 6,000+ apps. Has a free tier.
2. Make (make.com, formerly Integromat) — More powerful, more visual. Better for complex workflows.
3. IFTTT (ifttt.com) — Simpler, best for personal automations (smart home, social media).

All three now have AI built in, which means your automations can do intelligent things — not just move data from A to B, but analyze, summarize, and decide.`,
      },
      {
        subtitle: "10 Automations You Can Set Up Today",
        text: `These require no coding. Just a Zapier or Make account (free tier works for most):

1. EMAIL → SUMMARY: New emails from VIPs get summarized by AI and sent to Slack/Teams
2. FORM SUBMISSION → RESPONSE: Customer inquiry form automatically generates a personalized reply draft
3. SOCIAL MEDIA → CONTENT: Monitor mentions of your brand and get AI-generated response suggestions
4. CALENDAR → PREP: 30 minutes before each meeting, AI sends you a briefing based on the attendee and agenda
5. RSS → DIGEST: AI reads your favorite blogs/news and sends you a daily summary of what matters
6. INVOICE → TRACKING: New invoices emailed to you are automatically categorized and logged in a spreadsheet
7. MEETING NOTES → ACTION ITEMS: After each Zoom call, transcription is sent to AI which extracts action items
8. NEW HIRE → ONBOARDING: When someone is added to your HR tool, AI generates a personalized welcome message
9. SUPPORT TICKET → DRAFT: Customer support tickets get an AI-drafted response for your review
10. CONTENT → DISTRIBUTION: Write one blog post, AI generates social media posts for 5 platforms

START WITH #1 OR #5 — they take 10 minutes to set up and save hours per week.`,
      },
      {
        subtitle: "Setting Up Your First Automation (Step by Step)",
        text: `Let's build automation #5 (daily AI news digest) as a walkthrough:

STEP 1: Go to zapier.com and create a free account

STEP 2: Click "Create Zap" (a "Zap" is an automation)

STEP 3: Set your trigger:
• App: RSS by Zapier
• Trigger: New Item in Feed
• Paste the RSS feed URL of a blog you follow

STEP 4: Add an AI step:
• App: ChatGPT (Zapier has a built-in integration)
• Action: Conversation
• Prompt: "Summarize this article in 3 bullet points. Then tell me if this is relevant to [your industry/interests]. Article: [insert RSS content from Step 3]"

STEP 5: Add your delivery step:
• App: Gmail (or Slack, or Notion)
• Action: Send Email
• To: Your email address
• Subject: "Daily AI Digest: [article title]"
• Body: The AI summary from Step 4

STEP 6: Turn it on. Now every time that blog publishes a new article, you'll get an AI-powered summary delivered automatically.

TOTAL SETUP TIME: 10-15 minutes
TIME SAVED: 30+ minutes per day of reading and filtering

Once you've built one automation, you'll start seeing opportunities everywhere.`,
      },
    ],
  },
  {
    id: "creative-workflows",
    title: "Deep-Dive: Creative Workflows with AI",
    icon: Icons.palette,
    color: "bg-[#8b6914]",
    blocks: [
      {
        subtitle: "AI as a Creative Collaborator (Not a Replacement)",
        text: `The best creative work with AI happens when you treat it as a collaborator — not a vending machine:

VENDING MACHINE APPROACH (mediocre results):
• "Write me a blog post about productivity"
• AI gives you a generic 800-word article
• You publish it. It sounds like everyone else's content.

COLLABORATOR APPROACH (excellent results):
• "I want to write about productivity, but from the angle that most productivity advice is toxic. My audience is burned-out millennials who've tried everything."
• AI gives you a draft with that specific angle
• "Good start. The intro is too generic. Start with a provocative statement."
• AI revises with your direction
• "Now make the conclusion more personal. I want to end with my own experience."
• Final version sounds like YOU, not like AI.

THE CREATIVE PROCESS WITH AI:
1. YOU bring the vision, voice, and perspective
2. AI brings speed, options, and structure
3. YOU direct and refine
4. AI iterates and expands
5. YOU make the final decisions

This applies to writing, art, music, video — any creative field.`,
      },
      {
        subtitle: "Writing Workflows: From Blank Page to Final Draft",
        text: `Here's a complete creative writing workflow for blog posts, essays, newsletters, or any long-form content:

PHASE 1 — IDEATION (5 minutes):
Prompt: "I write about [topic] for [audience]. Give me 10 article ideas that haven't been overdone. For each, give me a one-line hook that would make someone stop scrolling."
Pick your favorite. Or combine two ideas.

PHASE 2 — OUTLINE (5 minutes):
Prompt: "Here's my article idea: [paste]. Create a detailed outline with: a compelling intro approach, 4-6 main sections, key points under each, and a strong conclusion."
Edit the outline — add your own ideas, remove sections that don't fit.

PHASE 3 — FIRST DRAFT (10 minutes):
Prompt: "Write the full article based on this outline: [paste]. Write in a [conversational/authoritative/humorous] tone. Use short paragraphs. Include at least 2 specific examples. Length: [target word count]."
Don't expect perfection. This is raw material.

PHASE 4 — REVISION (15 minutes):
• Read through and mark what works and what doesn't
• "Rewrite section 3. It's too generic. Add a specific example from [industry/experience]."
• "The intro doesn't hook me. Start with a question or a bold statement."
• "Cut 200 words. Remove anything that doesn't add new information."

PHASE 5 — YOUR VOICE (10 minutes):
• This is the step most people skip, and it's the most important
• Read the draft out loud. Does it sound like you?
• Add your personal anecdotes, opinions, and experiences
• Remove any phrase that feels "AI-ish" (e.g., "In today's fast-paced world...")

TOTAL TIME: ~45 minutes for an article that would normally take 3-4 hours.`,
      },
      {
        subtitle: "Visual & Design Workflows",
        text: `AI image generation is incredible for people who can't draw, design, or afford a graphic designer:

FOR SOCIAL MEDIA:
• Use ChatGPT (DALL-E): "Create a clean, minimalist Instagram graphic about [topic]. White background, modern typography, professional feel."
• Use Canva AI: Open Canva, describe what you want, and it generates templates you can customize
• Tip: Always specify a style ("minimalist," "vintage," "corporate," "playful") for consistent results

FOR PRESENTATIONS:
• Use AI to generate custom illustrations for slides instead of generic stock photos
• Prompt: "Create a simple, professional illustration showing [concept]. Style: flat design, blue and white color scheme, no text."
• Tools: DALL-E (via ChatGPT), Midjourney, or Canva's AI image generator

FOR PERSONAL PROJECTS:
• Custom invitations: "Design a birthday party invitation for a 7-year-old's dinosaur theme party."
• Home decor: "Show me how a mid-century modern bookshelf would look in a room with sage green walls"
• Gift ideas: "Create a watercolor-style illustration of a golden retriever named Max for a custom print"

FOR PHOTO EDITING:
• ChatGPT can now edit photos: "Remove the background" or "Make this look like a professional headshot"
• "Extend this image to make it wider" (outpainting)
• "Change the color of the shirt in this photo to navy blue"

IMPORTANT: AI-generated images may not be copyrightable. If you're using them commercially, add your own creative elements or use them as inspiration for human-created designs.`,
      },
    ],
  },
  {
    id: "accessibility",
    title: "AI & Accessibility: AI for Everyone",
    icon: Icons.eye,
    color: "bg-[#2d6a4f]",
    blocks: [
      {
        subtitle: "How AI Is Making Technology More Accessible",
        text: `AI is one of the most transformative technologies for people with disabilities:

FOR VISUAL IMPAIRMENTS:
• AI can describe images in detail: upload a photo and ask "Describe everything in this image"
• Screen readers work with AI chatbots — most major tools (ChatGPT, Claude) are screen-reader compatible
• AI can read and summarize documents, making information accessible without needing to visually scan pages
• "Be My Eyes" app uses ChatGPT to describe the world through your phone camera in real time

FOR HEARING IMPAIRMENTS:
• AI transcription tools (Otter.ai, Google Live Caption) convert speech to text in real-time
• AI can summarize audio content (podcasts, meetings, videos) in text form
• ChatGPT and Claude are entirely text-based, making them fully accessible to deaf and hard-of-hearing users

FOR MOTOR/MOBILITY LIMITATIONS:
• Voice input means you don't need to type — just speak your prompts
• AI can reduce the number of interactions needed: one prompt can replace dozens of clicks and keystrokes
• Automation (Zapier, Make) can handle repetitive tasks that require many manual steps

FOR COGNITIVE/LEARNING DIFFERENCES:
• AI can explain complex topics in simpler language: "Explain this like I'm 10"
• It can reformat information into more accessible structures (bullet points, step-by-step)
• For people with ADHD: AI can break large tasks into small, manageable steps with deadlines
• For people with dyslexia: AI can clean up written text, suggest clearer phrasing, and read content aloud`,
      },
      {
        subtitle: "Making Your AI Experience More Accessible",
        text: `If you or someone you help has accessibility needs, here are specific settings and techniques:

INCREASE READABILITY:
• Ask AI to "use short sentences and simple words"
• Request bullet points instead of paragraphs
• Ask for step-by-step instructions with numbered lists
• Say "Explain this without technical jargon"

USE VOICE FEATURES:
• ChatGPT mobile app: Tap the headphone icon for voice mode
• Google Gemini: "Hey Google" activates voice on Android
• Most phones have built-in voice-to-text (dictation) that works in any AI chat
• Tip: Voice input is often more natural than typing for people who struggle with keyboards

CUSTOMIZE YOUR EXPERIENCE:
• In your Custom Instructions, add: "I have [specific need]. Please always [accommodation]."
• Examples:
  - "I have low vision. Please use large, clear formatting with lots of white space between sections."
  - "I have ADHD. Keep answers short, use bullet points, and highlight the most important action item."
  - "I'm learning English as a second language. Use simple vocabulary and short sentences."
  - "I use a screen reader. Avoid emojis and describe any images or tables in plain text."

These instructions persist across every conversation, so you set them once.`,
      },
      {
        subtitle: "AI Tools Specifically Designed for Accessibility",
        text: `Beyond the major chatbots, these AI-powered tools are designed with accessibility in mind:

BE MY EYES (Free):
• Uses AI + volunteers to help blind and low-vision users
• Point your camera at anything — a menu, a product label, a street sign — and AI describes it
• Recently integrated ChatGPT for instant, detailed image descriptions

OTTER.AI ($17/month):
• Real-time meeting transcription
• Essential for deaf and hard-of-hearing professionals
• Creates searchable transcripts of every meeting

SPEECHIFY (Free + $12/month):
• Text-to-speech that reads any document, website, or PDF aloud
• Multiple natural-sounding voices
• Great for people with dyslexia or visual impairments

GOOGLE LOOKOUT (Free, Android):
• Identifies objects, reads text, and describes scenes through your phone camera
• Designed for blind and low-vision users

MICROSOFT IMMERSIVE READER (Free, built into Microsoft apps):
• Reads text aloud, adjusts spacing and font size, translates in real-time
• Available in Word, OneNote, Teams, and Edge browser

THE BOTTOM LINE: AI's natural language interface is inherently more accessible than traditional software. You don't need to navigate menus, remember keyboard shortcuts, or click tiny buttons. You just describe what you need in your own words. This is why AI adoption among people with disabilities is growing faster than in the general population — it genuinely removes barriers.`,
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

export default async function PlaybookPage() {
  const session = await getSession();
  const userDisplayName = session?.email ?? "Valued Reader";
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

            {/* Essential Knowledge */}
            <span
              className="mt-2 w-full rounded-lg px-3 py-2 text-xs font-bold tracking-wider uppercase"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Essential Knowledge
            </span>
            {essentialKnowledgeSections.map((s) => (
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
        {/* Personalized PDF header — visible only in print */}
        <div className="pdf-personalized-header">
          <p className="pdf-prepared-for">This report has been prepared for <strong>{userDisplayName}</strong></p>
          <p className="pdf-disclaimer">CONFIDENTIAL — This document is licensed for personal use only. Redistribution, sharing, or reproduction in any form is strictly prohibited. This PDF contains personally identifiable information tied to your account. Unauthorized sharing may expose your personal data to third parties. By downloading, you agree to these terms.</p>
        </div>

        {/* PDF Table of Contents — visible only in print */}
        <div className="pdf-toc">
          <h2 className="pdf-toc-title">Table of Contents</h2>

          <div className="pdf-toc-group">
            <p className="pdf-toc-label">Part 1 — Foundations</p>
            <p className="pdf-toc-item">The History &amp; Science of AI (Coming soon)</p>
          </div>

          <div className="pdf-toc-group">
            <p className="pdf-toc-label">Part 2 — Prompt Mastery</p>
            {promptMasterySections.map((s) => (
              <p key={s.id} className="pdf-toc-item">{s.title}</p>
            ))}
          </div>

          <div className="pdf-toc-group">
            <p className="pdf-toc-label">Best Practices</p>
            {bestPracticesSections.map((s) => (
              <p key={s.id} className="pdf-toc-item">{s.title}</p>
            ))}
          </div>

          <div className="pdf-toc-group">
            <p className="pdf-toc-label">Essential Knowledge</p>
            {essentialKnowledgeSections.map((s) => (
              <p key={s.id} className="pdf-toc-item">{s.title}</p>
            ))}
          </div>

          <div className="pdf-toc-group">
            <p className="pdf-toc-label">Part 3 — Real-World Applications</p>
            {applicationSections.map((s) => (
              <p key={s.id} className="pdf-toc-item">{s.title}</p>
            ))}
          </div>

          <div className="pdf-toc-group">
            <p className="pdf-toc-label">Part 4 — Bonus</p>
            {bonusContent.map((b) => (
              <p key={b.id} className="pdf-toc-item">{b.title}</p>
            ))}
          </div>
        </div>

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

        {/* ─── ESSENTIAL KNOWLEDGE ─── */}
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
              Essential Knowledge
            </p>
            <h2
              className="mt-2 text-center text-3xl font-bold"
              style={{ color: "var(--warm-gray-900)" }}
            >
              What Every AI User Needs to Know
            </h2>
            <p
              className="mt-3 text-center text-lg"
              style={{ color: "var(--warm-gray-500)" }}
            >
              Privacy, limitations, ethics, accessibility, and the future of AI
              — the knowledge that keeps you safe and informed.
            </p>
          </div>
        </div>

        {essentialKnowledgeSections.map((section) => (
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
