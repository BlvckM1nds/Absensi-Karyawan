import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance, setAuthToken } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setAuthToken(token);
          const { data: { data: { user } } } = await axiosInstance.get('/auth/initialize');
          
          setUser(user);
        } catch (error) {
          console.error('Failed to fetch user data', error);
          navigate("/");
        };
      } else {
        navigate("/");
      };
    };

    initializeUser();
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };