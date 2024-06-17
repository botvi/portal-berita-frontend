import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiNews, BiListMinus, BiSolidUserDetail } from "react-icons/bi";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Required for chart.js to auto-register the components

const Dashboard = () => {
  const [newsCount, setNewsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [newsResponse, categoriesResponse, usersResponse] = await Promise.all([
          axios.get("https://api-msib-6-portal-berita-04.educalab.id/news"),
          axios.get("https://api-msib-6-portal-berita-04.educalab.id/categories"),
          axios.get("https://api-msib-6-portal-berita-04.educalab.id/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setNewsCount(newsResponse.data.length);
        setCategoriesCount(categoriesResponse.data.length);
        setUsersCount(usersResponse.data.length);
        setNewsData(newsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, [token]);

  // Process news data to count articles per day
  const processNewsData = () => {
    const counts = {};
    newsData.forEach(news => {
      const date = news.published_at.split("T")[0];
      counts[date] = (counts[date] || 0) + 1;
    });

    const labels = Object.keys(counts).sort();
    const data = labels.map(label => counts[label]);

    return { labels, data };
  };

  const { labels, data } = processNewsData();

  const chartData = {
    labels,
    datasets: [
      {
        label: "News Articles Published",
        data,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-10">
      <div className="w-full">
        <div className="flex flex-col w-full mb-10 sm:flex-row justify-center items-center">
          <div className="mt-2 flex flex-wrap justify-center items-center gap-6">
            <a
              href="/admin/berita"
              className="flex h-40 w-80 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white shadow-lg transition-colors duration-200 ease-in-out hover:border-blue-500 hover:bg-blue-100"
            >
              <div className="flex flex-row items-center justify-center">
                <BiNews className="mr-3 fill-gray-500" />
                <span className="font-bold text-gray-700">{newsCount}</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">Berita</div>
            </a>

            <a
              href="/admin/kategori"
              className="flex h-40 w-80 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white shadow-lg transition-colors duration-200 ease-in-out hover:border-green-500 hover:bg-green-100"
            >
              <div className="flex flex-row items-center justify-center">
                <BiListMinus className="mr-3 fill-gray-500" />
                <span className="font-bold text-gray-700">{categoriesCount}</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">Kategori</div>
            </a>

            <a
              href="/admin/users"
              className="flex h-40 w-80 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white shadow-lg transition-colors duration-200 ease-in-out hover:border-red-500 hover:bg-red-100"
            >
              <div className="flex flex-row items-center justify-center">
                <BiSolidUserDetail className="mr-3 fill-gray-500" />
                <span className="font-bold text-gray-700">{usersCount}</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">User</div>
            </a>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold text-center mb-6">News Articles Published Per Day</h2>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
