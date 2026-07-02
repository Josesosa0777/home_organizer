import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as itemsApi from "../api/items.js";

export const useItems = (apiUrl, filters) => {
  const queryClient = useQueryClient();

  const itemsQuery = useQuery(["items", filters], () => itemsApi.getItems(apiUrl, filters), {
    enabled: Boolean(apiUrl),
  });

  const statsQuery = useQuery(["stats"], () => itemsApi.getStats(apiUrl), {
    enabled: Boolean(apiUrl),
  });

  const createMutation = useMutation((payload) => itemsApi.createItem(apiUrl, payload), {
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });

  const updateMutation = useMutation(({ id, payload }) => itemsApi.updateItem(apiUrl, id, payload), {
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });

  const deleteMutation = useMutation((id) => itemsApi.deleteItem(apiUrl, id), {
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });

  const archiveMutation = useMutation((id) => itemsApi.toggleArchive(apiUrl, id), {
    onSuccess: () => queryClient.invalidateQueries(["items"]),
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
