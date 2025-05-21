type Props = {
    title: string;
    value: string;
    color: string;
};

export default function AnalyticsCard({title, value, color}: Props) {
  return (
      <div className={`grid grid-cols-[7%_93%] bg-white rounded-xl w-80`}>
            <div className={`bg-[light-dark(var(${color}),var(${color}))] rounded-l-xl`}/>
            <div className="flex flex-col justify-start pl-5 p-2 pt-4">
                <label className="text-4xl/7">{value}</label>
                <label className="card-label">{title}</label>
            </div>
      </div>
  );
}
