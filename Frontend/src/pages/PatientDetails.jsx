import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [donor, setDonor] = useState(null);
  const [nearestDonors, setNearestDonors] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/patient/${id}`, {
          withCredentials: true,
        });
        setPatient(res.data.patient);
        setDonor(res.data.donor);

        if (res.data.patient.status === "Pending") {
          const nearRes = await axios.get(
            `http://localhost:5000/api/patient/${id}/nearest-donors`,
            { withCredentials: true }
          );
          setNearestDonors(nearRes.data.nearestDonors);
        }
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleApprove = async (donorId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/patient/${id}/approve`,
        { donorId },
        { withCredentials: true }
      );
      navigate(`/donor/${donorId}`);
    } catch (err) {
      console.error("Error approving donor:", err);
    }
  };

  if (!patient) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Patient Details</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-10 border-l-4 border-blue-500">
        {/* Patient Info */}
        <p>
          <strong>For:</strong> {patient.forWhom}
        </p>
        <p>
          <strong>Name:</strong> {patient.name}
        </p>
        <p>
          <strong>Blood Group:</strong> {patient.bloodGroup}
        </p>
        <p>
          <strong>Urgency:</strong> {patient.urgency}
        </p>
        <p>
          <strong>Hospital:</strong> {patient.hospitalName}
        </p>
        <p>
          <strong>Status:</strong> {patient.status}
        </p>
      </div>

      {donor && (
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4">Donor Information</h2>
          <p>
            <strong>Name:</strong> {donor.user.name}
          </p>
          <p>
            <strong>Age:</strong> {donor.user.age}
          </p>
          <p>
            <strong>Gender:</strong> {donor.user.gender}
          </p>
          <p>
            <strong>Blood Group:</strong> {donor.user.bloodGroup}
          </p>
          <p>
            <strong>Email:</strong> {donor.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {donor.user.phone}
          </p>
          <p>
            <strong>Location:</strong> {donor.user.location?.placeName}
          </p>
          <p>
            <strong>Status:</strong> {donor.status}
          </p>
        </div>
      )}

      {/* Nearby Donors */}
      {patient.status === "Pending" && nearestDonors.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h2 className="text-xl font-bold mb-4">Nearby Available Donors</h2>
          {nearestDonors.map((donor) => (
            <div
              key={donor._id}
              className="border p-4 rounded-lg mb-4 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Name:</strong> {donor.user.name}
                </p>
                <p>
                  <strong>Blood Group:</strong> {donor.user.bloodGroup}
                </p>
                <p>
                  <strong>Location:</strong> {donor.user.location?.placeName}
                </p>
                <p>
                  <strong>Age:</strong> {donor.user.age}
                </p>
                <p>
                  <strong>Gender:</strong> {donor.user.gender}
                </p>
                <p>
                  <strong>Phone:</strong> {donor.user.phone}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleApprove(donor._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => alert("You rejected this donor.")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
