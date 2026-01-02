import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function CafeLocation() {
  const CAFE_LAT = 28.6139;
  const CAFE_LNG = 77.209;

  const [distance, setDistance] = useState(null);
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
  };

  const handleDistanceCheck = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    setStatus("Fetching your location...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const km = getDistanceInKm(userLat, userLng, CAFE_LAT, CAFE_LNG);

        setDistance(km);
        setStatus("");
      },
      () => setStatus("Location permission denied")
    );
  };

  return (
    <div className="relative">
      {/* MAP ICON BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-amber-600 text-white rounded-full shadow-md hover:bg-amber-500 transition"
      >
        <FaMapMarkerAlt size={22} />
      </button>

      {/* POPUP / MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-xs rounded-lg p-5 shadow-lg relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-center mb-4">
              📍 Cafe Location
            </h2>

            {/* HOW FAR BUTTON */}
            <button
              onClick={handleDistanceCheck}
              className="w-full bg-amber-600 text-white py-2 rounded-lg font-medium mb-4 hover:bg-amber-500 transition"
            >
              How far am I from this cafe?
            </button>

            {/* RESULT BLOCK */}
            {(distance || status) && (
              <div className="border rounded-lg p-4 bg-gray-50 text-center">
                {distance && (
                  <p className="text-gray-800 font-semibold text-lg mb-1">
                    {distance} km
                  </p>
                )}
                {status && <p className="text-gray-500 text-sm">{status}</p>}
              </div>
            )}

            {/* DIRECTIONS LINK */}
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 w-full text-center bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-500 transition"
            >
              Get Directions
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
