import { useMemo, useState } from "react";
import ButtonPrimary from "../components/ui/Button";
import { tmdbImage } from "../lib/tmdb";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import { useNavigate } from "react-router-dom";

type Props = {
  onSeeDetail?: (movieId: number) => void;
};

export default function Hero({ onSeeDetail }: Props) {
  const navigate = useNavigate();

  // ✅ ambil LIST movie dari trending
  const {
    data: movies,
    isLoading,
    isError,
    error,
    refetch,
  } = useTrendingMovies("day");

  // ✅ hero movie = movie pertama
  const heroMovie = movies?.[0];

  // ✅ id harus number | null (bukan undefined)
  const heroMovieId = heroMovie?.id ?? null;

  // ✅ trailer berdasarkan heroMovieId
  const { data: trailer } = useMovieTrailer(heroMovieId);

  const [openTrailer, setOpenTrailer] = useState(false);

  const backdropUrl = useMemo(() => {
    if (!heroMovie?.backdrop_path) return "/HeroImage.svg";
    return tmdbImage(heroMovie.backdrop_path, "original");
  }, [heroMovie?.backdrop_path]);

  // ✅ Loading UI
  if (isLoading) {
    return (
      <section className="relative max-w-360 mx-auto w-full h-130 md:h-150 flex items-center px-6 md:px-16 text-white bg-black/30 rounded-2xl">
        <p className="text-white/70">Loading hero...</p>
      </section>
    );
  }

  // ✅ Error UI
  if (isError) {
    return (
      <section className="relative max-w-360 mx-auto w-full h-130 md:h-150 flex items-center px-6 md:px-16 text-white bg-black/30 rounded-2xl">
        <div>
          <p className="text-red-400 font-semibold">Gagal load hero</p>
          <p className="text-xs text-red-300 mt-1 break-words">
            {(error as Error)?.message}
          </p>

          <button
            onClick={() => refetch()}
            className="mt-3 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-sm"
          >
            Coba lagi
          </button>
        </div>
      </section>
    );
  }

  // ✅ kalau movie kosong
  if (!heroMovie) {
    return (
      <section className="relative max-w-360 mx-auto w-full h-130 md:h-150 flex items-center px-6 md:px-16 text-white bg-black/30 rounded-2xl">
        <p className="text-white/70">Movie trending kosong</p>
      </section>
    );
  }

  const handleSeeDetail = () => {
    // ✅ kalau parent ngasih handler, pakai itu
    if (onSeeDetail) return onSeeDetail(heroMovie.id);

    // ✅ kalau tidak ada, langsung navigate
    navigate(`/movie/${heroMovie.id}`);
  };

  return (
    <>
      <section
        className="
          relative max-w-360 mx-auto w-full h-130 md:h-150
          flex items-center
          px-6 md:px-16
          text-white
          overflow-hidden
          -mt-30
        "
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${backdropUrl}')`,
          }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

        {/* Content */}
        <div className="relative max-w-xl mt-50">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {heroMovie.title}
          </h1>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 line-clamp-4">
            {heroMovie.overview || "No overview available."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Watch Trailer */}
            <ButtonPrimary
              label="Watch Trailer"
              onClick={() => setOpenTrailer(true)}
              disabled={!trailer}
            />

            {/* See Detail */}
            <button
              onClick={handleSeeDetail}
              className="
                px-15 py-3 rounded-full
                text-sm font-medium
                bg-white/10 hover:bg-white/20
                border border-white/20
              "
            >
              See Detail
            </button>
          </div>

          {!trailer && (
            <p className="mt-3 text-xs text-white/60">
              Trailer tidak tersedia untuk movie ini.
            </p>
          )}
        </div>
      </section>

      {/* Trailer Modal */}
      {openTrailer && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-[900px] rounded-2xl overflow-hidden bg-black">
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <p className="text-white text-sm font-semibold">
                {heroMovie.title} — Trailer
              </p>

              <button
                onClick={() => setOpenTrailer(false)}
                className="text-white/80 hover:text-white text-xl px-3"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full">
              {trailer?.site === "YouTube" ? (
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
    </>
  );
}
