import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FavoriteMovieCard from "../ui/FavoriteMovieCard";

import { useFavorites } from "../../hooks/useFavorites";
import { useFavoriteTrailers } from "../../hooks/useFavoriteTrailers";
import { isFavorite } from "../../lib/favoritesStorege";

export default function Favorites() {
  const navigate = useNavigate();

  const { favoritesQuery, toggleMutation } = useFavorites();

  const favorites = favoritesQuery.data ?? [];
  const movieIds = favorites.map((m) => m.id);

  const trailerQueries = useFavoriteTrailers(movieIds);

  if (favoritesQuery.isLoading) {
    return <p className="text-white p-6">Loading favorites...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-360 mx-auto px-6 pt-8 pb-20">
        <h2 className="text-xl font-semibold mb-6">Favorites</h2>

        {favorites.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <img src="/Frame.svg" alt="Frame Icon" className="w-20" />
            <p className="font-semibold text-sm">Data Empty</p>
            <p className="text-neutral-400 text-sm">
              You don't have a favorite movie yet
            </p>

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-full w-full md:w-auto bg-[#961200] hover:bg-red-800 text-white text-sm font-medium transition-colors"
            >
              Explore Movie
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {favorites.map((movie, idx) => {
              const trailer = trailerQueries[idx]?.data;
              const trailerKey = trailer?.key ?? null;

              return (
                <FavoriteMovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path ?? null}
                  vote_average={movie.vote_average}
                  overview={movie.overview}
                  trailerKey={trailerKey}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={() => toggleMutation.mutate(movie)}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="max-w-360 mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
