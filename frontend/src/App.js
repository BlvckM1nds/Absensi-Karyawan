import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

// Employee
import Employee from "./pages/Employee";

// Administrator
import Administrator from "./pages/Administrator";
import Users from "./components/administrator/users/Users";
import Attendances from "./components/administrator/attendances/Attendances";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Employee Routes */}
        <Route path="/employee/attendances" element={<Employee />} />

        {/* Administrator Routes */}
        <Route path="/administrator" element={<Administrator />} />
        <Route path="/administrator/users" element={<Users />} />
        <Route path="/administrator/attendances" element={<Attendances />} />
      </Routes>
    </Fragment>
  );
};

export default App;
