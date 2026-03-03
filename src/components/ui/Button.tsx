type ButtonPrimaryProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function ButtonPrimary({ label, onClick }: ButtonPrimaryProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center gap-2
        px-6 py-3
        rounded-full
        w-full md:w-auto
        bg-[#961200] hover:bg-red-800
        text-white text-sm font-medium
        transition-colors
      "
    >
      <span>{label}</span>

      {/* Play icon */}
      <span
        className="
          flex items-center justify-center
          w-5 h-5
          rounded-full
          bg-white/20
        "
      >
        <img src="/PlayButton.svg" alt="" />
      </span>
    </button>
  );
}
