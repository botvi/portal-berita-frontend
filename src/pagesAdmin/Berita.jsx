import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Berita = () => {
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const fetchArtikels = async () => {
      try {
        const response = await axios.get('https://api-msib-6-portal-berita-04.educalab.id/news');
        const sortedArtikels = response.data.map((artikel) => ({
          ...artikel,
          published_at: new Date(artikel.published_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        setArtikels(sortedArtikels);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api-msib-6-portal-berita-04.educalab.id/categories');
        setCategories(response.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api-msib-6-portal-berita-04.educalab.id/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchArtikels();
    fetchCategories();
    fetchUsers();
  }, []);

  const findCategoryNameById = (id) => {
    const category = categories.find((category) => category.id_category === id);
    return category ? category.name : 'Unknown Category';
  };

  const findUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : 'Unknown User';
  };

  const handleEdit = (id) => {
    navigate(`/admin/berita/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`https://api-msib-6-portal-berita-04.educalab.id/news/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setArtikels(artikels.filter((artikel) => artikel.id_news !== id));
            Swal.fire('Dihapus!', 'Artikel telah dihapus.', 'success');
          }
        } catch (error) {
          Swal.fire('Error!', 'Gagal menghapus artikel.', 'error');
        }
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = artikels.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl mt-5">
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight mb-5">Berita</h2>
        <div className="my-2 flex sm:flex-row flex-col mb-6">
          <div className="block relative">
            <Link to="/admin/berita/tambah">
              <button
                type="button"
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-green-800 me-2 mb-2"
              >
                <FaPlusCircle className="mr-2" />
                Tambahkan Berita
              </button>
            </Link>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((artikel, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{artikel.title}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{artikel.description}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {findCategoryNameById(artikel.id_category)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {findUserNameById(artikel.id_user)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-2">
                      <button
                        onClick={() => handleEdit(artikel.id_news)}
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(artikel.id_news)}
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:focus:ring-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <nav className="block w-full">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            <li>
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Prev
              </button>
            </li>
            {Array.from({ length: Math.ceil(artikels.length / itemsPerPage) }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 ${
                    currentPage === i + 1 ? 'bg-gray-200' : ''
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  paginate(currentPage < Math.ceil(artikels.length / itemsPerPage) ? currentPage + 1 : currentPage)
                }
                className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 ${
                  currentPage === Math.ceil(artikels.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Berita;
