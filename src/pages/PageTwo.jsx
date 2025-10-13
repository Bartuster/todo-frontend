import { Link } from "react-router-dom";
import "./PageTwo.scss";

export default function PageTwo() {
  return (
    <div className="page-two">
      <h1>Page Two</h1>
      <p>To jest random tekst na Page Two</p>
      <Link to="/" className="button">Przejdź do Page One</Link>
    </div>
  );
}
