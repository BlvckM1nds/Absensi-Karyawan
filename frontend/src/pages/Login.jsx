import { useState } from "react";
import { axiosInstance, setAuthToken } from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import Wrapper from "../components/ui/Wrapper";
import Container from "../components/ui/Container";
import bgImage from "../assets/building.jpg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { setUser } = useUser();

  const handleInputChange = event => {
    const { name, value } = event.target;

    setError("");
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data: res } = await axiosInstance.post("/auth/login", formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setAuthToken(token);
      setUser(user);

      if (parseInt(user.role) === 1) {
        navigate(location.state || "/employee/attendances");
      } else if (parseInt(user.role) === 2) {
        navigate(location.state || "/administrator");
      };
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) setError(error.response.data.message);
    };
  };

  return (
    <Wrapper className="flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <Container className="w-[440px] flex flex-col gap-7 items-center justify-center bg-white/90 p-8 rounded-xl shadow-xl">
        <div className="space-y-2.5">
          <h1 className="text-center text-3xl text-accent font-bold">Absensi Karyawan</h1>
          <h2 className="text-center text-xl font-medium tracking-tight text-secondary">
            Masuk dengan akun Anda
          </h2>
        </div>
        <div className="mx-auto w-full max-w-96">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="someone@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-primary">
                  Kata Sandi
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent"
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm duration-200 hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Login;