import { useEffect, useState } from "react";
import { SlRefresh } from "react-icons/sl";

import AdminLayout from "../AdminLayout";
import Button from "../../ui/Button";
import Container from "../../ui/Container";

import { axiosInstance } from "../../../utils/axiosInstance";
import UserRecord from "./UserRecord";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import NewUserForm from "./NewUserForm";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [activeUser, setActiveUser] = useState(null);
  const [newUserForm, setNewUserForm] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data: { data: res } } = await axiosInstance.get("/users");

      setUsers(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    };
  };

  useEffect(() => {
    fetchUsers();
  }, [isRefreshing, editModal, deleteModal, newUserForm]);

  const handleNewUserForm = bool => setNewUserForm(bool);

  const handleEditUserModal = (bool, user) => {
    setEditModal(bool);
    setActiveUser(user);
  };

  const handleDeleteUserModal = (bool, user) => {
    setDeleteModal(bool);
    setActiveUser(user);
  };

  return (
    <AdminLayout>

      {editModal && <EditUserModal user={activeUser} onEditUserModal={handleEditUserModal} />}
      {deleteModal && <DeleteUserModal user={activeUser} onDeleteUserModal={handleDeleteUserModal} />}
      {newUserForm && <NewUserForm onNewUserForm={handleNewUserForm} />}

      <Container className="py-16">
        <div className="min-w-[1280px] space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl text-primary font-medium">Daftar Pengguna</h2>
            <div className="flex items-center gap-5">
              <span
                onClick={() => setIsRefreshing(true)}
                className="cursor-pointer font-medium flex items-center gap-1.5 text-accent"
                disabled={isRefreshing}
              >
                <SlRefresh className={`text-xl ${isRefreshing && "animate-spin"}`} /><span className="text-sm">Refresh</span>
              </span>
              <Button
                className="bg-accent text-white hover:bg-accent-hover"
                onClick={() => handleNewUserForm(true)}
              >
                Tambah Pengguna
              </Button>
            </div>
          </div>

          <hr />

          {/* Table */}
          <div className="relative overflow-x-auto shadow-md mb-16">
            <div className="relative overflow-x-auto shadow-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs bg-accent text-white uppercase">
                  <tr>
                    <th scope="col" className="text-center p-3">No</th>
                    <th scope="col" className="text-center p-3">Nama Lengkap</th>
                    <th scope="col" className="text-center p-3">Email</th>
                    <th scope="col" className="text-center p-3">No Telepon</th>
                    <th scope="col" className="text-center px-10 py-3">Alamat</th>
                    <th scope="col" className="text-center">Role</th>
                    <th scope="col" className="text-center">Tanggal Buat</th>
                    <th scope="col" className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.length > 0 ? (
                    users?.map((user, index) => (
                      <UserRecord
                        key={user.id}
                        user={user}
                        index={index}
                        onEditUserModal={handleEditUserModal}
                        onDeleteUserModal={handleDeleteUserModal}
                      />
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan="6" className="py-4 text-lg text-primary/60 font-medium">Data pengguna tidak ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default Users;