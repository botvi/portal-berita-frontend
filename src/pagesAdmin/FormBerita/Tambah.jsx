import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Tambah = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "", // Changed to string type for image URL
    id_category: "", // Initial state for category ID
  });

  const [categories, setCategories] = useState([]);

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
        "https://api-msib-6-portal-berita-04.educalab.id/news",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFormData({
        title: "",
        description: "",
        content: "",
        image: "", // Reset image URL after successful submission
        id_category: "", // Reset category ID after successful submission
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Artikel berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/admin/berita"); // Redirect to the specified route
      });
    } catch (error) {
      console.error("Error adding article: ", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan artikel.",
      });
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api-msib-6-portal-berita-04.educalab.id/categories"
        );
        setCategories(response.data); // Set categories state with data
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Tambah Artikel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title:</label>{" "}
          <span className="text-red-500">*</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block">Description:</label>{" "}
          <span className="text-red-500">*</span>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block">Content:</label>{" "}
          <span className="text-red-500">*</span>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label className="block">Image URL:</label>{" "}
          <span className="text-red-500">*</span>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block">Kategori:</label>{" "}
          <span className="text-red-500">*</span>
          <select
            name="id_category"
            value={formData.id_category}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id_category} value={category.id_category}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Tambah Artikel
        </button>
      </form>
    </div>
  );
};

export default Tambah;
