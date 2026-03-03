// src/hooks/useTrendingMovies.ts
import { useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../lib/tmdb";

export type TmdbTrendingMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
};

type TrendingMoviesResponse = {
  results: TmdbTrendingMovie[];
};

export const useTrendingMovies = (time: "day" | "week" = "day") => {
  return useQuery({
    queryKey: ["trending-movies", time],
    queryFn: () => tmdbFetch<TrendingMoviesResponse>(`/trending/movie/${time}`),
    staleTime: 1000 * 60 * 10,
    select: (data) => data.results.slice(0, 12), // ambil 12 movie teratas
  });
};
