
export default function HeaderDashboard() {
  return (
      <div className="p-6 flex justify-around items-center bg-white pointer-events-none top-0 fixed right-0 left-64">
          <div className="w-150">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-2.5 ps-10 text-sm text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-[light-dark(var(--backgroundDetail),var(--backgroundDetail))]" placeholder="Cerca eventi, biglietti, ecc..." required />
              </div>
          </div>
          <div className="text-white">
              <button className="bg-[light-dark(var(--button_orange),var(--button_orange))] font-bold py-1 px-7 rounded-md">
                  LOGOUT
              </button>
          </div>
      </div>
  );
}
