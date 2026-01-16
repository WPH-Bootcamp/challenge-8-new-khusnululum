import { useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../lib/tmdb";

export type SearchMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
};

type SearchResponse = {
  results: SearchMovie[];
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["search-movies", query],
    enabled: query.trim().length >= 2,
    queryFn: () =>
      tmdbFetch<SearchResponse>(
        `/search/movie?query=${encodeURIComponent(query)}&include_adult=false`
      ),
    staleTime: 1000 * 60 * 5,
    select: (data) => data.results.slice(0, 6), // max 6 hasil biar rapih
  });
};
