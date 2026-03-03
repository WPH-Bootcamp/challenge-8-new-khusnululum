// src/hooks/useNewRelease.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdbFetch } from "../lib/tmdb";

export type TmdbNewReleaseMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
};

type NowPlayingResponse = {
  page: number;
  results: TmdbNewReleaseMovie[];
  total_pages: number;
  total_results: number;
};

export const useNewReleases = () => {
  return useInfiniteQuery({
    queryKey: ["new-releases-now-playing"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      tmdbFetch<NowPlayingResponse>(
        `/movie/now_playing?page=${pageParam}&region=ID`
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
    staleTime: 1000 * 60 * 10,
  });
};
