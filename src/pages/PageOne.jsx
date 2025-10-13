import { Link } from "react-router-dom";

export default function PageOne() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-black">Page One</h1>
      <p className="mb-4 text-black">To jest random tekst na Page One</p>
      <Link to="/pagetwo" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
        Przejdź do Page Two
      </Link>
    </div>
  );
}
