import { Link } from "react-router-dom";
import ButtonPrimary from "./Button";
import FavoriteButton from "./FavoriteButton";
import { tmdbImage } from "../../lib/tmdb";

type Props = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview?: string;

  trailerKey?: string | null;

  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function FavoriteMovieCard({
  id,
  title,
  poster_path,
  vote_average,
  overview,
  trailerKey,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex gap-4">
        {/* ✅ Poster klik ke detail */}
        <Link to={`/movie/${id}`} className="shrink-0">
          <img
            src={tmdbImage(poster_path, "w300")}
            alt={title}
            className="
              w-20 h-28 object-cover rounded-xl border border-white/10
              hover:scale-[1.02] transition
            "
          />
        </Link>

        {/* Content */}
        <div className="flex-1">
          {/* Title klik ke detail */}
          <Link to={`/movie/${id}`} className="text-left block">
            <h3 className="text-white font-semibold leading-tight hover:underline">
              {title}
            </h3>
          </Link>

          <div className="mt-1 flex items-center gap-2 text-sm text-gray-300">
            <img src="/Rating.svg" alt="Star Rating" className="w-4" />
            <span>{vote_average.toFixed(1)}/10</span>
          </div>

          <p className="mt-2 text-xs text-gray-300 leading-relaxed line-clamp-3">
            {overview || "No overview available."}
          </p>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1">
          <ButtonPrimary
            label="Watch Trailer"
            disabled={!trailerKey}
            onClick={() => {
              if (!trailerKey) return;
              window.open(
                `https://www.youtube.com/watch?v=${trailerKey}`,
                "_blank"
              );
            }}
          />
        </div>

        <FavoriteButton active={isFavorite} onClick={onToggleFavorite} />
      </div>
    </div>
  );
}
