import { useEffect, useState } from 'react'
import { navLinks, person } from './content.js'
import Cursor from './components/Cursor.jsx'
import { Hero, About, Experience, Projects, Toolbox, Game, CatGame, Contact, Footer } from './components/Sections.jsx'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || '' } catch { return '' }
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme) root.setAttribute('data-theme', theme)
    else root.removeAttribute('data-theme')
    try { theme ? localStorage.setItem('theme', theme) : localStorage.removeItem('theme') } catch { /* ignore */ }
  }, [theme])
  // dark is the default; "system" only flips to light when the OS asks for it
  const isDark = theme ? theme === 'dark' : !window.matchMedia('(prefers-color-scheme: light)').matches
  const toggle = () => setTheme(isDark ? 'light' : 'dark')
  return { isDark, toggle }
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = navLinks.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

const Moon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)
const Sun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
const GitMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
)

export default function App() {
  const { isDark, toggle } = useTheme()
  const active = useActiveSection()

  return (
    <div className="frame">
      <Cursor />

      <nav className="nav" aria-label="Primary">
        <a href="#top" className="nav-name" data-cursor="top">{person.name}</a>
        <div className="nav-links">
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>{label}</a>
          ))}
        </div>
        <div className="nav-actions">
          <a className="pill" href={person.resume} target="_blank" rel="noreferrer" data-cursor="pdf">Get résumé</a>
          <a className="pill hide-sm" href={person.github} target="_blank" rel="noreferrer" data-cursor="open"><GitMark /> GitHub</a>
          <button className="icon-btn" onClick={toggle} aria-label="Toggle colour theme" data-cursor={isDark ? 'light' : 'dark'}>
            {isDark ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Toolbox />
        <Game />
        <CatGame />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
