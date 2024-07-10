import { useState } from "react";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../Redux/Admin/Auth/action";
import { toast } from "react-toastify";

const data = [
  { name: "Home", href: "/", current: true },
  { name: "DashBoard", href: "/admin_dashboard", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminNavbar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const adminToken = useSelector((store) => store.AdminAuthReducer.adminToken);
  const isAuth = useSelector((store) => store.AdminAuthReducer.isAuth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(adminLogout());
    toast.success("You have successfully logged out.");
    setIsProfileOpen(false); // Close profile menu on logout
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isHamburgerOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="https://t4.ftcdn.net/jpg/00/79/77/19/360_F_79771929_dkEtuIuxFdNOlv6Evj1Nj1kaSLgSas34.jpg"
                alt="FinService Logo"
                className="w-20 h-15 mr-4"
              />
              <span className="font-bold text-2xl text-gray-800">FinService</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {data.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    "border-transparent text-gray-500 hover:border-gray-300 hover:text-violet-500 hover:underline",
                    "inline-flex items-center px-1 pt-1 text-xl font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                </button>
              </div>
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  {!isAuth ? (
                    <>
                      <a
                        href="/admin_register"
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </a>
                      <a
                        href="/admin_login"
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </a>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                    >
                      Admin Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isHamburgerOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {data.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block px-3 py-2 rounded-md text-lg font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
