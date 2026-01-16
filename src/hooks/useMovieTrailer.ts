import { useQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../lib/tmdb";

type Video = {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
};

type VideosResponse = {
  id: number;
  results: Video[];
};

export const useMovieTrailer = (movieId: number | null) => {
  return useQuery({
    queryKey: ["movie-trailer", movieId],
    enabled: !!movieId,
    queryFn: () => tmdbFetch<VideosResponse>(`/movie/${movieId}/videos`),
    select: (data) => {
      const trailer =
        data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        ) || data.results.find((v) => v.site === "YouTube");

      return trailer ?? null;
    },
    staleTime: 1000 * 60 * 10,
  });
};
