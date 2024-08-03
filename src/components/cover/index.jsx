import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function Cover({ item }) {
  const { formatDate } = useContext(GlobalContext);

  return (
    <div
      className={`h-52 md:h-96 relative rounded-md  md:rounded-3xl overflow-hidden border-2`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
        alt={item.title}
        className="object-cover h-full w-full"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 border-4 rounded-3xl bg-black bg-opacity-50 backdrop-blur-xl text-white px-2 h-1/2 w-fit md:px-6 flex justify-center flex-col">
        <p className="text-xl md:text-4xl font-bold">{item.title}</p>
        <p>- {formatDate(item.release_date)}</p>
      </div>
    </div>
  );
}
