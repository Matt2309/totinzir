"use client"
import { usePathname } from "next/navigation"
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {isAdmin} from "@/db/actions/auth";

const getIsAdmin = async (id): Promise<any> => {
    try {
        return isAdmin(id);
    } catch (error) {
        console.error(`Errore: `, error);
        return [];
    }
};

export default function Sidebar({userId}) {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        getIsAdmin(userId).then(res => {
            console.log(res);
            setIsAdmin(res || false)});
    }, []);

  return (
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-[light-dark(var(--button_blue),var(--button_blue))]">
              <div className="flex flex-col items-center">
                  <div className="flex flex-row items-center pt-1 pb-3">
                      <Link href="/" className="pointer-events-auto">
                          <Image src="/logo_small_totinzir.svg" alt="header logo" width={90} height={10}/>
                      </Link>
                      <hr className="w-6 h-[1px] rotate-90 bg-black border-0 rounded-sm dark:bg-white "/>
                      <label className="text-white">EVENT MANAGER</label>
                  </div>


              </div>
              <hr className="w-full h-[1px] bg-black border-0 rounded-sm mb-3 dark:bg-blue-900 "/>
              <ul className="space-y-2 font-medium">
                      <li>
                          <Link href="/dashboard/events" className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-blue-900 dark:hover:bg-blue-900 group sidebar-item ${isActive("/dashboard/events") ? "active" : ""}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                              </svg>
                              <span className="ms-3">Eventi</span>
                          </Link>
                      </li>
                      <li>
                          <Link href="/dashboard/categories" className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-blue-900 dark:hover:bg-blue-900 group sidebar-item ${isActive("/dashboard/categories") ? "active" : ""}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                              </svg>
                              <span className="ms-3">Categorie</span>
                          </Link>
                      </li>
                      <li>
                          <Link href="/dashboard/tickets" className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-blue-900 dark:hover:bg-blue-900 group sidebar-item ${isActive("/dashboard/tickets") ? "active" : ""}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                              </svg>
                              <span className="flex-1 ms-3 whitespace-nowrap">Biglietti</span>
                          </Link>
                      </li>
                      <li>
                          <Link href="/dashboard/sponsors" className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-blue-900 dark:hover:bg-blue-900 group sidebar-item ${isActive("/dashboard/sponsors") ? "active" : ""}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                              </svg>
                              <span className="flex-1 ms-3 whitespace-nowrap">Sponsor</span>
                          </Link>
                      </li>
                      <li>
                          <Link href="/dashboard/activities" className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-blue-900 dark:hover:bg-blue-900 group sidebar-item ${isActive("/dashboard/activities") ? "active" : ""}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                              </svg>
                              <span className="ms-3">Attività</span>
                          </Link>
                      </li>
                      <li>
                          <Link href="/dashboard/stands" className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-blue-900 dark:hover:bg-blue-900 group sidebar-item ${isActive("/dashboard/stands") ? "active" : ""}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                              </svg>
                              <span className="ms-3">Stands</span>
                          </Link>
                      </li>
                  <li>
                      <Link href="/dashboard/discount-codes" className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-blue-900 dark:hover:bg-blue-900 group sidebar-item ${isActive("/dashboard/discount-codes") ? "active" : ""}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                          </svg>
                          <span className="ms-3">Codici sconto</span>
                      </Link>
                  </li>
                  {isAdmin?
                      <li>
                          <Link href="/dashboard/organizers" className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-blue-900 dark:hover:bg-blue-900 group sidebar-item ${isActive("/dashboard/organizers") ? "active" : ""}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                              </svg>

                              <span className="flex-1 ms-3 whitespace-nowrap">Organizzatori</span>
                          </Link>
                      </li>
                      :
                      <></>
                  }
              </ul>
          </div>
      </aside>
  );
}
