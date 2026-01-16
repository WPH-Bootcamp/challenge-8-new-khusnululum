import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import TrendingCard from "./ui/TrendingCard";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { tmdbImage } from "../lib/tmdb";

export default function TrendingSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    data: movies,
    isLoading,
    isError,
    error,
    refetch,
  } = useTrendingMovies("day");

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 260, behavior: "smooth" });
  };

  return (
    <section className="mt-10 relative max-w-360 mx-auto px-2">
      <h2 className="text-white text-xl font-semibold mb-6 px-6">
        Trending Now
      </h2>

      <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black pointer-events-none" />

      {isLoading && (
        <div className="px-6 pb-4 text-white/70 text-sm">
          Loading trending...
        </div>
      )}

      {isError && (
        <div className="px-6 pb-4">
          <p className="text-red-400 text-sm font-semibold">
            Gagal load trending
          </p>
          <p className="text-xs text-red-300 mt-1 break-words">
            {(error as Error)?.message}
          </p>

          <button
            onClick={() => refetch()}
            className="mt-3 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm"
          >
            Coba lagi
          </button>
        </div>
      )}

      {!!movies?.length && (
        <>
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4 px-6 no-scrollbar scroll-smooth"
          >
            {movies.map((movie, idx) => (
              <button
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)} // ✅ pindah ke page detail
                className="text-left"
              >
                <TrendingCard
                  id={movie.id}
                  index={idx + 1}
                  title={movie.title}
                  poster={tmdbImage(movie.poster_path, "w500")}
                  rating={Number(movie.vote_average.toFixed(1))}
                />
              </button>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="
              flex absolute right-3 top-1/2 -translate-y-1/2
              w-14 h-14 rounded-full bg-black/60
              text-white items-center justify-center
              hover:bg-black/80 transition
            "
          >
            <img src="/ArrowRight.svg" alt="Arrow to Right" />
          </button>
        </>
      )}
    </section>
  );
}
