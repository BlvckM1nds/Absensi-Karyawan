import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { SlRefresh } from "react-icons/sl";

import AdminLayout from "../AdminLayout";
import Container from "../../ui/Container";
import AttendanceRecord from "./AttendanceRecord";

const Attendances = () => {
  const [attendances, setAttendances] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAttendances = async () => {
    try {
      const { data: { data: res } } = await axiosInstance.get("/attendances");

      setAttendances(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    };
  };

  useEffect(() => {
    fetchAttendances();
  }, [isRefreshing]);

  return (
    <AdminLayout>
      <Container className="py-16">
        <div className="min-w-[1280px] space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl text-primary font-medium">Monitor Absensi Karyawan</h2>
            <span
              onClick={() => setIsRefreshing(true)}
              className="cursor-pointer font-medium flex items-center gap-1.5 text-accent"
              disabled={isRefreshing}
            >
              <SlRefresh className={`text-xl ${isRefreshing && "animate-spin"}`} /><span className="text-sm">Refresh</span>
            </span>
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
                    <th scope="col" className="text-center p-3">Tanggal</th>
                    <th scope="col" className="text-center p-3">Check-In</th>
                    <th scope="col" className="text-center p-3">Check-Out</th>
                    <th scope="col" className="text-center p-3">Total Jam</th>
                    <th scope="col" className="text-center p-3">Bukti Foto</th>
                    <th scope="col" className="text-center px-8 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendances?.length > 0 ? (
                    attendances?.map((attendance, index) => (
                      <AttendanceRecord
                        key={attendance.id}
                        attendance={attendance}
                        index={index}
                      />
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan="8" className="py-4 text-lg text-primary/60 font-medium">Data absen tidak ditemukan.</td>
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

export default Attendances;