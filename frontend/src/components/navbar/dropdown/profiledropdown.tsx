import {
  LuClipboardList,
  LuHeart,
  LuSettings,
  LuHeadset,
} from "react-icons/lu";
import { BiMessageDots } from "react-icons/bi";

const ProfileDropdown = (props: any) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  if (!user || !user.user) return null;
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div
      className={props.className}
      onMouseOut={props.onMouseOut}
      onMouseOver={props.onMouseOver}
    >
      <div className="flex items-center gap-3.5 ">
        {" "}
        <div className="max-w-12">
          <img
            src="https://ae-pic-a1.aliexpress-media.com/kf/Hf768b4fa794e44bfb7cc86e4a528a035h.png"
            alt=""
          />
        </div>
        <h1 className="text-teal-600 ">
          Welcome back,{" "}
          <span className="font-bold">
            {capitalizeFirstLetter(user.user.firstname)}
          </span>
        </h1>
      </div>
      <p
        className="text-red-600 ml-[62px] hover:underline cursor-pointer"
        onClick={handleSignOut}
      >
        Sign out
      </p>

      <hr className="max-w-[250px] my-1.5" />

      <ul className="text-teal-600">
        <li className="flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl">
          <LuClipboardList /> My Orders
        </li>
        <li className="flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl">
          <BiMessageDots /> Message Center
        </li>
        <li className="flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl">
          <LuHeart /> Wish List
        </li>
        <li className="flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl">
          <LuSettings /> Settings
        </li>
        <li className="flex items-center gap-2 p-2.5 hover:bg-gray-200 rounded-xl">
          <LuHeadset />
          Help Center
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
