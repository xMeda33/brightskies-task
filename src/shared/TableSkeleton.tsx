type Props = {
  rows?: number;
  cols?: number;
};

export function TableSkeleton({ rows = 6, cols = 5 }: Props) {
  return (
    <div className="overflow-hidden">
      <div className="animate-pulse">
        <div className="grid grid-cols-5 gap-4 bg-gray-50 px-5 py-3">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-3 w-24 rounded bg-gray-300" />
          ))}
        </div>
        <div className="divide-y divide-gray-100">
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="grid grid-cols-5 gap-4 px-5 py-4">
              <div className="h-4 w-40 rounded bg-gray-300" />
              <div className="h-4 w-28 rounded bg-gray-300" />
              <div className="h-4 w-24 rounded bg-gray-300" />
              <div className="h-4 w-28 rounded bg-gray-300" />
              <div className="h-8 w-24 rounded bg-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
