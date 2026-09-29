import { useRef, useState } from 'react'
import { person, hero, about, experience, projects, smallProjects, toolbox, colophon } from '../content.js'
import Filings from './Filings.jsx'
import OnCall from './OnCall.jsx'
import { game as gameCopy, catGame } from '../content.js'
import CatRun from './CatRun.jsx'

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M3 13 13 3M6 3h7v7" />
  </svg>
)
const Plus = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M6 1v10M1 6h10" />
  </svg>
)

export function Section({ id, label, title, sub, children }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-h`}>
      <div className="note">
        <span className="note-label">{label}</span>
        <h2 id={`${id}-h`}>{title}</h2>
        {sub && <span className="note-sub">{sub}</span>}
      </div>
      <div className="body">{children}</div>
    </section>
  )
}

export function Hero() {
  const hostRef = useRef(null)
  return (
    <header className="hero" ref={hostRef} id="top">
      <div className="hero-sky" aria-hidden="true">
        <i className="blob b1" /><i className="blob b2" /><i className="blob b3" /><i className="blob b4" />
      </div>
      <Filings hostRef={hostRef} />
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-name">{person.name}</span>
          <span className="mono">{hero.eyebrow}</span>
          <span className="mono">{person.location}</span>
        </div>
        <h1><em>{hero.headline}</em></h1>
        <p className="hero-lede">{hero.lede}</p>
        <div className="hero-foot">
          <span className="hero-status"><i className="blink" aria-hidden="true" />{hero.status}</span>
          <div className="links">
            <a className="chip primary" href="#contact" data-cursor="say hi">Get in touch</a>
            <a className="chip" href={person.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a className="chip" href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            {person.resume && <a className="chip" href={person.resume} target="_blank" rel="noreferrer">Résumé <Arrow /></a>}
          </div>
        </div>
      </div>
    </header>
  )
}

export function About() {
  return (
    <Section id="about" label="01 / about" title={about.title}>
      <div className="prose">
        {about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
      </div>
      <dl className="facts">
        {about.facts.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </Section>
  )
}

export function Experience() {
  return (
    <Section id="experience" label="02 / experience" title="Where I’ve worked">
      <div className="ledger">
        {experience.map((e) => (
          <article className="entry" key={e.company}>
            <div className="entry-when">
              <span>{e.when || '—'}</span>
              <span className="where">{e.where}</span>
            </div>
            <div>
              <div className="entry-head">
                <h3>{e.company}</h3>
                <span className="title">{e.title}</span>
              </div>
              <p className="entry-summary" style={{ marginTop: 6 }}>{e.summary}</p>
              <ul className="entry-bullets">
                {e.bullets.map((b) => <li key={b.slice(0, 24)}>{b}</li>)}
              </ul>
              <div className="stack">{e.stack.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Case({ p }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="case">
      <div className="case-top">
        <div style={{ display: 'grid', gap: 4 }}>
          <span className="case-tag">{p.tag}</span>
          <h3>{p.name}</h3>
        </div>
        <span className="case-year">{p.year}</span>
      </div>
      <p className="case-blurb">{p.blurb}</p>
      {open && (
        <ul className="case-details">
          {p.details.map((d) => <li key={d.slice(0, 24)}>{d}</li>)}
        </ul>
      )}
      <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
      <div className="case-foot">
        <button className="toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} data-cursor={open ? 'less' : 'more'}>
          <Plus /> {open ? 'Fewer details' : 'How it’s built'}
        </button>
        {p.link ? (
          <a className="case-link" href={p.link} target="_blank" rel="noreferrer"><span>{p.linkLabel}</span> <Arrow /></a>
        ) : (
          <span className="case-nolink">no public repo</span>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Section id="projects" label="03 / projects" title="Things I’ve built">
      <div className="cases">
        {projects.map((p) => <Case p={p} key={p.name} />)}
      </div>
      <div>
        <div className="mono" style={{ marginBottom: 10 }}>Also</div>
        <ul className="small-projects">
          {smallProjects.map((s) => (
            <li key={s.name}><b>{s.name}</b><span>{s.note}</span></li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export function Toolbox() {
  return (
    <Section id="toolbox" label="04 / toolbox" title="What I reach for">
      <div className="shelves">
        {toolbox.map((g) => (
          <div className="shelf" key={g.group}>
            <span className="shelf-name">{g.group}</span>
            <div className="shelf-items">{g.items.map((i) => <span key={i}>{i}</span>)}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Game() {
  return (
    <Section id="oncall" label="05 / a small game" title={gameCopy.title}>
      <p className="prose" style={{ maxWidth: '58ch' }}>{gameCopy.intro}</p>
      <OnCall />
    </Section>
  )
}

export function CatGame() {
  return (
    <Section id="catrun" label="06 / another game" title={catGame.title}>
      <p className="prose" style={{ maxWidth: '58ch' }}>{catGame.intro}</p>
      <CatRun />
    </Section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      const r = document.createRange()
      r.selectNodeContents(document.getElementById('email'))
      const sel = window.getSelection()
      sel.removeAllRanges(); sel.addRange(r)
    }
  }
  return (
    <Section id="contact" label="07 / contact" title="Say hello">
      <div className="contact-card">
        <h3>If your team owns something with a queue in it, I’d like to hear about it.</h3>
        <div className="email-row">
          <span className="email" id="email">{person.email}</span>
          <button className={`copy ${copied ? 'done' : ''}`} onClick={copy} data-cursor="copy">{copied ? 'Copied' : 'Copy'}</button>
        </div>
        <div className="links">
          <a className="chip" href={person.github} target="_blank" rel="noreferrer">github.com/{person.githubHandle} <Arrow /></a>
          <a className="chip" href={person.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/{person.linkedinHandle} <Arrow /></a>
        </div>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="colophon">
        {colophon.lines.map((l) => <span key={l.slice(0, 20)}>{l}</span>)}
      </div>
      <div className="foot-row">
        <span>{person.name} · {person.location}</span>
        <span>Last updated {person.updated}</span>
      </div>
    </footer>
  )
}
