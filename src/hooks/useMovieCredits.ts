import { useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../lib/tmdb";

export type MovieCast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type MovieCrew = {
  id: number;
  name: string;
  job: string;
};

export type MovieCreditsResponse = {
  id: number;
  cast: MovieCast[];
  crew: MovieCrew[];
};

export const useMovieCredits = (movieId: number | null) => {
  return useQuery({
    queryKey: ["movie-credits", movieId],
    enabled: !!movieId,
    queryFn: () => tmdbFetch<MovieCreditsResponse>(`/movie/${movieId}/credits`),
    staleTime: 1000 * 60 * 10,
  });
};
