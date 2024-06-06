import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <h1>404 Not Found</h1>
      <p>The page your are looking for is not found.</p>
      <button type="button" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}
