import { useUser } from "../contexts/UserContext";

import AdminLayout from "../components/administrator/AdminLayout";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Administrator = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  return (
    <AdminLayout>
      <Container className="my-auto space-y-8">
        <div className="hero text-center space-y-2">
          <h3 className="text-primary text-3xl font-medium">Selamat datang,</h3>
          <h1 className="text-accent text-7xl font-bold">{user?.full_name}</h1>
        </div>

        <div className="flex justify-center gap-4 border-t pt-6">
          <Button
            onClick={() => navigate("/administrator/users")}
            className="bg-accent text-white hover:bg-accent-hover"
          >
            Daftar Pengguna
          </Button>
          <Button
            onClick={() => navigate("/administrator/attendances")}
            className="bg-accent text-white hover:bg-accent-hover"
          >
            Monitor Absensi
          </Button>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default Administrator;