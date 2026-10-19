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
  resume: '/Praneeth_Vedantham_Resume.pdf', // lives in /public; replace the file to update it
  updated: 'October 2026',
}

export const hero = {
  eyebrow: 'Software engineer · Rutgers CS ’26',
  // first two lines set upright, the last line italic
  headline: ['Building the', 'parts nobody', 'screenshots.'],
  lede:
    'Queues, schemas, retries, the CLI everyone complains about. That’s the work I keep coming back to on my own time, so it’s the work I’m looking for: backend, platform, or developer tooling.',
  status: 'Open to full-time roles anywhere in the US',
}

// The tabbed card beside the headline. One entry per shipped project.
export const ledger = [
  {
    id: 'incidenthub',
    tab: 'IncidentHub',
    index: 'SYS.01',
    kind: 'Real-time · Node, Postgres, Redis',
    status: 'Shipped',
    title: 'IncidentHub',
    sub: 'A lightweight PagerDuty',
    problem: 'Teams need to open incidents, page the right people, and escalate on their own when nobody acknowledges, without a timer living in some process that might restart.',
    approach: 'REST for commands, Socket.IO to fan state out to every open browser, BullMQ delayed jobs in a separate worker for escalation, with deterministic job ids so a retry can’t page twice.',
    stack: ['TypeScript', 'Fastify', 'PostgreSQL', 'Redis', 'Socket.IO', 'BullMQ'],
  },
  {
    id: 'datastructures',
    tab: 'Datastructures.io',
    index: 'SYS.02',
    kind: 'Edge · Cloudflare Workers',
    status: 'Live',
    title: 'Datastructures.io',
    sub: 'Ranked 1v1 coding matches',
    problem: 'Two players, one problem, one clock. Matches need to feel instant, stay cheap at scale, and be impossible to cheat quietly.',
    approach: 'Event-driven matchmaking in Durable Objects with hibernation for idle rooms (28 to 100+ concurrent at about $17/month), a server-authoritative anti-cheat layer with replayable event logs, and a sandboxed Piston judge.',
    stack: ['TypeScript', 'Workers', 'Durable Objects', 'WebSockets', 'Piston'],
  },
  {
    id: 'retryhttp',
    tab: 'RetryHTTP',
    index: 'SYS.03',
    kind: 'Library · PyPI',
    status: 'Published',
    title: 'RetryHTTP',
    sub: 'Retries for httpx and requests',
    problem: 'Every script I wrote at App Orchid grew the same twenty lines of retry logic, and each copy got something slightly wrong.',
    approach: 'Subclass httpx.Client and requests.Session so existing code works unchanged. Backoff with jitter, per-status rules, token refresh on 401, no required dependencies. 26 tests on Python 3.10 to 3.12.',
    stack: ['Python', 'httpx', 'requests', 'asyncio', 'pytest'],
  },
  {
    id: 'bond',
    tab: 'Bond API',
    index: 'SYS.04',
    kind: 'Numerical · Flask, pandas',
    status: 'Shipped',
    title: 'Bond Cash-Flow API',
    sub: 'Pricing and risk over REST',
    problem: 'Price a bond from a yield, or back out the yield from a price, and return the numbers a desk actually asks for.',
    approach: 'Builds the cash-flow schedule as a pandas DataFrame, solves yield to maturity by bisection, and returns duration, convexity and DV01. 26 pytest tests cover every endpoint.',
    stack: ['Python', 'Flask', 'pandas', 'NumPy', 'pytest'],
  },
]

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
      'Tooling and QA around the AO Platform and its “Easy Answers” feature, which turns a plain-English question into SQL.',
    bullets: [
      'Spent the first few weeks digging into several of the MSOs (managed semantic objects) behind Easy Answers, each with 8 to 10 properties, to understand how the ontology turns a question into a SQL query against the right tables and columns.',
      'Wrote a small Python client over the AO Platform’s REST APIs that handles token refresh, retries, and error logging, then used it to script the setup of domains, ontologies, data sources, and solutions that the team used to click through by hand in the console.',
      'Validated the AI-generated SQL behind Easy Answers by working through a spreadsheet of expected queries for 100+ question/answer pairs, diffing them against what the platform actually generated, and debugging the joins and filters that were off.',
    ],
    stack: ['Python', 'SQL', 'REST APIs', 'LLM evals'],
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
    stack: ['Python', 'vSphere API', 'Jira Service Management'],
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
      'Basically a lightweight PagerDuty. Teams open incidents, page responders, and escalate automatically when nobody acks. Commands go over REST and updates fan out to every browser over Socket.IO.',
    details: [
      'Wrote the Postgres schema by hand (12 tables, 14 indexes). Audit logging happens in database triggers rather than app code, and every edit carries a version number to stop silent overwrites.',
      'A partial index fixed the main performance bottleneck, taking the dashboard query from 16.5 ms to 1.5 ms.',
      'Escalation runs as BullMQ delayed jobs in a separate worker microservice, with deterministic job ids so retries can’t double-page.',
      '50+ Vitest unit and end-to-end tests that run against real Postgres and Redis in CI.',
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
    linkLabel: 'Live site',
  },
  {
    name: 'RetryHTTP',
    tag: 'Python library, on PyPI',
    year: 'Summer 2026',
    blurb:
      'The retry logic from the App Orchid API client, pulled out and packaged as a shared library on PyPI. It subclasses httpx.Client and requests.Session, so existing code works unchanged.',
    details: [
      'Backoff with jitter, per-status retry rules, and token refresh on 401. httpx and requests are optional extras, so the core has no required dependencies.',
      '26 pytest tests cover the sync, async and requests paths. CI runs them on Python 3.10 through 3.12 and publishes tagged releases to PyPI.',
    ],
    stack: ['Python', 'httpx', 'requests', 'asyncio', 'pytest', 'GitHub Actions'],
    link: 'https://github.com/praneethv2003',
    linkLabel: 'GitHub',
  },
  {
    name: 'Bond Cash-Flow API',
    tag: 'Fixed-income pricing',
    year: 'October 2026',
    blurb:
      'A Flask REST API for bond pricing. Builds the cash-flow schedule as a pandas DataFrame, prices from a yield or solves yield to maturity by bisection, and returns duration, convexity and DV01.',
    details: [
      'Pure functions for the math, thin Flask handlers on top, so every number is testable without spinning up the server.',
      '26 pytest tests cover every endpoint. Drafted with GitHub Copilot, then read and fixed by hand, which is roughly how I think that tool should be used.',
    ],
    stack: ['Python', 'Flask', 'pandas', 'NumPy', 'pytest'],
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
    note: 'React and Vite, no UI library, no template. The cursor and the two games are plain canvas and state.',
  },
]

export const toolbox = [
  {
    group: 'Languages',
    items: ['Python (pandas, NumPy)', 'SQL', 'TypeScript', 'JavaScript', 'Java', 'HTML/CSS'],
  },
  {
    group: 'Backend & infrastructure',
    items: ['Flask', 'Node.js / Fastify', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Cloudflare Workers', 'vSphere'],
  },
  {
    group: 'AI / LLM',
    items: ['Agents (Claude SDK, OpenAI, MCP)', 'RAG (pgvector)', 'Evals', 'Copilot & Claude Code, with supervision'],
  },
  {
    group: 'Comfortable with',
    items: ['Git', 'GitHub Actions', 'CI/CD', 'Jira', 'LaTeX', 'Linear algebra & numerical methods'],
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
    'Set in Cormorant Garamond, Manrope and Inconsolata.',
    'Built with React and Vite. No UI kit, no template, no tracking.',
    'The cursor and the two games are small canvases; the on-call game is about 200 lines of state.',
  ],
}

export const navLinks = [
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Toolbox', 'toolbox'],
  ['Play', 'oncall'],
  ['Contact', 'contact'],
]
