// Original decorative studies, not product representations or engineering drawings.
export function TechnicalArt() {
  const ring = "M-142-142H142Q168-142 168-116V116Q168 142 142 142H-142Q-168 142-168 116V-116Q-168-142-142-142ZM-66-65Q-80-65-80-51V51Q-80 65-66 65H66Q80 65 80 51V-51Q80-65 66-65Z";
  return <svg className="hero-art" viewBox="0 0 640 590" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="hero-surface" x1="-168" y1="-142" x2="160" y2="140" gradientUnits="userSpaceOnUse"><stop stopColor="#f0f4ed" /><stop offset=".55" stopColor="#b8cdc5" /><stop offset="1" stopColor="#668980" /></linearGradient>
      <linearGradient id="hero-edge" x1="-150" y1="0" x2="168" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#456960" /><stop offset=".52" stopColor="#a1bab0" /><stop offset="1" stopColor="#32584f" /></linearGradient>
    </defs>
    <g stroke="#728f99" strokeWidth=".65" opacity=".23">
      <path d="M-30 300 335 86 690 287M-30 390 335 176 690 377M-30 480 335 266 690 467M-30 570 335 356 690 557M36 0v590M605 0v590" />
      <path d="m140 30 490 280M45 88l490 280M-48 147l490 280M228 540 396 443M335 86v504" strokeDasharray="4 8" />
      <circle cx="335" cy="317" r="226" /><circle cx="335" cy="317" r="266" strokeDasharray="2 12" />
    </g>
    <g transform="translate(326 366) rotate(-30) skewX(25) scale(1 .83)">
      <path d={ring} fill="#091c29" fillRule="evenodd" opacity=".6" transform="translate(0 42)" />
      {Array.from({ length: 26 }, (_, i) => <path key={i} d={ring} transform={`translate(0 ${-i * 2.6})`} fill="url(#hero-edge)" fillRule="evenodd" stroke="#9bb6ab" strokeWidth=".45" />)}
      <path d={ring} transform="translate(0 -68)" fill="url(#hero-surface)" fillRule="evenodd" stroke="#dce8df" strokeWidth="1.2" />
      <path d="M-137-112H137V112H-137Z" transform="translate(0 -68)" stroke="#ffffff" opacity=".3" />
      {[[-122,-100],[122,-100],[-122,100],[122,100]].map(([x,y], i) => <g key={i} transform={`translate(${x} ${y - 68})`}><circle r="9" fill="#44685e" /><circle r="5.5" stroke="#b4cabe" /></g>)}
    </g>
    <g stroke="#87b4a4" strokeWidth="1"><path d="M432 183h74l33-33h58M145 414H83l-29 29H20" /><circle cx="432" cy="183" r="3" fill="#a8cbb9" /><circle cx="145" cy="414" r="3" fill="#a8cbb9" /></g>
    <g fill="#87a397"><path d="M34 84h8v1h-8zm3.5-3.5h1v8h-1zM601 507h8v1h-8zm3.5-3.5h1v8h-1z" /></g>
  </svg>;
}

export function CategoryArt({ kind }: { kind: string }) {
  return <svg viewBox="0 0 360 240" fill="none" aria-hidden="true" className="category-art">
    <path d="M32 192h296M180 24v191" stroke="#d4dcda" strokeDasharray="3 6" />
    {kind === "transformer" ? <g transform="translate(180 116) rotate(-24) skewX(15) scale(1 .77)">
      {Array.from({ length: 12 }, (_, i) => <path key={i} transform={`translate(0 ${24-i*2})`} d="M-62-81H62L84-59V59L62 81H-62L-84 59V-59ZM-28-36-38-26V26L-28 36H28L38 26V-26L28-36Z" fill={i === 11 ? "#becdc6" : "#537066"} fillRule="evenodd" stroke="#8da399" strokeWidth="1" />)}
      <path d="M-58-68H58L71-55V55L58 68H-58L-71 55V-55Z" stroke="#e9efea" />
      <path d="M-65 88v15h28V88M37 88v15h28V88" fill="#86968e" stroke="#537066" />
    </g> : kind === "insulator" ? <g transform="translate(180 118)">
      <path d="M-44 72 0 54l44 18v10L0 101l-44-19Z" fill="#8faaa0" stroke="#6b8479" />
      <path d="M-15-66h30V72c0 11-30 11-30 0Z" fill="#5c796c" />
      {[48,22,-4,-30,-56].map((y, i) => <g key={y} transform={`translate(0 ${y})`}><path d="M-44 0v7c0 20 88 20 88 0V0" fill="#708d7f" stroke="#537064" /><ellipse rx={44-i*2} ry="14" fill="#bdcec3" stroke="#688477" /><ellipse rx="15" ry="5" fill="#8aa393" /></g>)}
      <path d="M-10-97h20v29c0 6-20 6-20 0Z" fill="#b2bcba" stroke="#788783" /><ellipse cy="-97" rx="10" ry="4" fill="#dee4df" />
    </g> : <g transform="translate(68 80)">
      {[0,1,2].map((i) => <g key={i} transform={`translate(${i*57} ${i*-7})`}><path d="M0 15 40 0l40 23-40 16Z" fill="#c2cdc5" stroke="#879c90" /><path d="M0 15v65l40 24V39Z" fill="#698679" stroke="#526f63" /><path d="M40 39 80 23v65l-40 16Z" fill="#a2b6a8" stroke="#6f887a" /><ellipse cx="40" cy="20" rx="12" ry="7" fill="#435f55" stroke="#edf2ec" /><path d="M17 48v22m-4-15 8 5" stroke="#c4d6c9" /><path d="m54 58 12-5v22l-12 5Z" fill="#577667" /></g>)}
    </g>}
    <path d="M24 24h12m-6-6v12M324 210h12m-6-6v12" stroke="#9baaa1" />
  </svg>;
}
