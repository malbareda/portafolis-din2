// Les parades del viatge. Per fer avançar el camí només cal canviar `estat`:
//   'properament' → encara no ha començat (parada apagada)
//   'en-curs'     → s'hi està treballant (parada encesa, amb pols)
//   'fet'         → lliurat (parada encesa i marcada)

export const parades = [
  {
    id: 'tiquet-entrada',
    tipus: 'tiquet',
    titol: "Tiquet d'entrada",
    subtitol: 'El punt de partida',
    color: 'var(--coral)',
    estat: 'en-curs',
    lliurament: '11/10/2026',
  },
  {
    id: 'm8',
    tipus: 'modul',
    codi: 'M8',
    titol: 'Competències de comunicació',
    subtitol: 'Escoltar, dir, conduir',
    color: 'var(--m8)',
    sessions: '17/09 · 18/09 · 01/10 · 02/10',
    estat: 'en-curs',
    lliurament: '11/10/2026',
  },
  {
    id: 'm9',
    tipus: 'modul',
    codi: 'M9',
    titol: 'Gestió de conflictes',
    subtitol: '',
    color: 'var(--m9)',
    sessions: '08/10 · 09/10 · 15/10 · 16/10',
    estat: 'properament',
    lliurament: '25/10/2026',
  },
  {
    id: 'm10',
    tipus: 'modul',
    codi: 'M10',
    titol: 'Gestió del temps',
    subtitol: '',
    color: 'var(--m10)',
    sessions: '29/10 · 30/10 · 05/11 · 06/11',
    estat: 'properament',
    lliurament: '15/11/2026',
  },
  {
    id: 'm11',
    tipus: 'modul',
    codi: 'M11',
    titol: 'Liderar el canvi',
    subtitol: '',
    color: 'var(--m11)',
    sessions: '12/11 · 13/11 · 19/11 · 20/11',
    estat: 'properament',
    lliurament: '29/11/2026',
  },
  {
    id: 'tiquet-sortida',
    tipus: 'tiquet',
    titol: 'Tiquet de sortida',
    subtitol: "L'arribada",
    color: 'var(--teal)',
    estat: 'properament',
    lliurament: '29/11/2026',
  },
]
