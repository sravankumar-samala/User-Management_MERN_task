import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import Pagination from "./pagination";
import chooseRandomColor from "./getRandomFile";
import "../styles/users.css";
import LoadingView from "./LoadingView";

export default function Users() {
  const location = useLocation();
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(
    location.state?.currentPage || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const isScreenAbove620 = useMediaQuery({ query: "(min-width: 620px)" });
  const isScreenAbove580 = useMediaQuery({ query: "(min-width: 580px)" });
  const navigate = useNavigate();

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
      setCurrentPage(Number(data.currentPage));
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const deleteUser = useCallback(
    async (id) => {
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
    },
    [getUsers]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <header className="header">
        <h1>Users Dashboard</h1>
        <button type="button" onClick={goToAddNewUser}>
          &#10010; Add User
        </button>
      </header>
      {isLoading ? (
        <LoadingView />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {isScreenAbove580 && <th>Email</th>}
              {isScreenAbove620 && <th>contact</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user) => (
                <tr
                  key={user._id}
                  onClick={() =>
                    navigate(`/userDetails/${user._id}`, {
                      state: { currentPage },
                    })
                  }
                >
                  <td className="user-name-contaner">
                    <span
                      className="user-image"
                      style={{
                        backgroundColor: chooseRandomColor(),
                      }}
                    >
                      {user.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="user-name">
                      <span>{user.name}</span>
                      {!isScreenAbove580 && <i>{user.email}</i>}
                    </span>
                  </td>
                  {isScreenAbove580 && <td>{user.email}</td>}
                  {isScreenAbove620 && <td>{user.contact}</td>}
                  <td className="btns-container">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/updateUser/${user._id}`, {
                          state: { currentPage },
                        })
                      }
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
