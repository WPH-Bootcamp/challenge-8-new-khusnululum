import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavorites, toggleFavorite, } from "../lib/favoritesStorege";
import type { FavoriteMovie } from "../lib/favoritesStorege";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  // Query: ambil list favorites
  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      return getFavorites();
    },
  });

  // Mutation: toggle add/remove
  const toggleMutation = useMutation({
    mutationFn: async (movie: FavoriteMovie) => {
      return toggleFavorite(movie); // { status: "added" | "removed" }
    },
    onSuccess: () => {
      // Refresh data favorites
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favoritesQuery,
    toggleMutation,
  };
};
