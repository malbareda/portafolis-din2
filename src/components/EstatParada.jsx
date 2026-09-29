import './EstatParada.css'

const noms = { properament: 'Properament', 'en-curs': 'En curs', fet: 'Lliurat' }

function diesFins(data) {
  const [d, m, a] = data.split('/').map(Number)
  const avui = new Date()
  avui.setHours(0, 0, 0, 0)
  return Math.round((new Date(a, m - 1, d) - avui) / 86400000)
}

export default function EstatParada({ parada }) {
  const { estat, lliurament } = parada
  let detall = null
  if (lliurament && estat === 'en-curs') {
    const dies = diesFins(lliurament)
    detall = dies > 1 ? `lliurament ${lliurament} · falten ${dies} dies` : dies === 1 ? 'lliurament demà' : dies === 0 ? 'lliurament avui' : `lliurament ${lliurament}`
  } else if (lliurament && estat === 'properament') {
    detall = `lliurament ${lliurament}`
  }
  return (
    <span className={`estat estat--${estat}`}>
      <span className="estat__nom">{noms[estat]}</span>
      {detall && <span className="estat__detall">{detall}</span>}
    </span>
  )
}
