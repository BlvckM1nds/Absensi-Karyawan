import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import Button from "../../ui/Button";

const EditUserModal = ({ user, onEditUserModal }) => {
  const [payload, setPayload] = useState({
    fullName: user?.full_name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  });
  const [updateDisabled, setUpdateDisabled] = useState(true);

  useEffect(() => {
    const { fullName, phone, address, email } = payload;

    setUpdateDisabled(
      !(
        (fullName && fullName !== user?.full_name) ||
        (phone && phone !== user?.phone) ||
        (address && address !== user?.address) ||
        (email && email !== user?.email)
      )
    );
  }, [payload, user]);

  const handleDataChange = event => {
    const { name, value } = event.target;

    setPayload(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await axiosInstance.put(`/users/${user?.id}`, payload);

      onEditUserModal(false, null);
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className="z-[99] flex items-center justify-center backdrop-blur-sm bg-black/50 fixed inset-0">
      <form action="submit" className="w-[480px] rounded-md bg-white p-8 space-y-4">
        <h2 className="text-2xl text-center font-bold text-accent">Edit Data Pengguna</h2>
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-primary">
            Nama Lengkap
          </label>
          <input
            id="fullName"
            name="fullName"
            type="fullName"
            value={payload.fullName}
            onChange={handleDataChange}
            placeholder="Ryu Alvano"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={payload.email}
            onChange={handleDataChange}
            placeholder="someone@example.com"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-primary">
            Nomor Telepon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={payload.phone}
            onChange={handleDataChange}
            placeholder="08xxxxxxxxxx"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-primary">
            Alamat
          </label>
          <textarea
            id="address"
            name="address"
            value={payload.address}
            onChange={handleDataChange}
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            className={`flex-1 ${updateDisabled ? "bg-primary cursor-not-allowed" : "bg-green-500 hover:bg-accent-hover"} text-white duration-200`}
            disabled={updateDisabled}
            onClick={handleSubmit}
          >
            Ubah
          </Button>
          <Button
            className="flex-1 bg-accent text-white duration-200 hover:bg-accent-hover"
            onClick={() => onEditUserModal(false, null)}
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;