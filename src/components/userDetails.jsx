import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Pencil } from "lucide-react";
import LoadingView from "./LoadingView";
import "../styles/userDetails.css";

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [isUserPending, setIsUserPending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage } = location.state || { currentPage: 1 };
  const { id } = useParams();

  const goToHome = () => navigate("/", { state: { currentPage } });

  useEffect(() => {
    const getUserDetails = async () => {
      setIsUserPending(true);
      const url = `https://user-management-men.onrender.com/getUser/${id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) return;
        const userData = await response.json();
        setUserDetails(userData[0]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsUserPending(false);
      }
    };

    getUserDetails();
  }, [id]);

  return (
    <>
      <header className="header">
        <h1>User Details</h1>
        <button className="add-user-btn" type="button" onClick={goToHome}>
          &#11013; Home
        </button>
      </header>
      {isUserPending && <LoadingView />}
      {!isUserPending && userDetails && (
        <div className="user-details-container">
          <div className="image-container">
            <img src="/userProfile.png" alt="profile picture" />
          </div>
          <button
            type="button"
            className="update-btn"
            onClick={() => navigate(`/updateUser/${userDetails._id}`)}
          >
            <Pencil size={16} />
          </button>
          <div className="details-wrapper">
            <div className="user-name-container">
              <h2 className="name">{userDetails.name}</h2>
              <p className="email">{userDetails.email}</p>
            </div>
            <div className="contact">
              <h3>Contact:</h3>
              <p>{userDetails.contact}</p>
            </div>
            <div className="description">
              <h3>Description:</h3>
              <p>{userDetails.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
