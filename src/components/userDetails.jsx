import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LoadingView from "./LoadingView";

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
      {userDetails && <h2>{userDetails.name}</h2>}
    </>
  );
}
