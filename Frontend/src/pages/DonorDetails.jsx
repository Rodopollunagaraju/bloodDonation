import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DonorDetails() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/donor/${id}`);
        setPatient(res.data.patient);
        setDonor(res.data.donor);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch donor details:", err);
        setLoading(false);
      }
    };

    fetchDonor();
  }, [id]);

  const statusColors = {
    pending: "border-yellow-500 bg-yellow-50",
    approved: "border-blue-500 bg-blue-50",
    done: "border-green-500 bg-green-50",
    cancelled: "border-red-500 bg-red-50",
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!donor) return <div className="text-center mt-20">Donor not found</div>;

  const donorCardClass = `p-6 rounded-xl shadow border-2 ${statusColors[donor.status]}`;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">Donor Details</h1>

      <div className={donorCardClass}>
        <h2 className="text-xl font-semibold mb-4">Donor Information</h2>
        <p><strong>Status:</strong> {donor.status}</p>
        <p><strong>Donor Name:</strong> {donor.user?.name}</p>
        <p><strong>Email:</strong> {donor.user?.email}</p>
        <p><strong>Phone:</strong> {donor.user?.phone}</p>
        <p><strong>Blood Group:</strong> {donor.user?.bloodGroup}</p>
      </div>

      {patient && (
        <div className="mt-8 p-6 rounded-xl shadow border border-green-300 bg-white">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <p><strong>For:</strong> {patient.forWhom}</p>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
          <p><strong>Urgency:</strong> {patient.urgency}</p>
          <p><strong>Reason:</strong> {patient.reason}</p>
          <p><strong>Hospital:</strong> {patient.hospitalName}</p>
          <p><strong>Location:</strong> {patient.location?.placeName}</p>
          <p><strong>Status:</strong> {patient.status}</p>
        </div>
      )}
    </div>
  );
}
