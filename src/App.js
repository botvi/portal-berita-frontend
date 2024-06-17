import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeContent from "./pages/HomeContent";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import NewsPage from "./pages/NewsPage";
import AboutUsPage from "./pages/AboutUsPage";
import Profile from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";


// AUTH
import Login from "./Auth/Login";
import Register from "./Auth/Register";
// AUTH

// ADMIN
import MainLayout from "./componentsAdmin/MainLayout";
import ProtectedRoute from "./componentsAdmin/ProtectedRoute";
import AdminDashboard from "./pagesAdmin/Dashboad";
import AdminKategori from "./pagesAdmin/Kategori";
import AdminBerita from "./pagesAdmin/Berita";
import Users from "./pagesAdmin/Users";

// ADMIN

// ADMIN FORM
import KategoriTambah from "./pagesAdmin/FormKategori/Tambah";
import BeritaTambah from "./pagesAdmin/FormBerita/Tambah";
import BeritaEdit from "./pagesAdmin/FormBerita/Edit";
import KategoriEdit from "./pagesAdmin/FormKategori/Edit";

// ADMIN FORM

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomeContent />
              <Footer />
            </>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <>
              <Navbar />
              <CategoryPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/news/:id"
          element={
            <>
              <Navbar />
              <NewsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/about-us"
          element={
            <>
              <Navbar />
              <AboutUsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
              <Footer />
            </>
          }
        />
         <Route
          path="/changepassword"
          element={
            <>
              <Navbar />
              <ChangePassword />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <MainLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="kategori" element={<AdminKategori />} />
                  <Route path="kategori/tambah" element={<KategoriTambah />} />
                  <Route path="kategori/edit/:id_category" element={<KategoriEdit />} />

                  <Route path="berita" element={<AdminBerita />} />
                  <Route path="berita/tambah" element={<BeritaTambah />} />
                  <Route path="berita/edit/:id_news" element={<BeritaEdit />} />

                  <Route path="users" element={<Users />} />


                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
