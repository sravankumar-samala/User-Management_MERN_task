import { Routes, Route } from "react-router-dom";
import Users from "./components/users.jsx";
import UpdateUser from "./components/updateUser.jsx";
import CreateUser from "./components/createUser.jsx";
import UserDetails from "./components/userDetails.jsx";
import NotFound from "./components/notFound.jsx";

export default function App() {
  return (
    <div className="app-container">
      <main className="main-container">
        <Routes>
          <Route index path="/" element={<Users />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
          <Route path="/userDetails/:id" element={<UserDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
