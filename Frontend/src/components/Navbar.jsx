import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Logged out successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[#E53935] bg-opacity-90 text-white py-4 px-6 fixed w-full top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">BloodConnect</h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/" className="text-lg hover:text-yellow-400 transition">
              Home
            </Link>
          </li>
          {/* <li>
            <Link to="/about" className="text-lg hover:text-yellow-400 transition">
              About
            </Link>
          </li> */}
          <li>
            <Link to="/donor/profile" className="text-lg hover:text-yellow-400 transition">
              Donate
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-lg hover:text-yellow-400 transition">
              Dashboard
            </Link>
          </li>

          {user ? (
            <li>
              <select
                className="block w-full text-black bg-white px-3 py-1 rounded"
                onChange={(e) => e.target.value === "logout" && handleLogout()}
              >
                <option value="">{user.name}</option>
                <option value="logout">Log out</option>
              </select>
            </li>
          ) : (
            <li>
              <Link to="/login" className="text-lg hover:text-yellow-400 transition">
                Log in
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#E53935] bg-opacity-95 absolute top-16 left-0 w-full flex flex-col items-center py-4">
          <Link to="/" className="py-2 text-lg hover:text-yellow-400 transition">
            Home
          </Link>
          {/* <Link to="/#about" className="py-2 text-lg hover:text-yellow-400 transition">
            About
          </Link> */}
          <Link to="/donor/profile" className="py-2 text-lg hover:text-yellow-400 transition">
            Donate
          </Link>
          <Link to="/dashboard" className="py-2 text-lg hover:text-yellow-400 transition">
            Dashboard
          </Link>
          {user ? (
            <select
              className="bg-transparent text-lg text-white outline-none cursor-pointer mt-2"
              onChange={(e) => e.target.value === "logout" && handleLogout()}
            >
              <option value="">{user.name}</option>
              <option value="logout">Log out</option>
            </select>
          ) : (
            <Link to="/login" className="py-2 text-lg hover:text-yellow-400 transition">
              Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
