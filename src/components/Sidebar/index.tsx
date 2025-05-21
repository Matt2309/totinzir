"use client"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
    const router = useRouter()
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

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
              </ul>
          </div>
      </aside>
  );
}
