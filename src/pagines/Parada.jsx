import { parades } from '../content/viatge.js'
import { seccionsDe } from '../contingut.js'
import Bitllet from '../components/Bitllet.jsx'
import EstatParada from '../components/EstatParada.jsx'
import './Pagines.css'

function Seccions({ seccions }) {
  if (seccions.length === 0) {
    return <p className="prosa">Aquesta parada encara no té contingut.</p>
  }
  return seccions.map(({ ruta, Component, meta }) => (
    <section key={ruta} className="seccio prosa" id={meta.id}>
      {meta.titol && <h2>{meta.titol}</h2>}
      <Component />
    </section>
  ))
}

export default function Parada({ parada }) {
  const seccions = seccionsDe(parada.id)
  const actives = parades.filter((p) => p.estat !== 'properament')
  const idx = actives.findIndex((p) => p.id === parada.id)
  const anterior = actives[idx - 1]
  const seguent = actives[idx + 1]

  return (
    <div className="parada" style={{ '--accent': parada.color }}>
      <header className="parada__cap">
        <div className="container">
          <a href="#/" className="parada__tornar">← Torna al mapa</a>
          <p className="parada__codi">{parada.codi ?? (parada.tipus === 'tiquet' ? 'Tiquet' : '')}</p>
          <h1 className="parada__titol">{parada.titol}</h1>
          {parada.subtitol && <p className="parada__subtitol">{parada.subtitol}</p>}
          {parada.sessions && <p className="parada__sessions">Sessions: {parada.sessions}</p>}
          <EstatParada parada={parada} />
        </div>
      </header>

      <div className="container parada__cos">
        {parada.id === 'tiquet-entrada' ? (
          <Bitllet
            passatger="Marc Albareda Sirvent"
            origen="Cap d'Estudis d'FP"
            desti="Direcció de centre"
            data="16/09/2026"
            validesa="fins al 29/11/2026"
          >
            <Seccions seccions={seccions} />
          </Bitllet>
        ) : (
          <Seccions seccions={seccions} />
        )}

        <nav className="parada__nav" aria-label="Parades">
          {anterior ? <a href={`#/${anterior.id}`}>← {anterior.titol}</a> : <span />}
          {seguent ? <a href={`#/${seguent.id}`}>{seguent.titol} →</a> : <span />}
        </nav>
      </div>
    </div>
  )
}
