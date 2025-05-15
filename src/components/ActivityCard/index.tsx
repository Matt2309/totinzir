import Image from "next/image";

type Props = {
    dayName: string;
    dayNum: number;
    time: string;
    title: string;
};

export default function ActivityCard({dayName, dayNum, time, title}: Props) {
  return (
      <div className="bg-white p-3 pl-5 pr-5 rounded-xl">
          <div className="flex gap-5">
              <div className="flex flex-col items-center leading-none">
                  <label className="text-xs date text-[light-dark(var(--red-date),var(--red-date))] leading-none">{dayName}</label>
                  <label className="text-2xl">{dayNum}</label>
              </div>
              <div className="flex flex-col gap-[1px] leading-none">
                  <div className="flex gap-2 items-center leading-none">
                      <label className="text-xs leading-none">{time}</label>
                  </div>
                  <h1 className="text-2xl leading-tight mt-0">{title}</h1>
              </div>
          </div>
      </div>
  );
}
