import { Link } from "react-router-dom";

export default function PageOne() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Strona Pierwsza</h1>
      <Link
        to="/page-two"
        className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Przejdź do drugiej strony
      </Link>
    </div>
  );
}
