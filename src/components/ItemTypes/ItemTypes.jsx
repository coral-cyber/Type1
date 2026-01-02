import React from "react";
import milkShakes from "./../../assets/items/almondmilkshake.webp";
import bagel from "./../../assets/items/bagel.webp";
import baguette from "./../../assets/items/baguette.webp";
import brownie from "./../../assets/items/brownie.webp";
import burger from "./../../assets/items/burger.webp";
import rolls from "./../../assets/items/chickenroll.webp";
import coffee from "./../../assets/items/coffee.webp";
import corndog from "./../../assets/items/corndog.webp";
import cupcakes from "./../../assets/items/cupcake1.webp";
import cutlets from "./../../assets/items/cutlets.webp";
import donut from "./../../assets/items/donut1.webp";
import juices from "./../../assets/items/kewijuice.webp";
import pie from "./../../assets/items/pie.webp";
import pastry from "./../../assets/items/pastry.webp";

const items = [
  { id: 1, img: milkShakes, name: "MilkShakes" },
  { id: 2, img: bagel, name: "Bagel" },
  { id: 3, img: baguette, name: "Baguette" },
  { id: 4, img: brownie, name: "Brownie" },
  { id: 5, img: rolls, name: "Rolls" },
  { id: 6, img: burger, name: "Burger" },
  { id: 7, img: coffee, name: "Coffee" },
  { id: 8, img: corndog, name: "Corndog" },
  { id: 9, img: cupcakes, name: "Cupcakes" },
  { id: 10, img: cutlets, name: "Cutlets" },
  { id: 11, img: donut, name: "Donut" },
  { id: 12, img: juices, name: "Juices" },
  { id: 13, img: pie, name: "Pie" },
  { id: 14, img: pastry, name: "Pastry" },
];

function ItemTypes() {
  return (
    <div className="relative py-4 md:py-8 px-2 md:px-6">
      {/* BACKDROP LAYER */}
      <div
        className="absolute inset-0 z-0 rounded-xl"
        style={{
          backdropFilter: "blur(4px) saturate(160%) brightness(1.05)",
          WebkitBackdropFilter: "blur(4px) saturate(160%) brightness(1.05)",
          backgroundColor: "rgba(255, 255, 255, 0.18)",
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      />

      {/* TITLE */}
      <h3 className="relative z-10 font-semibold text-base md:text-3xl text-black mb-3">
        What's on your mind?
      </h3>

      {/* ITEMS SCROLL */}
      <div className="relative z-10 flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            className="shrink-0 flex flex-col items-center justify-center"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-16 w-16 md:h-24 md:w-24 object-cover rounded-2xl border border-white/30 hover:scale-105 transition-transform"
            />
            <span className="mt-1 text-xs md:text-sm font-medium text-black text-center">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemTypes;
