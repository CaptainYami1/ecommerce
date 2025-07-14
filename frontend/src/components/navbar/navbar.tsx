import { BsFillMoonStarsFill, BsSunFill, BsCart4 } from "react-icons/bs";
import { useContext, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/shopContext";
import { AiOutlineUser } from "react-icons/ai";
import ProfileDropdown from "./dropdown/profiledropdown";

function Navbar() {
  let timeout = useRef<number>(null);
  const { cartItems } = useContext(ShopContext)!;

  // 🧮 Total number of items in the cart
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );
  const [active, setActive] = useState("shop");
  const location = useLocation();
  const pathname = location.pathname;

  const getActiveTab = () => {
    if (pathname.startsWith("/men")) return "men";
    if (pathname.startsWith("/women")) return "women";
    if (pathname.startsWith("/kids")) return "kids";
    return "shop";
  };

  const { darkMode, setDarkMode } = useContext(ShopContext)!;

  const [display, setDisplay] = useState(false);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const toggleDarkMode = (e: any) => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };

  const mouseOut = () => {
    timeout.current = setTimeout(() => {
      setDisplay(false);
    }, 500);
  };

  const mouseOver = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    setDisplay(true);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <header className="bg-white dark:bg-gray-900 py-3 fixed top-0  w-full  z-50 shadow-md dark:shadow-gray-800 ">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 min-w-0 ">
            <div className="md:flex md:items-center md:gap-12 ">
              <Link className="block text-teal-600 justify-items-center" to="/">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
                <h1 className="text-xl font-semibold">Kayani Worldwide</h1>
              </Link>
            </div>

            <div
              id="json-example-with-tab-filter-in-dropdown-tab-preview-markup"
              className="max-w-sm"
            >
              <div
                className="relative"
                data-hs-combo-box='{
      "groupingType": "tabs",
      "isOpenOnFocus": true,
      "apiUrl": "https://fakestoreapi.com/products",
      "apiGroupField": "category",
      "outputItemTemplate": "<div class=\"cursor-pointer p-2 space-y-0.5 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700\" data-hs-combo-box-output-item><div class=\"flex justify-between items-center w-full\"><div data-hs-combo-box-output-item-field=\"title\" data-hs-combo-box-search-text data-hs-combo-box-value></div></div></div><span class=\"hidden hs-combo-box-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"></polyline></svg></span></img></div>",
      "groupingTitleTemplate": "<button type=\"button\" class=\"capitalize py-1 px-2 inline-flex items-center gap-x-2 text-sm text-nowrap rounded-md border border-gray-200 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-100 hs-combo-box-tab-active:bg-blue-600 hs-combo-box-tab-active:border-blue-600 hs-combo-box-tab-active:focus:border-blue-600 hs-combo-box-tab-active:text-white disabled:opacity-50 disabled:pointer-events-none dark:hs-combo-box-tab-active:bg-blue-500 dark:hs-combo-box-tab-active:text-white dark:hs-combo-box-tab-active:border-blue-500 dark:hs-combo-box-tab-active:focus:border-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700\"></button>",
      "tabsWrapperTemplate": "<div class=\"overflow-x-auto p-4 rounded-t-xl border-b border-gray-200 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700\"></div>"
    }'
              >
                <div className="lg:flex hidden">
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                    <svg
                      className="shrink-0 size-4 text-teal-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                  <input
                    className="py-2.5 border  ps-10 pe-4 block w-full rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  border-teal-600 text-teal-400 placeholder-teal-600 dark:focus:ring-neutral-600"
                    type="text"
                    role="combobox"
                    aria-expanded="false"
                    placeholder="Type a product name"
                    data-hs-combo-box-input=""
                  />
                </div>

                <div
                  className="absolute z-50 w-full bg-white rounded-xl shadow-xl dark:bg-neutral-800 hidden"
                  data-hs-combo-box-output=""
                >
                  <div
                    className="max-h-75 p-2 rounded-b-xl overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800"
                    data-hs-combo-box-output-items-wrapper=""
                  ></div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li
                    onClick={() => setActive("shop")}
                    className={
                      getActiveTab() && active === "shop"
                        ? "bg-teal-600 text-white px-3.5 py-1.5 rounded-xl"
                        : "text-teal-600 transition hover:text-gray-500/75"
                    }
                  >
                    <Link to="/">Shop</Link>
                  </li>

                  <li
                    onClick={() => setActive("men")}
                    className={
                      getActiveTab() && active === "men"
                        ? "bg-teal-600 text-white px-3.5 py-1.5 rounded-xl"
                        : "text-teal-600 transition hover:text-gray-500/75"
                    }
                  >
                    <Link to="/men">Men</Link>
                  </li>

                  <li
                    onClick={() => setActive("women")}
                    className={
                      getActiveTab() && active === "women"
                        ? "bg-teal-600 text-white px-3.5 py-1.5 rounded-xl"
                        : "text-teal-600 transition hover:text-gray-500/75"
                    }
                  >
                    <Link to="/women">Women</Link>
                  </li>

                  <li
                    onClick={() => setActive("kids")}
                    className={
                      getActiveTab() && active === "kids"
                        ? "bg-teal-600 text-white px-3.5 py-1.5 rounded-xl"
                        : "text-teal-600 transition hover:text-gray-500/75"
                    }
                  >
                    <Link to="/kids">Kids</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              {user ? (
                <div
                  onMouseOut={() => mouseOut()}
                  onMouseOver={() => mouseOver()}
                  className="hidden md:flex md:items-center md:justify-center md:gap-2 md:text-teal-600 hover:text-teal-800 cursor-pointer"
                >
                  <AiOutlineUser size={30} />
                  <div className="text-[12px]">
                    <h1 className="text-[14px]">
                      Hi {capitalizeFirstLetter(user.user.firstname)}
                    </h1>
                    <p className="font-bold">Account</p>
                  </div>

                  <ProfileDropdown
                    onMouseOver={() => setDisplay(true)}
                    onMouseOut={() => setDisplay(false)}
                    className={
                      display
                        ? "absolute top-20 bg-white dark:bg-gray-800 shadow-[0_-2px_5px_rgba(0,0,0,0.25)] -mt-3 pt-5 rounded-lg p-4 w-[250px] z-auto after:absolute dark:after:text-gray-800 after:content-[''] after:w-0 after:h-0 after:border-l-[10px] after:border-r-[10px] after:border-b-[10px] after:border-l-transparent after:border-r-transparent   after:left-[50%] after:top-[-10px] after:text-white "
                        : "hidden"
                    }
                  />
                </div>
              ) : (
                <div className="sm:flex hidden">
                  <Link
                    to="/login"
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-teal-800"
                  >
                    Login/Register
                  </Link>
                </div>
              )}

              <div onClick={toggleDarkMode}>
                {darkMode ? (
                  <div className="text-teal-600 hover:text-teal-800">
                    <BsSunFill />
                  </div>
                ) : (
                  <div className="text-teal-600 hover:text-teal-800">
                    <BsFillMoonStarsFill />
                  </div>
                )}
              </div>

              <div
                className="text-teal-600 relative w-[24px] hover:text-teal-800"
                onClick={() => getActiveTab()}
              >
                <Link to="/cart">
                  <BsCart4 size={24} />
                </Link>
                <div className="w-[20px] h-[20px] absolute -top-3 -right-3 flex justify-center items-center font-medium rounded-[11px] dark:bg-white dark:text-teal-600 bg-teal-600 text-white text-md">
                  {totalItems}
                </div>
              </div>

              <div className="block md:hidden">
                <button
                  title="Toggle Menu"
                  className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
