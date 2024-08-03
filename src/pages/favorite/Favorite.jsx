import { useContext } from "react";
import { GlobalContext } from "../../context";
import MovieItem from "../../components/movie-item/MovieItem";
import Modal from "../../components/modal";

export default function Favorite() {
  const { favInfos, showModal } = useContext(GlobalContext);

  return (
    <>
      <div className="flex flex-col container mx-auto top-20 mt-24 mb-4 min-h-dvh">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold ">
            List of Favorite Movies
          </h1>
        </div>
        <div className="md:container mx-auto px-4 py-4 md:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid-rows-1 gap-4">
          {favInfos && favInfos.length > 0 ? (
            favInfos.map((movie, index) => (
              <MovieItem key={index} item={movie} />
            ))
          ) : (
            <div className="absolute top-[55%] left-1/2 -translate-y-[50%] -translate-x-1/2">
              No favorite movies yet.
            </div>
          )}
        </div>
      </div>
      {showModal && <Modal></Modal>}
    </>
  );
}
