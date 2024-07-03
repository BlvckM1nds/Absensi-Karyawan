import { axiosInstance } from "../../../utils/axiosInstance";
import Button from "../../ui/Button";

const DeleteUserModal = ({ user, onDeleteUserModal }) => {
  const handleConfirm = async event => {
    event.preventDefault();

    try {
      await axiosInstance.delete(`/users/${user?.id}`);

      onDeleteUserModal(false, null);
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className="z-[99] flex items-center justify-center backdrop-blur-sm bg-black/50 fixed inset-0">
      <div className="w-[480px] rounded-md bg-white p-8">
        <h2 className="text-2xl text-center font-bold text-accent mb-4">Hapus Data Pengguna?</h2>
        <div className="text-primary text-center mb-6">
          <h4 className="text-lg font-medium">Konfirmasi data berikut</h4>
          <p>Name: <span className="font-medium">{user?.full_name}</span></p>
          <p>Email: <span className="font-medium">{user?.email}</span></p>
        </div>
        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            className="flex-1 bg-red-500 text-white duration-200 hover:bg-accent-hover"
            onClick={handleConfirm}
          >
            Hapus
          </Button>
          <Button
            className="flex-1 bg-accent text-white duration-200 hover:bg-accent-hover"
            onClick={() => onDeleteUserModal(false, null)}
          >
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;