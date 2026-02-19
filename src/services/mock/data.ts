export type Environment = "development" | "staging" | "production";

export type FeatureFlag = {
  id: string;
  name: string;
  environment: Environment;
  enabled: boolean;
  createdAt: string;
};

export const featureFlags: FeatureFlag[] = [
  {
    id: "1",
    name: "new-checkout",
    environment: "development",
    enabled: true,
    createdAt: "2026-01-10T10:15:00.000Z",
  },
  {
    id: "2",
    name: "search-v2",
    environment: "staging",
    enabled: false,
    createdAt: "2026-01-22T13:40:00.000Z",
  },
  {
    id: "3",
    name: "recommendations",
    environment: "production",
    enabled: true,
    createdAt: "2026-02-01T08:05:00.000Z",
  },
  {
    id: "4",
    name: "profile-redesign",
    environment: "development",
    enabled: false,
    createdAt: "2026-02-03T09:10:00.000Z",
  },
  {
    id: "5",
    name: "new-navbar",
    environment: "staging",
    enabled: true,
    createdAt: "2026-02-04T12:00:00.000Z",
  },
  {
    id: "6",
    name: "billing-v3",
    environment: "production",
    enabled: false,
    createdAt: "2026-02-05T14:30:00.000Z",
  },
];
