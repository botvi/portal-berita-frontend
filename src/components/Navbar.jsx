import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking if a token exists in sessionStorage
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token to a boolean
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    setIsLoggedIn(false);
    setShowUserMenu(false);
    // Redirect to login page
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowMenu(false);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  const handleCategoryClick = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch articles to get the category IDs
        const articlesResponse = await axios.get(
          "https://api-msib-6-portal-berita-04.educalab.id/news"
        );

        // Extract unique category IDs from the articles
        const uniqueCategoryIds = [
          ...new Set(articlesResponse.data.map((article) => article.id_category)),
        ];

        // Fetch categories to get category names
        const categoriesResponse = await axios.get(
          "https://api-msib-6-portal-berita-04.educalab.id/categories"
        );

        // Filter and map categories to get only those that are used in articles
        const uniqueCategories = categoriesResponse.data
          .filter(category => uniqueCategoryIds.includes(category.id_category))
          .map(category => ({
            id: category.id_category,
            name: category.name,
          }));

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <FaBars className="icon text-2xl hamburger" onClick={toggleMenu} />
        </div>
        <div className="navbar-center">
          <Link to="/" className="logo-link">
            <img src="../../../assets/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="navbar-right">
          <div className="user-menu" ref={userMenuRef}>
            <FaUserCircle  className="text-2xl  icon" onClick={toggleUserMenu} />
            <div className={`user-dropdown-menu ${showUserMenu ? "show" : ""}`}>
              <ul>
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/login" onClick={() => setShowUserMenu(false)}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" onClick={() => setShowUserMenu(false)}>
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <hr className="separator" />
      <div className="categories">
        <Link
          to="/"
          className={`category-link ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <div className="category">Home</div>
        </Link>
        {categories.map((category) => (
          <Link
            to={`/category/${category.id}`}
            key={category.id}
            className={`category-link ${
              location.pathname === `/category/${category.id}` ? "active" : ""
            }`}
          >
            <div className="category">{category.name}</div>
          </Link>
        ))}
        <Link to="/about-us" className="category-link">
          <div className="category">Tentang Kami</div>
        </Link>
      </div>
      <div
        className={`dropdown-menu ${showMenu ? "show" : ""}`}
        ref={dropdownRef}
      >
        <ul>
          <li>
            <Link
              to="/"
              className={`dropdown-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={handleCategoryClick}
            >
              Home
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/category/${category.id}`}
                className={`dropdown-link ${
                  location.pathname === `/category/${category.id}` ? "active" : ""
                }`}
                onClick={handleCategoryClick}
              >
                {category.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/about-us"
              className={`dropdown-link ${
                location.pathname === "/about-us" ? "active" : ""
              }`}
              onClick={handleCategoryClick}
            >
              Tentang Kami
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
