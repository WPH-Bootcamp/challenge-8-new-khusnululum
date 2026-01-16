type Props = {
  title: string;
  poster: string;
  rating: number;
};

export default function NewReleaseCard({ title, poster, rating }: Props) {
  return (
    <div>
      <div className="rounded-2xl overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="w-[173px] h-[266px] md:w-[216px] md:h-[321px] object-cover"
        />
      </div>

      <h3 className="mt-3 text-white text-sm font-medium">{title}</h3>

      <div className="flex items-center gap-2 mt-1 text-sm text-gray-300">
        <span className="text-yellow-400">⭐</span>
        <span>{rating.toFixed(1)}/10</span>
      </div>
    </div>
  );
}
