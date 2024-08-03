import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { ClipLoader } from "react-spinners";
import MovieItem from "../../components/movie-item/MovieItem";
import Modal from "../../components/modal";
import { HiMiniFire } from "react-icons/hi2";
import { MdStarRate } from "react-icons/md";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { BiBell } from "react-icons/bi";
import Cover from "../../components/cover";
import { genres } from "../../category";

export default function Home() {
  const {
    popmovies,
    topratedmovies,
    upmovies,
    searchmovies,
    moviecategory,
    loading,
    error,
    search,
    seeMore,
    count,
    handleSeeMore,
    handleCountincrease,
    handleCountdecrease,
    showModal,
    fetchGenre,
    cover,
  } = useContext(GlobalContext);

  useEffect(() => {
    console.log("from home", searchmovies);
  }, []);

  if (loading) {
    return (
      <div className="top-20 relative flex justify-center items-center h-[80vh] w-full">
        <ClipLoader color="#FFF" loading={loading} size={70} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="top-20 text-4xl relative h-[80vh] flex justify-center items-center col-span-full row-span-full text-red-500">
        {error}
      </div>
    );
  }

  if (searchmovies && search.length > 0) {
    return (
      <>
        <div
          className="min-h-fit mt-[100px] md:mt-[110px] container mx-auto 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  min-grid-rows-1 gap-y-4 gap-x-0 md-gap-x-4 mb-7 relative"
        >
          {searchmovies && searchmovies.length > 0 ? (
            searchmovies.map((smovie, index) => (
              <MovieItem key={index} item={smovie} />
            ))
          ) : (
            <div className="min-h-dvh mt-[100px] md:mt-[110px] container mx-auto relative w-[100vw] text-center top-[20%]">
              <p>No Movies Found</p>
            </div>
          )}
        </div>
        {showModal && <Modal></Modal>}
      </>
    );
  }

  if (moviecategory) {
    return (
      <>
        <div
          className="min-h-fit mt-[100px] md:mt-[110px] container mx-auto 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  min-grid-rows-1 gap-y-4 gap-x-0 md-gap-x-4 mb-7 relative"
        >
          {moviecategory ? (
            moviecategory.map((smovie, index) => (
              <MovieItem key={index} item={smovie} />
            ))
          ) : (
            <div className="min-h-dvh mt-[100px] md:mt-[110px] container mx-auto relative w-[100vw] text-center top-[20%]">
              <p>No Movies Found</p>
            </div>
          )}
        </div>
        {showModal && <Modal></Modal>}
      </>
    );
  }

  return (
    <>
      {popmovies &&
        popmovies.map((item, index) => (
          <div
            key={index}
            className={`absolute md:container top-20 md:top-28 -translate-x-1/2 left-1/2 w-full h-full transition-opacity duration-1000 ${
              index === cover ? "opacity-100" : "opacity-0"
            }`}
          >
            <Cover item={item} />
          </div>
        ))}

      {/* Popular Movies */}
      <div className="relative flex flex-col container mt-[300px] md:mt-[540px]  justify-center  mx-auto overflow-x-hidden mb-10">
        <div className="flex justify-between items-between px-4 md:px-7">
          <span className="flex items-center gap-1 text-xl">
            <HiMiniFire className="text-orange-600 text-2xl md:text-4xl" />
            <p className="text-sm font-semibold md:text-xl">Popular Movies</p>
          </span>
          <button
            className="hover:scale-105 duration-300 hover:text-neutral-300"
            onClick={() => handleSeeMore("Popular")}
          >
            {seeMore === "Popular" ? (
              <span className="flex items-center gap-1">
                See Less <FaLongArrowAltLeft />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                See More
                <FaLongArrowAltRight />
              </span>
            )}
          </button>
        </div>
        <div
          className={`${
            seeMore === "Popular"
              ? "relative z-20 md:container mx-auto md:px-4 py-4 lg:gap-x-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  grid-rows-1 min-h-dvh gap-4"
              : "flex overflow-x-scroll gap-4 scrollbar overflow-y-hidden px-4 py-2"
          }`}
        >
          {popmovies &&
            popmovies.map((movie, index) => (
              <MovieItem key={index} item={movie} />
            ))}
        </div>
        {/* <div className="text-center text-xl font-semibold">Page: {count}</div>
        <div className="flex justify-center gap-5  left-1  py-3">
          <button
            className="hover:cursor-pointer px-4 py-2 border rounded-lg bg-red-600"
            onClick={handleCountdecrease}
          >
            Prev
          </button>
          <button
            className="hover:cursor-pointer px-4 py-2 border rounded-lg bg-green-600"
            onClick={handleCountincrease}
          >
            Next
          </button>
        </div> */}
      </div>

      {/* Top RAted Movies */}
      <div className="relative flex flex-col container justify-center  mx-auto overflow-x-hidden mb-10">
        <div className="flex justify-between items-between px-4 md:px-7">
          <span className="flex items-center gap-1 text-xl">
            <MdStarRate className="text-yellow-400 text-2xl md:text-4xl" />
            <p className="text-sm font-semibold md:text-xl">Top Rated Movies</p>
          </span>
          <button
            className="hover:scale-105 duration-300 hover:text-neutral-300"
            onClick={() => handleSeeMore("topRated")}
          >
            {seeMore === "topRated" ? (
              <span className="flex items-center gap-1">
                See Less <FaLongArrowAltLeft />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                See More
                <FaLongArrowAltRight />
              </span>
            )}
          </button>
        </div>
        <div
          className={`${
            seeMore === "topRated"
              ? "relative z-20 md:container mx-auto md:px-4 py-4 lg:gap-x-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  grid-rows-1 min-h-dvh gap-4"
              : "flex overflow-x-scroll gap-4 scrollbar overflow-y-hidden px-4 py-2"
          }`}
        >
          {topratedmovies &&
            topratedmovies.map((movie, index) => (
              <MovieItem key={index} item={movie} />
            ))}
        </div>
      </div>

      {/* Upcoming Movies */}
      <div className="relative flex flex-col container justify-center  mx-auto overflow-x-hidden mb-10">
        <div className="flex justify-between items-between px-4 md:px-7">
          <span className="flex items-center gap-1 text-xl">
            <BiBell className="text-blue-500 text-2xl md:text-4xl" />
            <p className="text-sm font-semibold md:text-xl">Upcoming Movies</p>
          </span>
          <button
            className="hover:scale-105 duration-300 hover:text-neutral-300"
            onClick={() => handleSeeMore("upComing")}
          >
            {seeMore === "upComing" ? (
              <span className="flex items-center gap-1">
                See Less <FaLongArrowAltLeft />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                See More
                <FaLongArrowAltRight />
              </span>
            )}
          </button>
        </div>
        <div
          className={`${
            seeMore === "upComing"
              ? "relative z-20 md:container mx-auto md:px-4 py-4 lg:gap-x-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  grid-rows-1 min-h-dvh gap-4"
              : "flex overflow-x-scroll gap-4 scrollbar overflow-y-hidden px-4 py-2"
          }`}
        >
          {upmovies &&
            upmovies.map((movie, index) => (
              <MovieItem key={index} item={movie} />
            ))}
        </div>
      </div>

      {/* genres */}
      <div className="relative flex flex-wrap justify-center gap-2 container mx-auto mb-4  p-2 flex-col">
        {/* <p className="text-center text-2xl">Tags</p> */}
        <div className="gap-2 flex justify-center flex-wrap mb-7">
          {genres &&
            genres.map((genre, index) => (
              <button
                key={index}
                className="bg-neutral-500 hover:scale-105 duration-300 hover:bg-neutral-700 text-neutral-900 hover:text-neutral-300 rounded-lg py-2 border min-w-[120px] "
                onClick={() => fetchGenre(genre.id)}
              >
                {genre.name}
              </button>
            ))}
        </div>
      </div>

      {showModal && <Modal></Modal>}
    </>
  );
}
