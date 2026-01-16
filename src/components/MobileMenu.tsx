import { useFavoritesCount } from "../hooks/useFavoritesCount";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;
  const { data: favoritesCount } = useFavoritesCount();
  return (
    <div className="fixed inset-0 z-9999 md:hidden">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 px-6 py-6"
        onClick={onClose}
      />

      {/* drawer */}
      <div
        className="
          absolute left-0 top-0 h-full w-full mx-auto
          bg-black
          px-6 py-6
        "
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <span>
              <img src="/MovieLogo.svg" alt="Movie Logo" />
            </span>
            <span>Movie</span>
          </div>

          <button
            onClick={onClose}
            className="text-white text-xl"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* links */}
        <div className="mt-10 flex flex-col gap-4">
          <a href="/" onClick={onClose} className="text-white text-sm">
            Home
          </a>

          <a
            href="/favorites"
            className="
              text-white text-sm
              hover:text-gray-300
            "
          >
            Favorites
            <span className="ml-2 text-xs text-gray-400">
              ({favoritesCount ?? 0})
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
