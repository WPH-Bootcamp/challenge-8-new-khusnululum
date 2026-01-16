import { useNavigate } from "react-router-dom";
import NewReleaseCard from "./ui/NewReleaseCard";
import SecondaryButton from "./ui/SecondaryButton";
import { useNewReleases } from "../hooks/useNewRelease";
import { tmdbImage } from "../lib/tmdb";

export default function NewReleaseSection() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useNewReleases();

  if (isLoading) return <p className="text-white px-6">Loading...</p>;

  if (isError) {
    return (
      <div className="px-6 text-white">
        <p className="text-red-400 font-semibold">Failed to load data</p>
        <p className="text-xs text-red-300 mt-1 wrap-break-word">
          {(error as Error)?.message}
        </p>

        <button
          onClick={() => refetch()}
          className="mt-3 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  // gabungkan semua results dari tiap page
  const movies =
    data?.pages
      .flatMap((p) => p.results)
      .filter((m) => m.poster_path && m.vote_average > 0) ?? [];

  return (
    <section className="relative mt-12 max-w-360 mx-auto px-8">
      <h2 className="text-white text-xl font-semibold mb-6">New Release</h2>

      <div
        className="
          relative
          grid grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          justify-items-center
          gap-6
        "
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent pointer-events-none" />

        {movies.map((movie) => (
          <button
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="text-left"
          >
            <NewReleaseCard
              title={movie.title}
              poster={tmdbImage(movie.poster_path, "w500")}
              rating={Number(movie.vote_average.toFixed(1))}
            />
          </button>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        {hasNextPage ? (
          <SecondaryButton
            className="w-[230px] h-[52px]"
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </SecondaryButton>
        ) : (
          <p className="text-gray-400 text-sm">No more movies</p>
        )}
      </div>
    </section>
  );
}
