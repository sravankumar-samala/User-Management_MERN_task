import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Pencil } from "lucide-react";

export default function UpdateUser() {
  const [user, setUser] = useState(null);
  const [userPending, setUesrPending] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage } = location.state || { currentPage: 1 };

  const validateForm = () => {
    const { name, contact, dateOfBirth, description, email } = user;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    if (!contact) newErrors.contact = "Contact number is required.";
    else if (!/^\d{10}$/.test(contact))
      newErrors.contact = "Contact number must be 10 digits.";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!description) newErrors.description = "Description is required.";

    return newErrors;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const url = `https://user-management-men.onrender.com/updateUser/${id}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) return;
        navigate("/", { state: { currentPage } });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const url = "https://user-management-men.onrender.com/getUser/" + id;
      try {
        setUesrPending(true);
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) return;
        const data = await response.json();
        setUser(data[0]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setUesrPending(false);
      }
    };
    getUser();
  }, [id]);

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
      {userPending && <p>Loading...</p>}
      {user && (
        <form onSubmit={onSubmitForm}>
          <h2>
            <span>
              <Pencil size={16} />
            </span>
            Edit User Details
          </h2>
          <div className="inputs-devider">
            <label htmlFor="name">Name:</label>
            <input
              value={user.name}
              type="text"
              placeholder="Enter Name"
              id="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="inputs-devider">
            <label htmlFor="email">Email:</label>
            <input
              value={user.email}
              type="email"
              placeholder="Ex: example@gmail.com"
              id="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="inputs-devider">
            <label htmlFor="contact">Contact:</label>
            <input
              value={user.contact}
              type="tel"
              placeholder="Enter Mobile Number"
              id="contact"
              onChange={(e) => setUser({ ...user, contact: e.target.value })}
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>
          <div className="inputs-devider">
            <label htmlFor="dateOfBirth">Date Of Birth:</label>
            <input
              value={user.dateOfBirth}
              type="date"
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
              id="dateOfBirth"
            />
            {errors.dateOfBirth && (
              <span className="error">{errors.dateOfBirth}</span>
            )}
          </div>
          <div className="inputs-devider">
            <label htmlFor="description">Description:</label>
            <textarea
              value={user.description}
              id="description"
              onChange={(e) =>
                setUser({ ...user, description: e.target.value })
              }
              rows={6}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <button type="submit" className="btn-update">
            Update User
          </button>
        </form>
      )}
    </>
  );
}
