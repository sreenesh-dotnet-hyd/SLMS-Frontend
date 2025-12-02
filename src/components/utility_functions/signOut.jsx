import { useNavigate } from "react-router-dom";


const signOut = () => {
    const navigate = useNavigate();
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiry");
  console.log("signing out!")
  navigate("/");  // or "/auth" depending on your app
};

export default signOut;