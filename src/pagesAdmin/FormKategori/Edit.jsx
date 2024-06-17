import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditCategory = () => {
  const { id_category } = useParams();
  const [category, setCategory] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api-msib-6-portal-berita-04.educalab.id/categories');
        console.log("Fetched all categories:", response.data);
        const currentCategory = response.data.find(cat => cat.id_category === parseInt(id_category));
        console.log("Current category:", currentCategory);

        if (currentCategory) {
          setCategory({ name: currentCategory.name });
        } else {
          setError(new Error('Category not found'));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id_category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    console.log("Submitting updated category data:", category);

    try {
      const response = await axios.put(`https://api-msib-6-portal-berita-04.educalab.id/categories/${id_category}`, category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from server:", response);
      if (response.status === 200) {
        Swal.fire('Berhasil!', 'Kategori telah diperbarui.', 'success');
        navigate('/admin/kategori');
      }
    } catch (error) {
      console.error("Error updating category:", error);
      console.error("Error response data:", error.response?.data);
      Swal.fire('Error!', 'Gagal memperbarui kategori.', 'error');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl mt-5">
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight mb-5">Edit Kategori</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nama Kategori</label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
