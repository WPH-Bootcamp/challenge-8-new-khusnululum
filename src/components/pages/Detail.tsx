import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../Navbar";
import InfoCard from "../ui/InfoCard";
import CastItem from "../CastItem";
import ButtonPrimary from "../ui/Button";
import FavoriteButton from "../ui/FavoriteButton";
import Footer from "../Footer";

import { useMovieDetail } from "../../hooks/useMovieDetail";
import { useMovieCredits } from "../../hooks/useMovieCredits";
import { useMovieTrailer } from "../../hooks/useMovieTrailer";

import { tmdbImage } from "../../lib/tmdb";
import { isFavorite } from "../../lib/favoritesStorege";
import type { FavoriteMovie } from "../../lib/favoritesStorege";
import { useFavorites } from "../../hooks/useFavorites";

export default function Detail() {
  const { id } = useParams();
  const [openTrailer, setOpenTrailer] = useState(false);

  // convert id ke number biar konsisten (TMDB pakai number)
  const movieId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const movieQuery = useMovieDetail(movieId);
  const creditsQuery = useMovieCredits(movieId);
  const trailerQuery = useMovieTrailer(movieId);

  const trailer = trailerQuery.data;

  const { toggleMutation } = useFavorites();

  // validasi id
  if (!movieId) {
    return <p className="text-white p-6">Invalid movie id</p>;
  }

  // loading
  if (movieQuery.isLoading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  // error
  if (movieQuery.isError) {
    return <p className="text-white p-6">Error loading movie</p>;
  }

  const movie = movieQuery.data!;
  const cast = creditsQuery.data?.cast?.slice(0, 6) ?? [];

  const activeFavorite = isFavorite(movie.id);

  const favoritePayload: FavoriteMovie = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path ?? "",
    vote_average: movie.vote_average,
  };

  // backdrop + poster dari TMDB
  const backdropUrl = movie.backdrop_path
    ? tmdbImage(movie.backdrop_path, "original")
    : "/HeroImage.svg";

  const posterUrl = movie.poster_path
    ? tmdbImage(movie.poster_path, "w500")
    : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* HERO BACKDROP */}
      <section className="relative">
        {/* backdrop image */}
        <div
          className="h-70 md:h-200 bg-cover -mt-25 md:-mt-30 bg-center relative md:max-w-360 mx-auto"
          style={{ backgroundImage: `url('${backdropUrl}')` }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-360 mx-auto px-6 md:px-30 py-10">
          {/* poster & text */}
          <div className="md:flex md:gap-4 -mt-35 md:-mt-60">
            <div className="flex gap-4">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-29 md:w-55 rounded-2xl overflow-hidden border border-white/10"
              />

              <div className="block md:hidden">
                <h1 className="text-2xl md:text-4xl font-bold">
                  {movie.title}
                </h1>

                <p className="flex gap-2 text-gray-300 text-sm mt-2 items-center">
                  <img src="/Calender.svg" alt="" />
                  {movie.release_date || "-"}
                </p>
              </div>
            </div>

            {/* right content */}
            <div className="flex-1">
              <div className="hidden md:block">
                <h1 className="text-2xl md:text-4xl font-bold">
                  {movie.title}
                </h1>

                <p className="flex gap-2 text-gray-300 text-sm mt-2 items-center">
                  <img src="/Calender.svg" alt="" />
                  {movie.release_date || "-"}
                </p>
              </div>

              {/* buttons */}
              <div className="flex max-w-full items-center gap-3 mt-5">
                <ButtonPrimary
                  label={trailer ? "Watch Trailer" : "Trailer Not Available"}
                  onClick={() => setOpenTrailer(true)}
                  disabled={!trailer}
                />

                {/* favorite */}
                <FavoriteButton
                  active={activeFavorite}
                  onClick={() => toggleMutation.mutate(favoritePayload)}
                />
              </div>

              {/* info cards */}
              <div className="mt-6 grid grid-cols-3 gap-4 w-full">
                <InfoCard
                  icon={<img src="/Rating.svg" alt="Rating" className="w-5" />}
                  label="Rating"
                  value={`${movie.vote_average.toFixed(1)}/10`}
                />
                <InfoCard
                  icon={<img src="/Genre.svg" alt="Genre" className="w-5" />}
                  label="Genre"
                  value={movie.genres?.[0]?.name ?? "Unknown"}
                />
                <InfoCard
                  icon={
                    <img src="/AgeLimit.svg" alt="Age Limit" className="w-5" />
                  }
                  label="Age Limit"
                  value="13+"
                />
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mt-10 max-w-3xl">
            <h2 className="text-lg font-semibold mb-3">Overview</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              {movie.overview || "No overview available."}
            </p>
          </div>

          {/* Cast & Crew */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Cast & Crew</h2>

            {creditsQuery.isLoading ? (
              <p className="text-gray-400 text-sm">Loading cast...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cast.map((c) => (
                  <CastItem
                    key={c.id}
                    name={c.name}
                    role={c.character}
                    avatar={
                      c.profile_path
                        ? tmdbImage(c.profile_path, "w300")
                        : "https://placehold.co/100x100?text=No+Img"
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* footer */}
          <Footer />
        </div>
      </section>

      {/* ✅ Trailer Modal */}
      {openTrailer && trailer && (
        <div className="fixed inset-0 z-9999 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-225 rounded-2xl overflow-hidden bg-black border border-white/10">
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <p className="text-white text-sm font-semibold">
                {movie.title} — Trailer
              </p>

              <button
                onClick={() => setOpenTrailer(false)}
                className="text-white/80 hover:text-white text-xl px-3"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full">
              {trailer.site === "YouTube" ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="p-6 text-white/70">
                  Trailer tersedia tapi bukan YouTube.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
