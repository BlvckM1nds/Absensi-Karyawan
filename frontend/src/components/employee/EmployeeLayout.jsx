import Footer from "../ui/Footer";
import Header from "../ui/Header";

const EmployeeLayout = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default EmployeeLayout;