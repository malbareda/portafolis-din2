import { parades } from '../content/viatge.js'
import './Capcalera.css'

// Barra superior: el recorregut en miniatura, sempre a mà.
export default function Capcalera({ actual }) {
  return (
    <header className="capcalera">
      <div className="container capcalera__dins">
        <a href="#/" className="capcalera__marca">
          <svg viewBox="0 0 64 64" width="26" height="26" aria-hidden="true">
            <rect x="4" y="14" width="56" height="36" rx="8" fill="#FF6B4A" />
            <path d="M40 20v24" stroke="#FFF8EE" strokeWidth="3" strokeDasharray="3 4" />
            <path d="M14 28h16M14 36h10" stroke="#FFF8EE" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span className="capcalera__nom">Portafolis DIN2</span>
        </a>
        <ol className="capcalera__ruta" aria-label="Parades">
          {parades.map((p) => {
            const activa = p.estat !== 'properament'
            const etiqueta = p.codi ?? (p.id === 'tiquet-entrada' ? 'Entrada' : 'Sortida')
            return (
              <li key={p.id} style={{ '--c': p.color }}>
                {activa ? (
                  <a
                    href={`#/${p.id}`}
                    className={`capcalera__punt ${actual === p.id ? 'capcalera__punt--actual' : ''}`}
                    aria-current={actual === p.id ? 'page' : undefined}
                    title={p.titol}
                  >
                    {etiqueta}
                  </a>
                ) : (
                  <span className="capcalera__punt capcalera__punt--apagat" title={`${p.titol} (properament)`}>
                    {etiqueta}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </header>
  )
}
