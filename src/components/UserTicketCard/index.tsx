import Barcode from "react-barcode";

export default function UserTicketCard({ eventName, price, date, barcodeData, ticketType }) {
    const generateBarcodePattern = (data) => {
        return <Barcode value={data} height={50} displayValue={false} margin={0}></Barcode>
    };

    return (
        <div className="relative w-70 bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
            <div className="bg-[light-dark(var(--button_blue),var(--button_blue))] text-white p-6 rounded-t-3xl">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[light-dark(var(--button_orange),var(--button_orange))] rounded-full opacity-20 transform rotate-45"></div>
                <div className="absolute -top-12 left-1/4 w-32 h-32 bg-[light-dark(var(--button_orange),var(--button_orange))] rounded-full opacity-10 transform -rotate-12"></div>

                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight font-inter truncate">
                    {eventName}
                </h1>
                <p className="text-xl sm:text-2xl font-semibold opacity-90 font-inter">
                    €{price}
                </p>
            </div>

            <div className="p-6 bg-white relative">
                <div className="bg-gray-50 p-4 rounded-xl shadow-inner mb-6">
                    <div className="flex items-center text-gray-800 font-inter">
                        <svg
                            className="w-6 h-6 mr-3 text-[light-dark(var(--button_blue),var(--button_blue))]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <p className="text-lg font-medium">{date}</p>
                    </div>
                </div>

                <div className="bg-gray-100 p-10 rounded-xl flex flex-col items-center justify-center">
                    <div className="w-full flex justify-center rounded-md border border-gray-300">
                        {generateBarcodePattern(barcodeData)}
                    </div>
                    <p className="mt-3 text-sm text-gray-600 font-mono tracking-widest">
                        {barcodeData}
                    </p>
                </div>
            </div>

            <div className="relative w-full p-4 bg-[light-dark(var(--button_blue),var(--button_blue))] rounded-b-3xl -mt-px flex items-center justify-center">
                <span className="text-white text-sm font-semibold opacity-70 font-inter">
                  {ticketType}
                </span>
            </div>
        </div>
    );
}