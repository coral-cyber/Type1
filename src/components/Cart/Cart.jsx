import { BsWhatsapp } from "react-icons/bs";

function Cart({ isOpen, onClose, cart, onRemove }) {
  if (!isOpen) return null;

  const sendWh = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const phone = "918767971866";
    let total = 0;

    const lines = cart.map((item, i) => {
      total += item.price;
      return `${i + 1}. ${item.name} - $${item.price}`;
    });

    const message = `New Order\n${lines.join("\n")}\nTotal: $${total}`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* DRAWER */}
      <div
        className="
          fixed right-0 top-0 z-50
          h-full w-full sm:w-96
          bg-white shadow-xl
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No items added</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((item, i) => (
                <li
                  key={i}
                  className="
                    border rounded-lg p-3
                    flex justify-between items-center
                  "
                >
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-sm text-amber-700 font-semibold">
                      ${item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemove(i)}
                    className="
                      text-xs text-red-600
                      px-3 py-1
                      rounded
                      hover:bg-red-50
                    "
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t">
          <button
            onClick={sendWh}
            className="
              w-full
              bg-green-600 text-white
              py-3 rounded-xl
              flex items-center justify-center gap-2
              text-sm font-medium
              hover:bg-green-500
              active:scale-95
              transition
            "
          >
            <BsWhatsapp size={20} />
            Order on WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
