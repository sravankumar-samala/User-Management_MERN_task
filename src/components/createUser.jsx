import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/createUser.css";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErros] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage } = location.state || { currentPage: 1 };

  const goToHome = () => navigate("/", { state: { currentPage } });

  const validateForm = () => {
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
      const capitalizedName = name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const user = {
        name: capitalizedName,
        email,
        contact: Number(contact),
        dateOfBirth,
        description,
      };
      const url = "https://user-management-men.onrender.com/createUser";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) return;
        goToHome();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setErros(newErrors);
    }
  };

  return (
    <>
      <header className="header">
        <h1>Create User</h1>
        <button className="add-user-btn" type="button" onClick={goToHome}>
          &#11013; Home
        </button>
      </header>

      <form onSubmit={onSubmitForm}>
        <h2>&#10010; Fill in User Details</h2>
        <div className="inputs-devider">
          <label htmlFor="name">Name:</label>
          <input
            value={name}
            type="text"
            placeholder="Enter Name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="inputs-devider">
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            type="email"
            placeholder="Ex: example@gmail.com"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="inputs-devider">
          <label htmlFor="contact">Contact:</label>
          <input
            value={contact}
            type="tel"
            placeholder="Enter Mobile Number"
            id="contact"
            onChange={(e) => setContact(e.target.value)}
          />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </div>
        <div className="inputs-devider">
          <label htmlFor="dateOfBirth">Date Of Birth:</label>
          <input
            value={dateOfBirth}
            type="date"
            onChange={(e) => setDateOfBirth(e.target.value)}
            id="dateOfBirth"
          />
          {errors.dateOfBirth && (
            <span className="error">{errors.dateOfBirth}</span>
          )}
        </div>
        <div className="inputs-devider">
          <label htmlFor="description">Description:</label>
          <textarea
            value={description}
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        <button type="submit" className="add-user-btn">
          Add User
        </button>
      </form>
    </>
  );
}
