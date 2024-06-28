import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { setAuthToken } from "../../utils/axiosInstance";
import { formatDate } from "../../utils/formatDatetime";
import { FiLogOut } from "react-icons/fi";

import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);

    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <header className="shadow-xl sticky top-0 bg-accent z-[500]">
      <div className="py-5 max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-2xl text-white font-medium">Halo, {user?.full_name}</h3>
          <p className="text-white text-sm">{formatDate(new Date())}</p>
        </div>
        <Button
          className="flex gap-1.5 items-center bg-white text-accent hover:bg-accent-hover hover:text-white"
          onClick={handleLogout}
        >
          Keluar<FiLogOut />
        </Button>
      </div>
    </header>
  );
};

export default Header;