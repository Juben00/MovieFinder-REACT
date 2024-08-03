import { useContext } from "react";
import { FaStar, FaHeart } from "react-icons/fa6";
import { GlobalContext } from "../../context";

export default function MovieItem({ item }) {
  const { toggleModal } = useContext(GlobalContext);

  return (
    <div className="mx-auto border-2 cursor-default text-gray-700 flex justify-center items-center relative w-40 h-[220px] container text-center shadow-md rounded-lg overflow-hidden hover:scale-105 duration-300 flex-none mb-1">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title}
        className="object-cover h-full w-full"
      />
      <div className="absolute bg-black bg-opacity-70 text-neutral-100 opacity-0 duration-300 hover:opacity-100 inset-0 flex flex-col justify-center items-center p-4 gap-4 ">
        <div className="flex items-center gap-3 text-sm ">
          <span className="flex items-center gap-2">
            <FaStar className="text-yellow-400 text-xl " />
            {item.vote_average}
          </span>
          <span className="flex items-center gap-2">
            <FaHeart className=" text-red-500 text-xl " />
            {item.vote_count}
          </span>
        </div>
        <h2
          className={`font-semibold text-center ${
            item.title.length > 30 ? "text-sm" : "text-lg"
          }`}
        >
          {item.title}
        </h2>
        <button
          className="underline underline-offset-2 text-neutral-300 hover:text-neutral-50 duration-300"
          onClick={() => toggleModal(item.id)}
        >
          See info
        </button>
      </div>
    </div>
  );
}
