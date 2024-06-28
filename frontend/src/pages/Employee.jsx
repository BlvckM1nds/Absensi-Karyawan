import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

import EmployeeLayout from "../components/employee/EmployeeLayout";
import Wrapper from "../components/ui/Wrapper";
import Heading from "../components/employee/Heading";
import PresenceList from "../components/employee/PresenceList";
import CheckInModal from "../components/employee/CheckInModal";

const Employee = () => {
  const [attendances, setAttendances] = useState([]);
  const [checkInModal, setCheckInModal] = useState(false);

  const fetchAttendanceData = async () => {
    try {
      const { data: { data: res } } = await axiosInstance.get("/attendances");

      setAttendances(res);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const handleRefetch = async (shouldRefetch) => {
    if (shouldRefetch) {
      await fetchAttendanceData();
    };
  };
  const handleCheckInModal = bool => setCheckInModal(bool);

  return (
    <EmployeeLayout>
      <Wrapper>
        {checkInModal && <CheckInModal onCheckInModal={handleCheckInModal} onRefetch={handleRefetch} />}

        <Heading attendances={attendances} onRefetch={handleRefetch} onCheckInModal={handleCheckInModal} />
        <PresenceList attendances={attendances} />
      </Wrapper>
    </EmployeeLayout>
  );
};

export default Employee;