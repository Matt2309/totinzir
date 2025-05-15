type Props = {
    title: string;
    price: number;
};

export default function TicketCard({title, price}: Props) {
  return (
      <div className="bg-[light-dark(var(--button_orange),var(--button_orange))] rounded-md p-3 pl-8 pr-8 flex flex-row justify-between items-center">
          <label className="text-black text-2xl">{title}</label>
          <div className="flex flex-row items-center gap-2">
              <label className="text-2xl">{price}</label>
              <div className="bg-white rounded-md pt-0 pl-2 pr-2 pb-0 flex justify-around text-xl">+</div>
              <label>1</label>
              <div className="bg-white rounded-md pt-0 pl-2 pr-2 pb-0 flex justify-around text-xl">-</div>
          </div>
      </div>
  );
}
