import { useQuery } from "@tanstack/react-query";

export const useFavoritesCount = () => {
  return useQuery({
    queryKey: ["favorites-count"],
    queryFn: async () => {
      // contoh sederhana: ambil dari localStorage (mock)
      const raw = localStorage.getItem("favorites");
      const favorites = raw ? JSON.parse(raw) : [];
      return favorites.length as number;
    },
  });
};
