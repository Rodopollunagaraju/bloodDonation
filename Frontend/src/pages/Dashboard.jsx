import { useEffect, useState } from "react";
import axios from "axios";
import { BadgeCheck, AlertCircle, Heart, UserCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Add this

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate(); // ✅ For navigation

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setDonations(res.data.donations);
        setRequests(res.data.requests);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 pt-20 px-4 md:px-20 pb-16">
      <h1 className="text-4xl font-bold text-center text-red-700 mb-10 tracking-wide">Dashboard</h1>

      {user && (
        <div className="bg-white border border-red-300 shadow-lg rounded-2xl p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-red-600">
            <UserCircle className="w-6 h-6" /> Your Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10 text-gray-700">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Location:</strong> {user.location?.placeName}</p>
          </div>
        </div>
      )}

      {/* Donations */}
      <div className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-red-700 flex items-center gap-2">
          <Heart className="w-6 h-6" /> Your Donations
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl shadow-md border-2 transition-all duration-300 hover:scale-105 ${
                donation.status === "pending" ? "border-red-400 bg-red-50" : "border-green-400 bg-green-50"
              }`}
            >
              <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
              <p><strong>Available:</strong> {donation.isAvailable ? "No" : "Yes"}</p>
              <p className="flex items-center gap-1">
                <strong>Status:</strong> {donation.status || "pending"}{" "}
                {donation.status === "pending" ? (
                  <AlertCircle className="text-red-500 w-4 h-4" />
                ) : (
                  <BadgeCheck className="text-green-500 w-4 h-4" />
                )}
              </p>

              <button
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center gap-2 text-sm"
                onClick={() => navigate(`/donor/${donation._id}`)} // ✅ Route to donor/id
              >
                <Eye className="w-4 h-4" /> View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Requests */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-red-700 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" /> Your Blood Requests
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl shadow-md border-2 transition-all duration-300 hover:scale-105 ${
                req.status === "Pending" ? "border-red-400 bg-red-50" : "border-green-400 bg-green-50"
              }`}
            >
              <p><strong>For:</strong> {req.forWhom}</p>
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Age:</strong> {req.age}</p>
              <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
              <p><strong>Urgency:</strong> {req.urgency}</p>
              <p><strong>Reason:</strong> {req.reason}</p>
              <p><strong>Hospital:</strong> {req.hospitalName}</p>
              <p className="flex items-center gap-1">
                <strong>Status:</strong> {req.status}{" "}
                {req.status === "Pending" ? (
                  <AlertCircle className="text-red-500 w-4 h-4" />
                ) : (
                  <BadgeCheck className="text-green-500 w-4 h-4" />
                )}
              </p>

              <button
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center gap-2 text-sm"
                onClick={() => navigate(`/patient/${req._id}`)} // ✅ Route to patient/id
              >
                <Eye className="w-4 h-4" /> View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
