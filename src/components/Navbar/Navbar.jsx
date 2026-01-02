import React, { useState, useEffect } from "react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Logo11 from "../../assets/log2.png";
import CafeLocation from "./Map";

function Navbar({ onSelect, onSearch, items, cartCount = 0, onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300
      flex items-center justify-between px-4 sm:px-6 md:px-16 h-14 shadow-md
      ${scrolled ? "bg-white" : "bg-transparent"}`}
    >
      {/* LEFT: Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        <MenuBtn isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {isMenuOpen && (
          <Menu
            onSelectCategory={(value) => {
              onSelect(value);
              setIsMenuOpen(false);
            }}
          />
        )}
      </div>

      {/* CENTER: Logo */}
      <Logo />

      {/* RIGHT: Search + Cart + Map */}
      <div className="flex items-center gap-2 sm:gap-4">
        <SearchBar items={items} onSearch={onSearch} />

        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative p-2 bg-white rounded-full shadow hover:shadow-md transition"
        >
          <FaShoppingCart size={20} className="text-gray-800" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* Map */}
        <Map />
      </div>
    </nav>
  );
}

export default Navbar;

/* ---------------- Sub-components ---------------- */

const MenuBtn = ({ isMenuOpen, setIsMenuOpen }) => (
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="p-2 rounded-md bg-white shadow hover:shadow-md transition"
  >
    <MdOutlineRestaurantMenu size={24} />
  </button>
);

const Menu = ({ onSelectCategory }) => (
  <ul className="absolute top-full left-0 bg-white shadow-lg p-3 rounded-md mt-1 min-w-[120px] z-50">
    {["Sweet", "Savory", "Beverages", "All"].map((cat) => (
      <li key={cat} className="py-1">
        <button
          onClick={() => onSelectCategory(cat.toLowerCase())}
          className="hover:text-amber-600 transition-colors font-medium w-full text-left"
        >
          {cat}
        </button>
      </li>
    ))}
  </ul>
);

const Logo = () => (
  <div
    className="h-10 w-28 sm:w-36 bg-contain bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${Logo11})` }}
  />
);

const SearchBar = ({ items = [], onSearch }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems =
    query.trim() === ""
      ? []
      : items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSelect = (name) => {
    setQuery(name);
    onSearch(name);
    setIsOpen(false);
  };

  return (
    <>
      {/* MOBILE SEARCH BUTTON */}
      <button
        className="md:hidden p-2 rounded-full bg-amber-600 text-white shadow hover:bg-amber-500 transition"
        onClick={() => setIsOpen(true)}
      >
        <FaSearch size={18} />
      </button>

      {/* MOBILE SEARCH OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start p-4">
          <div className="w-full bg-white rounded-full flex items-center px-4 py-2 shadow-md">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Find your fav treat..."
              className="w-full outline-none px-2 py-1"
              autoFocus
            />
            <button
              className="ml-2 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              ❌
            </button>
          </div>

          {/* Dropdown results */}
          {query && filteredItems.length > 0 && (
            <div className="absolute top-[60px] left-0 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredItems.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.name)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DESKTOP SEARCH (≥md) */}
      <div className="hidden md:block relative w-72 lg:w-96">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Find your fav treat..."
          className="h-10 w-full rounded-full px-4 border-2 border-gray-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-600 text-white hover:bg-amber-500 transition">
          <FaSearch size={16} />
        </button>

        {query && (
          <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.name)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {item.name}
                </button>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-500">No items found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const Map = () => <CafeLocation />;
