import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { IoShareSocial } from "react-icons/io5";
import { BiBookmarkHeart, BiSolidBookmarkMinus } from "react-icons/bi";
import Swal from 'sweetalert2';

const NewsPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api-msib-6-portal-berita-04.educalab.id/news/${id}`);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the news:", error);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        // Fetch comments
        const response = await axios.get(`https://api-msib-6-portal-berita-04.educalab.id/comments/${id}`);
        const comments = response.data;

        // Fetch user data for each comment
        const commentsWithUser = await Promise.all(
          comments.map(async (comment) => {
            const userResponse = await axios.get(`https://api-msib-6-portal-berita-04.educalab.id/users/${comment.id_user}`);
            return { ...comment, user: userResponse.data.name };
          })
        );

        setComments(commentsWithUser);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("https://api-msib-6-portal-berita-04.educalab.id/news/");
        setLatestNews(response.data);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    const checkFavoriteStatus = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("https://api-msib-6-portal-berita-04.educalab.id/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const favoriteNews = response.data;
        const isFavorite = favoriteNews.some((item) => item.id_news === parseInt(id));
        setIsFavorite(isFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    fetchNews();
    fetchComments();
    fetchLatestNews();
    checkFavoriteStatus();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentContent.trim() === "") {
      Swal.fire('Error', 'Komentar tidak boleh kosong!', 'error');
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire('Error', 'Anda harus login terlebih dahulu untuk mengirim komentar.', 'error');
      return;
    }

    try {
      const response = await axios.post(
        `https://api-msib-6-portal-berita-04.educalab.id/comments/add`,
        {
          id_news: id,
          comment: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire('Success', 'Komentar berhasil dikirim!', 'success').then(() => {
        window.location.reload();  // Reload halaman setelah submit komentar
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      Swal.fire('Success', 'Berita sudah disalin, bagikan ke rekan anda!', 'success');
    });
  };

  const handleBookmark = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire('Error', 'Anda harus login terlebih dahulu untuk menandai berita sebagai favorit.', 'error');
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`https://api-msib-6-portal-berita-04.educalab.id/news/favorite/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire('Success', 'Berita berhasil dihapus dari favorit!', 'success');
      } else {
        await axios.post(
          "https://api-msib-6-portal-berita-04.educalab.id/news/favorite",
          { newsId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire('Success', 'Berita berhasil ditandai sebagai favorit!', 'success');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error bookmarking the news:", error);
      Swal.fire('Error', 'Terjadi kesalahan saat mengelola favorit.', 'error');
    }
  };

  const formatDateIndonesian = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!news) {
    return <div>News not found.</div>;
  }

  return (
    <div className="mx-auto max-w-screen-lg p-4 light theme-light mt-20 md:mt-36">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-5">
          <div className="mt-1 mb-2 flex items-center">
            {/* BREADCRUMB */}
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      {news.categories}
                    </span>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                   
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      News
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            {/* BREADCRUMB */}
          </div>
          <h2 className="text-2xl font-bold mt-1 mb-2">{news.title}</h2>
         

          <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
            <img
              src={news.image}
              alt="Cover"
              className="w-full h-96 md:w-full object-cover rounded-lg transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
              style={{ aspectRatio: "16/10" }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {formatDateIndonesian(news.published_at)}
          </p>
          <div className="flex gap-6 mb-3 justify-end">
            <IoShareSocial
              className="text-4xl text-blue-500 cursor-pointer hover:text-green-700"
              onClick={handleShare}
            />
            {isFavorite ? (
              <BiBookmarkHeart
                className="text-4xl text-red-400 cursor-pointer hover:text-red-700"
                onClick={handleBookmark}
              />
            ) : (
              <BiBookmarkHeart
                className="text-4xl text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={handleBookmark}
              />
            )}
          </div>
          <hr className="my-4 border-t border-gray-300" />
          <h3 className="text-sm font-bold mt-1 mb-2">{news.title}</h3>
          <div className="text-justify">{news.content}</div>
          <hr className="my-4 border-t border-gray-300" />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold border-b pb-2 mb-4">Komentar</h3>
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li key={comment.id_comment} className="border-b pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{comment.user[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{comment.user}</p>
                      <p className="text-sm text-gray-500">{formatDateIndonesian(comment.created_at)}</p>
                    </div>
                  </div>
                  <p className="text-gray-800">{comment.comment}</p>
                </li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <textarea
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                rows="4"
                placeholder="Tulis komentar anda..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="flex justify-end mt-3 w-200 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
        {/* <div className="md:col-span-1">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Iklan</h3>
            <p>Mie Sedap</p>
          </div>
        </div> */}
      </div>

      <div className="mt-1">
  <h2 className="text-2xl font-bold mb-8">Berita Lainnya</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {latestNews.slice(3, 7).map((newsItem, index) => (
      <div key={index} className="flex flex-col">
        <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-40 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
          />
        </div>
        <span className="block text-xs text-gray-600 mt-1">
          {formatDateIndonesian(newsItem.published_at)}
        </span>
        <div className="mt-2">
          <Link to={`/news/${newsItem.id_news}`}>
            <h3 className="text-base font-bold mt-2 line-clamp-2 hover:text-gray-500">
              {newsItem.title}
            </h3>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default NewsPage;
