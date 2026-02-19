import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FeatureFlag } from "../types/featureFlag.types";

async function toggleFeatureFlag(id: string): Promise<FeatureFlag> {
  const res = await fetch(`/feature-flags/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    let message = "Failed to update feature flag";
    try {
      const data = (await res.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return (await res.json()) as FeatureFlag;
}

export function useToggleFeatureFlag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleFeatureFlag(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["feature-flags"] });

      const previous = queryClient.getQueryData<FeatureFlag[]>([
        "feature-flags",
      ]);

      queryClient.setQueryData<FeatureFlag[]>(["feature-flags"], (old) => {
        if (!old) return old;
        return old.map((f) =>
          f.id === id ? { ...f, enabled: !f.enabled } : f,
        );
      });
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["feature-flags"], ctx.previous);
      }
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<FeatureFlag[]>(["feature-flags"], (old) => {
        if (!old) return old;
        return old.map((f) => (f.id === updated.id ? updated : f));
      });
    },
  });
}
