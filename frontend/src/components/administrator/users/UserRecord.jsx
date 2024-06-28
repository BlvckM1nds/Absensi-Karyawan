import { FaUserShield, FaUserTie } from "react-icons/fa";
import { FaTrash, FaEdit } from "react-icons/fa";

import { formatDate } from "../../../utils/formatDatetime";

const UserRecord = ({ user, index, onEditUserModal, onDeleteUserModal }) => {
  const { id, full_name, email, phone, address, role, created_at } = user;

  return (
    <tr key={id} className="bg-white border-b duration-200 text-primary hover:bg-cloud/25">
      <td className="text-center py-4">
        {index + 1}
      </td>
      <td className="text-center font-medium py-4">
        {full_name}
      </td>
      <td className="text-center py-4">
        {email}
      </td>
      <td className="text-center py-4">
        {phone}
      </td>
      <td className="text-center py-4">
        <div className="max-w-32 mx-auto truncate">{address}</div>
      </td>
      <td className="text-center text-xl text-accent py-4">
        <span className="inline-block">
          {role === "1" ? <FaUserTie /> : <FaUserShield />}
        </span>
      </td>
      <td className="text-center py-4">
        {formatDate(created_at)}
      </td>
      <td className="text-center py-4">
        <div className="flex justify-center gap-2">
          <span
            className="cursor-pointer p-2 aspect-square bg-accent text-white rounded-md duration-200 hover:bg-accent-hover"
            onClick={() => onEditUserModal(true, user)}
          >
            <FaEdit />
          </span>
          <span
            className="cursor-pointer p-2 aspect-square bg-red-500 text-white rounded-md duration-200 hover:bg-accent-hover"
            onClick={() => onDeleteUserModal(true, user)}
          >
            <FaTrash />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default UserRecord;