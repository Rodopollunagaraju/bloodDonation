import axios from "axios";
import { useState } from "react";

const DonorInfo = () => {
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/donor/register",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setMessage("🎉 You are now registered as a donor!");
    } catch (err) {
      setMessage("❌ Registration failed. You might already be a donor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white px-6 py-12 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white shadow-xl rounded-xl p-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Information */}
          <div>
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Donate Blood, Save Lives
            </h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Every 2 seconds, someone needs blood. By becoming a donor, you
              have the power to save up to 3 lives with just one donation. It’s
              safe, simple, and impactful. Join a community of heroes who make a
              real difference every day.
            </p>
            <ul className="list-disc ml-5 text-gray-600 space-y-2">
              <li>Helps those in surgeries, accidents, and cancer treatments</li>
              <li>Improves your cardiovascular health</li>
              <li>Free health screening with every donation</li>
              <li>Feel proud by helping your society</li>
            </ul>
          </div>

          {/* Right: Call to Action */}
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5973/5973845.png"
              alt="Donate"
              className="w-48 h-48"
            />
            <button
              onClick={handleRegister}
              className="bg-red-600 hover:bg-red-700 transition-all duration-200 text-white font-semibold px-8 py-3 rounded-full shadow-md"
            >
              Become a Donor
            </button>
            {message && <p className="text-green-600 font-medium">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorInfo;
