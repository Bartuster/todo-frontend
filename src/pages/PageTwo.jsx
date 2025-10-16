import "./PageTwo.scss";
import opelImg from "../foto/opel.jpg";

export default function PageTwo() {
  return (
    <div className="page-two">
      <div className="ad-card">
        <img src={opelImg} alt="Opel" className="ad-image" />
        <div className="ad-content">
          <h2>Kupno Opla</h2>
          <p>Szukam używanego Opla w dobrym stanie, najlepiej rocznik 2015-2020. Stan techniczny żeby dojechać i z kilkudziesięciu metrów wyglądał na sprawny, cena i przegląd mam nadzieje do uzgodnienia.</p>
        </div>
      </div>
    </div>
  );
}
