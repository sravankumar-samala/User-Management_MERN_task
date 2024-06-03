import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import ReactLoading from "react-loading";
import "../styles/users.css";

export default function Users() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const goToAddNewUser = () => {
    navigate("/createUser");
  };

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const url = "https://user-management-men.onrender.com/getAllUsers";
      const response = await fetch(url);
      if (!response.ok) return;
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
  }, []);

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
              <th>Email</th>
              <th>contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user) => (
                <tr key={user._id}>
                  <td className="user-name-contaner">
                    <span className="user-image">
                      {user.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="user-name">{user.name}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
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
      {showConfirmBox && (
        <div className="overlay">
          <div className="confirm-delete-container">
            <h3>Are you sure?</h3>
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