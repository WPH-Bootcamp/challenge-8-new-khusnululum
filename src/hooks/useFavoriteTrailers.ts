import { useQueries } from "@tanstack/react-query";
import { tmdbFetch } from "../lib/tmdb";

export type TrailerResult = {
  id: number;
  results: {
    key: string;
    site: "YouTube" | string;
    type: string;
    name: string;
  }[];
};

export const useFavoriteTrailers = (movieIds: number[]) => {
  return useQueries({
    queries: movieIds.map((id) => ({
      queryKey: ["movie-trailer", id],
      queryFn: () => tmdbFetch<TrailerResult>(`/movie/${id}/videos`),
      staleTime: 1000 * 60 * 10,
      enabled: !!id,
      select: (data: TrailerResult) => {
        const trailer =
          data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          data.results.find((v) => v.site === "YouTube");
        return trailer ?? null;
      },
    })),
  });
};
