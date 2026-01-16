export type FavoriteMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview?: string;
};

const KEY = "favorites";

export const getFavorites = (): FavoriteMovie[] => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
};

export const isFavorite = (id: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((m) => m.id === id);
};

export const addFavorite = (movie: FavoriteMovie) => {
  const favorites = getFavorites();
  const exists = favorites.some((m) => m.id === movie.id);

  if (!exists) {
    favorites.unshift(movie);
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }

  return favorites;
};

export const removeFavorite = (id: number) => {
  const favorites = getFavorites().filter((m) => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(favorites));
  return favorites;
};

export const toggleFavorite = (movie: FavoriteMovie) => {
  if (isFavorite(movie.id)) {
    removeFavorite(movie.id);
    return { status: "removed" as const };
  } else {
    addFavorite(movie);
    return { status: "added" as const };
  }
};
