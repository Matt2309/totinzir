import Image from "next/image";

type Props = {
    category: string;
    dayName: string;
    dayNum: number;
    time: string;
    city: string;
    title: string;
};

export default function EventCard({category, dayName, dayNum, time, city, title}: Props) {
  return (
      <div className="line-2">
          <Image src="/landing_background.jpeg" alt="header logo" width={184} height={200}></Image>
          <label className="text-xs text-gray-500">{category}</label>
          <div className="flex gap-5">
              <div className="flex flex-col items-center leading-none">
                  <label className="text-xs date text-[light-dark(var(--red-date),var(--red-date))] leading-none">{dayName}</label>
                  <label className="text-2xl">{dayNum}</label>
              </div>
              <div className="flex flex-col gap-[1px] leading-none">
                  <div className="flex gap-2 items-center leading-none">
                      <label className="text-xs leading-none">{time}</label>
                      <div className="flex items-center leading-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          <label className="text-xs leading-none">{city}</label>
                      </div>
                  </div>
                  <h1 className="text-2xl leading-tight mt-0">{title}</h1>
              </div>
          </div>
      </div>
  );
}
