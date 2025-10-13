import { Link } from "react-router-dom";
import "./PageTwo.scss";

export default function PageTwo() {
  return (
    <div className="page-two">
      <h1>Strona Druga</h1>
      <p>To jest tekst ostylowany w SCSS.</p>
      <Link to="/" className="back-button">Powrót na pierwszą stronę</Link>
    </div>
  );
}
