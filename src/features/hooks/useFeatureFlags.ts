import { useQuery } from "@tanstack/react-query";
import type { FeatureFlag } from "../types/featureFlag.types";

async function fetchFeatureFlags(): Promise<FeatureFlag[]> {
  const res = await fetch("/feature-flags");

  if (!res.ok) {
    let message = "Failed to fetch feature flags";
    try {
      const data = (await res.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return (await res.json()) as FeatureFlag[];
}

export function useFeatureFlags() {
  return useQuery({
    queryKey: ["feature-flags"],
    queryFn: fetchFeatureFlags,
  });
}
