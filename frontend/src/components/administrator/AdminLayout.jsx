import Wrapper from "../ui/Wrapper";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <Wrapper>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </Wrapper>
  );
};

export default AdminLayout;