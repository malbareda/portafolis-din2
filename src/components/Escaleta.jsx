import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../hooks.js'
import { blocs } from '../content/dades/parlament.js'
import './Escaleta.css'

// L'escaleta d'un discurs com una línia de temps: l'amplada de cada tram és la seva durada.
// En triar un tram es veu què deia el guió, què vaig escriure i quins recursos hi ha.

export default function Escaleta() {
  const [actiu, setActiu] = useState(0)
  const reduce = useReducedMotion()
  const total = blocs.reduce((a, b) => a + b.durada, 0)
  const b = blocs[actiu]

  return (
    <figure className="escaleta">
      <div className="escaleta__linia" role="tablist" aria-label="Blocs del parlament">
        {blocs.map((bl, i) => (
          <button
            key={bl.temps}
            role="tab"
            aria-selected={i === actiu}
            className="escaleta__tram"
            style={{ flexGrow: bl.durada, '--i': i }}
            onClick={() => setActiu(i)}
          >
            <span className="escaleta__temps">{bl.temps}</span>
            <span className="escaleta__nom">{bl.nom}</span>
          </button>
        ))}
      </div>
      <div className="escaleta__regle" aria-hidden="true">
        <span>0:00</span>
        <span>{`${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`}</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={actiu}
          role="tabpanel"
          className="escaleta__detall"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="escaleta__guio">
            <strong>Guió:</strong> {b.guio}
          </p>
          <blockquote className="escaleta__text">{b.text}</blockquote>
          <ul className="escaleta__recursos" aria-label="Recursos">
            {b.recursos.map((r) => <li key={r}>{r}</li>)}
          </ul>
          <div className="escaleta__nav">
            <button onClick={() => setActiu((a) => Math.max(0, a - 1))} disabled={actiu === 0}>← Anterior</button>
            <span>{actiu + 1} / {blocs.length}</span>
            <button onClick={() => setActiu((a) => Math.min(blocs.length - 1, a + 1))} disabled={actiu === blocs.length - 1}>Següent →</button>
          </div>
        </motion.div>
      </AnimatePresence>
      <figcaption className="escaleta__peu">
        Escaleta i text del meu parlament de graduació per a una promoció de DAM (uns 3 minuts). Cada tram és proporcional al temps previst.
      </figcaption>
    </figure>
  )
}
