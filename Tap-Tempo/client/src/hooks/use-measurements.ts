import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertMeasurement } from "@shared/routes";

export function useMeasurements() {
  return useQuery({
    queryKey: [api.measurements.list.path],
    queryFn: async () => {
      const res = await fetch(api.measurements.list.path);
      if (!res.ok) throw new Error("Failed to fetch measurements");
      return api.measurements.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateMeasurement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertMeasurement) => {
      const res = await fetch(api.measurements.create.path, {
        method: api.measurements.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create measurement");
      return api.measurements.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.measurements.list.path] });
    },
  });
}

export function useClearMeasurements() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.measurements.clear.path, {
        method: api.measurements.clear.method,
      });
      if (!res.ok) throw new Error("Failed to clear measurements");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.measurements.list.path] });
    },
  });
}
