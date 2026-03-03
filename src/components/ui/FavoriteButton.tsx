type Props = {
  active: boolean;
  onClick?: () => void;
};

export default function FavoriteButton({ active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-10 h-10
        rounded-full
        bg-black/60
        flex items-center justify-center
        border border-white/10
        hover:bg-black/80
        transition
      "
      aria-label="Toggle Favorite"
    >
      {/* heart */}
      <img src={active ? "/HeartRed.svg" : "/Heart.svg"} alt="" />

    </button>
  );
}
