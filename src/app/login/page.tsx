import Image from "next/image";

export default function login() {
  return (
    <div>
        <main className="flex flex-col items-center">
            <div className="grid grid-cols-2 bg-white w-4/6 my-30 h-150 rounded-3xl">
                <div className="p-10">
                    <Image src="/logo_totinzir.svg" alt="header logo" width={70} height={40}></Image>
                    <br/>
                    <h1 className="text-4xl">BENVENUTO</h1>
                    <form className="flex flex-col gap-2">
                        <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md w-3/4 h-10 p-2 text-sm" placeholder="mario.rossi@gmail.com" type="text" name="email" aria-label="email"/>
                        <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md w-3/4 h-10 p-2 text-sm" placeholder="password" type="text" name="password" aria-label="email"/>

                        <button type="submit" className="bg-[light-dark(var(--button_blue),var(--button_blue))] font-bold py-1 px-10 rounded-md text-white text-sm w-3/11">login</button>
                    </form>
                    <br/>
                    <label className="text-sm">NON HAI UN ACCOUNT? <a href="/register" className="text-[light-dark(var(--button_blue),var(--button_blue))] underline">REGISTRATI</a></label>
                </div>
                <div className="overflow-hidden relative rounded-r-3xl">
                    <Image
                        src="/landing_background.jpeg"
                        alt="header logo"
                        width={500}
                        height={69}
                        className="w-full h-full object-cover transform scale-130 -translate-y-20 -translate-x-15"
                    />
                </div>
            </div>
        </main>
    </div>
  );
}