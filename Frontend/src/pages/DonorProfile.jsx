import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTint, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export default function DonorProfile() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const statusColors = {
    pending: "border-yellow-500 bg-yellow-50 text-yellow-800",
    approved: "border-blue-500 bg-blue-50 text-blue-800",
    done: "border-green-500 bg-green-50 text-green-800",
    cancelled: "border-red-500 bg-red-50 text-red-800",
  };

  const statusIcons = {
    pending: <FaClock className="inline mr-2" />,
    approved: <FaCheckCircle className="inline mr-2" />,
    done: <FaTint className="inline mr-2" />,
    cancelled: <FaTimesCircle className="inline mr-2" />,
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/donor/profile", {
          withCredentials: true,
        });
        setDonations(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donor profile:", error);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl font-medium">Loading...</div>;

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gray-100 mt-5">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">My Blood Donation History</h1>

      {donations.length === 0 ? (
        <div className="text-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9790/9790332.png"
            alt="no history"
            className="w-36 mx-auto mb-4 opacity-80"
          />
          <p className="text-xl font-semibold text-gray-700">No donation history yet.</p>
          <p className="text-sm text-gray-500 mt-1">Register as a donor and save lives!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              onClick={() => navigate(`/donor/${donation._id}`)}
              className={`cursor-pointer p-5 rounded-xl border-2 shadow-md hover:shadow-xl transition duration-300 ${statusColors[donation.status]}`}
            >
              <h2 className="text-lg font-bold mb-2 flex items-center">
                {statusIcons[donation.status]}
                {donation.status.toUpperCase()}
              </h2>
              <p className="text-sm font-medium">Date: {new Date(donation.createdAt).toLocaleDateString()}</p>
              {donation.patient ? (
                <p className="text-sm mt-1">Recipient: <span className="font-semibold">patient is assigned</span></p>
              ) : (
                <p className="text-sm mt-1 text-gray-600 italic">No patient assigned yet</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
