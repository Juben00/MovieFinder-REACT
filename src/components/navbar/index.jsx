import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/index";
import { CiBookmarkCheck } from "react-icons/ci";

export default function Navbar() {
  const { search, handleInput, searchMovie, isNavVisible } =
    useContext(GlobalContext);

  return (
    <div
      className={`fixed w-full top-0 z-50 h-20 bg-neutral-600 flex items-center text-gray-200 justify-around transition-transform duration-500 ${
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <NavLink to={"/"} className="md:text-[40px] font-semibold text-xl ">
        MovieFinder
      </NavLink>
      <div className="w-1/3 md:w-1/3 border rounded-full overflow-hidden relative flex">
        <input
          type="text"
          value={search}
          onChange={(event) => handleInput(event)}
          className="outline-none text-black ps-3 pe-1 w-full py-2"
        />
        <button
          className="text-gray-500 md:text-lg font-semibold relative right-0 h-10 ps-1 pe-2 md:px-4 bg-white border-none"
          onClick={searchMovie}
        >
          Search
        </button>
      </div>

      <ul className="flex gap-5 ">
        {/* <li className="hover:text-neutral-500 duration-150">
          <NavLink to={"/"}>Home</NavLink>
        </li> */}
        <li className="hover:text-neutral-500 duration-150">
          <NavLink to={"/favorites"} className={`flex items-center gap-1`}>
            <CiBookmarkCheck className="text-3xl " />
            <p className="hidden md:block">Favorites</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
