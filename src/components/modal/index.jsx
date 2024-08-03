import { useContext } from "react";
import { GlobalContext } from "../../context";
import { MdCancel } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";

export default function Modal() {
  const {
    movieId,
    listen,
    formatDate,
    setShowModal,
    setFavorite,
    favorite,
    handleFavorite,
  } = useContext(GlobalContext);

  listen();

  if (!movieId) {
    return null;
  }

  return (
    <>
      <div className="z-30 bg-black opacity-70 top-0 w-full fixed h-[100vh] flex justify-center items-center"></div>
      <div className="fixed scrollbar z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-2 bg-neutral-300 flex flex-col md:flex-row  md:max-h-[72vh] lg:w-1/2p-4 w-[70vw] h-[80vh] gap-2 md:gap-4  overflow-y-auto md:overflow-y-hidden text-neutral-900 ">
        <MdCancel
          className=" absolute right-1 sm:right-4 top-2 text-2xl text-white md:text-neutral-600 cursor-pointer hover:scale-105 duration-200"
          onClick={() => setShowModal(false)}
        />
        <img
          src={`https://image.tmdb.org/t/p/w500${movieId.poster_path}`}
          alt={movieId.title}
          className="h-[500px] w-[350px] mx-auto md:ms-0 md:me-0"
        />
        <div className="flex flex-col gap-4 items-center md:overflow-y-auto md:p-4 w-full">
          <span className=" flex items-center justify-around flex-wrap w-[80%]">
            <p className=" font-semibold font-serif text-xl md:text-2xl text-center">
              {movieId.title || "Movie Title"}
            </p>
            <p>{formatDate(movieId.release_date) || "Release Date"}</p>
          </span>
          <div className="w-full flex justify-center gap-2 flex-wrap">
            {movieId.genres.map((genre, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 px-2 py-1 w-fit bg-neutral-100 rounded-lg cursor-default"
              >
                {genre.name}
              </div>
            )) || "Genre"}
          </div>
          <div className="w-full flex px-2 flex-col">
            <h1 className="block font-semibold text-xl">Overview</h1>
            <p className="text-sm">{movieId.overview || "Overview"} </p>
          </div>
          <p className="mt-4">Produced By</p>
          <div className="flex justify-around gap-4 flex-wrap">
            {movieId.production_companies.map((product, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500${product.logo_path}`}
                alt=""
                className="h-10 md:w-auto px-4"
              />
            )) || "Companies"}
          </div>
          <button
            className={`my-5 md:mt-10 w-fit border py-3 px-5  rounded-md  duration-300 font-semibold ${
              favorite.includes(movieId.id)
                ? "bg-yellow-600 text-gray-700 hover:text-gray-100"
                : "text-gray-100 bg-neutral-700 hover:text-yellow-500"
            }`}
            onClick={() => handleFavorite(movieId.id)}
          >
            {favorite.includes(movieId.id) ? (
              <div className="flex items-center gap-2 ">
                <CiBookmarkCheck className="text-2xl " /> Remove From Favorites
              </div>
            ) : (
              <div className="flex items-center gap-2 ">
                <CiBookmarkCheck className="text-2xl" /> Add To Favorites
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
