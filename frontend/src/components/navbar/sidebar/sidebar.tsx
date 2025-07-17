import {
  LuClipboardList,
  LuHeart,
  LuSettings,
  LuHeadset,
} from "react-icons/lu";
import { BiMessageDots } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  
  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (route: string) => pathname.includes(route);
  return (
    <div className=" items-center gap-3.5 p-4 w-fit">
      {" "}
      {user ? (
        <div className="flex items-center gap-3.5 ">
          <div className="max-w-12 ">
            <img
              src="https://ae-pic-a1.aliexpress-media.com/kf/Hf768b4fa794e44bfb7cc86e4a528a035h.png"
              alt=""
            />
          </div>
          <div className="">
            <h1 className="text-teal-600 ">
              Welcome back,{" "}
              <span className="font-bold">
                {capitalizeFirstLetter(user.user.firstname)}
              </span>
            </h1>

            <p
              className="text-red-600 hover:underline cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out
            </p>
          </div>
        </div>
      ) : (
        <div className="sm:flex ">
          <Link
            to="/login"
            className="rounded-md bg-[#bdd358] mb-2.5 block px-5 py-2.5 text-lg font-medium text-teal-900 dark:text-gray-900 shadow-sm hover:bg-[#757e45d0] dark:hover:bg-[#e9f180fd]"
          >
            Login/Register
          </Link>
        </div>
      )}
      <div className="">
        <hr className="max-w-[250px] my-1.5" />
        <ul className="text-teal-600 flex flex-col gap-1.5">
          <Link to="/">
            <li
              className={
                isActive("/") &&
                !isActive("/men") &&
                !isActive("/women") &&
                !isActive("/kids") &&
                !isActive("/myOrders") &&
                !isActive("/message-center") &&
                !isActive("/wishlists") &&
                !isActive("/settings") &&
                !isActive("/help%20center") 
                  ? " p-2.5 bg-teal-600 text-white rounded-xl"
                  : " p-2.5 hover:bg-gray-200 rounded-xl"
              }
            >
              Shop
            </li>
          </Link>
          <Link to="/men">
            {" "}
            <li
              className={
                isActive("/men")
                  ? " p-2.5 bg-teal-600 text-white rounded-xl"
                  : " p-2.5 hover:bg-gray-200 rounded-xl"
              }
            >
              Men
            </li>
          </Link>
          <Link to="/women">
            <li
              className={
                isActive("/women")
                  ? " p-2.5 bg-teal-600 text-white rounded-xl"
                  : " p-2.5 hover:bg-gray-200 rounded-xl"
              }
            >
              Women
            </li>
          </Link>
          <Link to="/kids">
            <li
              className={
                isActive("/kids")
                  ? " p-2.5 bg-teal-600 text-white rounded-xl"
                  : " p-2.5 hover:bg-gray-200 rounded-xl"
              }
            >
              Kids
            </li>
          </Link>
        </ul>
        <hr className="max-w-[250px] my-1.5" />
        {user ? (
          <div>
            <ul className="text-teal-600">
              <Link to="/myOrders">
                {" "}
                <li
                  className={
                    isActive("/myOrders")
                      ? "flex items-center gap-2 p-2.5 bg-teal-600 text-white rounded-xl"
                      : "flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl"
                  }
                >
                  <LuClipboardList /> My Orders
                </li>
              </Link>
              <Link to="/message-center">
                <li
                  className={
                    isActive("/message-center")
                      ? "flex items-center gap-2 p-2.5 bg-teal-600 text-white rounded-xl"
                      : "flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl"
                  }
                >
                  <BiMessageDots /> Message Center
                </li>
              </Link>
              <Link to="/wishlists">
                <li
                  className={
                    isActive("/wishlists")
                      ? "flex items-center gap-2 p-2.5 bg-teal-600 text-white rounded-xl"
                      : "flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl"
                  }
                >
                  <LuHeart /> Wish List
                </li>
              </Link>
            </ul>
          </div>
        ) : null}
        <ul className="text-teal-600">
          <Link to="/settings">
            <li
              className={
                isActive("/settings")
                  ? "flex items-center gap-2 p-2.5 bg-teal-600 text-white rounded-xl"
                  : "flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl"
              }
            >
              <LuSettings /> Settings
            </li>
          </Link>
          <Link to="/help center">
            {" "}
            <li
              className={
                isActive("/help%20center")
                  ? "flex items-center gap-2 p-2.5 bg-teal-600 text-white rounded-xl"
                  : "flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl"
              }
            >
              <LuHeadset />
              Help Center
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
