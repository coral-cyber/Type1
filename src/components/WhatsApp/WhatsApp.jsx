import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsApp({ phone = "918767971866", message = "hello" }) {
  const openWh = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={openWh}
      style={{
        position: "fixed", // stays on screen
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        cursor: "pointer",
        zIndex: 99999,
      }}
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} color="white" />
    </button>
  );
}

export default WhatsApp;
