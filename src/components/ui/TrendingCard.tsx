import { Link } from "react-router-dom";

type TrendingCardProps = {
  id: number;
  index: number;
  title: string;
  poster: string;
  rating: number;
  showArrow?: boolean;
};

export default function TrendingCard({
  id,
  index,
  title,
  poster,
  rating,
  showArrow = false,
}: TrendingCardProps) {
  return (
    <div className="w-55 shrink-0">
      <Link to={`/detail/${id}`}>
        {/* Poster */}
        <div className="relative rounded-2xl overflow-hidden">
          <img src={poster} alt={title} className="w-full h-80 object-cover" />

          {/* Index badge */}
          <span
            className="
          absolute top-3 left-3
          w-8 h-8
          rounded-full
          bg-black/60
          text-white text-sm
          flex items-center justify-center
        "
          >
            {index}
          </span>

          {/* Arrow */}
          {showArrow && (
            <button
              className="
              absolute right-3 top-1/2 -translate-y-1/2
              w-10 h-10
              rounded-full
              bg-black/60
              text-white
              flex items-center justify-center
            "
            >
              ❯
            </button>
          )}
        </div>

        {/* Info */}
        <h3 className="mt-3 text-white font-medium text-sm">{title}</h3>

        <div className="flex items-center gap-2 mt-1 text-sm text-gray-300">
          <span className="text-yellow-400">⭐</span>
          <span>{rating}/10</span>
        </div>
      </Link>
    </div>
  );
}
