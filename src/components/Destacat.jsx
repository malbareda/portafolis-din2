// Una idea que vull que quedi: la «frase llacet» d'una secció.
// Ús: <Destacat>La frase.</Destacat>
export default function Destacat({ children }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-title)',
        fontSize: '1.35rem',
        lineHeight: 1.35,
        fontWeight: 500,
        margin: '1.6em 0',
        paddingLeft: '1rem',
        borderLeft: '6px solid var(--accent, var(--coral))',
      }}
    >
      {children}
    </p>
  )
}
