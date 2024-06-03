import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const url = "https://user-management-men.onrender.com/getUser/" + id;
      try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) return;
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <header className="header">
        <h1>Update User</h1>
        <button
          className="add-user-btn"
          type="button"
          onClick={() => navigate("/")}
        >
          &#11013; Home
        </button>
      </header>
    </>
  );
}
