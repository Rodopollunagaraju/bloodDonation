import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user details from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Log out function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // Refresh to reflect changes
  };

  return (
    <nav className="bg-[#E53935] bg-opacity-90 text-white py-4 px-6 fixed w-full top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Website Name */}
        <h1 className="text-2xl font-bold tracking-wide">BloodConnect</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <a href="#home" className="text-lg hover:text-yellow-400 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-lg hover:text-yellow-400 transition">
              About
            </a>
          </li>
          <li>
            <a href="#donate" className="text-lg hover:text-yellow-400 transition">
              Donate
            </a>
          </li>
          <li>
            <a href="#contact" className="text-lg hover:text-yellow-400 transition">
              Contact
            </a>
          </li>

          {/* Authentication - User Dropdown */}
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
              <a href="#login" className="text-lg hover:text-yellow-400 transition">
                Log in
              </a>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#E53935] bg-opacity-95 absolute top-16 left-0 w-full flex flex-col items-center py-4">
          <a href="#home" className="py-2 text-lg hover:text-yellow-400 transition">
            Home
          </a>
          <a href="#about" className="py-2 text-lg hover:text-yellow-400 transition">
            About
          </a>
          <a href="#donate" className="py-2 text-lg hover:text-yellow-400 transition">
            Donate
          </a>
          <a href="#contact" className="py-2 text-lg hover:text-yellow-400 transition">
            Contact
          </a>
          {user ? (
            <select
              className="bg-transparent text-lg text-white outline-none cursor-pointer mt-2"
              onChange={(e) => e.target.value === "logout" && handleLogout()}
            >
              <option value="">{user.name}</option>
              <option value="logout">Log out</option>
            </select>
          ) : (
            <a href="#login" className="py-2 text-lg hover:text-yellow-400 transition">
              Log in
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
