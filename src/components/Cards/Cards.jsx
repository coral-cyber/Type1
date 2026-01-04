import React from "react";
import { getImage } from "../../utils/Imageloader";

export default function Cards({ items, onAdd }) {
  return (
    <div
      className="
        grid grid-cols-2 gap-4 p-4
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
      "
    >
      {items.map((item) => {
        const src = getImage(item.image);

        return (
          <div
            id={`card-${item.id}`}
            key={item.id}
            className="
              bg-white rounded-xl shadow-md
              flex flex-col
              transition-transform duration-200
              hover:scale-[1.02]
            "
          >
            {/* IMAGE */}
            {src ? (
              <img
                src={src}
                alt={item.name}
                className="
                  w-full h-36 sm:h-40 md:h-44
                  object-cover rounded-t-xl
                "
              />
            ) : (
              <div
                className="
                  w-full h-36 sm:h-40 md:h-44
                  flex items-center justify-center
                  bg-gray-200 text-gray-500
                  rounded-t-xl
                  text-sm
                "
              >
                No image
              </div>
            )}

            {/* CONTENT */}
            <div className="flex flex-col flex-1 p-3">
              <h3 className="text-sm sm:text-base font-semibold leading-tight">
                {item.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {item.description}
              </p>

              {/* PRICE + CALORIES */}
              <div className="flex justify-between items-center mt-auto pt-2">
                <span className="text-amber-700 font-bold text-sm sm:text-base">
                  ${item.price}
                </span>
                <span className="text-amber-500 text-xs sm:text-sm">
                  {item.calories}
                </span>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => onAdd(item)}
                className="
                  mt-3
                  bg-amber-600 text-white
                  rounded-lg
                  py-2
                  text-sm font-medium
                  active:scale-95
                  hover:bg-amber-500
                  transition
                "
              >
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
