import {useState} from "react";

type Props = {
    title: string;
    price: number;
};

export default function TicketCard({title, price, minAge, maxAge}: Props) {
    const [quantity, setQuantity] = useState(0);

    const handleDecrease = () => {
        setQuantity(prevQuantity => Math.max(0, prevQuantity - 1)); // Ensure quantity doesn't go below 1
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
  return (

          <div
              className="relative w-full rounded-2xl flex flex-col md:flex-row items-center justify-between p-7 shadow-2xl overflow-hidden font-sans mx-auto transform transition-transform duration-300 hover:scale-[1.02]"
              style={{
                  background: `linear-gradient(to bottom right, #FF690CFF, var(--button_orange, #000000))`
              }}
          >
          {/* Left Notch */}
          <div className="absolute bg-gray-900 w-10 h-20 rounded-full -left-5 top-1/2 -translate-y-1/2 hidden md:block opacity-80 z-10"></div>

          {/* Right Notch */}
          <div className="absolute bg-gray-900 w-10 h-20 rounded-full -right-5 top-1/2 -translate-y-1/2 hidden md:block opacity-80 z-10"></div>

          {/* Ticket Content Area */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full z-20">

              {/* Left Side: Title, Price, Age */}
              <div className="flex flex-col text-white text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-3xl font-extrabold mb-2 leading-tight drop-shadow-md">{title}</h3>
                  <p className="text-xl font-semibold mb-1 opacity-90">Price: ${price.toFixed(2)}</p>
                  <p className="text-md opacity-80">Età: {minAge}-{maxAge}</p>
              </div>

              {/* Vertical Perforation Line (only on medium screens and up) */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] border-l-2 border-dashed border-white/40">
                  {/* Small dots for perforation effect */}
                  <div className="w-2 h-2 bg-white rounded-full absolute -left-[5px] top-4"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute -left-[5px] top-1/4"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute -left-[5px] top-1/2"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute -left-[5px] bottom-1/4"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute -left-[5px] bottom-4"></div>
              </div>

              {/* Right Side: Quantity Picker */}
              <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
                  <div className="flex items-center space-x-3 bg-white text-gray-800 rounded-full p-1 shadow-xl border border-gray-200">
                      <button
                          onClick={handleDecrease}
                          className="bg-orange-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xl font-bold hover:bg-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      >
                          -
                      </button>
                      <span className="text-2xl font-extrabold w-12 text-center text-gray-900">{quantity}</span>
                      <button
                          onClick={handleIncrease}
                          className="bg-orange-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xl font-bold hover:bg-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      >
                          +
                      </button>
                  </div>
                  <p className="text-white text-xl font-semibold mt-3">Totale: €{(price * quantity).toFixed(2)}</p>
              </div>
          </div>
      </div>
  );
}
