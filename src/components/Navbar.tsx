import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useFavoritesCount } from "../hooks/useFavoritesCount";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { tmdbImage } from "../lib/tmdb";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: favoritesCount } = useFavoritesCount();
  const navigate = useNavigate();

  // ✅ deteksi scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ search state (dipakai desktop & mobile)
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  // ✅ mobile search overlay
  const [openMobileSearch, setOpenMobileSearch] = useState(false);

  // debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const searchQuery = useSearchMovies(debouncedSearch);
  const results = useMemo(() => searchQuery.data ?? [], [searchQuery.data]);

  useEffect(() => {
    if (debouncedSearch.trim().length >= 2) setOpenDropdown(true);
    else setOpenDropdown(false);
  }, [debouncedSearch]);

  const goToDetail = (id: number) => {
    navigate(`/movie/${id}`);
    setSearch("");
    setDebouncedSearch("");
    setOpenDropdown(false);
    setOpenMobileSearch(false);
  };

  return (
    <>
      {/* ✅ NAVBAR FIXED */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[999]
          transition-all duration-300
          ${
            scrolled
              ? "bg-black/30 backdrop-blur-xl border-b border-white/10"
              : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <div className="flex items-center justify-between px-6 md:px-8 py-5 max-w-360 mx-auto">
          {/* LEFT */}
          <div className="flex items-center justify-center gap-10">
            <Link to="/" className="flex justify-center items-center gap-2">
              <img src="/MovieLogo.svg" alt="Logo" />
              <span className="text-2xl md:text-4xl font-semibold text-white">
                Movie
              </span>
            </Link>

            {/* Desktop menu */}
            <ul className="hidden md:flex gap-10 text-sm md:text-2xl text-gray-300">
              <li className="hover:text-white cursor-pointer">
                <Link to="/">Home</Link>
              </li>

              <li className="hover:text-white cursor-pointer">
                <Link to="/favorites">
                  Favorites
                  <span className="ml-2 text-xs text-gray-400">
                    ({favoritesCount ?? 0})
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ✅ Desktop Search */}
          <div className="hidden md:block relative w-72">
            {/* icon */}
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {/* input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => {
                if (debouncedSearch.trim().length >= 2) setOpenDropdown(true);
              }}
              placeholder="Search Movie"
              className={`
                w-full
                pl-10 pr-4 py-4
                rounded-2xl
                text-white text-sm
                placeholder-white/40
                outline-none
                border
                transition-all duration-300
                ${
                  scrolled
                    ? "bg-white/10 border-white/10 focus:border-white/20"
                    : "bg-neutral-800 border-white/5 focus:border-white/20"
                }
              `}
            />

            {/* Dropdown Desktop */}
            {openDropdown && (
              <div className="absolute top-[62px] left-0 right-0 z-[9999] rounded-2xl overflow-hidden border border-white/10 bg-black/80 backdrop-blur-xl">
                {searchQuery.isFetching && (
                  <div className="px-4 py-3 text-sm text-white/70">
                    Searching...
                  </div>
                )}

                {!searchQuery.isFetching &&
                  debouncedSearch.trim().length >= 2 &&
                  results.length === 0 && (
                    <div className="px-4 py-3 text-sm text-white/70">
                      Movie tidak ditemukan
                    </div>
                  )}

                <div className="max-h-[340px] overflow-auto">
                  {results.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => goToDetail(m.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 text-left"
                    >
                      <img
                        src={tmdbImage(m.poster_path, "w300")}
                        alt={m.title}
                        className="w-10 h-14 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">
                          {m.title}
                        </p>
                        <p className="text-xs text-white/50">
                          {m.release_date?.slice(0, 4) ?? "-"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setOpenDropdown(false)}
                  className="w-full px-4 py-2 text-xs text-white/60 hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* ✅ Mobile buttons */}
          <div className="flex items-center md:hidden gap-6">
            {/* search icon */}
            <button
              onClick={() => setOpenMobileSearch(true)}
              className="md:hidden"
            >
              <img src="/SearchIcon.svg" alt="Search Icon" className="w-7" />
            </button>

            {/* burger */}
            <button
              onClick={() => setOpenMenu(true)}
              className="md:hidden text-white text-xl"
            >
              <img
                src="/BurgerButton.svg"
                alt="Burger Button"
                className="w-7"
              />
            </button>

            <MobileMenu open={openMenu} onClose={() => setOpenMenu(false)} />
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[84px] md:h-[96px]" />

      {/* ✅ MOBILE SEARCH OVERLAY */}
      {openMobileSearch && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm">
          <div className="max-w-360 mx-auto px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Movie"
                  className="
                    w-full
                    pl-10 pr-4 py-4
                    rounded-2xl
                    bg-white/10
                    text-white
                    placeholder-white/40
                    outline-none
                    border border-white/10
                  "
                />
              </div>

              <button
                onClick={() => {
                  setOpenMobileSearch(false);
                  setSearch("");
                  setDebouncedSearch("");
                }}
                className="text-white/80 hover:text-white text-xl px-2"
              >
                ✕
              </button>
            </div>

            {/* results box */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black/60">
              {search.trim().length < 2 ? (
                <div className="px-4 py-3 text-sm text-white/60">
                  Ketik minimal 2 huruf...
                </div>
              ) : searchQuery.isFetching ? (
                <div className="px-4 py-3 text-sm text-white/70">
                  Searching...
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-3 text-sm text-white/70">
                  Movie tidak ditemukan
                </div>
              ) : (
                <div className="max-h-[70vh] overflow-auto">
                  {results.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => goToDetail(m.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 text-left"
                    >
                      <img
                        src={tmdbImage(m.poster_path, "w300")}
                        alt={m.title}
                        className="w-10 h-14 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">
                          {m.title}
                        </p>
                        <p className="text-xs text-white/50">
                          {m.release_date?.slice(0, 4) ?? "-"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
