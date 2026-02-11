import Link from "next/link";

const freePreview = [
  {
    category: "Personal Life",
    icon: "🏠",
    color: "from-blue-500 to-cyan-500",
    tip: "Plan Your Entire Week of Meals in 30 Seconds",
    description:
      'Open ChatGPT or Claude, type: "Plan 5 healthy dinners for a family of 4 with a $75 grocery budget. Give me a shopping list organized by aisle." That\'s it. You just saved an hour of meal planning.',
    tools: "ChatGPT, Claude, Gemini",
  },
  {
    category: "Work",
    icon: "💼",
    color: "from-indigo-500 to-purple-500",
    tip: "Write Emails That Actually Sound Like You — in Half the Time",
    description:
      'Paste a difficult email you received and say: "Write a professional but warm reply that agrees to the meeting but asks to push it to next week." Then tell it to match your tone. Done in 30 seconds instead of 15 minutes.',
    tools: "ChatGPT, Claude, Gemini",
  },
  {
    category: "Recreation",
    icon: "🎮",
    color: "from-pink-500 to-rose-500",
    tip: "Plan a Trip That Actually Fits Your Vibe",
    description:
      '"I have 4 days off, a $1,500 budget, I like hiking but hate crowds, and I fly out of Chicago. Plan my trip." You\'ll get a full itinerary with hotels, activities, and restaurants — tailored to you, not a generic travel blog.',
    tools: "ChatGPT, Claude, Perplexity",
  },
];

const fullPlaybookFeatures = [
  {
    title: "Personal AI Mastery",
    items: [
      "Meal planning & grocery optimization",
      "AI-powered budgeting & finance tracking",
      "Home organization & decluttering systems",
      "Health & fitness planning with AI",
      "Smart parenting: homework help, scheduling, activities",
      "AI for gift ideas, event planning, and more",
    ],
  },
  {
    title: "AI at Work",
    items: [
      "Email writing that saves hours per week",
      "Meeting notes & action items on autopilot",
      "Presentations and reports in minutes",
      "Resume & LinkedIn optimization",
      "Side hustle ideas powered by AI",
      "Automating the boring parts of your job",
    ],
  },
  {
    title: "AI for Fun",
    items: [
      "Trip planning that actually works",
      "Movie, book & music recommendations",
      "Learning new hobbies with AI tutoring",
      "Creative writing & storytelling",
      "AI art and photo editing",
      "Party planning & social events",
    ],
  },
  {
    title: "Bonus Content",
    items: [
      "Vibe Coding: build apps without being a programmer",
      "Prompt Engineering Cheat Sheet (copy & paste templates)",
      "Top 10 AI tools ranked and compared",
      "Common mistakes that make AI give bad answers",
      "How to tell when AI is wrong (and what to do about it)",
      "Future-proof: what's coming next in AI",
    ],
  },
];

const faqs = [
  {
    q: "Do I need to be tech-savvy to use this?",
    a: "Not at all. This was written for people who use their phone and a computer — that's the only prerequisite. Every guide is step-by-step with real examples you can copy and paste.",
  },
  {
    q: "Which AI tools do I need?",
    a: "Most guides use free tools like ChatGPT (free version), Claude (free version), and Google Gemini. We tell you exactly which tool to use for each task and link you directly to it.",
  },
  {
    q: "What if I already use ChatGPT sometimes?",
    a: "Then you're using maybe 5% of what it can do. This playbook shows you the other 95% — the stuff that actually saves time and makes your life easier.",
  },
  {
    q: "Is this a subscription?",
    a: "No. One payment of $29.99, and you get lifetime access to the full playbook plus any future updates.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If you don't find it useful within 7 days, email us and we'll refund you — no questions asked.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Working mom of 3",
    text: "I used to spend Sunday nights meal planning. Now I do it in 2 minutes with AI. This playbook showed me how.",
  },
  {
    name: "James T.",
    role: "Small business owner",
    text: "I was spending hours on emails and proposals. Now AI drafts them and I just tweak. Bought myself back 5 hours a week.",
  },
  {
    name: "Lisa K.",
    role: "Teacher",
    text: "I was scared of AI. This playbook made it feel like learning to use Google for the first time. Now I can't imagine life without it.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold tracking-tight">
            <span className="gradient-text">The AI Playbook</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#preview"
              className="hidden text-sm text-gray-600 hover:text-gray-900 sm:block"
            >
              Free Preview
            </a>
            <a
              href="#full-playbook"
              className="hidden text-sm text-gray-600 hover:text-gray-900 sm:block"
            >
              Full Playbook
            </a>
            <a
              href="#pricing"
              className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Get Full Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700">
            No tech background needed
          </div>
          <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Stop Being Confused by AI.
            <br />
            <span className="gradient-text">Start Using It.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
            A practical, no-jargon playbook that shows you exactly how to use AI
            in your <strong>personal life</strong>, at <strong>work</strong>, and
            for <strong>fun</strong>. Real examples you can copy and paste —
            results in minutes.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="pulse-cta rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-indigo-700"
            >
              Get the Full Playbook — $29.99
            </a>
            <a
              href="#preview"
              className="rounded-full border border-gray-200 px-8 py-4 text-lg font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              See Free Preview
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            One-time payment. Lifetime access. 7-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-t border-gray-100 bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">
            AI is everywhere. Nobody taught you how to use it.
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Your kids are using it for homework. Your coworkers are using it to
            get ahead. Headlines say it&apos;ll change everything. But when you
            sit down and try it, you get... mediocre results and more confusion.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 text-3xl">😩</div>
              <p className="font-medium text-gray-900">
                &quot;I tried ChatGPT but didn&apos;t know what to ask&quot;
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 text-3xl">😤</div>
              <p className="font-medium text-gray-900">
                &quot;It gave me generic answers that weren&apos;t helpful&quot;
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 text-3xl">😰</div>
              <p className="font-medium text-gray-900">
                &quot;I feel like I&apos;m falling behind everyone else&quot;
              </p>
            </div>
          </div>
          <p className="mt-8 text-lg font-medium text-indigo-600">
            The AI Playbook fixes all of this. In plain English.
          </p>
        </div>
      </section>

      {/* Free Preview Section */}
      <section id="preview" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mb-3 text-sm font-semibold tracking-wide text-indigo-600 uppercase">
              Free Preview
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
              Try 3 AI tricks right now — on us
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              These are real examples from the playbook. Copy, paste, and see the
              results for yourself. The full playbook has 20+ guides like these.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {freePreview.map((item) => (
              <div
                key={item.category}
                className="card-hover overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div
                  className={`bg-gradient-to-r ${item.color} px-6 py-4 text-white`}
                >
                  <span className="mr-2 text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {item.tip}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Works with:</span>
                    <span className="font-medium text-gray-500">
                      {item.tools}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-lg font-medium text-gray-700">
              That was just 3 out of 25+ guides in the full playbook.
            </p>
            <a
              href="#pricing"
              className="inline-block rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Unlock Everything
            </a>
          </div>
        </div>
      </section>

      {/* Full Playbook Contents */}
      <section
        id="full-playbook"
        className="border-t border-gray-100 bg-gray-50 px-6 py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mb-3 text-sm font-semibold tracking-wide text-indigo-600 uppercase">
              Full Playbook
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
              Everything inside the AI Playbook
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              25+ step-by-step guides, copy-paste prompts, and real-world
              examples across every area of your life.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {fullPlaybookFeatures.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
              >
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <span className="mt-0.5 text-indigo-500">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
              People like you are already using this
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 text-indigo-400">★★★★★</div>
                <p className="mb-4 text-gray-700">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="border-t border-gray-100 bg-gradient-to-b from-indigo-50 to-white px-6 py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
            Get the full AI Playbook
          </h2>
          <p className="mb-10 text-gray-600">
            Less than a dinner out. More useful than a college course.
          </p>

          <div className="rounded-3xl border-2 border-indigo-200 bg-white p-8 shadow-lg sm:p-10">
            <div className="mb-2 text-sm font-semibold text-indigo-600 uppercase">
              Lifetime Access
            </div>
            <div className="mb-1 text-5xl font-extrabold text-gray-900">
              $29.99
            </div>
            <p className="mb-8 text-gray-500">One-time payment. No subscription.</p>

            <ul className="mb-8 space-y-3 text-left">
              {[
                "25+ step-by-step AI guides",
                "Copy-paste prompt templates",
                "Personal, Work & Recreation sections",
                "Vibe Coding bonus chapter",
                "Prompt Engineering cheat sheet",
                "Top 10 AI tools comparison",
                "Free updates as AI evolves",
                "7-day money-back guarantee",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs text-indigo-600">
                    ✓
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <form action="/api/checkout" method="POST">
              <button
                type="submit"
                className="pulse-cta w-full cursor-pointer rounded-full bg-indigo-600 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-indigo-700"
              >
                Get Instant Access
              </button>
            </form>
            <p className="mt-3 text-xs text-gray-400">
              Secure payment via Stripe. Works with all major cards, Apple Pay &
              Google Pay.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-gray-100 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-2 font-semibold text-gray-900">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-100 bg-gray-900 px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to stop guessing and start using AI?
          </h2>
          <p className="mb-8 text-gray-400">
            Join thousands of people who went from &quot;I don&apos;t get AI&quot; to
            &quot;I can&apos;t believe I waited this long.&quot;
          </p>
          <a
            href="#pricing"
            className="inline-block rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Get the AI Playbook — $29.99
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} The AI Playbook. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy
            </Link>
            <a href="mailto:support@theaiplaybook.com" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
