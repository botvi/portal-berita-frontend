import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Edit = () => {
  const { id_news } = useParams();
  const [article, setArticle] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    id_category: '',
    id_user: '',
    published_at: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://api-msib-6-portal-berita-04.educalab.id/news/${id_news}`);
        console.log("Fetched article data:", response.data);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id_news]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api-msib-6-portal-berita-04.educalab.id/categories');
        console.log("Fetched categories data:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    console.log("Submitting updated article data:", article);

    // Create a new object excluding id_news, id_user, and published_at
    const updatedArticle = {
      title: article.title,
      description: article.description,
      content: article.content,
      image: article.image,
      id_category: article.id_category,
    };

    try {
      const response = await axios.put(`https://api-msib-6-portal-berita-04.educalab.id/news/${id_news}`, updatedArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from server:", response);
      if (response.status === 200) {
        Swal.fire('Berhasil!', 'Artikel telah diperbarui.', 'success');
        navigate('/admin/berita');
      }
    } catch (error) {
      console.error("Error updating article:", error);
      console.error("Error response data:", error.response.data);
      Swal.fire('Error!', 'Gagal memperbarui artikel.', 'error');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl mt-5">
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight mb-5">Edit Berita</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={article.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={article.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
            <textarea
              name="content"
              value={article.content}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={article.image}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <select
              name="id_category"
              value={article.id_category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Hidden Field for id_user */}
          <input
            type="hidden"
            name="id_user"
            value={article.id_user}
            onChange={handleChange}
          />
          {/* Hidden Field for published_at */}
          <input
            type="hidden"
            name="published_at"
            value={article.published_at}
            onChange={handleChange}
          />
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

export default Edit;
