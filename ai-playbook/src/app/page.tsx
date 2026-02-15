import Link from "next/link";

const freePreview = [
  {
    category: "Personal Life",
    icon: "🏠",
    color: "bg-[#1e3a5f]",
    tip: "Plan Your Entire Week of Meals in 30 Seconds",
    description:
      'Open ChatGPT or Claude, type: "Plan 5 healthy dinners for a family of 4 with a $75 grocery budget. Give me a shopping list organized by aisle." That\'s it. You just saved an hour of meal planning.',
    tools: "ChatGPT, Claude, Gemini",
  },
  {
    category: "Work",
    icon: "💼",
    color: "bg-[#1a7a6d]",
    tip: "Write Emails That Actually Sound Like You — in Half the Time",
    description:
      'Paste a difficult email you received and say: "Write a professional but warm reply that agrees to the meeting but asks to push it to next week." Then tell it to match your tone. Done in 30 seconds instead of 15 minutes.',
    tools: "ChatGPT, Claude, Gemini",
  },
  {
    category: "Recreation",
    icon: "🎯",
    color: "bg-[#8b6914]",
    tip: "Plan a Trip That Actually Fits Your Style",
    description:
      '"I have 4 days off, a $1,500 budget, I like hiking but hate crowds, and I fly out of Chicago. Plan my trip." You\'ll get a full itinerary with hotels, activities, and restaurants — tailored to you, not a generic travel blog.',
    tools: "ChatGPT, Claude, Perplexity",
  },
];

const fullPlaybookFeatures = [
  {
    title: "Personal AI Mastery",
    icon: "🏠",
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
    icon: "💼",
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
    icon: "🎯",
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
    icon: "🎁",
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
    role: "Retired teacher",
    text: "I was nervous about AI. This playbook made it feel like learning to use Google for the first time. Now I use it every single day.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      {/* Navigation */}
      <nav className="no-print fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "rgba(250, 248, 245, 0.95)", backdropFilter: "blur(8px)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">The AI Playbook</span>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#preview"
              className="hidden text-base hover:underline sm:block"
              style={{ color: "var(--warm-gray-600)" }}
            >
              Free Preview
            </a>
            <a
              href="#full-playbook"
              className="hidden text-base hover:underline sm:block"
              style={{ color: "var(--warm-gray-600)" }}
            >
              Full Playbook
            </a>
            <Link
              href="/login"
              className="hidden text-base font-medium hover:underline sm:block"
              style={{ color: "var(--warm-gray-600)" }}
            >
              Log In
            </Link>
            <a
              href="#pricing"
              className="btn-primary rounded-lg px-6 py-3 text-base font-semibold text-white"
            >
              Get Full Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-36 pb-24">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--warm-gray-100), var(--cream))" }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-block rounded-lg px-5 py-2 text-base font-medium" style={{ backgroundColor: "var(--teal-light)", color: "var(--teal)" }}>
            No tech background needed — written in plain English
          </div>
          <h1 className="mb-8 text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl" style={{ color: "var(--warm-gray-900)" }}>
            Stop Being Confused by AI.
            <br />
            <span className="gradient-text">Start Using It Today.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>
            A practical, no-jargon playbook that shows you exactly how to use AI
            in your <strong style={{ color: "var(--warm-gray-800)" }}>personal life</strong>, at <strong style={{ color: "var(--warm-gray-800)" }}>work</strong>, and
            for <strong style={{ color: "var(--warm-gray-800)" }}>fun</strong>. Real examples you can copy and paste —
            results in minutes.
          </p>
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a
              href="#pricing"
              className="pulse-cta rounded-lg px-10 py-5 text-xl font-semibold text-white shadow-md"
              style={{ backgroundColor: "var(--navy)" }}
            >
              Get the Full Playbook — $29.99
            </a>
            <a
              href="#preview"
              className="rounded-lg border-2 px-10 py-5 text-xl font-medium transition-colors"
              style={{ borderColor: "var(--warm-gray-300)", color: "var(--warm-gray-700)" }}
            >
              See Free Preview
            </a>
          </div>
          <p className="mt-6 text-base" style={{ color: "var(--warm-gray-600)" }}>
            One-time payment. Lifetime access. 7-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-t px-6 py-24" style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "var(--warm-white)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold tracking-tight" style={{ color: "var(--warm-gray-900)" }}>
            AI is everywhere. But nobody taught you how to use it.
          </h2>
          <p className="mb-10 text-xl leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>
            Your kids are using it for homework. Your coworkers are using it to
            get ahead. Headlines say it&apos;ll change everything. But when you
            sit down and try it, you get... mediocre results and more confusion.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-sm" style={{ border: "1px solid var(--warm-gray-200)" }}>
              <div className="mb-4 text-4xl">😩</div>
              <p className="text-lg font-medium" style={{ color: "var(--warm-gray-800)" }}>
                &quot;I tried ChatGPT but didn&apos;t know what to ask&quot;
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-sm" style={{ border: "1px solid var(--warm-gray-200)" }}>
              <div className="mb-4 text-4xl">😤</div>
              <p className="text-lg font-medium" style={{ color: "var(--warm-gray-800)" }}>
                &quot;It gave me generic answers that weren&apos;t helpful&quot;
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-sm" style={{ border: "1px solid var(--warm-gray-200)" }}>
              <div className="mb-4 text-4xl">😰</div>
              <p className="text-lg font-medium" style={{ color: "var(--warm-gray-800)" }}>
                &quot;I feel like I&apos;m falling behind everyone else&quot;
              </p>
            </div>
          </div>
          <p className="mt-10 text-xl font-semibold" style={{ color: "var(--teal)" }}>
            The AI Playbook fixes all of this. In plain English.
          </p>
        </div>
      </section>

      {/* Free Preview Section */}
      <section id="preview" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <div className="mb-4 text-base font-semibold tracking-wide uppercase" style={{ color: "var(--teal)" }}>
              Free Preview
            </div>
            <h2 className="mb-5 text-3xl font-bold tracking-tight" style={{ color: "var(--warm-gray-900)" }}>
              Try 3 AI tips right now — on us
            </h2>
            <p className="mx-auto max-w-2xl text-lg" style={{ color: "var(--warm-gray-600)" }}>
              These are real examples from the playbook. Copy, paste, and see the
              results for yourself. The full playbook has 20+ guides like these.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {freePreview.map((item) => (
              <div
                key={item.category}
                className="card-hover overflow-hidden rounded-xl bg-white shadow-sm"
                style={{ border: "1px solid var(--warm-gray-200)" }}
              >
                <div
                  className={`${item.color} px-6 py-5 text-white`}
                >
                  <span className="mr-2 text-2xl">{item.icon}</span>
                  <span className="text-base font-semibold uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-4 text-xl font-bold" style={{ color: "var(--warm-gray-900)" }}>
                    {item.tip}
                  </h3>
                  <p className="mb-5 text-base leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm" style={{ color: "var(--warm-gray-600)" }}>
                    <span>Works with:</span>
                    <span className="font-semibold" style={{ color: "var(--warm-gray-700)" }}>
                      {item.tools}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="mb-5 text-xl font-medium" style={{ color: "var(--warm-gray-700)" }}>
              That was just 3 out of 25+ guides in the full playbook.
            </p>
            <a
              href="#pricing"
              className="inline-block rounded-lg px-10 py-4 text-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: "var(--navy)" }}
            >
              Unlock Everything
            </a>
          </div>
        </div>
      </section>

      {/* Full Playbook Contents */}
      <section
        id="full-playbook"
        className="border-t px-6 py-24"
        style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "var(--warm-white)" }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <div className="mb-4 text-base font-semibold tracking-wide uppercase" style={{ color: "var(--teal)" }}>
              Full Playbook
            </div>
            <h2 className="mb-5 text-3xl font-bold tracking-tight" style={{ color: "var(--warm-gray-900)" }}>
              Everything inside the AI Playbook
            </h2>
            <p className="mx-auto max-w-2xl text-lg" style={{ color: "var(--warm-gray-600)" }}>
              25+ step-by-step guides, copy-paste prompts, and real-world
              examples across every area of your life.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {fullPlaybookFeatures.map((section) => (
              <div
                key={section.title}
                className="rounded-xl bg-white p-8 shadow-sm"
                style={{ border: "1px solid var(--warm-gray-200)" }}
              >
                <h3 className="mb-5 text-2xl font-bold" style={{ color: "var(--warm-gray-900)" }}>
                  <span className="mr-2">{section.icon}</span> {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-lg"
                      style={{ color: "var(--warm-gray-600)" }}
                    >
                      <span className="mt-1 text-base" style={{ color: "var(--teal)" }}>&#10003;</span>
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
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="mb-5 text-3xl font-bold tracking-tight" style={{ color: "var(--warm-gray-900)" }}>
              People like you are already using this
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl bg-white p-8 shadow-sm"
                style={{ border: "1px solid var(--warm-gray-200)" }}
              >
                <div className="mb-4 text-xl" style={{ color: "var(--gold)" }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="mb-5 text-lg leading-relaxed" style={{ color: "var(--warm-gray-700)" }}>&quot;{t.text}&quot;</p>
                <div>
                  <p className="text-lg font-semibold" style={{ color: "var(--warm-gray-900)" }}>{t.name}</p>
                  <p className="text-base" style={{ color: "var(--warm-gray-600)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="border-t px-6 py-24"
        style={{ borderColor: "var(--warm-gray-200)", background: "linear-gradient(to bottom, var(--warm-white), var(--cream))" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight" style={{ color: "var(--warm-gray-900)" }}>
            Get the full AI Playbook
          </h2>
          <p className="mb-12 text-lg" style={{ color: "var(--warm-gray-600)" }}>
            Less than a dinner out. More useful than a college course.
          </p>

          <div className="rounded-2xl border-2 bg-white p-10 shadow-md sm:p-12" style={{ borderColor: "var(--navy)" }}>
            <div className="mb-3 text-base font-semibold uppercase" style={{ color: "var(--teal)" }}>
              Lifetime Access
            </div>
            <div className="mb-2 text-6xl font-bold" style={{ color: "var(--warm-gray-900)" }}>
              $29.99
            </div>
            <p className="mb-10 text-lg" style={{ color: "var(--warm-gray-600)" }}>One-time payment. No subscription.</p>

            <ul className="mb-10 space-y-4 text-left">
              {[
                "25+ step-by-step AI guides",
                "Copy-paste prompt templates",
                "Personal, Work & Recreation sections",
                "Vibe Coding bonus chapter",
                "Prompt Engineering cheat sheet",
                "Top 10 AI tools comparison",
                "Downloadable PDF version",
                "Free updates as AI evolves",
                "7-day money-back guarantee",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 text-lg">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm text-white" style={{ backgroundColor: "var(--teal)" }}>
                    &#10003;
                  </span>
                  <span style={{ color: "var(--warm-gray-700)" }}>{item}</span>
                </li>
              ))}
            </ul>

            <form action="/api/checkout" method="POST">
              <button
                type="submit"
                className="pulse-cta w-full cursor-pointer rounded-lg py-5 text-xl font-bold text-white shadow-md transition-colors"
                style={{ backgroundColor: "var(--navy)" }}
              >
                Get Instant Access
              </button>
            </form>
            <p className="mt-4 text-base" style={{ color: "var(--warm-gray-600)" }}>
              Secure payment via Stripe. Works with all major cards, Apple Pay &
              Google Pay.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t px-6 py-24" style={{ borderColor: "var(--warm-gray-200)" }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight" style={{ color: "var(--warm-gray-900)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl bg-white p-8 shadow-sm"
                style={{ border: "1px solid var(--warm-gray-200)" }}
              >
                <h3 className="mb-3 text-xl font-semibold" style={{ color: "var(--warm-gray-900)" }}>{faq.q}</h3>
                <p className="text-lg leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t px-6 py-24 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-5 text-3xl font-bold text-white">
            Ready to stop guessing and start using AI?
          </h2>
          <p className="mb-10 text-xl" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Join thousands of people who went from &quot;I don&apos;t get AI&quot; to
            &quot;I can&apos;t believe I waited this long.&quot;
          </p>
          <a
            href="#pricing"
            className="inline-block rounded-lg px-10 py-5 text-xl font-semibold text-white transition-colors"
            style={{ backgroundColor: "var(--teal)" }}
          >
            Get the AI Playbook — $29.99
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-10" style={{ backgroundColor: "#1a2e47", borderColor: "#15253a" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-base" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            &copy; {new Date().getFullYear()} The AI Playbook. All rights reserved.
          </p>
          <div className="flex gap-8 text-base" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <a href="mailto:support@theaiplaybook.com" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
