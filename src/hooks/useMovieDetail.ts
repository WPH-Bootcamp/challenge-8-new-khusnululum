// src/hooks/useMovieDetail.ts
import { useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../lib/tmdb";

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
};

export const useMovieDetail = (movieId: number | null) => {
  return useQuery({
    queryKey: ["movie-detail", movieId],
    enabled: !!movieId,
    queryFn: () => tmdbFetch<MovieDetail>(`/movie/${movieId}`),
    staleTime: 1000 * 60 * 10,
  });
};
