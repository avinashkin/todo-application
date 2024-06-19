import { useState } from "react";
import bell from "../src/images/bell.png";
import user from "../src/images/user.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [showLogout, setLogout] = useState(false);

  return (
    <header className="w-full h-16 shadow-lg flex items-center justify-between">
      <h1 className="pl-10 sm:pl-28 align-middle text-3xl font-black">
        Todo List
      </h1>
      <div className="pr-10 sm:pr-20 gap-8 flex relative">
        <img
          src={bell}
          className="cursor-pointer"
          alt="notification"
          width="30"
          height="20"
        />
        <img
          src={user}
          className="cursor-pointer"
          alt="user"
          width="30"
          height="20"
          onClick={() => setLogout(!showLogout)}
        />
        {showLogout && (
          <Link to="/login" className="cursor-pointer absolute bg-white px-4 py-2 rounded border top-10 left-9 before:content-[''] before:w-0 before:h-0 before:border-l-[7px] before:border-r-[7px] before:border-l-transparent before:border-r-transparent before:border-b-[7px] before:border-b-[#dad9d9] before:absolute before:top-[-7px] before:left-[35px]">
            <div className="">
              Logout
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
