import React, { useMemo, useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import ItemTypes from "../ItemTypes/ItemTypes";
import Hero from "../Hero/Hero";
import Cards from "../Cards/Cards";
import Cart from "../Cart/Cart";
import itemsData from "../../data/items.json";
import WhatsApp from "../WhatsApp/WhatsApp";
import TableMenuModal from "../Hero/TableMenuModal";

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);

  // 🛒 Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Map ref lifted here
  const mapRef = useRef();

  useEffect(() => {
    setItems(itemsData.items);
  }, []);

  // 🔥 CATEGORY + SEARCH FILTER
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Add to cart handler
  const addToCart = (item) => setCart((prev) => [...prev, item]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NAVBAR */}
      <Navbar
        onSelect={setSelectedCategory}
        onSearch={setSearchQuery}
        items={items}
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        mapRef={mapRef} // pass ref to Navbar
      />

      {/* HERO */}
      <Hero
        onShowMenu={() => setIsMenuShown(true)}
        onGoToMap={() => mapRef.current?.openMap()} // use the same ref
      />

      <TableMenuModal
        items={items}
        isOpen={isMenuShown}
        onClose={() => setIsMenuShown(false)}
      />

      {/* ITEM TYPES */}
      <ItemTypes />

      {/* CARDS */}
      <div className="px-4 sm:px-6 lg:px-16 py-6">
        {filteredItems.length > 0 ? (
          <Cards items={filteredItems} onAdd={addToCart} />
        ) : (
          <p className="text-center mt-10 text-gray-500 text-lg">
            No items available
          </p>
        )}
      </div>

      {/* CART DRAWER */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeItem}
      />
      <WhatsApp phone="918767971866" message="Hello! I want to order." />
    </div>
  );
}

export default Home;
