import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import ReactLoading from "react-loading";
import "../styles/users.css";
import Pagination from "./pagination";

const colorsList = [
  "#430a5d",
  "#240750",
  "#6d3405",
  "#791142",
  "#116d6e",
  "#735f32",
  "#082a56",
  "#1e5128",
  "#065f36",
  "#d89216",
  "#323232",
  "#690707",
];
const chooseRandomColor = () => {
  const index = Math.floor(Math.random() * colorsList.length);
  return colorsList[index];
};

export default function Users() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const isScreenAbove620 = useMediaQuery({ query: "(min-width: 620px)" });
  const isScreenAbove540 = useMediaQuery({ query: "(min-width: 540px)" });

  const goToAddNewUser = () => {
    navigate("/createUser");
  };

  const getUsers = useCallback(async () => {
    const limit = 10;
    try {
      setIsLoading(true);
      const url = `http://localhost:3004/getAllUsers?page=${currentPage}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) return;
      const data = await response.json();
      setUsers(data.users);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const deleteUser = async (id) => {
    const url = "https://user-management-men.onrender.com/deleteUser/" + id;
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) return;
      const data = await response.json();
      console.log(data.message);
      setShowConfirmBox(false);
      getUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, getUsers]);

  return (
    <>
      <header className="header">
        <h1>Users Dashboard</h1>
        <button type="button" onClick={goToAddNewUser}>
          &#10010; Add User
        </button>
      </header>
      {isLoading ? (
        <div className="loading-container">
          <ReactLoading color="#18292e" type="spin" width={50} height={50} />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {isScreenAbove540 && <th>Email</th>}
              {isScreenAbove620 && <th>contact</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user) => (
                <tr key={user._id}>
                  <td className="user-name-contaner">
                    <span
                      className="user-image"
                      style={{ backgroundColor: chooseRandomColor() }}
                    >
                      {user.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="user-name">{user.name}</span>
                  </td>
                  {isScreenAbove540 && <td>{user.email}</td>}
                  {isScreenAbove620 && <td>{user.contact}</td>}
                  <td className="btns-container">
                    <button
                      type="button"
                      onClick={() => navigate(`/updateUser/${user._id}`)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirmBox(true);
                        setUserId(user._id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={setCurrentPage}
      />
      {showConfirmBox && (
        <div className="overlay">
          <div className="confirm-delete-container">
            <h2>Are you sure?</h2>
            <div>
              <button type="button" onClick={() => setShowConfirmBox(false)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteUser(userId);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
