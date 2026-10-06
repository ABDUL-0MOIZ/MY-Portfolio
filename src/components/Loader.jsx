export default function Loader() {
  return (
    <div id="loader" aria-hidden="true">
      <div className="loader-in">
        <div className="logo">ABDUL <span>MOIZ</span></div>
        <div className="load-track"><i id="loadBar" /></div>
        <small id="loadTxt">LOADING 0%</small>
      </div>
    </div>
  );
}
