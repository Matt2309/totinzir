import Image from "next/image";
import Link from "next/link";

export default function register() {
  return (
    <div>
        <main className="flex flex-col items-center">
            <div className="grid grid-cols-2 bg-white w-4/6 my-30 h-150 rounded-3xl">
                <div className="p-10">
                    <Link href="/" className="pointer-events-auto">
                        <Image src="/logo_totinzir.svg" alt="header logo" width={70} height={40}></Image>
                    </Link>
                    <br/>
                    <h1 className="text-4xl">REGISTRAZIONE</h1>
                    <form className="mt-4 flex flex-col gap-2">
                        <div className="flex flex-row gap-5">
                            <div className="mb-1">
                                <label htmlFor="name" className="block mb-1 text-sm">NOME</label>
                                <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" placeholder="Nome" type="text" name="name" aria-label="firstname"/>
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500 hidden"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
                            </div>
                            <div className="mb-1">
                                <label htmlFor="name" className="block mb-1 text-sm">COGNOME</label>
                                <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm" placeholder="Cognome" type="text" name="name" aria-label="lastname"/>
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500 hidden"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
                            </div>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="name" className="block mb-1 text-sm">TELEFONO</label>
                            <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-7/8" placeholder="123-456-7890" type="phone" name="name" aria-label="firstname"/>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500 hidden"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="name" className="block mb-1 text-sm">EMAIL</label>
                            <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-7/8" placeholder="mario.rossi@email.com" type="text" name="name" aria-label="firstname"/>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500 hidden"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-1 text-sm">PASSWORD</label>
                            <input className="border-2 border-[light-dark(var(--button_blue),var(--button_blue))] rounded-md h-10 p-2 text-sm w-7/8" placeholder="password" type="text" name="name" aria-label="firstname"/>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500 hidden"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
                        </div>
                        <button type="submit" className="bg-[light-dark(var(--button_blue),var(--button_blue))] font-bold py-1 px-10 rounded-md text-white text-sm w-3/8">REGISTRATI</button>
                    </form>
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