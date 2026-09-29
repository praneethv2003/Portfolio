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
    'Before graduating I ran a small product agency for about eight months, interned on an AI research team and inside a large company’s IT infrastructure org, and picked up the habit of turning anything I do twice into a script.',
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
      'Worked on Easy Answers, a feature that turns a plain-English question into SQL against a customer’s data.',
    bullets: [
      'My main job was finding where the generated SQL went wrong. I built a comparison harness that ran generated queries against a spreadsheet of known-correct ones for the same questions and flagged the differences, then went after the prompt and template issues behind the misses.',
      'Wrote the Python API client the team used to exercise the service from scripts, plus the Postman collections for everyone who preferred clicking.',
      'Built small automation around the eval loop so re-running the full comparison after a change was one command instead of an afternoon.',
    ],
    stack: ['Python', 'SQL', 'LLM evals', 'Postman', 'REST APIs'],
  },
  {
    company: 'Ghosteams',
    title: 'Lead Engineer',
    when: 'August 2024 – Jan 2025',
    where: 'New Jersey',
    summary:
      'An AI-assisted product development agency. Small clients, fixed scopes, real invoices.',
    bullets: [
      'Handled sales, scoping and operations myself, which is a polite way of saying I learned how to estimate by getting it wrong a few times first.',
      'Built the client-facing platform in React and Next.js with a GraphQL API, deployed on Vercel.',
      'Worked with six engineers on AgentHub, an autonomous agent platform. Most of my time there went to keeping the interfaces between people’s pieces boring and stable.',
    ],
    stack: ['React', 'Next.js', 'GraphQL', 'Vercel', 'TypeScript'],
  },
  {
    company: 'Pitney Bowes',
    title: 'IT Infrastructure & Services Intern',
    when: 'Jun 2024 – Aug 2024', // add the dates here, e.g. 'Jun – Aug 2024'
    where: 'New Jersey',
    summary:
      'Enterprise infrastructure inside a company that has been shipping things since 1920.',
    bullets: [
      'Worked in a vSphere-heavy environment where a change window is a real thing and a ticket is how work moves. It reset my sense of what “production” means at scale.',
      'Spent a lot of the internship on the unglamorous side of reliability: documentation, runbooks, and small automation for tasks that had been done by hand for years.',
    ],
    stack: ['vSphere', 'Jira', 'Windows & Linux admin', 'Scripting'],
  },
]

export const projects = [
  {
    name: 'IncidentHub',
    tag: 'Real-time incident management',
    year: '2026',
    blurb:
      'A lightweight PagerDuty. On-call schedules, escalation policies, acknowledgements, and a live incident feed over WebSockets.',
    details: [
      'Escalations run as BullMQ jobs backed by Redis, so a timer survives a restart instead of living in a setTimeout somewhere.',
      'Role-based access control, an append-only audit log for every state change, and observability wired in from the start rather than bolted on.',
      'Tests, Docker, and a CI pipeline, because a project about reliability that you can’t reliably run is a bit embarrassing.',
    ],
    stack: ['TypeScript', 'Fastify', 'PostgreSQL', 'Redis', 'Socket.IO', 'BullMQ', 'Docker'],
    link: 'https://github.com/praneethv2003',
    linkLabel: 'GitHub',
  },
  {
    name: 'RetryHTTP',
    tag: 'Python library, on PyPI',
    year: '2026',
    blurb:
      'A zero-dependency retry layer for httpx and requests. Exponential backoff with jitter, respects Retry-After, and the same small API for both libraries.',
    details: [
      'Started because I kept rewriting the same twenty lines of retry logic in every internship script and getting it subtly wrong each time.',
      'Published to PyPI with tests and type hints. Zero dependencies was a hard rule; a retry helper should not be the reason your install breaks.',
    ],
    stack: ['Python', 'httpx', 'requests', 'PyPI', 'pytest'],
    link: 'https://github.com/praneethv2003',
    linkLabel: 'GitHub',
  },
  {
    name: 'Datastructures.io',
    tag: 'Ranked 1v1 coding matches',
    year: '2026',
    blurb:
      'Two people, one problem, a clock. Built with a friend on Cloudflare Workers and Durable Objects.',
    details: [
      'I owned the anti-cheat and the sandboxed judge, which runs submissions through Piston with tight limits on time, memory and output.',
      'Matchmaking and match state live in Durable Objects, one per room, so both players always talk to the same coordinator.',
    ],
    stack: ['TypeScript', 'Cloudflare Workers', 'Durable Objects', 'Piston'],
    link: 'https://datastructures.io',
    linkLabel: 'datastructures.io',
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
    note: 'React and Vite, no UI library, no template. The cursor and the game are plain canvas and state.',
  },
]

export const toolbox = [
  {
    group: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'Swift', 'Dart', 'OCaml (coursework)'],
  },
  {
    group: 'Backend & infrastructure',
    items: ['PostgreSQL', 'Redis', 'Docker', 'AWS', 'Node.js / Fastify', 'Cloudflare Workers', 'GraphQL', 'vSphere'],
  },
  {
    group: 'AI tooling',
    items: ['Claude SDK', 'MCP', 'RAG (Pinecone, pgvector)', 'Evals', 'Fine-tuning'],
  },
  {
    group: 'Comfortable with',
    items: ['Git', 'Postman', 'Jira', 'CI/CD', 'LaTeX', 'Linear algebra & numerical methods'],
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
