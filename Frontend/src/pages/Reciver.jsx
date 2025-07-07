// PatientRegister.jsx
import { useState } from "react";
import axios from "axios";
import MapPicker from "./MapPicker";

export default function PatientRegister() {
  const [formData, setFormData] = useState({
    forWhom: "Self",
    name: "",
    age: "",
    gender: "Male",
    bloodGroup: "A+",
    urgency: "Normal",
    reason: "",
    hospitalName: "",
    placeName: "",
    coordinates: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        location: {
          placeName: formData.placeName,
          coordinates: formData.coordinates,
        },
      };

      console.log("Submitting payload:", payload); // Debugging

      const res = await axios.post(
        "http://localhost:5000/api/patient/register",
        payload,
        { withCredentials: true }
      );

      alert("Blood request submitted!");
      setFormData({
        forWhom: "Self",
        name: "",
        age: "",
        gender: "Male",
        bloodGroup: "A+",
        urgency: "Normal",
        reason: "",
        hospitalName: "",
        placeName: "",
        coordinates: [],
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-xl shadow-md mt-24">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Blood Request Form
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1">Request For</label>
          <select name="forWhom" value={formData.forWhom} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Self">Self</option>
            <option value="Family">Family</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Blood Group</label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full p-2 border rounded">
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <option key={group}>{group}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Urgency</label>
          <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Reason for Request</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Hospital Name</label>
          <input name="hospitalName" value={formData.hospitalName} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Location Place Name</label>
          <input name="placeName" value={formData.placeName} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Pick Location on Map</label>
          <MapPicker
            onLocationSelect={(coords) =>
              setFormData((prev) => ({ ...prev, coordinates: coords }))
            }
          />
          {formData.coordinates.length === 2 && (
            <p className="text-sm mt-2 text-gray-600">
              Selected Coordinates: Lat: {formData.coordinates[1]}, Lng: {formData.coordinates[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="md:col-span-2 mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
