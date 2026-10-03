import { Children, isValidElement, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../hooks.js'
import './Evidencia.css'

// Una evidència té dues cares: el que vaig fer (davant) i el que en vaig aprendre (reflexió).
// Ús a l'MDX:
//   <Evidencia titol="…" tipus="Tasca del curs" data="18/09/2026">
//     <Davant> …l'evidència… </Davant>
//     <Reflexio> …què he après i per què és significatiu… </Reflexio>
//   </Evidencia>

export function Davant({ children }) {
  return <>{children}</>
}

export function Reflexio({ children }) {
  return <>{children}</>
}

export default function Evidencia({ titol, tipus, data, children }) {
  const [cara, setCara] = useState('davant')
  const reduce = useReducedMotion()
  const id = useId()

  let davant = null
  let reflexio = null
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.type === Davant) davant = child
    else if (child.type === Reflexio) reflexio = child
  })

  const girada = cara === 'reflexio'
  const girar = () => setCara(girada ? 'davant' : 'reflexio')

  const variants = reduce
    ? { entra: { opacity: 0 }, quiet: { opacity: 1 }, surt: { opacity: 0 } }
    : {
        entra: { rotateY: -90, opacity: 0 },
        quiet: { rotateY: 0, opacity: 1 },
        surt: { rotateY: 90, opacity: 0 },
      }

  return (
    <article className={`evidencia ${girada ? 'evidencia--girada' : ''}`} aria-labelledby={`${id}-titol`}>
      <header className="evidencia__cap">
        <div className="evidencia__meta">
          {tipus && <span className="evidencia__tipus">{tipus}</span>}
          {data && <span className="evidencia__data">{data}</span>}
        </div>
        <h3 id={`${id}-titol`} className="evidencia__titol">{titol}</h3>
        <div className="evidencia__pestanyes" role="tablist" aria-label="Cares de l'evidència">
          <button
            role="tab"
            aria-selected={!girada}
            aria-controls={`${id}-cos`}
            className="evidencia__pestanya"
            onClick={() => setCara('davant')}
          >
            L'evidència
          </button>
          <button
            role="tab"
            aria-selected={girada}
            aria-controls={`${id}-cos`}
            className="evidencia__pestanya"
            onClick={() => setCara('reflexio')}
          >
            La reflexió
          </button>
        </div>
      </header>

      <div className="evidencia__escena">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cara}
            id={`${id}-cos`}
            role="tabpanel"
            className="evidencia__cos prosa"
            variants={variants}
            initial="entra"
            animate="quiet"
            exit="surt"
            transition={{ duration: reduce ? 0.15 : 0.28, ease: 'easeInOut' }}
          >
            {girada ? reflexio : davant}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="evidencia__peu">
        <button className="evidencia__girar" onClick={girar}>
          {girada ? '↺ Torna a l’evidència' : 'Gira la targeta: què n’he après →'}
        </button>
      </footer>
    </article>
  )
}
