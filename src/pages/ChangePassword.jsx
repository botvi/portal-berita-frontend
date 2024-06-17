import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!oldPassword || !newPassword) {
      Swal.fire('Error', 'Password lama dan password baru harus diisi.', 'error');
      return;
    }

    // Kirim permintaan ke backend untuk mengubah password
    try {
      const token = sessionStorage.getItem("token"); // Ganti dengan cara Anda mendapatkan token

      const response = await axios.put(
        "https://api-msib-6-portal-berita-04.educalab.id/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire('Success', response.data.message, 'success');
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      Swal.fire('Error', 'Gagal mengubah password. Silakan coba lagi.', 'error');
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-lg p-4 mt-20 md:mt-36">
      <h1 className="text-2xl font-bold mb-8 text-center">Ubah Password</h1>
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleChangePassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
              Password Lama
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="oldPassword"
              type="password"
              placeholder="Password Lama"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              Password Baru
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="Password Baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ubah Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
