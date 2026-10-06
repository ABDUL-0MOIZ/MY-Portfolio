import useTilt from '../../hooks/useTilt';

// .card with cursor spotlight (+ optional 3D tilt on desktop)
export default function Card({ as: Tag = 'div', tilt = false, className = '', children, ...rest }) {
  const t = useTilt(tilt);
  const onPointerMove = (e) => {
    const el = t.ref.current, r = el.getBoundingClientRect();
    el.style.setProperty('--mx', e.clientX - r.left + 'px');
    el.style.setProperty('--my', e.clientY - r.top + 'px');
    t.onPointerMove(e);
  };
  return (
    <Tag
      ref={t.ref}
      className={`card ${t.on ? 'tilt ' : ''}${className}`.trim()}
      onPointerMove={onPointerMove}
      onPointerLeave={t.onPointerLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
