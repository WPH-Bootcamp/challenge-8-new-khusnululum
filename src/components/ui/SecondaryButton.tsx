type SecondaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export default function SecondaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center
        rounded-full
        bg-white/10
        border border-white/15
        text-white text-sm font-medium
        hover:bg-white/20
        transition
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
