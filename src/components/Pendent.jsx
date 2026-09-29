// Marca visible per a allò que encara falta escriure o confirmar.
// Ús a l'MDX: <Pendent>què falta</Pendent>
export default function Pendent({ children }) {
  return (
    <span className="pendent" role="note">
      <span className="pendent__etiqueta">PENDENT</span> {children}
    </span>
  )
}
