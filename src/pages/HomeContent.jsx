import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeContent = () => {
  const [mainNews, setMainNews] = useState(null);
  const [sideNews, setSideNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholderImage = "https://via.placeholder.com/150"; // Placeholder image URL

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api-msib-6-portal-berita-04.educalab.id/news"
        );
    
        console.log(response.data); // Log the response to check its structure
    
        // Ensure the response data exists and is an array
        if (response.data && Array.isArray(response.data)) {
          const articles = response.data.sort(
            (a, b) => new Date(b.published_at) - new Date(a.published_at)
          );
    
          setMainNews(articles[0]);
          setSideNews(articles.slice(1, 3));
          setLatestNews(articles);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchNewsData();
  }, []);

  const formatDateIndonesian = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <div className="mx-auto max-w-screen-lg p-4 light theme-light mt-14 md:mt-32">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
            {mainNews && (
              <div className="md:col-span-4">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={mainNews.image || placeholderImage}
                    alt={mainNews.title}
                    className="w-full h-96 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                  />
                </div>
                <span className="block text-xs text-gray-600 mt-2">
                  {formatDateIndonesian(mainNews.published_at)}
                </span>
                <Link to={`/news/${mainNews.id_news}`}>
                  <h2 className="text-2xl font-bold mt-2 hover:text-gray-500">
                    {mainNews.title}
                  </h2>
                </Link>
              </div>
            )}
            <div className="md:col-span-1 space-y-4">
              {sideNews.map((news, index) => (
                <div className="mb-4" key={index}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={news.image || placeholderImage}
                      alt={news.title}
                      className="w-full h-54 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                    />
                  </div>
                  <span className="block text-xs text-gray-600 mt-2">
                    {formatDateIndonesian(news.published_at)}
                  </span>
                  <Link to={`/news/${news.id_news}`}>
                    <h3 className="text-sm font-bold mt-2 hover:text-gray-500">
                      {news.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <hr className="mt-8 border border-black" />

          <div className="mt-1">
            <h2 className="text-2xl font-bold mb-8">Berita Terkini</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {latestNews.length > 0 && (
                  <div className="mb-4">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={latestNews[0].image || placeholderImage}
                        alt={latestNews[0].title}
                        className="w-full h-68 object-cover rounded-lg shadow-lg transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                      />
                    </div>
                    <div className="mt-2">
                      <Link to={`/news/${latestNews[0].id_news}`}>
                        <h3 className="text-sm font-bold mt-2 hover:text-gray-500">
                          {latestNews[0].title}
                        </h3>
                      </Link>
                      <span className="block text-xs text-gray-600 mt-1">
                        {formatDateIndonesian(latestNews[0].published_at)}
                      </span>
                      <p className="mt-1 text-sm">
                        {latestNews[0].description &&
                        latestNews[0].description.length > 150
                          ? `${latestNews[0].description.substring(0, 150)}...`
                          : latestNews[0].description}
                      </p>
                      <Link
                        to={`/news/${latestNews[0].id_news}`}
                        className="inline-flex items-center font-medium text-gray-400 hover:text-gray-900"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:gap-0">
                {latestNews.slice(1, 3).map((news, index) => (
                  <div className="flex mb-4" key={index}>
                    <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                      <img
                        src={news.image || placeholderImage}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
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
                          ? `${news.description.substring(0, 150)}...`
                          : news.description}
                      </p>
                      <Link
                        to={`/news/${news.id_news}`}
                        className="inline-flex items-center font-medium text-gray-400 hover:text-gray-900"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="mt-8 border border-black" />

          <div className="mt-1">
            <h2 className="text-2xl font-bold mb-8">Berita Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {latestNews.slice(3, 7).map((news, index) => (
                <div key={index}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={news.image || placeholderImage}
                      alt={news.title}
                      className="w-full h-64 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
                    />
                  </div>
                  <span className="block text-xs text-gray-600 mt-1">
                    {formatDateIndonesian(news.published_at)}
                  </span>
                  <div className="mt-2">
                    <Link to={`/news/${news.id_news}`}>
                      <h3 className="text-base font-bold mt-2 line-clamp-2 hover:text-gray-500">
                        {news.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm line-clamp-4">
                      {news.description && news.description.length > 150
                        ? `${news.description.substring(0, 150)}...`
                        : news.description}
                    </p>
                    <Link
                      to={`/news/${news.id_news}`}
                      className="inline-flex items-center font-medium text-gray-400 hover:text-gray-900"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default HomeContent;
