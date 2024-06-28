import { useUser } from "../../contexts/UserContext";

import Container from "../ui/Container";
import PresenceRecord from "./PresenceRecord";

const PresenceList = ({ attendances }) => {
  const { user } = useUser();

  return (
    <Container>
      <div className="relative overflow-x-auto shadow-md mb-16">
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs bg-accent text-white uppercase">
              <tr>
                <th scope="col" className="text-center px-6 py-3">No</th>
                <th scope="col" className="text-center px-6 py-3">Date</th>
                <th scope="col" className="text-center px-6 py-3">Jam Check-in</th>
                <th scope="col" className="text-center px-6 py-3">Jam Check-out</th>
                <th scope="col" className="text-center px-6 py-3">Total Jam</th>
                <th scope="col" className="text-center px-6 py-3">Bukti Foto</th>
                <th scope="col" className="text-center px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendances?.filter(({ user_id }) => user_id === user?.id).length > 0 ? (
                attendances?.filter(({ user_id }) => user_id === user?.id).map((attendance, index) => (
                  <PresenceRecord key={attendance.id} attendance={attendance} index={index} />
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="7" className="py-4 text-lg text-primary/60 font-medium">Data absen tidak ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default PresenceList;