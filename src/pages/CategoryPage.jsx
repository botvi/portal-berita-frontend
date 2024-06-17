import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryDisplayName, setCategoryDisplayName] = useState("");

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categoriesResponse = await axios.get("https://api-msib-6-portal-berita-04.educalab.id/categories");
        const category = categoriesResponse.data.find(cat => cat.id_category.toString() === categoryName);
        if (category) {
          setCategoryDisplayName(category.name);
        } else {
          setCategoryDisplayName("");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryDisplayName("");
      }
    };

    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api-msib-6-portal-berita-04.educalab.id/news/category/${categoryName}`
        );

        const categoryArticles = response.data.sort(
          (a, b) => new Date(b.published_at) - new Date(a.published_at)
        );

        setArticles(categoryArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setLoading(false);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const response = await axios.get(
          "https://api-msib-6-portal-berita-04.educalab.id/news"
        );
        const sortedNews = response.data.sort(
          (a, b) => new Date(b.published_at) - new Date(a.published_at)
        );
        setLatestNews(sortedNews.slice(0, 10));
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    const initializePage = async () => {
      await fetchCategoryDetails();
      await fetchCategoryData();
      fetchLatestNews();
    };

    initializePage();
  }, [categoryName]);

  const formatDateIndonesian = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="mx-auto max-w-screen-lg p-4 mt-20 md:mt-36">
      <h1 className="text-2xl font-bold mb-8">
        Berita {categoryDisplayName}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border text-primary" role="status">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 space-y-4">
            {articles.slice(0, 2).map((article) => (
              <div key={article.id_news} className="p-4">
                <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                  <img
                    src={article.image || "https://via.placeholder.com/150"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {formatDateIndonesian(article.published_at)}
                </p>
                <Link to={`/news/${article.id_news}`}>
                  <h3 className="text-sm font-bold mt-2 line-clamp-4 hover:text-gray-500">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-sm mt-2">
                  {truncateDescription(article.description, 10)}
                </p>
                <Link
                  to={`/news/${article.id_news}`}
                  className="inline-flex items-center font-medium text-gray-400 hover:text-gray-900 dark:hover:text-black"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 md:row-span-2 p-4">
            {articles[2] && (
              <>
                <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                  <img
                    src={articles[2].image || "https://via.placeholder.com/150"}
                    alt={articles[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {formatDateIndonesian(articles[2].published_at)}
                </p>
                <Link to={`/news/${articles[2].id_news}`}>
                  <h2 className="text-lg font-bold mt-2 hover:text-gray-500">
                    {articles[2].title}
                  </h2>
                </Link>
                <p className="text-sm mt-2">
                  {truncateDescription(articles[2].description, 10)}
                </p>
                <Link
                  to={`/news/${articles[2].id_news}`}
                  className="inline-flex items-center font-medium text-gray-400 hover:text-gray-900 dark:hover:text-black"
                >
                  Read More
                </Link>
              </>
            )}
          </div>

          <div className="md:col-span-1 space-y-4">
            {articles.slice(3, 5).map((article) => (
              <div key={article.id_news} className="p-4">
                <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                  <img
                    src={article.image || "https://via.placeholder.com/150"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {formatDateIndonesian(article.published_at)}
                </p>
                <Link to={`/news/${article.id_news}`}>
                  <h3 className="text-sm font-bold mt-2 line-clamp-4 hover:text-gray-500">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-sm mt-2">
                  {truncateDescription(article.description, 10)}
                </p>
                <Link
                  to={`/news/${article.id_news}`}
                  className="inline-flex items-center font-medium text-gray-400 hover:text-gray-900 dark:hover:text-black"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && <hr className="mt-8 border border-black" />}
      {/* BERITA TERBARU */}
      {!loading && (
        <div className="mt-1">
          <h2 className="text-2xl font-bold mb-8">Berita Terbaru</h2>
          <div className="grid grid-cols-1 gap-4">
            {latestNews.map((news, index) => (
              <div className="flex flex-col md:flex-row mb-4" key={index}>
                <div className="relative overflow-hidden rounded-lg shadow-lg w-full md:w-48">
                  <img
                    src={news.image || "https://via.placeholder.com/150"}
                    alt={news.title}
                    className="w-full h-48 md:h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex-grow">
                  <Link to={`/news/${news.id_news}`}>
                    <h3 className="text-sm font-bold mt-2 hover:text-gray-500">
                      {news.title}
                    </h3>
                  </Link>
                  <span className="block text-xs text-gray-600 mt-1">
                    {formatDateIndonesian(news.published_at)}
                  </span>
                  <p className="mt-1 text-xs">
                    {news.description && news.description.length > 150
                      ? news.description.substring(0, 150) + "..."
                      : news.description}
                  </p>
                  <Link
                    to={`/news/${news.id_news}`}
                    className="inline-flex items-center font-medium text-gray-400 hover:text-gray-900 dark:hover:text-black"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
