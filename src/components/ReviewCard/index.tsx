type Props = {
    title: string;
    desc: string;
    stars: number;
    purchased: boolean;
    name: string;
};

export default function ReviewCard({title, desc, stars, purchased, name }: Props) {
    const clampedStars = Math.max(0, Math.min(5, Math.round(stars)));

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full max-w-lg mx-auto my-4 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

            <div className="flex items-center mb-3">
                {[...Array(5)].map((_, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" fill={index < clampedStars ? 'yellow' : 'gray'} viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">{clampedStars}</span>
            </div>

            <p className="text-gray-700 text-base mb-4 leading-relaxed">{desc}</p>

            <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                {purchased ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Acquistato
          </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Verificato
          </span>
                )}
                <span className="font-medium text-gray-600">— {name}</span>
            </div>
        </div>
    );
}
