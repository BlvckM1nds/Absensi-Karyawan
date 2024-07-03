import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useUser } from "../../contexts/UserContext";
import { SlRefresh } from "react-icons/sl";

import Container from "../ui/Container";
import Button from "../ui/Button";
import profilePicture from "../../assets/blank-profile.png";

const Heading = ({ attendances, onRefetch, onCheckInModal }) => {
  const { user } = useUser();

  const [lastAttendanceToday, setLastAttendanceToday] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentUserAttendances = attendances?.filter(({ user_id }) => user_id === user?.id);

  useEffect(() => {
    if (user && attendances) {
      if (currentUserAttendances.length > 0) {
        const lastAttendance = currentUserAttendances[0];
        const lastAttendanceDate = new Date(lastAttendance.last_modified);
        const today = new Date();

        const isSameDay =
          lastAttendanceDate.getDate() === today.getDate() &&
          lastAttendanceDate.getMonth() === today.getMonth() &&
          lastAttendanceDate.getFullYear() === today.getFullYear();

        setLastAttendanceToday(isSameDay && lastAttendance.status === 'attended');
      } else {
        setLastAttendanceToday(false);
      };
    };
  }, [attendances, user, currentUserAttendances]);

  const handleAttendanceStatus = async event => {
    const { innerText: action } = event.target;

    if (action === "Check In") {
      onCheckInModal(true);
    } else if (action === "Check Out" && currentUserAttendances.length > 0) {
      try {
        await axiosInstance.put(`/attendances/${currentUserAttendances[0]?.id}/stop`);

        (async () => await onRefetch(true))();
      } catch (error) {
        console.error(error);
      };
    };
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await onRefetch(true);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    };
  };

  return (
    <Container className="mt-16 mb-10 flex justify-between items-end">
      <div className="flex items-center gap-10">
        <div className="h-56">
          <img src={profilePicture} alt="Profile" className="h-full" />
        </div>
        <div className="substance space-y-4">
          <h1 className="text-4xl text-accent font-bold">{user?.full_name}</h1>
          <ul className="text-lg space-y-1.5">
            <li className="flex gap-x-5 text-primary/60">
              Email<span className="font-medium text-primary">{user?.email}</span>
            </li>
            <li className="flex gap-x-5 text-primary/60">
              Nomor Telpon<span className="font-medium text-primary">{user?.phone}</span>
            </li>
            <li className="flex gap-x-5 text-primary/60 max-w-2xl">
              Alamat<span className="font-medium text-primary truncate">{user?.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span
          onClick={handleRefresh}
          className="cursor-pointer font-medium flex items-center gap-1.5 text-accent"
          disabled={isRefreshing}
        >
          <SlRefresh className={`text-xl ${isRefreshing && "animate-spin"}`} /><span className="text-sm">Refresh</span>
        </span>
        <Button
          className={`h-fit bg-accent text-white ${lastAttendanceToday ? "bg-primary cursor-not-allowed" : "hover:bg-accent-hover hover:text-white"}`}
          onClick={handleAttendanceStatus}
          disabled={lastAttendanceToday}
        >
          {lastAttendanceToday || currentUserAttendances.length < 1 ? "Check In" : "Check Out"}
        </Button>
      </div>
    </Container>
  );
};

export default Heading;