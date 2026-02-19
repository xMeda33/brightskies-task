import type { FeatureFlag } from "../../types/featureFlag.types";
import { Spinner } from "../../../shared/Spinner";

type Props = {
  flag: FeatureFlag;
  onToggle?: (id: string) => void;
  isToggling?: boolean;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "-"
    : d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
}

function envBadge(env: FeatureFlag["environment"]) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset";
  if (env === "development")
    return `${base} bg-blue-50 text-blue-700 ring-blue-200`;
  if (env === "staging")
    return `${base} bg-amber-50 text-amber-700 ring-amber-200`;
  return `${base} bg-purple-50 text-purple-700 ring-purple-200`; // production
}

function statusBadge(enabled: boolean) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset";
  return enabled
    ? `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`
    : `${base} bg-gray-50 text-gray-700 ring-gray-200`;
}

export function FeatureFlagRow({ flag, onToggle, isToggling = false }: Props) {
  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50/60">
      <td className="px-5 py-4">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{flag.name}</span>
          <span className="text-xs text-gray-500">ID: {flag.id}</span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className={envBadge(flag.environment)}>{flag.environment}</span>
      </td>

      <td className="px-5 py-4">
        <span className={statusBadge(flag.enabled)}>
          <span
            className={`mr-2 inline-block h-2 w-2 rounded-full ${flag.enabled ? "bg-emerald-500" : "bg-gray-400"}`}
          />
          {flag.enabled ? "Enabled" : "Disabled"}
        </span>
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {formatDate(flag.createdAt)}
      </td>

      <td className="px-5 py-4">
        <button
          type="button"
          role="switch"
          aria-checked={flag.enabled}
          onClick={() => onToggle?.(flag.id)}
          disabled={!onToggle || isToggling}
          className={[
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
            flag.enabled ? "bg-blue-600" : "bg-gray-300",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
            "disabled:cursor-not-allowed disabled:opacity-60",
          ].join(" ")}
        >
          <span
            className={[
              "inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow transition-transform duration-200",
              flag.enabled ? "translate-x-5" : "translate-x-1",
            ].join(" ")}
          >
            {isToggling ? (
              <Spinner
                size="sm"
                className="border-gray-300 border-t-blue-600"
              />
            ) : null}
          </span>
        </button>
      </td>
    </tr>
  );
}
