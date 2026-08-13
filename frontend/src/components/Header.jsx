import { Link, useNavigate } from "react-router-dom";
import { TbHexagonLetterSFilled } from "react-icons/tb";
import { IoMdHeart } from "react-icons/io";
import "../App.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Successfully Logged Out");

      navigate("/");
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/home" className="header-logo">
            <TbHexagonLetterSFilled />
        </Link>

        <h1>
          Hello, <span>{user?.username}</span>!
        </h1>
      </div>

      <div className="header-right">
        <Link to="/liked">
          <IoMdHeart className="header-heart" />
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;