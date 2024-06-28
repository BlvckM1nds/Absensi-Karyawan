import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

import profilePicture from "../../assets/blank-profile.png";
import { setAuthToken } from "../../utils/axiosInstance";

const Sidebar = () => {
  const { user, setUser } = useUser();
  const [menu, setMenu] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMenu = currentPath[2];

    setMenu(currentMenu);
  }, [location]);

  const options = [
    { value: "", label: "Dashboard" },
    { value: "users", label: "Pengguna" },
    { value: "attendances", label: "Absensi" }
  ];

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);

    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <aside className="basis-60 max-w-60 h-screen bg-accent sticky top-0 left-0">
      <div className="flex items-center gap-3 p-4">
        <img src={profilePicture} alt="profpic" className="h-12" />
        <div className="flex flex-col max-w-40 text-white">
          <p className="font-medium">{user?.full_name}</p>
          <p className="text-xs truncate">{user?.email}</p>
        </div>
      </div>
      <hr className="mb-2 opacity-75" />
      <ul className="space-y-2">
        {options.map(({ value, label }) => (
          <li
            key={value}
            onClick={() => {
              navigate(`/administrator/${value}`);
            }}
            className={`rounded-md font-medium flex items-center gap-2 p-2 mx-2 cursor-pointer duration-200 hover:bg-white hover:text-accent group ${value === menu ? "bg-white text-accent" : "text-white"}`}
          >
            <span className="duration-200 group-hover:translate-x-1.5">{label}</span>
          </li>
        ))}
        <li
          onClick={handleLogout}
          className="rounded-md text-white font-medium flex items-center gap-2 p-2 mx-2 cursor-pointer duration-200 hover:bg-red-500 group"
        >
          <span className="duration-200 group-hover:translate-x-1.5">Keluar</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;