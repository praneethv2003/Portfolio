// Everything written on the site lives here. Edit this file, not the components.

export const person = {
  name: 'Praneeth Vedantham',
  first: 'Praneeth',
  role: 'Software engineer',
  location: 'Robbinsville, New Jersey',
  relocation: 'open to relocating anywhere in the US',
  email: 'praneethvedantham@gmail.com',
  github: 'https://github.com/praneethv2003',
  githubHandle: 'praneethv2003',
  linkedin: 'https://www.linkedin.com/in/praneeth-vedantham',
  linkedinHandle: 'praneeth-vedantham',
  resume: '/Praneeth_Vedantham_Resume.pdf', // drop a PDF in /public and put its path here, e.g. '/Praneeth_Vedantham_Resume.pdf'
  updated: 'September 2026',
}

export const hero = {
  eyebrow: 'Rutgers CS ’26 · math minor',
  headline: 'Building the parts nobody screenshots',
  lede:
    'Queues, schemas, retries, the CLI everyone complains about. That’s the work I keep coming back to on my own time, so it’s the work I’m looking for. Backend, platform, or developer tooling teams.',
  status: 'Looking for a full-time role. US, open to relocating.',
}

export const about = {
  title: 'The short version',
  paragraphs: [
    'I finished at Rutgers in 2026 with a CS degree and a math minor. The minor was a choice I second-guessed during every analysis exam and have been glad about since. A surprising amount of backend work is linear algebra and probability with worse variable names.',
    'Before graduating I was the first engineer at a small product agency, interned on an AI research team and inside a large company’s IT infrastructure org, and ran my fraternity chapter’s website for three semesters. Somewhere in there I picked up the habit of turning anything I do twice into a script.',
    'What I want next is a team that owns a queue, a database, or a tool other engineers depend on. If that’s yours, I’d like to hear about it. My email is at the bottom and I actually read it.',
  ],
  facts: [
    ['Based in', 'Robbinsville, NJ'],
    ['Degree', 'B.S. Computer Science, minor in Mathematics'],
    ['School', 'Rutgers University, class of 2026'],
    ['Looking for', 'Backend · Platform · Developer tooling'],
    ['Will relocate', 'Yes, anywhere in the US'],
  ],
}

export const experience = [
  {
    company: 'App Orchid',
    title: 'AI Research Intern',
    when: 'May – Aug 2025',
    where: 'Remote',
    summary:
      'Tooling and QA around the AO Platform API and its “Easy Answers” feature, which turns a plain-English question into SQL.',
    bullets: [
      'Set up the Postman collection across dev and staging, exercised the login and token-refresh APIs, checked status codes and token lifetimes, and wrote a short setup note that got the next intern going in an afternoon instead of a couple of days.',
      'Translated 30+ Postman calls into a small reusable Python client that handles refresh, headers, SSL verification, retries with backoff, and error logging. Added CLI smoke checks for the core routes so broken endpoints showed up before anyone hit them by hand.',
      'Refined the SQL behind Easy Answers by working through a spreadsheet of expected queries for 100+ question/answer pairs, diffing them against what the platform actually generated, and fixing the joins and filters that were off along the way.',
    ],
    stack: ['Python', 'SQL', 'Postman', 'REST APIs', 'LLM evals'],
  },
  {
    company: 'Ghosteams',
    title: 'Lead Engineer',
    when: 'Aug 2024 – Jan 2025',
    where: 'Remote',
    summary:
      'First engineer at a small product development agency. Small clients, fixed scopes, real invoices.',
    bullets: [
      'Built the client-facing platform on React, Next.js and GraphQL, hosted on Vercel. Each client got a live board of their tasks, and status changes posted straight to their Discord channel.',
      'Wrote the scoping tool the agency ran on every new project. It took a client brief, had an LLM draft the task breakdown and rough estimates, and dropped the result onto the board for someone to fix up before anything went back to the client.',
      'Worked with 6 engineers on AgentHub, an autonomous agent platform that kept memory across sessions and could post to social media, Discord and Telegram. Wrote the Python library that coordinated the agents and handled payments between them.',
    ],
    stack: ['React', 'Next.js', 'GraphQL', 'Vercel', 'TypeScript', 'Python'],
  },
  {
    company: 'Pitney Bowes',
    title: 'IT Infrastructure & Services Intern',
    when: 'Jun – Aug 2024',
    where: 'Shelton, CT',
    summary:
      'Enterprise infrastructure inside a company that has been shipping things since 1920. Mostly vSphere, mostly finding waste.',
    bullets: [
      'Dug into the virtual machine distribution process across 200+ VMs and found roughly $4,000 worth of compute and storage being wasted on machines that were never returned or were sized well beyond what their owners used.',
      'Wrote Python scripts against the vSphere API to flag VMs that had sat idle for a month or were barely using their allocated CPU and memory. The first pass reclaimed 40+ machines and turned a weekly manual review into an on-demand one.',
      'Set up form automation in Jira Service Management for employees reporting technical issues. Standardizing the request templates meant tickets came in with the right details up front, which trimmed triage time by about a third.',
    ],
    stack: ['Python', 'vSphere API', 'Jira Service Management', 'Windows & Linux admin'],
  },
  {
    company: 'Phi Chi Theta',
    title: 'Director of Web Services',
    when: 'Apr 2023 – Jun 2024',
    where: 'New Brunswick, NJ',
    summary:
      'Ran the chapter’s primary website for three semesters. Not a job, but it was the first codebase other people depended on me for.',
    bullets: [
      'Pushed regular content updates (new members, events, recruitment pages) with prospective members in mind. Recruitment-page traffic went up about 25% during fall rush.',
      'Built a “Gallery” page in HTML and JavaScript that doubles as the organization’s photo repository, pulling together a few hundred photos from past events that were scattered across shared drives and members’ personal phones.',
      'Cleared out a backlog of main-page bugs and layout glitches left over from previous semesters. Mobile load time dropped about 40%.',
    ],
    stack: ['HTML/CSS', 'JavaScript'],
  },
]

export const projects = [
  {
    name: 'IncidentHub',
    tag: 'Real-time incident management',
    year: 'Summer 2026',
    blurb:
      'Basically a lightweight PagerDuty. Teams open incidents, page responders, and escalate automatically when nobody acks. Commands go over REST and state changes fan out to every open browser over Socket.IO.',
    details: [
      'Wrote the Postgres schema by hand (12 tables, 14 indexes). Audit logging happens in database triggers rather than app code, and every edit carries a version number to catch two responders overwriting each other.',
      'A partial index took the dashboard query from 16.5 ms to 1.5 ms on 200k rows, and GIN full-text search went from 26 ms to under 1 ms.',
      'Escalation runs as BullMQ delayed jobs in a separate worker, with deterministic job ids so a retried job can’t page anyone twice.',
      '50+ Vitest and Playwright tests that run against real Postgres and Redis in CI, because a project about reliability that you can’t reliably run is a bit embarrassing.',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Fastify', 'PostgreSQL', 'Redis', 'Socket.IO', 'BullMQ', 'Docker'],
    link: 'https://github.com/praneethv2003',
    linkLabel: 'GitHub',
  },
  {
    name: 'Datastructures.io',
    tag: 'Ranked 1v1 coding matches',
    year: 'Summer 2026',
    blurb:
      'Two people, one problem, a clock. Built with two other engineers on the Cloudflare/DigitalOcean stack.',
    details: [
      'Live matches went from 28 to 100+ concurrent at about $17/month, mostly through event-driven matchmaking, batched writes, and Durable Object hibernation so idle rooms cost nothing.',
      'I owned the anti-cheat: a 2-layer server-authoritative design with replayable event logs, admin review and ban tooling, and Elo reconciliation when a match gets thrown out.',
      'Player code in Python, JavaScript, Java and C++ runs sandboxed on a dedicated x86 Piston judge with tight limits on time, memory and output.',
    ],
    stack: ['TypeScript', 'Cloudflare Workers', 'Durable Objects', 'WebSockets', 'Piston', 'Docker'],
    link: 'https://datastructures.io',
    linkLabel: 'datastructures.io',
  },
  {
    name: 'RetryHTTP',
    tag: 'Python library, on PyPI',
    year: 'Summer 2026',
    blurb:
      'The retry logic from the App Orchid API client, pulled out and packaged as a small PyPI library. It subclasses httpx.Client and requests.Session, so existing code works unchanged.',
    details: [
      'Exponential backoff with jitter, per-status retry rules, and token refresh on 401. httpx and requests are optional extras, so the core has no required dependencies.',
      'Started because I kept rewriting the same twenty lines of retry logic in every script and getting it subtly wrong each time.',
      '26 pytest tests cover the sync, async and requests paths. CI runs them on Python 3.10 through 3.12 and publishes to PyPI on tagged releases.',
    ],
    stack: ['Python', 'httpx', 'requests', 'asyncio', 'pytest', 'GitHub Actions'],
    link: 'https://github.com/praneethv2003',
    linkLabel: 'GitHub',
  },
]

export const smallProjects = [
  {
    name: 'CIFAR-10 classifier',
    note: 'MobileNetV2 transfer learning in Keras. Learned more from the Lambda-layer serialization bug than from the accuracy number.',
  },
  {
    name: 'Digital SAT math packet',
    note: '53 pages, 19 topics, 228 problems, a three-week schedule. Written in LaTeX; the answer keys come out of a Python script.',
  },
  {
    name: 'This site',
    note: 'React and Vite, no UI library, no template. The cursor and the games are plain canvas and state.',
  },
]

export const toolbox = [
  {
    group: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML/CSS', 'OCaml (coursework)'],
  },
  {
    group: 'Backend & infrastructure',
    items: ['PostgreSQL', 'Redis', 'Docker', 'AWS', 'Node.js / Fastify', 'Cloudflare Workers', 'GraphQL', 'vSphere'],
  },
  {
    group: 'AI / LLM',
    items: ['Agents (Claude SDK, OpenAI, MCP)', 'RAG (Pinecone, pgvector)', 'Evals'],
  },
  {
    group: 'Comfortable with',
    items: ['Git', 'GitHub Actions', 'Postman', 'Jira', 'LaTeX', 'Linear algebra & numerical methods'],
  },
]

export const game = {
  title: 'On-call',
  intro:
    'A small game, since I built an incident tool and it felt wrong not to. You’re primary on-call. Pages come in; route each one to the team that owns it before it escalates. Tap a team, or press 1 to 4 if you have a keyboard.',
  duration: 45,
  teams: [
    { id: 'db', key: '1', name: 'Database' },
    { id: 'api', key: '2', name: 'API' },
    { id: 'cache', key: '3', name: 'Cache' },
    { id: 'auth', key: '4', name: 'Auth' },
  ],
  incidents: [
    { team: 'db', text: 'postgres: FATAL: remaining connection slots are reserved' },
    { team: 'db', text: 'replica lag 42s and climbing on db-replica-2' },
    { team: 'db', text: 'slow query: SELECT * FROM events (no LIMIT, no index)' },
    { team: 'db', text: 'disk at 91% on the primary, WAL not being archived' },
    { team: 'db', text: 'deadlock detected in orders / inventory transaction' },
    { team: 'db', text: 'migration 0342 has been running for 19 minutes' },
    { team: 'db', text: 'pgbouncer: pool exhausted, clients waiting' },
    { team: 'api', text: 'p99 latency 3.1s on POST /checkout' },
    { team: 'api', text: '5xx rate 12% on api-gateway after deploy #4471' },
    { team: 'api', text: 'unhandled TypeError: cannot read properties of undefined' },
    { team: 'api', text: 'rate limiter returning 429 to internal callers' },
    { team: 'api', text: 'health check failing on 3 of 8 api pods' },
    { team: 'api', text: 'webhook queue depth 14,000 and not draining' },
    { team: 'api', text: 'OOMKilled: api-worker restarted 6 times in 10m' },
    { team: 'cache', text: 'redis: used_memory at maxmemory, evicting keys' },
    { team: 'cache', text: 'cache hit rate dropped from 97% to 31%' },
    { team: 'cache', text: 'thundering herd on session:* after cache flush' },
    { team: 'cache', text: 'redis cluster: MOVED loop between two shards' },
    { team: 'cache', text: 'stale prices served for 40 minutes, TTL never set' },
    { team: 'cache', text: 'CDN purge stuck, users seeing yesterday’s homepage' },
    { team: 'auth', text: 'JWT signing key rotated, half the pods still have the old one' },
    { team: 'auth', text: 'login failures spiking: invalid_grant from the IdP' },
    { team: 'auth', text: 'session cookies rejected after SameSite change' },
    { team: 'auth', text: 'OAuth callback 404 on the new domain' },
    { team: 'auth', text: 'admin panel reachable without MFA (please hurry)' },
    { team: 'auth', text: 'password reset emails going out with expired tokens' },
  ],
}

export const catGame = {
  title: 'Cat run',
  intro: 'Dedicated to my cat, Maaya.',
}

export const colophon = {
  lines: [
    'Set in Inconsolata and Lato.',
    'Built with React and Vite. No UI kit, no template, no tracking.',
    'The cursor trail, the field of marks behind my name and the cat are three small canvases; the on-call game is about 200 lines of state.',
  ],
}

export const navLinks = [
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Toolbox', 'toolbox'],
  ['On-call', 'oncall'],
  ['Cat run', 'catrun'],
  ['Contact', 'contact'],
]
