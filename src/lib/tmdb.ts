export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const tmdbFetch = async <T>(path: string): Promise<T> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "TMDB API Key tidak ditemukan. Isi VITE_TMDB_API_KEY di .env"
    );
  }

  const url = `${TMDB_BASE_URL}${path}${
    path.includes("?") ? "&" : "?"
  }api_key=${apiKey}&language=en-US`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const tmdbImage = (
  path?: string | null,
  size: "w300" | "w500" | "w780" | "original" = "w500"
) => {
  if (!path) return "https://placehold.co/500x750?text=No+Poster";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
