import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    placeName: "",
    coordinates: { lat: null, lng: null },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;
    if (name === "age" && (value < 18 || value > 100)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchLocation = () => {
    setError("");
    setLocationLoading(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
          setLocationLoading(false);
        },
        (error) => {
          setError(`Location error: ${error.message}`);
          setLocationLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.coordinates.lat || !formData.coordinates.lng) {
      setError("Please provide your location");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters with at least one letter and one number");
      return;
    }

    setLoading(true);

    try {
      const submissionData = {
        ...formData,
        age: parseInt(formData.age),
        coordinates: {
          lat: formData.coordinates.lat,
          lng: formData.coordinates.lng
        }
      };

      const response = await axios.post("http://localhost:5000/api/auth/register", submissionData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({ 
        name: response.data.name,
        userId: response.data.userId 
      }));
      
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-10">
      <div className="bg-gray-700 text-white p-8 rounded-xl shadow-lg w-full max-w-md m-10">
        <h2 className="text-2xl font-bold text-center text-red-500">Signup</h2>

        {error && <p className="text-red-400 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Age</label>
            <input 
              type="number" 
              name="age" 
              min="18" 
              max="100"
              placeholder="Enter your age" 
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500" 
              value={formData.age} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Gender</label>
            <select 
              name="gender" 
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500" 
              value={formData.gender} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password (min 6 chars with letter and number)"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Blood Group</label>
            <select
              name="bloodGroup"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select your blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Location</label>
            <input
              type="text"
              name="placeName"
              placeholder="Enter your city/town"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.placeName}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className={`mt-2 w-full ${locationLoading ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-md`}
              onClick={fetchLocation}
              disabled={locationLoading}
            >
              {locationLoading ? "Getting Location..." : "Use My Current Location"}
            </button>
            {formData.coordinates.lat && (
              <p className="text-green-400 text-sm mt-1">
                Location set: {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full ${loading ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white py-2 rounded-md`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-red-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;