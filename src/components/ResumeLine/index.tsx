type Props = {
    quantity: number;
    ticketType: string;
    eventName: string;
    price: number;
    city: string;
    date: string;
};
export default function ResumeLine({quantity, ticketType, eventName, price, city, date}: Props) {
  return (
      <div>
          <div className="flex flex-row justify-between w-3/4">
              <label>{quantity}X {ticketType} - {eventName}</label>
              <label>€{price}</label>
          </div>
          <div className="flex flex-col p-2 -mt-2">
              <label className="text-gray-500 text-sm">{city}</label>   
              <label className="text-gray-500 text-sm/1">{date}</label>
          </div>
      </div>
  );
}
