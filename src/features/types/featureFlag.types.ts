export type Environment = "development" | "staging" | "production";

export type FeatureFlag = {
  id: string;
  name: string;
  environment: Environment;
  enabled: boolean;
  createdAt: string;
};

export type FeatureFlagsFilters = {
  environment: Environment | "all";
  status: "all" | "enabled" | "disabled";
};