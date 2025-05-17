import Image from "next/image";

export default function HeaderMain() {
  return (
      <div className="pl-20 pr-20 pt-2 flex justify-between items-center pb-1 w-full bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
          <a href="/"><Image src="/logo_small_totinzir.svg" alt="header logo" width={100} height={66}></Image></a>
          <div className="flex gap-30 text-white">
              <label>HOME</label>
              <label>CHI SIAMO</label>
              <label>EXPERIENCE</label>
              <label>EVENTI</label>
          </div>
          <div className="flex gap-10 text-white">
              <button className="bg-[light-dark(var(--button_blue),var(--button_blue))] font-bold py-1 px-10 rounded-full">
                  LOGIN
              </button>
              <button className="bg-[light-dark(var(--button_orange),var(--button_orange))] font-bold py-1 px-5 rounded-full">
                  AREA RISERVATA
              </button>
          </div>

      </div>
  );
}
