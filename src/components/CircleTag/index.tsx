type Props = {
    text: string;
};

export default function CircleTag({text}: Props) {
  return (
      <div className="flex flex-col items-center justify-center">
          <div className="w-17 h-17 bg-[light-dark(var(--button_orange),var(--button_orange))]/50 rounded-full flex items-center justify-center flex-col">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-black"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
              </svg>
              <p className="text-sm text-black capitalize">{text}</p>
          </div>

      </div>
  );
}
