import React, { useEffect } from "react";

const categoryBadge = {
  beverages: "bg-blue-100 text-blue-700",
  sweet: "bg-pink-100 text-pink-700",
  savory: "bg-amber-100 text-amber-700",
};

const chunk = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

export default function TableMenuModal({ items = [], isOpen, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const rows = chunk(items, 3);

  // Scroll to card of a clicked item
  const handleItemClick = (id) => {
    const el = document.getElementById(`card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      onClose(); // Close modal after scroll
    }
  };

  return (
    <div className="fixed inset-0 z-999 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-t-2xl md:rounded-2xl shadow-2xl
          w-full md:w-[90%] max-w-6xl
          max-h-[85vh] overflow-y-auto
          transition-transform duration-300 ease-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">Our Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex flex-col md:table w-full">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-col md:flex-row md:table-row border-b"
              >
                {row.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="flex md:table-cell w-full md:w-1/3 px-2 py-3 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="hidden md:block w-12 h-12 md:w-10 md:h-10 rounded-md object-cover"
                    />

                    <div className="ml-3 flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className={`px-2 py-px text-[10px] rounded-full ${
                            categoryBadge[item.category]
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="text-[11px] text-gray-600">
                          {item.calories}
                        </span>
                        <span className="ml-auto font-semibold text-gray-800">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
