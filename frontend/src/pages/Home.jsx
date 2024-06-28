import { useNavigate } from "react-router-dom";

import Container from "../components/ui/Container";
import { useUser } from "../contexts/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log(user);

  return (
    <Container>
      <h1>{user ? `Hello, ${user.full_name}` : `Login first.`}</h1>
      <button onClick={() => navigate("/")}>Login</button>
    </Container>
  );
};

export default Home;