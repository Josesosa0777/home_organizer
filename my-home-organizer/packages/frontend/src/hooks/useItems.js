import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as itemsApi from "../api/items.js";

export const useItems = (apiUrl, filters) => {
  const queryClient = useQueryClient();

  const itemsQuery = useQuery({
    queryKey: ["items", filters],
    queryFn: () => itemsApi.getItems(apiUrl, filters),
    enabled: Boolean(apiUrl),
  });

  const statsQuery = useQuery({
    queryKey: ["stats"],
    queryFn: () => itemsApi.getStats(apiUrl),
    enabled: Boolean(apiUrl),
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["items"] });
    queryClient.invalidateQueries({ queryKey: ["stats"] });
  };

  const createMutation = useMutation({
    mutationFn: (payload) => itemsApi.createItem(apiUrl, payload),
    onSuccess: invalidateAll,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => itemsApi.updateItem(apiUrl, id, payload),
    onSuccess: invalidateAll,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => itemsApi.deleteItem(apiUrl, id),
    onSuccess: invalidateAll,
  });

  const archiveMutation = useMutation({
    mutationFn: (id) => itemsApi.toggleArchive(apiUrl, id),
    onSuccess: invalidateAll,
  });

  return {
    items: itemsQuery.data ?? [],
    stats: statsQuery.data ?? { total: 0, box: 0, item: 0, clothing: 0, document: 0 },
    isLoading: itemsQuery.isLoading || statsQuery.isLoading,
    createItem: createMutation.mutateAsync,
    updateItem: (id, payload) => updateMutation.mutateAsync({ id, payload }),
    deleteItem: deleteMutation.mutateAsync,
    toggleArchive: archiveMutation.mutateAsync,
    refetch: itemsQuery.refetch,
  };
};
