import { createContext, useEffect, useRef, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [search, setSearch] = useState("");
  const [popmovies, setPopMovies] = useState([]);
  const [topratedmovies, setTopRAtedMovies] = useState([]);
  const [upmovies, setUpMovies] = useState([]);
  const [searchmovies, setSearchMovies] = useState([]);
  const [moviecategory, setMovieCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(1);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [favInfos, setFavInfos] = useState([]);
  const [cover, setCover] = useState(null);
  const [seeMore, setSeeMore] = useState("");

  const URL = "https://api.themoviedb.org/3/movie/popular?";
  const SEARCHURL = `https://api.themoviedb.org/3/search/movie?`;
  const API_KEY = "b1fffe5a18b1339e0205b9c2ee52e935";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWZmZmU1YTE4YjEzMzllMDIwNWI5YzJlZTUyZTkzNSIsIm5iZiI6MTcyMTM4NzU5NC4yMzg5NzEsInN1YiI6IjY1ZTZiY2E4Y2VkZTY5MDE0OGJkYTYzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pa24fRu_AGKXyMeF0fNZbpJmxf8RIy0rZkoe0PglzkA",
    },
  };

  // Toggle visibility of the "See More" section
  function handleSeeMore(category) {
    if (seeMore === category) {
      setSeeMore("");
    } else {
      setSeeMore(category);
    }
  }

  // Automatically cycle through movie covers every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCover((prevIndex) =>
        prevIndex === popmovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [popmovies.length]);

  // Toggle the modal and fetch movie details
  function toggleModal(id) {
    getMovie(id);
    setShowModal(!showModal);
  }

  // Add or remove movie from the list of favorites
  function handleFavorite(id) {
    const list = [...favorite];
    const instance = list.findIndex((index) => index === id);

    if (instance === -1) {
      list.push(id);
    } else {
      list.splice(instance, 1);
    }
    setFavorite(list);
  }

  useEffect(() => {
    console.log("My favorites : ", favorite);
  }, [favorite]);

  // Format the date string to a more readable format
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Disable clicks on the background when the modal is open
  function listen() {
    useEffect(() => {
      if (showModal) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }

      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [showModal]);
  }

  useEffect(() => {
    console.log(movieId);
  }, [movieId]);

  // Show or hide the navigation bar based on scroll direction
  const prevScroll = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > prevScroll.current) {
        setIsNavVisible(false);
      } else if (currentScroll < prevScroll.current) {
        setIsNavVisible(true);
      }

      prevScroll.current = currentScroll;
    };
    console.log(isNavVisible);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Increase the page count
  function handleCountincrease() {
    setCount((c) => c + 1);
  }

  // Decrease the page count
  function handleCountdecrease() {
    setCount((c) => (c > 1 ? c - 1 : 1));
  }

  // Handle search input change
  function handleInput(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    console.log("mycount", count);
  }, [count]);

  // Fetch movie details for the modal
  async function getMovie(id) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );
      const data = await response.json();

      if (data) {
        setMovieId(data);
      }
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  // Fetch initial list of popular movies
  async function loadMovies() {
    try {
      setLoading(true);
      let allMovies = [];
      let page = 1;

      while (allMovies.length < 40) {
        const response = await fetch(
          `${URL}api_key=${API_KEY}&page=${count}`,
          options
        );
        const data = await response.json();

        if (data && data.results) {
          allMovies = [...allMovies, ...data.results];
        }

        page++;
      }

      setPopMovies(allMovies);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  // Fetch initial list of top rated movies
  async function loadtopMovies() {
    try {
      setLoading(true);
      let allMovies = [];
      let page = 1;

      while (allMovies.length < 40) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();

        if (data && data.results) {
          allMovies = [...allMovies, ...data.results];
        }

        page++;
      }

      setTopRAtedMovies(allMovies);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  // Fetch initial list of upcoming rated movies
  async function loadupMovies() {
    try {
      setLoading(true);
      let allMovies = [];
      let page = 1;

      while (allMovies.length < 40) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
          options
        );
        const data = await response.json();

        if (data && data.results) {
          allMovies = [...allMovies, ...data.results];
        }

        page++;
      }

      setUpMovies(allMovies);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  // Fetch search results based on user input
  async function searchMovie() {
    try {
      setLoading(true);
      const response = await fetch(
        `${SEARCHURL}api_key=${API_KEY}&query=${search}`,
        options
      );
      const data = await response.json();

      if (data && data.results) {
        setSearchMovies(data.results);
      }
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  // Fetch details for the favorite movies
  async function fetchfav(favorites) {
    try {
      const promises = favorites.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        ).then((response) => response.json())
      );
      const results = await Promise.all(promises);
      setFavInfos(results);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  // Fetch by Genre ID
  async function fetchGenre(genreId) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
      );
      const data = await response.json();
      if (data) {
        setMovieCategory(data.results);
        setLoading(false);
        console.log("data of id: ", data.results);
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  }

  // useeffect for category
  useEffect(() => {
    fetchGenre();
  }, []);

  useEffect(() => {
    console.log("category : ", moviecategory);
  }, [moviecategory]);

  // Update favorite movies list when favorites change
  useEffect(() => {
    if (favorite.length > 0) {
      fetchfav(favorite);
    } else {
      setFavInfos([]);
    }
    console.log("favinfos", favInfos);
  }, [favorite]);

  // Fetch movies when search input changes or count changes
  useEffect(() => {
    if (search) {
      searchMovie();
      console.log("result : ", searchmovies);
    } else {
      loadMovies();
    }
  }, [search, count]);

  // Fetch initial list of movies on component mount
  useEffect(() => {
    loadMovies();
    loadtopMovies();
    loadupMovies();
  }, []);

  // Log movies to console whenever the movies state changes
  useEffect(() => {
    console.log("pop", popmovies);
    console.log("top", topratedmovies);
  }, [popmovies]);

  return (
    <GlobalContext.Provider
      value={{
        search,
        popmovies,
        topratedmovies,
        upmovies,
        searchmovies,
        loading,
        error,
        count,
        isNavVisible,
        showModal,
        movieId,
        favorite,
        favInfos,
        seeMore,
        cover,
        handleSeeMore,
        fetchGenre,
        setFavorite,
        handleFavorite,
        formatDate,
        listen,
        toggleModal,
        handleInput,
        handleCountincrease,
        handleCountdecrease,
        searchMovie,
        setShowModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
