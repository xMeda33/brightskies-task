import { useMemo, useState } from "react";
import { useFeatureFlags } from "../../hooks/useFeatureFlags";
import { useToggleFeatureFlag } from "../../hooks/useToggleFeatureFlag";
import type {
  FeatureFlagsFilters,
  FeatureFlag,
} from "../../types/featureFlag.types";
import { FeatureFilters } from "../FeatureFilters/FeatureFilters";
import { FeatureFlagRow } from "../FeatureFlagRow/FeatureFlagRow";
import { Spinner } from "../../../shared/Spinner";
import { TableSkeleton } from "../../../shared/TableSkeleton";

const DEFAULT_FILTERS: FeatureFlagsFilters = {
  environment: "all",
  status: "all",
};

function applyFilters(flags: FeatureFlag[], filters: FeatureFlagsFilters) {
  return flags.filter((f) => {
    const envOk =
      filters.environment === "all"
        ? true
        : f.environment === filters.environment;
    const statusOk =
      filters.status === "all"
        ? true
        : filters.status === "enabled"
          ? f.enabled
          : !f.enabled;
    return envOk && statusOk;
  });
}

export function FeatureFlagsTable() {
  const { data, isLoading, isError, error, refetch } = useFeatureFlags();
  const toggleMutation = useToggleFeatureFlag();

  const [filters, setFilters] = useState<FeatureFlagsFilters>(DEFAULT_FILTERS);
  const [actionError, setActionError] = useState<string | null>(null);

  const filtered = useMemo(
    () => applyFilters(data ?? [], filters),
    [data, filters],
  );

  const handleToggle = (id: string) => {
    setActionError(null);
    toggleMutation.mutate(id, {
      onError: (err) => {
        setActionError(
          err instanceof Error ? err.message : "Failed to update feature flag",
        );
      },
    });
  };

  const togglingId = toggleMutation.isPending
    ? toggleMutation.variables
    : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Feature Flags
          </h1>
          <p className="text-sm text-gray-600">
            Manage feature rollouts across environments.
          </p>
        </div>
        <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <FeatureFilters value={filters} onChange={setFilters} />
        </div>
        {actionError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <p>{actionError}</p>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-red-700 hover:bg-red-100"
                onClick={() => setActionError(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900">
                {(data ?? []).length}
              </span>
            </div>
            {toggleMutation.isPending ? (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Spinner size="sm" />
                Saving…
              </div>
            ) : null}
          </div>
          {isLoading ? (
            <TableSkeleton rows={7} cols={5} />
          ) : isError ? (
            <div className="px-5 py-8">
              <p className="text-sm text-red-600">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong"}
              </p>
              <button
                type="button"
                className="mt-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
                onClick={() => refetch()}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                  <tr>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Environment</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Created</th>
                    <th className="px-5 py-3">Action</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {filtered.length === 0 ? (
                    <tr>
                      <td className="px-5 py-10 text-gray-600" colSpan={5}>
                        No feature flags match your filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((flag) => (
                      <FeatureFlagRow
                        key={flag.id}
                        flag={flag}
                        onToggle={handleToggle}
                        isToggling={togglingId === flag.id}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
