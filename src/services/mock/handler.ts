import { http, HttpResponse, delay } from "msw";
import { featureFlags, type FeatureFlag } from "./data";

const featureFlagsDb: FeatureFlag[] = structuredClone(featureFlags);

export const handlers = [
  // Get all feature flags
  http.get("/feature-flags", async () => {
    await delay(400); // Delay to show loading states
    return HttpResponse.json(featureFlagsDb);
  }),

  // toggling feature flag status
  http.patch("/feature-flags/:id", async ({ params }) => {
    await delay(500);

    const id = String(params.id);
    const idx = featureFlagsDb.findIndex((f) => f.id === id);

    if (idx === -1) {
      return HttpResponse.json(
        { message: "Feature flag not found" },
        { status: 404 }
      );
    }

    // fail 15% of the time to demonstrate error handling
    const shouldFail = Math.random() < 0.15;
    if (shouldFail) {
      return HttpResponse.json(
        { message: "Random API failure. Please retry." },
        { status: 500 }
      );
    }

    const updated: FeatureFlag = {
      ...featureFlagsDb[idx],
      enabled: !featureFlagsDb[idx].enabled,
    };

    featureFlagsDb[idx] = updated;

    return HttpResponse.json(updated);
  }),
];
