import { Filter, RotateCcw } from 'lucide-react';

// Mock types for demonstration
type Environment = "development" | "staging" | "production";
type FeatureFlagsFilters = {
  environment: Environment | "all";
  status: "all" | "enabled" | "disabled";
};

type Props = {
  value: FeatureFlagsFilters;
  onChange: (next: FeatureFlagsFilters) => void;
};

const ENV_OPTIONS: Array<{ label: string; value: Environment | "all"; color: string }> = [
  { label: "All", value: "all", color: "bg-gray-100 text-gray-700" },
  { label: "Development", value: "development", color: "bg-blue-50 text-blue-700" },
  { label: "Staging", value: "staging", color: "bg-amber-50 text-amber-700" },
  { label: "Production", value: "production", color: "bg-emerald-50 text-emerald-700" },
];

const STATUS_OPTIONS: Array<{
  label: string;
  value: FeatureFlagsFilters["status"];
  color: string;
}> = [
  { label: "All", value: "all", color: "bg-gray-100 text-gray-700" },
  { label: "Enabled", value: "enabled", color: "bg-green-50 text-green-700" },
  { label: "Disabled", value: "disabled", color: "bg-red-50 text-red-700" },
];

export function FeatureFilters({ value, onChange }: Props) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-5 shadow-sm border border-gray-200/60">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Environment
            </label>
            <select
              className="h-10 rounded-lg border-2 border-gray-400 bg-white px-4 pr-10 text-sm font-medium shadow-sm transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[length:12px] bg-[center_right_1rem] bg-no-repeat"
              value={value.environment}
              onChange={(e) =>
                onChange({
                  ...value,
                  environment: e.target.value as FeatureFlagsFilters["environment"],
                })
              }
            >
              {ENV_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Status
            </label>
            <select
              className="h-10 rounded-lg border-2 border-gray-400 bg-white px-4 pr-10 text-sm font-medium shadow-sm transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[length:12px] bg-[center_right_1rem] bg-no-repeat"
              value={value.status}
              onChange={(e) =>
                onChange({
                  ...value,
                  status: e.target.value as FeatureFlagsFilters["status"],
                })
              }
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {(value.environment !== "all" || value.status !== "all") && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-xs font-medium text-blue-700">
                {value.environment !== "all" && value.status !== "all" 
                  ? "2 filters active"
                  : "1 filter active"}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          className="h-10 px-5 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-900/10 flex items-center justify-center gap-2 group"
          onClick={() => onChange({ environment: "all", status: "all" })}
        >
          <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
          Reset
        </button>
      </div>
    </div>
  );
}