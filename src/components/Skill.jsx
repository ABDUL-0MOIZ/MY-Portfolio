import useInView from '../hooks/useInView';

// Progress bar that fills when scrolled into view
export default function Skill({ label, value }) {
  const [ref, seen] = useInView(0.4);
  return (
    <div className="skill">
      <div className="row"><span>{label}</span><em>{value}%</em></div>
      <div className="bar"><i ref={ref} style={{ width: seen ? value + '%' : 0 }} /></div>
    </div>
  );
}
