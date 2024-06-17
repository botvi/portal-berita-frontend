import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Tambah = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token") || ""; // Get token from sessionStorage
      const response = await axios.post(
        "https://api-msib-6-portal-berita-04.educalab.id/categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFormData({
        name: "",
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kategori berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/admin/kategori"); // Redirect to the specified route
      });
    } catch (error) {
      console.error("Error adding category: ", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan kategori.",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Tambah Kategori</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nama:</label>{" "}
          <span className="text-red-500">*</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Tambah Kategori
        </button>
      </form>
    </div>
  );
};

export default Tambah;
