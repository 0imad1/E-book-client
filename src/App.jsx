import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddBook from './Components/Books/AddBook';
import ExistingBooks from './Components/Books/ExistingBooks';
import EditBook from './Components/Books/EditBook';
import NavBar from './Components/Layout/NavBar';
import Footer from './Components/Layout/Footer';
import BookListing from './Components/Books/BookListing';
import Admin from './Components/Admin/Admin';
import Home from './Components/Home/Home';
import DownloadBook from './Components/Books/DownloadBook';
import { AuthProvider } from './Components/Auth/AuthProvider';
import Registration from './Components/Auth/Registration';
import Profile from './Components/Auth/Profile';
import Login from './Components/Auth/Login';

function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/existing-books" element={<ExistingBooks />} />
            <Route path="/edit-book/:bookId" element={<EditBook />} />
            <Route path="/browse-all-books" element={<BookListing />} />
            <Route path="/adminPanel" element={<Admin />} />
            <Route path="/download-book/:bookId" element={<DownloadBook />} />
            <Route path="/GJWQ" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </AuthProvider>
  );
}

export default App;
