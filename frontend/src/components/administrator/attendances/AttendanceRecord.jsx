import { Link } from "react-router-dom";
import { calculateTimeDifference, formatDate, formatTime } from "../../../utils/formatDatetime";

const AttendanceRecord = ({ attendance, index }) => {
  const { id, full_name, evidence, created_at, last_modified, status } = attendance;

  return (
    <tr key={id}>
      <td className="text-center py-4">
        {index + 1}
      </td>
      <td className="text-center font-medium py-4">
        {full_name}
      </td>
      <td className="text-center py-4">
        {formatDate(created_at)}
      </td>
      <td className="text-center py-4">
        {formatTime(created_at)}
      </td>
      <td className="text-center py-4">
        {formatTime(last_modified)}
      </td>
      <td className="text-center py-4">
        {calculateTimeDifference(created_at, last_modified)}
      </td>
      <td className="text-center py-4">
        <Link to={evidence} target="_blank" className="font-medium text-accent underline text-sm rounded-md">
          Link Bukti Foto
        </Link>
      </td>
      <td className="text-center py-4">
        {status === "running" ? (
          <span className="font-medium text-orange-500 text-sm border border-orange-500 p-1.5 rounded-md">On Progress</span>
        ) : (
          <span className="font-medium text-accent text-sm border border-accent p-1.5 rounded-md">Attended</span>
        )}
      </td>
    </tr>
  );
};

export default AttendanceRecord;