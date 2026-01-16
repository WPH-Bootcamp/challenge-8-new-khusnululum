type Props = {
  name: string;
  role: string;
  avatar: string | null;
};

export default function CastItem({ name, role, avatar }: Props) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={
          avatar
            ? `https://image.tmdb.org/t/p/w185${avatar}`
            : "https://via.placeholder.com/56x56?text=?"
        }
        alt={name}
        className="w-12 h-16 rounded-xl object-cover"
      />

      <div>
        <p className="text-white text-sm font-medium">{name}</p>
        <p className="text-gray-400 text-xs">{role}</p>
      </div>
    </div>
  );
}
