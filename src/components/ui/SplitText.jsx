// Splits text into <span class="w"><span class="ch">…</span></span> so GSAP can animate every letter
export function SplitChars({ text }) {
  return text.split(/(\s+)/).map((part, i) => {
    if (!part) return null;
    if (/^\s+$/.test(part)) return ' ';
    return (
      <span key={i} className="w" aria-hidden="true">
        {part.split('').map((c, j) => <span key={j} className="ch">{c}</span>)}
      </span>
    );
  });
}

// Splits text into <span class="wd">word</span>
export function SplitWords({ text }) {
  return text.split(/\s+/).map((w, i) => <span key={i} className="wd" aria-hidden="true">{w}</span>);
}
