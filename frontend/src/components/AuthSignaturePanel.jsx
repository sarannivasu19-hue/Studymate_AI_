// The signature visual: a small constellation of nodes that reads as a
// "spark of insight" — one amber node lights up while quieter violet nodes
// form the surrounding network, echoing the idea of an AI tutor connecting
// ideas together.
export default function AuthSignaturePanel({ heading, body }) {
  return (
    <aside className="auth-signature">
      <div className="auth-brand">
        <span className="auth-brand-dot" />
        StudyMateAI
      </div>

      <div className="auth-signature-copy">
        <h1>{heading}</h1>
        <p>{body}</p>
      </div>

      <p className="auth-footnote">Built for focused, guided studying.</p>

      <svg className="auth-network" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
        <g>
          <line x1="240" y1="180" x2="120" y2="260" />
          <line x1="240" y1="180" x2="340" y2="240" />
          <line x1="240" y1="180" x2="220" y2="320" />
          <line x1="120" y1="260" x2="90" y2="360" />
          <line x1="340" y1="240" x2="380" y2="340" />
          <line x1="220" y1="320" x2="120" y2="260" />
          <line x1="220" y1="320" x2="340" y2="240" />
          <line x1="220" y1="320" x2="90" y2="360" />
          <line x1="220" y1="320" x2="380" y2="340" />
        </g>
        <circle className="node spark pulse" cx="240" cy="180" r="6" />
        <circle className="node" cx="120" cy="260" r="4" />
        <circle className="node" cx="340" cy="240" r="4" />
        <circle className="node" cx="220" cy="320" r="5" />
        <circle className="node" cx="90" cy="360" r="3.5" />
        <circle className="node" cx="380" cy="340" r="3.5" />
      </svg>
    </aside>
  )
}
